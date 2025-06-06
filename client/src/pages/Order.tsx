import { useEffect, useState } from 'react';
import OrderForm from '../components/OrderForm';
import { getDeliveryAreas, getSetting } from '../services/api';
import { MapPin, Home } from 'lucide-react';
import { format } from 'date-fns';
import { pl } from 'date-fns/locale';
import { DeliveryArea } from '../types';
import RegulationsTooltip from "../components/RegulationsTooltip"

const isDeliveryAvailable = async (location: string): Promise<{ available: boolean; message?: string }> => {
  const now = new Date();
  const currentHour = now.getHours();
  const currentMinute = now.getMinutes();
  const isWeekend = now.getDay() === 0 || now.getDay() === 6;
  
  try {
    // const openWeekdayHourResponse = await getSetting(location, 2);
    // const closeWeekdayHourResponse = await getSetting(location, 3);
    // const openWeekendHourResponse = await getSetting(location, 4);
    // const closeWeekendHourResponse = await getSetting(location, 5);
    const orderingStatusResponse = await getSetting(location, 1);
    const startOrderingWeekdayResponse = await getSetting(location, 7);
    const startOrderingWeekendResponse = await getSetting(location, 9);
    const stopOrderingWeekdayResponse = await getSetting(location, 8);
    const stopOrderingWeekendResponse = await getSetting(location, 10);

    // const [openWeekdayHour, openWeekdayMinute] = openWeekdayHourResponse.wartosc.split(':').map(Number);
    // const [closeWeekdayHour, closeWeekdayMinute] = closeWeekdayHourResponse.wartosc.split(':').map(Number);
    // const [openWeekendHour, openWeekendMinute] = openWeekendHourResponse.wartosc.split(':').map(Number);
    // const [closeWeekendHour, closeWeekendMinute] = closeWeekendHourResponse.wartosc.split(':').map(Number);
    const [startOrderingWeekendHour, startOrderingWeekendMinute] = startOrderingWeekendResponse.wartosc.split(':').map(Number);
    const [stopOrderingWeekendHour, stopOrderingWeekendMinute] = stopOrderingWeekendResponse.wartosc.split(':').map(Number);
    const [startOrderingWeekdayHour, startOrderingWeekdayMinute] = startOrderingWeekdayResponse.wartosc.split(':').map(Number);
    const [stopOrderingWeekdayHour, stopOrderingWeekdayMinute] = stopOrderingWeekdayResponse.wartosc.split(':').map(Number);

    
    const orderingStatus = orderingStatusResponse.wartosc === 'true';

    // Lista świąt w formacie MM-DD
    const holidays = ['05-01']; // Dodaj tutaj inne święta
    const today = `${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}`;
    const isHoliday = holidays.includes(today);

    if (!orderingStatus) {
      return {
        available: false,
        message: 'Przepraszamy, aktualnie nie przyjmujemy zamówień.'
      };
    }

    // Wspólne godziny dla weekendów i świąt
    if (isWeekend || isHoliday) {
      if (
        currentHour < startOrderingWeekendHour ||
        (currentHour === startOrderingWeekendHour && currentMinute < startOrderingWeekendMinute) ||
        currentHour > stopOrderingWeekendHour ||
        (currentHour === stopOrderingWeekendHour && currentMinute >= stopOrderingWeekendMinute)
      ) {
        return {
          available: false,
          message: `Dostawa w weekendy i święta dostępna w godzinach ${startOrderingWeekendHour}:${String(startOrderingWeekendMinute).padStart(2, '0')} - ${stopOrderingWeekendHour}:${String(stopOrderingWeekendMinute).padStart(2, '0')}. 
                   Zapraszamy ${format(now, 'EEEE', { locale: pl })} od ${startOrderingWeekendHour}:${String(startOrderingWeekendMinute).padStart(2, '0')}.`
        };
      }
      return { available: true };
    }

    // Godziny w dni powszednie
    if (
      currentHour < startOrderingWeekdayHour ||
      (currentHour === startOrderingWeekdayHour && currentMinute < startOrderingWeekdayMinute) ||
      currentHour > stopOrderingWeekdayHour ||
      (currentHour === stopOrderingWeekdayHour && currentMinute >= stopOrderingWeekdayMinute)
    ) {
      return {
        available: false,
        message: `Dostawa w dni powszednie dostępna w godzinach ${startOrderingWeekdayHour}:${String(startOrderingWeekdayMinute).padStart(2, '0')} - ${stopOrderingWeekdayHour}:${String(stopOrderingWeekdayMinute).padStart(2, '0')}`
      };
    }

    return { available: true };
  } catch (error) {
    console.error('Błąd podczas sprawdzania dostępności dostawy:', error);
    return {
      available: false,
      message: 'Wystąpił błąd podczas sprawdzania dostępności dostawy.'
    };
  }
};

