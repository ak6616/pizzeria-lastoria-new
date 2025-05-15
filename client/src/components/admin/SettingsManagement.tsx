import React, { useState, useEffect } from 'react';
import { useSettings } from '../../hooks/useSettings';
import EditSettingsModal from './EditSettingsModal';
import { Edit2 } from 'lucide-react';
import { Setting } from '../../types';

interface SettingsManagementProps {
  location: string;
}

export default function SettingsManagement({ location }: SettingsManagementProps) {
  const { settings, loading, error, refetch } = useSettings(location);
  const [editingSetting, setEditingSetting] = useState<Setting | null>(null);

  useEffect(() => {
    refetch();
  }, [location, refetch]);

  if (loading) {
    return (
      <div className="text-center py-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900 mx-auto"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-red-500 text-center py-8">
        Wystąpił błąd podczas ładowania ustawień
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold">Ustawienia</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {settings?.map((setting) => (
          <div
            key={setting.id}
            className="border rounded-lg p-4 hover:shadow-md transition flex flex-col justify-between"
          >
            <div>
              <h3 className="font-medium text-lg">{setting.klucz}</h3>
              <p className="mt-2 text-gray-600 whitespace-pre-line">
                {setting.wartosc}
              </p>
            </div>
            <div className="flex justify-end">
              <button
                onClick={() => setEditingSetting(setting)}
                className="p-1 text-blue-500 hover:text-blue-600 transition mt-4"
              >
                <Edit2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {editingSetting && (
        <EditSettingsModal
          setting={editingSetting}
          location={location}
          onClose={() => setEditingSetting(null)}
          onSuccess={async () => {
            setEditingSetting(null);
            await refetch();
          }}
        />
      )}
    </div>
  );
}
