import React, { useEffect, useState } from 'react';
import { useParams, Navigate } from 'react-router-dom';
import MenuSection from '../components/MenuSection';
import { getMenuItems } from '../services/api';

interface MenuItem {
  id: number;
  nazwa: string;
  cena: number;
  skladniki?: string;
}

export default function Menu() {
  const { location } = useParams<{ location: string }>();
  const [pizzaItems, setPizzaItems] = useState<MenuItem[]>([]);
  const [addonsItems, setAddonsItems] = useState<MenuItem[]>([]);
  const [fastfoodItems, setFastfoodItems] = useState<MenuItem[]>([]);
  const [drinksItems, setDrinksItems] = useState<MenuItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  if (!location || !['haczow', 'miejsce-piastowe'].includes(location)) {
    return <Navigate to="/" replace />;
  }

  const locationName = location === 'haczow' ? 'Haczów' : 'Miejsce Piastowe';

  useEffect(() => {
    async function fetchMenuItems() {
      if (location !== 'miejsce-piastowe') {
        setLoading(false);
        return;
      }

      try {
        const pizzaData = await getMenuItems('pizza');
        setPizzaItems(pizzaData);
        const addonsData = await getMenuItems('dodatki');
        setAddonsItems(addonsData);
        const fastfoodData = await getMenuItems('fastfood');
        setFastfoodItems(fastfoodData);
        const drinksData = await getMenuItems('napoje');
        setDrinksItems(drinksData);
      } catch (err) {
        setError('Nie udało się załadować menu. Spróbuj ponownie później.');
      } finally {
        setLoading(false);
      }
    }

    fetchMenuItems();
  }, [location]);

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto bg-white/90 rounded-lg p-8">
        <div className="flex justify-center items-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-yellow-500"></div>
          <span className="ml-2">Ładowanie menu...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-4xl mx-auto bg-white/90 rounded-lg p-8">
        <p className="text-center text-red-500">{error}</p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto bg-white/90 rounded-lg p-8">
      <h1 className="text-3xl font-bold mb-8 text-center">
        Menu - {locationName}
      </h1>

      {location === 'miejsce-piastowe' && pizzaItems.length > 0 && (
        <MenuSection title="Pizza" items={pizzaItems} />
      )}
      {location === 'miejsce-piastowe' && addonsItems.length > 0 && (
        <MenuSection title="Dodatki" items={addonsItems} />
      )}
      {location === 'miejsce-piastowe' && fastfoodItems.length > 0 && (
        <MenuSection title="Fastfood" items={fastfoodItems} />
      )}
      {location === 'miejsce-piastowe' && drinksItems.length > 0 && (
        <MenuSection title="Napoje" items={drinksItems} />
      )}

      {location === 'miejsce-piastowe' && pizzaItems.length === 0 && (
        <p className="text-center text-gray-500">
          Brak dostępnych pozycji w menu.
        </p>
      )}
    </div>
  );
}