type OrderType = 'delivery' | 'pickup' | null;

export default function Order() {
  const [selectedLocation, setSelectedLocation] = useState<string>('');
  const [deliveryAreas, setDeliveryAreas] = useState<DeliveryArea[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [orderType, setOrderType] = useState<OrderType>(null);

  const filteredAreas = new Map<string, Set<string | null>>();
  const [openCity, setOpenCity] = useState<string | null>(null);
  const [deliveryStatus, setDeliveryStatus] = useState<{ available: boolean; message?: string } | null>(null);
  
      useEffect(() => {
        async function checkDeliveryStatus() {
          const status = await isDeliveryAvailable(selectedLocation);
          setDeliveryStatus(status);
        }
        checkDeliveryStatus();
      }, [selectedLocation]);

const handleToggle = (city: string) => {
  setOpenCity(openCity === city ? null : city);
};

deliveryAreas.forEach((area) => {
  if (!filteredAreas.has(area.nazwa)) {
    filteredAreas.set(area.nazwa, new Set());
  }

  if (area.ulica === null) {
    // Jeśli istnieje wersja bez ulicy, usuwamy ulice i zapisujemy "cały obszar"
    filteredAreas.set(area.nazwa, new Set(["Cały Obszar"]));
  } else if (!filteredAreas.get(area.nazwa)?.has("Cały Obszar")) {
    // Jeśli nie znaleziono jeszcze "całego obszaru", dodajemy ulicę
    filteredAreas.get(area.nazwa)?.add(area.ulica);
  }
});

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
    // { id: 'haczow', name: 'Haczów' }
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
            <div className="grid grid-cols-1 md:grid-cols-1 gap-4">
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
      
  
      if (deliveryStatus && !deliveryStatus.available) {
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
            {Array.from(filteredAreas.entries()).map(([nazwa, ulice]) => (
              <div key={nazwa} className="flex flex-col">
              <div
                className="flex items-center gap-2 cursor-pointer"
                onClick={() => handleToggle(nazwa)}
                onMouseEnter={() => handleToggle(nazwa)}
              >
                <MapPin className="w-4 h-4 text-yellow-600" />
                <span className="font-medium">{nazwa}</span>
              </div>
          
              {openCity === nazwa && (
                <div className="ml-4 mt-1 border-l-2 border-gray-300 pl-2">
                  {Array.from(ulice).map((ulica, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <Home className="w-4 h-4 text-gray-500" />
                      <span className="text-sm text-gray-600">
                        {ulica === "Cały Obszar" ? ulica : `ul. ${ulica}`}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
          </div>
        </div>

        <div className="bg-white/90 rounded-lg p-6 mb-8">
          <h2 className="text-xl font-semibold mb-4">Wybierz typ zamówienia:</h2>
          <span className="text-mid text-gray-600">
                              Składając zamówienie akceptujesz{' '}
                              <RegulationsTooltip>
                                <span 
                                  
                                >
                                  regulamin
                                </span>
                              </RegulationsTooltip>
                              {' '}płatności internetowych *
                            </span>
          <div className="flex gap-4">
            <button
              onClick={() => setOrderType('delivery')}
              className={`flex-1 py-3 px-6 rounded-lg transition ${
                orderType === 'delivery'
                  ? 'bg-yellow-500 text-white'
                  : 'bg-gray-200 hover:bg-gray-300'
              }`}
            >
              Dostawa
            </button>
            <button
              onClick={() => setOrderType('pickup')}
              className={`flex-1 py-3 px-6 rounded-lg transition ${
                orderType === 'pickup'
                  ? 'bg-yellow-500 text-white'
                  : 'bg-gray-200 hover:bg-gray-300'
              }`}
            >
              Odbiór osobisty
            </button>
          </div>
        </div>

        {orderType && (
          <OrderForm 
            deliveryAreas={deliveryAreas} 
            location={selectedLocation}
            orderType={orderType}
          />
        )}
      </div>
    );
  }

  return null;
}
