
import { useParams, Navigate } from 'react-router-dom';
import MenuSection from '../../../client/src/components/MenuSection';
import { useMenuItems } from '../../../server/hooks/useMenuItems';

export default function Menu() {
  const { location } = useParams<{ location: string }>();
  const {
    items: menuItems,
    loading,
    error
  } = useMenuItems(location);

  if (!location || !['haczow', 'miejsce-piastowe'].includes(location)) {
    return <Navigate to="/" replace />;
  }

  const locationName = location === 'haczow' ? 'Haczów' : 'Miejsce Piastowe';

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

      {menuItems.pizza.length > 0 && (
        <MenuSection title="Pizza" items={menuItems.pizza} />
      )}
      {menuItems.dodatki.length > 0 && (
        <MenuSection title="Dodatki" items={menuItems.dodatki} />
      )}
      {menuItems.fastfood.length > 0 && (
        <MenuSection title="Fastfood" items={menuItems.fastfood} />
      )}
      {menuItems.napoje.length > 0 && (
        <MenuSection title="Napoje" items={menuItems.napoje} />
      )}

      {Object.values(menuItems).every(items => items.length === 0) && (
        <p className="text-center text-gray-500">
          Brak dostępnych pozycji w menu.
        </p>
      )}
    </div>
  );
}