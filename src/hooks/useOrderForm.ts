import { useState } from 'react';
import { submitOrder } from '../services/api';
import { printOrder } from '../utils/printOrder';
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

export function useOrderForm(menuItems: Record<string, MenuItem[]>, additionalIngredients: any[]) {
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
          const [category, itemId] = uniqueId.split('_');
          const item = menuItems[category]?.find(
            (i) => i.id === parseInt(itemId)
          );
          const customization = customizations.find(
            (c) => c.uniqueId === uniqueId
          );

          const addedIngredientsDetails =
            customization?.addedIngredients.map((id) => {
              const ingredient = additionalIngredients.find((i) => i.id === id);
              return {
                id,
                name: ingredient?.nazwa,
                price: ingredient?.cena,
              };
            }) || [];

          return {
            id: parseInt(itemId),
            category,
            name: item?.nazwa || '',  // Dodaj wartość domyślną
            quantity: quantity || 0,   // Dodaj wartość domyślną
            price: item?.cena || 0,    // Dodaj wartość domyślną
            removedIngredients: customization?.removedIngredients || [],
            addedIngredients: addedIngredientsDetails || []
          };
        });

      const totalPrice = calculateTotal(deliveryCost);

      // Dodaj datę zamówienia
      const orderDateTime = new Date().toISOString();

      await submitOrder({
        ...customerData,
        items: orderItems,
        totalPrice: parseFloat(totalPrice),
        deliveryCost: deliveryCost || 0,
      }, 'miejsce-piastowe');

      // Print the order
      printOrder({
        customerData,
        items: orderItems,
        totalPrice: parseFloat(totalPrice),
        deliveryCost: deliveryCost || 0,
      });

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