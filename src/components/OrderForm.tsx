import React, { useState, useEffect } from 'react';
import { useMenuItems } from '../hooks/useMenuItems';
import { useDeliveryCost } from '../hooks/useDeliveryCost';
import { useOrderForm } from '../hooks/useOrderForm';
import { Plus, Minus, User, Users, MapPin, Home, Building2, DoorClosed, Phone, Clock } from 'lucide-react';
import type { CustomerData } from '../types';
import RodoTooltip from './RodoTooltip';
import IngredientsModal from './IngredientsModal';
import SelectedItemsBubbles from './SelectedItemsBubbles';
import { getActiveOrdersCount } from '../services/api';

interface OrderFormProps {
  deliveryAreas: Array<{ id: number; nazwa: string; ulica: string }>;
  location: string;
}

// Dodaj funkcję sprawdzającą dostępność dostawy na konkretną godzinę
const isDeliveryTimeAvailable = (time: string, location: string): { available: boolean; message?: string } => {
  if (!time) return { available: true };

  const [hours, minutes] = time.split(':').map(Number);
  const now = new Date();
  const isWeekend = now.getDay() === 0 || now.getDay() === 6;
  const isHoliday = false; // TODO: Dodać sprawdzanie świąt

  // Sprawdź czy wybrana godzina mieści się w zakresie
  if (isWeekend || isHoliday) {
    if (hours < 16 || hours >= 22) {
      return {
        available: false,
        message: 'W weekendy i święta dowozimy tylko w godzinach 16:00 - 22:00'
      };
    }
  } else {
    const minHour = location === 'miejsce-piastowe' ? 11 : 12;
    if (hours < minHour || hours >= 22) {
      return {
        available: false,
        message: `W dni powszednie dowozimy w godzinach ${minHour}:00 - 22:00`
      };
    }
  }

  // Sprawdź czy wybrana godzina nie jest w przeszłości
  const selectedTime = new Date();
  selectedTime.setHours(hours, minutes, 0, 0);
  
  if (selectedTime < now) {
    return {
      available: false,
      message: 'Nie można zamówić dostawy na godzinę w przeszłości'
    };
  }

  return { available: true };
};

