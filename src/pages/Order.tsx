import React, { useEffect, useState } from 'react';
import OrderForm from '../components/OrderForm';
import { getDeliveryAreas } from '../services/api';
import { MapPin, Home } from 'lucide-react';
import { format } from 'date-fns';
import { pl } from 'date-fns/locale';

interface DeliveryArea {
  id: number;
  nazwa: string;
  ulica: string;
}

const isDeliveryAvailable = (location: string): { available: boolean; message?: string } => {
  const now = new Date();
  const currentHour = now.getHours();
  const isWeekend = now.getDay() === 0 || now.getDay() === 6;
  const isHoliday = false; // TODO: Dodać sprawdzanie świąt

  // Wspólne godziny dla weekendów i świąt
  if (isWeekend || isHoliday) {
    if (currentHour < 16 || currentHour >= 22) {
      return {
        available: false,
        message: `Dostawa w weekendy i święta dostępna w godzinach 16:00 - 22:00. 
                 Zapraszamy ${format(now, 'EEEE', { locale: pl })} od 16:00.`
      };
    }
    return { available: true };
  }

  // Godziny w dni powszednie
  if (location === 'miejsce-piastowe') {
    if (currentHour < 11 || currentHour >= 22) {
      return {
        available: false,
        message: 'Dostawa w dni powszednie dostępna w godzinach 11:00 - 22:00'
      };
    }
  } else if (location === 'haczow') {
    if (currentHour < 12 || currentHour >= 22) {
      return {
        available: false,
        message: 'Dostawa w dni powszednie dostępna w godzinach 12:00 - 22:00'
      };
    }
  }

  return { available: true };
};

export default function Order() {
  const [selectedLocation, setSelectedLocation] = useState<string>('');
  const [deliveryAreas, setDeliveryAreas] = useState<DeliveryArea[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchDeliveryAreas() {
      if (!selectedLocation) return;
      
      try {
        const areas = await getDeliveryAreas(selectedLocation);
        setDeliveryAreas(areas);
      } catch (err) {
        setError('Nie udało się załadować listy obszarów dostawy');
      } finally {
        setLoading(false);
      }
    }

    if (selectedLocation) {
      fetchDeliveryAreas();
    }
  }, [selectedLocation]);

  const locations = [
    { id: 'miejsce-piastowe', name: 'Miejsce Piastowe' },
    { id: 'haczow', name: 'Haczów' }
  ];

  if (!selectedLocation) {
    return (
      <div className="pt-20">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold mb-8 text-center text-white">
            Zamów online
          </h1>
          
          <div className="bg-white/90 rounded-lg p-6 mb-6">
            <h2 className="text-xl font-semibold mb-4">Godziny dowozu:</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-semibold text-lg mb-2">Miejsce Piastowe</h3>
                <p className="text-gray-700">
                  Poniedziałek - Piątek: 11:00 - 22:00<br />
                  Soboty, Niedziele, Święta: 16:00 - 22:00
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-lg mb-2">Haczów</h3>
                <p className="text-gray-700">
                  Poniedziałek - Piątek: 12:00 - 22:00<br />
                  Soboty, Niedziele, Święta: 16:00 - 22:00
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white/90 rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-4">Wybierz lokalizację:</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {locations.map(location => (
                <button
                  key={location.id}
                  onClick={() => setSelectedLocation(location.id)}
                  className="p-4 bg-yellow-500 hover:bg-yellow-600 text-white font-bold rounded-md transition"
                >
                  {location.name}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto text-center text-white">
        <p>Ładowanie...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-4xl mx-auto text-center text-white">
        <p className="text-red-400">{error}</p>
      </div>
    );
  }

  if (selectedLocation) {
    const deliveryStatus = isDeliveryAvailable(selectedLocation);
    
    if (!deliveryStatus.available) {
      return (
        <div className="max-w-4xl mx-auto">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold text-white">
              Zamów online - {locations.find(l => l.id === selectedLocation)?.name}
            </h1>
            <button
              onClick={() => setSelectedLocation('')}
              className="text-white hover:text-yellow-500 transition"
            >
              Zmień lokalizację
            </button>
          </div>

          <div className="bg-white/90 rounded-lg p-6 text-center">
            <h2 className="text-xl font-semibold mb-4 text-red-600">
              Przepraszamy, dostawa jest obecnie niedostępna
            </h2>
            <p className="text-gray-700 mb-4">{deliveryStatus.message}</p>
            <div className="mt-6">
              <h3 className="font-semibold mb-2">Godziny dowozu:</h3>
              <p className="text-gray-700">
                Poniedziałek - Piątek: {selectedLocation === 'miejsce-piastowe' ? '11:00' : '12:00'} - 22:00<br />
                Soboty, Niedziele, Święta: 16:00 - 22:00
              </p>
            </div>
          </div>
        </div>
      );
    }

    return (
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-white">
            Zamów online - {locations.find(l => l.id === selectedLocation)?.name}
          </h1>
          <button
            onClick={() => setSelectedLocation('')}
            className="text-white hover:text-yellow-500 transition"
          >
            Zmień lokalizację
          </button>
        </div>

        <div className="bg-white/90 rounded-lg p-6 mb-8">
          <h2 className="text-xl font-semibold mb-4">Dowozimy do:</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {deliveryAreas.map((area) => (
              <div key={area.id} className="flex flex-col">
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-yellow-600" />
                  <span className="font-medium">{area.nazwa}</span>
                </div>
                {area.ulica && (
                  <div className="flex items-center gap-2 ml-4 mt-1">
                    <Home className="w-4 h-4 text-gray-500" />
                    <span className="text-sm text-gray-600">
                      ul. {area.ulica}
                    </span>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        <OrderForm 
          deliveryAreas={deliveryAreas} 
          location={selectedLocation}
        />
      </div>
    );
  }

  return null;
}
