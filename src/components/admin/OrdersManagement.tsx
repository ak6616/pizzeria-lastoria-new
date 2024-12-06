import React from 'react';
import { Trash2 } from 'lucide-react';
import { useOrders } from '../../hooks/useOrders';
import { deleteOrder } from '../../services/api';
import { format } from 'date-fns';
import { pl } from 'date-fns/locale';

interface OrderItem {
  name: string;
  quantity: number;
  removedIngredients?: string[];
  addedIngredients?: Array<{
    name: string;
  }>;
}

export default function OrdersManagement() {
  const { orders, loading, error, refetch } = useOrders();

  const handleDelete = async (id: number) => {
    if (window.confirm('Czy na pewno chcesz usunąć to zamówienie?')) {
      try {
        await deleteOrder(id);
        await refetch();
      } catch (err) {
        console.error('Error deleting order:', err);
        alert('Wystąpił błąd podczas usuwania zamówienia');
      }
    }
  };

  const parseOrderItems = (itemsString: string): OrderItem[] => {
    try {
      return JSON.parse(itemsString);
    } catch (e) {
      console.error('Error parsing order items:', e);
      return [];
    }
  };

  const formatOrderItems = (items: OrderItem[]) => {
    return items.map((item) => (
      <div key={`${item.name}-${item.quantity}`} className="mb-2">
        <div className="flex items-baseline gap-2">
          <span className="font-medium">{item.name}</span>
          <span className="text-sm text-gray-600">x{item.quantity}</span>
        </div>
        {(item.removedIngredients?.length ?? 0) > 0 && (
          <div className="text-sm text-red-600 ml-4">
            Usunięte: {item.removedIngredients?.join(', ')}
          </div>
        )}
        {(item.addedIngredients?.length ?? 0) > 0 && (
          <div className="text-sm text-green-600 ml-4">
            Dodane: {item.addedIngredients?.map(i => i.name).join(', ')}
          </div>
        )}
      </div>
    ));
  };

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
        Wystąpił błąd podczas ładowania listy zamówień
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Zamówienia</h2>
      </div>

      <div className="space-y-4">
        {orders.map((order) => (
          <div
            key={order.id}
            className="border rounded-lg p-4 hover:shadow-md transition"
          >
            <div className="flex justify-between items-start">
              <div className="flex-1">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="font-medium text-lg">
                      {order.imie} {order.nazwisko}
                    </h3>
                    <time className="text-sm text-gray-500 block">
                      {format(new Date(order.dataGodzinaZamowienia), 'dd.MM.yyyy HH:mm', { locale: pl })}
                    </time>
                  </div>
                  <div className="text-right">
                    <div className="font-medium">Suma: {order.suma} zł</div>
                    {order.zamowienieNaGodzine && (
                      <div className="text-sm text-gray-600">
                        Na godzinę: {order.zamowienieNaGodzine}
                      </div>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div>
                    <div className="text-sm text-gray-600">Adres dostawy:</div>
                    <div>
                      {order.miejscowosc}
                      {order.ulica && <span>, ul. {order.ulica}</span>}
                      {order.numerDomu && <span> {order.numerDomu}</span>}
                      {order.numerMieszkania && <span>/{order.numerMieszkania}</span>}
                    </div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-600">Telefon:</div>
                    <div>{order.numerTelefonu}</div>
                  </div>
                </div>

                <div className="bg-gray-50 p-3 rounded-lg">
                  <div className="text-sm text-gray-600 mb-2">Zamówione produkty:</div>
                  {formatOrderItems(parseOrderItems(order.zamowioneProdukty))}
                </div>
              </div>

              <button
                onClick={() => handleDelete(order.id)}
                className="ml-4 p-2 text-red-500 hover:text-red-600 transition"
              >
                <Trash2 className="w-5 h-5" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}