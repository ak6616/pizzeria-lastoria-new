import { useState, useEffect } from 'react';
import OrdersManagement from './admin/OrdersManagement';
import MenuManagement from './admin/MenuManagement';
import DeliveryManagement from './admin/DeliveryManagement';
import NewsManagement from './admin/NewsManagement';
import GalleryManagement from './admin/GalleryManagement';
import SettingsManagement from './admin/SettingsManagement';
import LoginForm from './admin/LoginForm';
import { useAuth } from '../hooks/useAuth';

export default function AdminPanel() {
  const [selectedLocation, setSelectedLocation] = useState<string>('');
  const [selectedSection, setSelectedSection] = useState<string>('');
  const { isAuthenticated, isLoading, login } = useAuth();

  const locations = [
    { id: 'miejsce-piastowe', name: 'Miejsce Piastowe' },
    { id: 'haczow', name: 'Haczów' }
  ];

  if (isLoading) {
    return (
      <div className="max-w-4xl mx-auto p-6 text-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900 mx-auto"></div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="max-w-4xl mx-auto p-6">
        <LoginForm onLogin={login} />
      </div>
    );
  }

  if (!selectedLocation) {
    return (
      <div className="max-w-4xl mx-auto p-6">
        <h1 className="text-3xl font-bold mb-8 text-center text-white">
          Panel Administratora
        </h1>
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
    );
  }

  return (
    <div className="max-w-7xl mx-auto p-6">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-white">
          Panel Administratora - {locations.find(l => l.id === selectedLocation)?.name}
        </h1>
        <button
          onClick={() => setSelectedLocation('')}
          className="text-white hover:text-yellow-500 transition"
        >
          Zmień lokalizację
        </button>
      </div>

      <div className="bg-white/90 rounded-lg p-6">
        <div className="flex flex-wrap gap-4 mb-8">
          <button
            onClick={() => setSelectedSection('orders')}
            className={`px-4 py-2 rounded-md transition ${
              selectedSection === 'orders'
                ? 'bg-yellow-500 text-white'
                : 'bg-gray-200 hover:bg-gray-300'
            }`}
          >
            Zamówienia
          </button>
          <button
            onClick={() => setSelectedSection('menu')}
            className={`px-4 py-2 rounded-md transition ${
              selectedSection === 'menu'
                ? 'bg-yellow-500 text-white'
                : 'bg-gray-200 hover:bg-gray-300'
            }`}
          >
            Menu
          </button>
          <button
            onClick={() => setSelectedSection('delivery')}
            className={`px-4 py-2 rounded-md transition ${
              selectedSection === 'delivery'
                ? 'bg-yellow-500 text-white'
                : 'bg-gray-200 hover:bg-gray-300'
            }`}
          >
            Obszary dostawy
          </button>
          <button
            onClick={() => setSelectedSection('news')}
            className={`px-4 py-2 rounded-md transition ${
              selectedSection === 'news'
                ? 'bg-yellow-500 text-white'
                : 'bg-gray-200 hover:bg-gray-300'
            }`}
          >
            Aktualności
          </button>
          <button
            onClick={() => setSelectedSection('gallery')}
            className={`px-4 py-2 rounded-md transition ${
              selectedSection === 'gallery'
                ? 'bg-yellow-500 text-white'
                : 'bg-gray-200 hover:bg-gray-300'
            }`}
          >
            Galeria
          </button>
          <button
            onClick={() => setSelectedSection('settings')}
            className={`px-4 py-2 rounded-md transition ${
              selectedSection === 'settings'
                ? 'bg-yellow-500 text-white'
                : 'bg-gray-200 hover:bg-gray-300'
            }`}
          >
            Ustawienia
          </button>
        </div>

        {selectedSection === 'orders' && <OrdersManagement location={selectedLocation} />}
        {selectedSection === 'menu' && <MenuManagement location={selectedLocation} />}
        {selectedSection === 'delivery' && <DeliveryManagement location={selectedLocation} />}
        {selectedSection === 'news' && <NewsManagement />}
        {selectedSection === 'gallery' && <GalleryManagement />}
        {selectedSection === 'settings' && <SettingsManagement location={selectedLocation} />}
      </div>
    </div>
  );
}