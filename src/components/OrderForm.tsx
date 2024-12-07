import React, { useState } from 'react';
import { useMenuItems } from '../hooks/useMenuItems';
import { useDeliveryCost } from '../hooks/useDeliveryCost';
import { useOrderForm } from '../hooks/useOrderForm';
import { Plus, Minus, User, Users, MapPin, Home, Building2, DoorClosed, Phone, Clock } from 'lucide-react';
import type { CustomerData } from '../types';
import RodoTooltip from './RodoTooltip';

interface OrderFormProps {
  deliveryAreas: Array<{ id: number; nazwa: string; ulica: string }>;
  location: string;
}

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

  const getCustomization = (uniqueId: string) => {
    return customizations.find(c => c.uniqueId === uniqueId) || {
      uniqueId,
      removedIngredients: [],
      addedIngredients: []
    };
  };

  const [rodoAccepted, setRodoAccepted] = useState(false);

  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!rodoAccepted) {
      setError('Proszę zaakceptować klauzulę RODO');
      return;
    }
    handleSubmit(customerData, deliveryCost);
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
          onClick={resetForm}
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
    const selectedValue = e.target.value;
    const [city, street] = selectedValue.split('|');
    
    setCustomerData(prev => ({
      ...prev,
      city,
      street: street || ''
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
              value={`${customerData.city || ''}${customerData.street ? `|${customerData.street}` : ''}`}
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
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-yellow-500 focus:ring-yellow-500"
            />
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
                  {menuItems[category].map((item) => (
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
                              onClick={() =>
                                updateQuantity(
                                  item.uniqueId,
                                  (selectedItems[item.uniqueId] || 0) - 1
                                )
                              }
                              className="p-1 bg-gray-200 rounded hover:bg-gray-300"
                            >
                              <Minus className="w-4 h-4" />
                            </button>
                            <span className="w-8 text-center">
                              {selectedItems[item.uniqueId] || 0}
                            </span>
                            <button
                              type="button"
                              onClick={() =>
                                updateQuantity(
                                  item.uniqueId,
                                  (selectedItems[item.uniqueId] || 0) + 1
                                )
                              }
                              className="p-1 bg-gray-200 rounded hover:bg-gray-300"
                            >
                              <Plus className="w-4 h-4" />
                            </button>
                          </div>
                        </div>

                        {category === 'pizza' && selectedItems[item.uniqueId] > 0 && (
                          <div className="mt-4 space-y-4">
                            {item.skladniki && (
                              <div>
                                <p className="text-sm font-medium mb-2">
                                  Składniki do usunięcia:
                                </p>
                                <div className="flex flex-wrap gap-2">
                                  {item.skladniki.split(', ').map((ingredient) => (
                                    <label
                                      key={ingredient}
                                      className="inline-flex items-center"
                                    >
                                      <input
                                        type="checkbox"
                                        checked={getCustomization(item.uniqueId)
                                          .removedIngredients.includes(ingredient)}
                                        onChange={() =>
                                          toggleIngredient(item.uniqueId, ingredient)
                                        }
                                        className="rounded border-gray-300 text-yellow-500 focus:ring-yellow-500"
                                      />
                                      <span className="ml-2 text-sm">{ingredient}</span>
                                    </label>
                                  ))}
                                </div>
                              </div>
                            )}

                            <div>
                              <p className="text-sm font-medium mb-2">
                                Dodatkowe składniki:
                              </p>
                              <div className="flex flex-wrap gap-2">
                                {additionalIngredients.map((ingredient) => (
                                  <label
                                    key={ingredient.id}
                                    className="inline-flex items-center"
                                  >
                                    <input
                                      type="checkbox"
                                      checked={getCustomization(item.uniqueId)
                                        .addedIngredients.includes(ingredient.id)}
                                      onChange={() =>
                                        toggleAdditionalIngredient(
                                          item.uniqueId,
                                          ingredient.id
                                        )
                                      }
                                      className="rounded border-gray-300 text-yellow-500 focus:ring-yellow-500"
                                    />
                                    <span className="ml-2 text-sm">
                                      {ingredient.nazwa} (+{ingredient.cena} zł)
                                    </span>
                                  </label>
                                ))}
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
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
              !rodoAccepted
            }
            className="w-full bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-2 px-4 rounded-md transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? 'Wysyłanie...' : 'Złóż zamówienie'}
          </button>
        </div>
      </form>
    </div>
  );
}