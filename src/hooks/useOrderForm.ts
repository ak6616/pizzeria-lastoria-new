import { useState } from 'react';
import { submitOrder } from '../services/api';
import type { CustomerData } from '../components/CustomerDataForm';
import type { MenuItem } from '../hooks/useMenuItems';

interface Customization {
  uniqueId: string;
  removedIngredients: string[];
  addedIngredients: number[];
}

interface OrderItem {
  id: number;
  category: string;
  name: string;
  quantity: number;
  price: number;
  removedIngredients?: string[];
  addedIngredients?: Array<{
    id: number;
    name: string;
    price: number;
  }>;
}

export function useOrderForm(
  menuItems: Record<string, MenuItem[]>, 
  additionalIngredients: any[],
  location: string
) {
  const [selectedItems, setSelectedItems] = useState<Record<string, number>>({});
  const [customizations, setCustomizations] = useState<Customization[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const updateQuantity = (uniqueId: string, quantity: number) => {
    const newQuantity = Math.max(0, quantity);
    if (newQuantity === 0) {
      const newSelectedItems = { ...selectedItems };
      delete newSelectedItems[uniqueId];
      setSelectedItems(newSelectedItems);
    } else {
      setSelectedItems((prev) => ({
        ...prev,
        [uniqueId]: newQuantity,
      }));
    }
  };

  const toggleIngredient = (uniqueId: string, ingredient: string) => {
    setCustomizations((prev) => {
      const existing = prev.find((c) => c.uniqueId === uniqueId);
      if (!existing) {
        return [
          ...prev,
          {
            uniqueId,
            removedIngredients: [ingredient],
            addedIngredients: [],
          },
        ];
      }

      const updatedIngredients = existing.removedIngredients.includes(ingredient)
        ? existing.removedIngredients.filter((i) => i !== ingredient)
        : [...existing.removedIngredients, ingredient];

      return prev.map((c) =>
        c.uniqueId === uniqueId
          ? { ...c, removedIngredients: updatedIngredients }
          : c
      );
    });
  };

  const toggleAdditionalIngredient = (uniqueId: string, ingredientId: number) => {
    setCustomizations((prev) => {
      const existing = prev.find((c) => c.uniqueId === uniqueId);
      if (!existing) {
        return [
          ...prev,
          {
            uniqueId,
            removedIngredients: [],
            addedIngredients: [ingredientId],
          },
        ];
      }

      const updatedIngredients = existing.addedIngredients.includes(ingredientId)
        ? existing.addedIngredients.filter((i) => i !== ingredientId)
        : [...existing.addedIngredients, ingredientId];

      return prev.map((c) =>
        c.uniqueId === uniqueId
          ? { ...c, addedIngredients: updatedIngredients }
          : c
      );
    });
  };

  const calculateTotal = (deliveryCost: number | null = 0) => {
    let total = 0;

    // Sumuj ceny wybranych przedmiotów wraz z dodatkowymi składnikami
    Object.entries(selectedItems).forEach(([uniqueId, quantity]) => {
      const item = Object.values(menuItems)
        .flat()
        .find((item) => item.uniqueId === uniqueId);
      
      if (item) {
        // Dodaj cenę podstawową produktu
        total += item.cena * quantity;

        // Dodaj cenę dodatkowych składników
        const customization = customizations.find(c => c.uniqueId === uniqueId);
        if (customization && item.skladniki) { // Sprawdź czy produkt może mieć dodatki
          customization.addedIngredients.forEach(ingredientId => {
            const ingredient = additionalIngredients.find(i => i.id === ingredientId);
            if (ingredient) {
              total += ingredient.cena * quantity;
            }
          });
        }
      }
    });

    // Dodaj koszt dostawy (jeśli nie jest null)
    if (deliveryCost !== null) {
      total += deliveryCost;
    }

    return total.toFixed(2);
  };

  const handleSubmit = async (customerData: CustomerData, deliveryCost: number | null) => {
    setIsSubmitting(true);
    setError(null);

    try {
      // Upewnij się, że wszystkie wymagane pola są wypełnione
      if (!customerData.firstName || !customerData.lastName || !customerData.city || 
          !customerData.houseNumber || !customerData.phone) {
        throw new Error('Proszę wypełnić wszystkie wymagane pola');
      }

      const orderItems = Object.entries(selectedItems)
        .filter(([_, quantity]) => quantity > 0)
        .map(([uniqueId, quantity]) => {
          // Zmiana sposobu wyszukiwania przedmiotu
          const item = Object.values(menuItems)
            .flat()
            .find(menuItem => menuItem.uniqueId === uniqueId);

          if (!item) {
            console.error(`Nie znaleziono przedmiotu dla uniqueId: ${uniqueId}`);
            return null;
          }

          const customization = customizations.find(
            (c) => c.uniqueId === uniqueId
          );

          const addedIngredientsDetails =
            customization?.addedIngredients.map((id) => {
              const ingredient = additionalIngredients.find((i) => i.id === id);
              return {
                id,
                name: ingredient?.nazwa || '',
                price: ingredient?.cena || 0,
              };
            }) || [];

          return {
            id: item.id,
            category: item.category,
            name: item.nazwa,
            quantity: quantity,
            price: item.cena,
            removedIngredients: customization?.removedIngredients || [],
            addedIngredients: addedIngredientsDetails
          };
        })
        .filter((item): item is NonNullable<typeof item> => item !== null); // Usuń null z tablicy

      const totalPrice = calculateTotal(deliveryCost);
      const orderDateTime = new Date().toISOString();

      await submitOrder({
        ...customerData,
        items: orderItems,
        orderDateTime,
        totalPrice: parseFloat(totalPrice),
        deliveryCost: deliveryCost || 0,
        location,
      }, location);

      setSuccess(true);
      setSelectedItems({});
      setCustomizations([]);
    } catch (err: any) {
      setError(err.message || 'Wystąpił błąd podczas składania zamówienia. Spróbuj ponownie.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const getPizzaCount = () => {
    return Object.entries(selectedItems)
      .filter(([uniqueId]) => uniqueId.startsWith('pizza_'))
      .reduce((sum, [_, qty]) => sum + qty, 0);
  };

  const resetForm = () => {
    setSuccess(false);
  };

  return {
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
    setError,
  };
}