import React, { useState } from 'react';
import { useMenuItems } from '../hooks/useMenuItems';
import { useDeliveryCost } from '../hooks/useDeliveryCost';
import { useOrderForm } from '../hooks/useOrderForm';
import { Plus, Minus } from 'lucide-react';
import type { CustomerData } from './CustomerDataForm';

interface OrderFormProps {
  deliveryAreas: Array<{ id: number; nazwa: string; ulica: string }>;
}

export default function OrderForm({ deliveryAreas }: OrderFormProps) {
  const [customerData, setCustomerData] = useState<Partial<CustomerData>>({});
  const {
    items: menuItems,
    additionalIngredients,
    loading: menuLoading,
    error: menuError,
  } = useMenuItems();

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
  } = useOrderForm(menuItems, additionalIngredients);

  const pizzaCount = getPizzaCount();
  const { deliveryCost, error: deliveryError } = useDeliveryCost(
    customerData.city || '',
    customerData.street || '',
    pizzaCount
  );

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

  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data: CustomerData = {
      firstName: formData.get('firstName') as string,
      lastName: formData.get('lastName') as string,
      city: formData.get('city') as string,
      street: formData.get('street') as string,
      houseNumber: formData.get('houseNumber') as string,
      apartmentNumber: formData.get('apartmentNumber') as string,
      phone: formData.get('phone') as string,
      deliveryTime: formData.get('deliveryTime') as string,
    };
    handleSubmit(data, deliveryCost);
  };

  const handleCityChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedCity = e.target.value;
    const selectedArea = deliveryAreas.find(area => area.nazwa === selectedCity);
    setCustomerData(prev => ({
      ...prev,
      city: selectedCity,
      street: selectedArea?.ulica || ''
    }));
  };

  const handleStreetChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCustomerData(prev => ({
      ...prev,
      street: e.target.value
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
            <label className="block text-sm font-medium text-gray-700">
              Imię *
            </label>
            <input
              type="text"
              name="firstName"
              required
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-yellow-500 focus:ring-yellow-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Nazwisko *
            </label>
            <input
              type="text"
              name="lastName"
              required
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-yellow-500 focus:ring-yellow-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Miejscowość *
            </label>
            <select
              name="city"
              required
              onChange={handleCityChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-yellow-500 focus:ring-yellow-500"
            >
              <option value="">Wybierz miejscowość</option>
              {deliveryAreas.map((area) => (
                <option key={area.id} value={area.nazwa}>
                  {area.nazwa}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Ulica
            </label>
            <input
              type="text"
              name="street"
              value={customerData.street || ''}
              onChange={handleStreetChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-yellow-500 focus:ring-yellow-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Numer domu *
            </label>
            <input
              type="text"
              name="houseNumber"
              required
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-yellow-500 focus:ring-yellow-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Numer mieszkania
            </label>
            <input
              type="text"
              name="apartmentNumber"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-yellow-500 focus:ring-yellow-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Numer telefonu *
            </label>
            <input
              type="tel"
              name="phone"
              required
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-yellow-500 focus:ring-yellow-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Dostawa na konkretną godzinę
            </label>
            <input
              type="time"
              name="deliveryTime"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-yellow-500 focus:ring-yellow-500"
            />
          </div>
        </div>

        <div className="mt-8">
          <h3 className="text-lg font-semibold mb-4">Menu</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {Object.entries(menuItems).map(([category, items]) =>
              items.map((item) => (
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
                                    checked={customizations
                                      .find((c) => c.uniqueId === item.uniqueId)
                                      ?.removedIngredients.includes(ingredient)}
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
                                  checked={customizations
                                    .find((c) => c.uniqueId === item.uniqueId)
                                    ?.addedIngredients.includes(ingredient.id)}
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
              ))
            )}
          </div>
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

          <button
            type="submit"
            disabled={
              isSubmitting ||
              !!deliveryError ||
              Object.keys(selectedItems).length === 0
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