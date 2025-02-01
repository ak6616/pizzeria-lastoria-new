import React from 'react';

export interface CustomerData {
  firstName: string;
  lastName: string;
  city: string;
  street: string;
  houseNumber: string;
  apartmentNumber: string;
  phone: string;
  deliveryTime: string;
}

interface CustomerDataFormProps {
  deliveryAreas: Array<{ id: number; nazwa: string; ulica: string }>;
  onSubmit: (data: CustomerData) => void;
  isSubmitting: boolean;
  selectedItems: Record<string, number>;
  deliveryCost: number | null;
  deliveryError: string | null;
  totalPrice: number;
}

export default function CustomerDataForm({
  deliveryAreas,
  onSubmit,
  isSubmitting,
  selectedItems,
  deliveryCost,
  deliveryError,
  totalPrice,
}: CustomerDataFormProps) {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const customerData: CustomerData = {
      firstName: formData.get('firstName') as string,
      lastName: formData.get('lastName') as string,
      city: formData.get('city') as string,
      street: formData.get('street') as string,
      houseNumber: formData.get('houseNumber') as string,
      apartmentNumber: formData.get('apartmentNumber') as string,
      phone: formData.get('phone') as string,
      deliveryTime: formData.get('deliveryTime') as string,
    };
    onSubmit(customerData);
  };

  const handleCityChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedCity = e.target.value;
    const selectedArea = deliveryAreas.find(area => area.nazwa === selectedCity);
    
    if (selectedArea?.ulica) {
      const streetInput = document.querySelector('input[name="street"]') as HTMLInputElement;
      if (streetInput) {
        streetInput.value = selectedArea.ulica;
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
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

      <div className="border-t pt-4">
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
          <span className="font-bold text-lg">{totalPrice} zł</span>
        </div>

        <button
          type="submit"
          disabled={isSubmitting || !!deliveryError || Object.keys(selectedItems).length === 0}
          className="w-full bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-2 px-4 rounded-md transition disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSubmitting ? 'Wysyłanie...' : 'Złóż zamówienie'}
        </button>
      </div>
    </form>
  );
}