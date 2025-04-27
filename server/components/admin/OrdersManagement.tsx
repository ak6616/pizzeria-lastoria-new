import { Trash2 } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useOrders } from '../../hooks/useOrders';
import { deleteOrder, deleteAllOrders, updateOrderingStatus, getOrderingStatus } from '../../services/api';
import { format, isValid, parseISO } from 'date-fns';
import { pl } from 'date-fns/locale';
import React from 'react';
import { OrdersManagementProps, Order, OrderItem, TimerProps } from '../../types';



const formatOrderType = (type: 'delivery' | 'pickup') => {
  return type === 'delivery' ? 'Dostawa' : 'Odbiór osobisty';
};


export default function OrdersManagement({ location }: OrdersManagementProps) {
  const { orders, loading, error, refetch } = useOrders(location) as { 
    orders: Order[],
    loading: boolean,
    error: string | null,
    refetch: () => Promise<void>
  };
  const [time, setTime] = useState<number>(30);
  const [orderingStatus, setOrderingStatus] = useState<boolean>();
  

  useEffect(() => {
    const timer = setInterval(() => {
      setTime((prevTime) => {
        if (prevTime > 0) {
          return prevTime - 1;
        } else {
          refetch();
          return 30;
        }
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [refetch]);

  useEffect(() => {
    const fetchOrderingStatus = async () => {
      try {
        const status = await getOrderingStatus();
        setOrderingStatus(status.orderingStatus);
        console.log('Status zamówień odświeżony:', status.orderingStatus);
      } catch (error) {
        console.error('Error fetching ordering status:', error);
      }
    };

    fetchOrderingStatus();

    const interval = setInterval(fetchOrderingStatus, 30000);

    return () => clearInterval(interval);
  }, []);

  const handleDelete = async (id: number) => {
    if (window.confirm('Czy na pewno chcesz usunąć to zamówienie?')) {
      try {
        await deleteOrder(id, location);
        await refetch();
      } catch (err) {
        console.error('Error deleting order:', err);
        alert('Wystąpił błąd podczas usuwania zamówienia');
      }
    }
  };

  const handleDeleteAll = async () => {
    if (window.confirm('Czy na pewno chcesz usunąć wszystkie zamówienia?')) {
      try {
        await deleteAllOrders(location);
        await refetch();
      } catch (err) {
        console.error('Error deleting orders:', err);
        alert('Wystąpił błąd podczas usuwania zamówień');
      }
    }
  };

  const handleToggleOrderingStatus = async () => {
    try {
      const newStatus = !orderingStatus;
      await updateOrderingStatus(newStatus);
      setOrderingStatus(newStatus);
      console.log('Status zamawiania zaktualizowany:', newStatus);
      
      const updatedStatus = await getOrderingStatus();
      setOrderingStatus(updatedStatus.orderingStatus);
    } catch (error) {
      console.error('Error updating ordering status:', error);
      alert('Wystąpił błąd podczas aktualizacji statusu zamówień');
    }
  };

  const parseOrderItems = (itemsString: string): OrderItem[] => {
    if (!itemsString) {
      console.warn('Otrzymano pusty string z zamówionymi produktami');
      return [];
    }

    try {
      // Próba sparsowania JSON
      const items = JSON.parse(itemsString);
      
      // Sprawdzenie czy sparsowane dane są tablicą
      if (!Array.isArray(items)) {
        console.error('Sparsowane dane nie są tablicą:', items);
        return [];
      }

      // Walidacja i mapowanie każdego elementu
      return items.map(item => ({
        uniqueId: String(item.uniqueId || ''),
        id: Number(item.id || 0),
        category: String(item.category || ''),
        name: String(item.name),
        quantity: Number(item.quantity),
        price: Number(item.price),
        doughType: String(item.doughType),
        removedIngredients: Array.isArray(item.removedIngredients) ? item.removedIngredients : [],
        addedIngredients: Array.isArray(item.addedIngredients) ? item.addedIngredients : []
      }));

    } catch (e) {
      console.error('Błąd podczas parsowania zamówionych produktów:', e);
      console.error('Problematyczny string:', itemsString);
      return [];
    }
  };

  const formatOrderItems = (items: OrderItem[], orderId: number) => {
    return items.map((item, index) => (
      <div 
        key={`order-${orderId}-item-${index}`} 
        className="mb-4 border-b pb-2 last:border-b-0"
      >
        <div className="flex justify-between items-start">
          <div>
            <div className="font-medium">{item.name}</div>
            <div className="text-sm text-gray-600">Rodzaj ciasta: {item.doughType }</div>
            <div className="text-sm text-gray-600 mt-1">
              Ilość: {item.quantity} x {item.price.toFixed(2)} zł = {(item.quantity * item.price).toFixed(2)} zł
            </div>
            {item.removedIngredients && item.removedIngredients.length > 0 && (
              <div className="text-sm text-red-500 mt-1">
                <span className="font-medium">Składniki usunięte:</span> {item.removedIngredients.join(', ')}
              </div>
            )}
            {item.addedIngredients && item.addedIngredients.length > 0 && (
              <div className="text-sm text-green-500 mt-1">
                <span className="font-medium">Składniki dodane:</span>{' '}
                {item.addedIngredients.map(ing => (
                  `${ing.name} (+${ing.price.toFixed(2)} zł)`
                )).join(', ')}
              </div>
            )}
          </div>
          <div className="text-right font-medium">
            {(
              item.quantity * item.price + 
              (item.addedIngredients?.reduce((sum, ing) => sum + ing.price * item.quantity, 0) || 0)
            ).toFixed(2)} zł
          </div>
        </div>
      </div>
    ));
  };

  const formatDate = (dateString: string) => {
    try {
      const date = dateString;
      // if (!isValid(date)) {
      //   console.error('Nieprawidłowa data:', dateString);
      //   return 'Nieprawidłowa data';
      // }
      return date;
    } catch (error) {
      console.error('Błąd podczas formatowania daty:', error);
      return 'Błąd formatu daty';
    }
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
        <div className="flex items-center space-x-4">
          <div>
            Status zamówień:{' '}
            <span className={orderingStatus ? 'text-green-500' : 'text-red-500'}>
              {orderingStatus ? 'Włączone' : 'Wyłączone'}
            </span>
          </div>
          <button
            onClick={handleToggleOrderingStatus}
            className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded"
          >
            {orderingStatus ? 'Wyłącz zamówienia' : 'Włącz zamówienia'}
          </button>
          <button
            onClick={() => handleDeleteAll()}
            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded items-center"
          >
            Usuń wszystkie zamówienia
            <Trash2 className="w-5 h-5" />
          </button>
        </div>
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
                      {formatDate(order.dataGodzinaZamowienia)}
                    </time>
                    <span className="inline-block mt-1 px-2 py-1 bg-yellow-100 text-yellow-800 text-sm rounded">
                      {formatOrderType(order.typ)}
                    </span>
                  </div>
                  <div className="text-right">
                    <div className="font-medium">Suma: {order.suma} zł</div>
                    {order.zamowienieNaGodzine && (
                      <div className="text-mid font-bold text-red-600">
                        Na godzinę: {order.zamowienieNaGodzine}
                      </div>
                    )}
                    {/* <div className="text-mid font-bold text-lightblue-600">
                        Status transakcji: {order.statusTransakcji}
                      </div> */}
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
                  <div>
                    <div className="text-sm text-gray-600">Uwagi:</div>
                    <div>{order.uwagi}</div>
                  </div>
                </div>

                <div className="bg-gray-50 p-3 rounded-lg">
                  <div className="text-sm text-gray-600 mb-2">Zamówione produkty:</div>
                  {formatOrderItems(parseOrderItems(order.zamowioneProdukty), order.id)}
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