export default function OrderForm({ deliveryAreas, location }: OrderFormProps) {
  const initialCustomerData: CustomerData = {
    firstName: '',
    lastName: '',
    city: '',
    street: '',
    houseNumber: '',
    apartmentNumber: '',
    phone: '',
    deliveryTime: ''
  };

  const [customerData, setCustomerData] = useState<CustomerData>(initialCustomerData);
  const {
    items: menuItems,
    additionalIngredients,
    loading: menuLoading,
    error: menuError,
  } = useMenuItems(location);

  const {
    selectedItems,
    customizations,
    isSubmitting,
    error,
    success,
    updateQuantity,
    toggleIngredient,
    toggleAdditionalIngredient,
    calculateTotal,
    handleSubmit,
    getPizzaCount,
    resetForm,
    setError,
    setCustomizations,
  } = useOrderForm(menuItems, additionalIngredients, location);

  const pizzaCount = getPizzaCount();
  const { deliveryCost, error: deliveryError } = useDeliveryCost(
    customerData.city || '',
    customerData.street || '',
    pizzaCount
  );

  const CATEGORY_NAMES: Record<string, string> = {
    pizza: 'Pizza',
    fastfood: 'Fast Food',
    napoje: 'Napoje'
  };

  const CATEGORY_ORDER = ['pizza', 'fastfood', 'napoje'];

  const [rodoAccepted, setRodoAccepted] = useState(false);
  const [editingItemId, setEditingItemId] = useState<string | null>(null);
  const [orderLimitReached, setOrderLimitReached] = useState(false);

  useEffect(() => {
    async function checkOrderLimit() {
      try {
        const { count } = await getActiveOrdersCount(location);
        setOrderLimitReached(count >= 10);
      } catch (err) {
        console.error('Error checking order limit:', err);
      }
    }

    checkOrderLimit();
  }, [location]);

  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    const formData = new FormData(e.currentTarget);
    const deliveryTime = formData.get('deliveryTime') as string;
    
    const timeStatus = isDeliveryTimeAvailable(deliveryTime, location);
    if (!timeStatus.available) {
      setError(timeStatus.message || 'Niedostępna godzina dostawy');
      return;
    }

    if (!rodoAccepted) {
      setError('Proszę zaakceptować klauzulę RODO');
      return;
    }
    handleSubmit(customerData, deliveryCost);
  };

  const handleEditIngredients = (_uniqueId: string, instanceId: string) => {
    setEditingItemId(instanceId);
  };

  const handleCloseEdit = () => {
    setEditingItemId(null);
  };

  const handleRemoveItem = (uniqueId: string, instanceId: string) => {
    const currentQuantity = selectedItems[uniqueId] || 0;
    if (currentQuantity > 1) {
      // Jeśli jest więcej niż 1 sztuka, zmniejszamy ilość o 1
      updateQuantity(uniqueId, currentQuantity - 1);
      // Usuwamy customizację dla tej konkretnej instancji
      setCustomizations(prev => prev.filter(c => c.instanceId !== instanceId));
    } else {
      // Jeśli jest tylko 1 sztuka, usuwamy całkowicie
      updateQuantity(uniqueId, 0);
    }
  };

  // Funkcja pomocnicza do tworzenia tablicy pojedynczych produktów
  const getIndividualItems = () => {
    return Object.entries(selectedItems).flatMap(([uniqueId, quantity]) => {
      const item = Object.values(menuItems)
        .flat()
        .find(item => item.uniqueId === uniqueId);
      
      if (!item) return [];
      
      // Tworzymy tablicę z tyloma elementami, ile jest sztuk danego produktu
      return Array(quantity).fill(null).map((_, index) => ({
        ...item,
        quantity: 1,
        instanceId: `${uniqueId}_${index}` // unikalny identyfikator dla każdej sztuki
      }));
    });
  };

  const handleResetForm = async () => {
    try {
      const { count } = await getActiveOrdersCount(location);
      if (count >= 10) {
        setOrderLimitReached(true);
      } else {
        resetForm();
      }
    } catch (err) {
      console.error('Error checking order limit:', err);
      resetForm(); // W razie błędu pozwalamy na reset formularza
    }
  };

  if (success) {
    return (
      <div className="max-w-6xl mx-auto bg-white/90 p-6 rounded-lg shadow-xl text-center">
        <h2 className="text-2xl font-bold text-green-600 mb-4">
          Zamówienie zostało złożone!
        </h2>
        <p className="mb-4">
          Dziękujemy za złożenie zamówienia. Wkrótce się z Tobą skontaktujemy.
        </p>
        <button
          onClick={handleResetForm}
          className="bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-2 px-4 rounded-md transition"
        >
          Złóż kolejne zamówienie
        </button>
      </div>
    );
  }

  if (menuLoading) {
    return (
      <div className="max-w-6xl mx-auto bg-white/90 p-6 rounded-lg shadow-xl text-center">
        <p>Ładowanie menu...</p>
      </div>
    );
  }

  if (menuError) {
    return (
      <div className="max-w-6xl mx-auto bg-white/90 p-6 rounded-lg shadow-xl text-center">
        <p className="text-red-500">{menuError}</p>
      </div>
    );
  }

  const handleCityChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedCity = e.target.value;
    // Szukamy dokładnego dopasowania nazwy miasta i ulicy
    const selectedArea = deliveryAreas.find(area => 
      area.nazwa === selectedCity.split('|')[0] && 
      (!area.ulica || area.ulica === selectedCity.split('|')[1])
    );
    
    setCustomerData(prev => ({
      ...prev,
      city: selectedCity.split('|')[0],
      street: selectedArea?.ulica || ''  // Ustawiamy ulicę tylko jeśli jest przypisana do wybranej miejscowości
    }));
  };

  const handleStreetChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCustomerData(prev => ({
      ...prev,
      street: e.target.value
    }));
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCustomerData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <div className="max-w-6xl mx-auto bg-white/90 p-6 rounded-lg shadow-xl">
      {orderLimitReached ? (
        <div className="text-center p-6">
          <h2 className="text-xl font-semibold text-red-600 mb-4">
            Przepraszamy, w tej chwili nie przyjmujemy nowych zamówień
          </h2>
          <p className="text-gray-700">
            Aktualnie mamy dużo zamówień do realizacji. 
            Prosimy spróbować ponownie za kilka minut.
          </p>
        </div>
      ) : (
        <>
          <SelectedItemsBubbles
            items={getIndividualItems()}
            onEditIngredients={handleEditIngredients}
            onRemoveItem={handleRemoveItem}
          />

          {editingItemId && (
            <IngredientsModal
              item={getIndividualItems().find(item => item.instanceId === editingItemId)!}
              customization={customizations.find(c => c.instanceId === editingItemId) || {
                uniqueId: '',
                instanceId: editingItemId,
                removedIngredients: [],
                addedIngredients: []
              }}
              onClose={handleCloseEdit}
              onToggleIngredient={(uniqueId, ingredient) => 
                toggleIngredient(uniqueId, editingItemId, ingredient)}
              onToggleAdditionalIngredient={(uniqueId, ingredientId) => 
                toggleAdditionalIngredient(uniqueId, editingItemId, ingredientId)}
              additionalIngredients={additionalIngredients}
            />
          )}

          {error && (
            <div className="mb-6 p-4 bg-red-100 border border-red-400 text-red-700 rounded">
              {error}
            </div>
          )}

          <form onSubmit={handleFormSubmit} className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 flex items-center gap-2">
                  <User className="w-4 h-4 text-yellow-600" />
                  Imię *
                </label>
                <input
                  type="text"
                  name="firstName"
                  value={customerData.firstName}
                  onChange={handleInputChange}
                  required
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-yellow-500 focus:ring-yellow-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 flex items-center gap-2">
                  <Users className="w-4 h-4 text-yellow-600" />
                  Nazwisko *
                </label>
                <input
                  type="text"
                  name="lastName"
                  value={customerData.lastName}
                  onChange={handleInputChange}
                  required
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-yellow-500 focus:ring-yellow-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-yellow-600" />
                  Miejscowość *
                </label>
                <select
                  name="city"
                  required
                  value={customerData.city || ''}
                  onChange={handleCityChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-yellow-500 focus:ring-yellow-500"
                >
                  <option value="">Wybierz miejscowość</option>
                  {deliveryAreas.map((area) => (
                    <option 
                      key={area.id} 
                      value={`${area.nazwa}${area.ulica ? `|${area.ulica}` : ''}`}
                    >
                      {area.nazwa}{area.ulica ? ` (ul. ${area.ulica})` : ''}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 flex items-center gap-2">
                  <Home className="w-4 h-4 text-yellow-600" />
                  Ulica
                </label>
                <input
                  type="text"
                  name="street"
                  value={customerData.street}
                  onChange={handleStreetChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-yellow-500 focus:ring-yellow-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 flex items-center gap-2">
                  <Building2 className="w-4 h-4 text-yellow-600" />
                  Numer domu *
                </label>
                <input
                  type="text"
                  name="houseNumber"
                  value={customerData.houseNumber}
                  onChange={handleInputChange}
                  required
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-yellow-500 focus:ring-yellow-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 flex items-center gap-2">
                  <DoorClosed className="w-4 h-4 text-yellow-600" />
                  Numer mieszkania
                </label>
                <input
                  type="text"
                  name="apartmentNumber"
                  value={customerData.apartmentNumber}
                  onChange={handleInputChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-yellow-500 focus:ring-yellow-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 flex items-center gap-2">
                  <Phone className="w-4 h-4 text-yellow-600" />
                  Numer telefonu *
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={customerData.phone}
                  onChange={handleInputChange}
                  required
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-yellow-500 focus:ring-yellow-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 flex items-center gap-2">
                  <Clock className="w-4 h-4 text-yellow-600" />
                  Dostawa na konkretną godzinę
                </label>
                <input
                  type="time"
                  name="deliveryTime"
                  value={customerData.deliveryTime}
                  onChange={handleInputChange}
                  min={`${location === 'miejsce-piastowe' ? '11' : '12'}:00`}
                  max="21:45"
                  step="900" // 15 minut
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-yellow-500 focus:ring-yellow-500"
                />
                <p className="mt-1 text-sm text-gray-500">
                  Godziny dostawy: {location === 'miejsce-piastowe' ? '11:00' : '12:00'} - 22:00
                  {(new Date().getDay() === 0 || new Date().getDay() === 6) && 
                    ' (w weekendy i święta 16:00 - 22:00)'}
                </p>
              </div>
            </div>

            <div className="mt-8">
              <h3 className="text-lg font-semibold mb-4">Menu</h3>
              
              {CATEGORY_ORDER.map(category => 
                menuItems[category] && menuItems[category].length > 0 && (
                  <div key={category} className="mb-8">
                    <h4 className="text-xl font-semibold mb-4 text-yellow-600">
                      {CATEGORY_NAMES[category]}
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {menuItems[category].map((item) => {
                        const quantity = selectedItems[item.uniqueId] || 0;
                        
                        return (
                          <div key={item.uniqueId} className="border rounded-lg p-4">
                            <div className="flex flex-col h-full">
                              <div className="flex justify-between items-start mb-2">
                                <div>
                                  <h4 className="font-medium">{item.nazwa}</h4>
                                  {item.skladniki && (
                                    <p className="text-sm text-gray-600">{item.skladniki}</p>
                                  )}
                                  <p className="text-sm font-semibold mt-1">
                                    {item.cena} zł
                                  </p>
                                </div>

                                <div className="flex items-center space-x-2">
                                  <button
                                    type="button"
                                    onClick={() => updateQuantity(item.uniqueId, quantity - 1)}
                                    className="p-1 bg-gray-200 rounded hover:bg-gray-300"
                                  >
                                    <Minus className="w-4 h-4" />
                                  </button>
                                  <span className="w-8 text-center">{quantity}</span>
                                  <button
                                    type="button"
                                    onClick={() => updateQuantity(item.uniqueId, quantity + 1)}
                                    className="p-1 bg-gray-200 rounded hover:bg-gray-300"
                                  >
                                    <Plus className="w-4 h-4" />
                                  </button>
                                </div>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )
              )}
            </div>

            <div className="mt-8 border-t pt-6">
              {deliveryError ? (
                <div className="text-red-500 mb-4">{deliveryError}</div>
              ) : (
                <div className="flex justify-between items-center mb-4">
                  <span className="font-medium">Koszt dostawy:</span>
                  <span>{deliveryCost === 0 ? 'Gratis!' : `${deliveryCost} zł`}</span>
                </div>
              )}
              <div className="flex justify-between items-center mb-6">
                <span className="font-bold text-lg">Suma:</span>
                <span className="font-bold text-lg">
                  {calculateTotal(deliveryCost)} zł
                </span>
              </div>

              <div className="mb-6">
                <label className="flex items-start gap-2">
                  <input
                    type="checkbox"
                    checked={rodoAccepted}
                    onChange={(e) => setRodoAccepted(e.target.checked)}
                    required
                    className="mt-1 rounded border-gray-300 text-yellow-500 focus:ring-yellow-500"
                  />
                  <span className="text-sm text-gray-600">
                    Akceptuję{' '}
                    <RodoTooltip>
                      <span className="text-yellow-600 hover:text-yellow-700 cursor-help underline">
                        klauzulę RODO
                      </span>
                    </RodoTooltip>
                    {' '}i wyrażam zgodę na przetwarzanie moich danych osobowych w celu realizacji zamówienia *
                  </span>
                </label>
              </div>

              <button
                type="submit"
                disabled={
                  isSubmitting ||
                  !!deliveryError ||
                  Object.keys(selectedItems).length === 0 ||
                  !rodoAccepted ||
                  orderLimitReached
                }
                className="w-full bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-2 px-4 rounded-md transition disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? 'Wysyłanie...' : orderLimitReached ? 'Za dużo zamówień' : 'Złóż zamówienie'}
              </button>
            </div>
          </form>
        </>
      )}
    </div>
  );
}