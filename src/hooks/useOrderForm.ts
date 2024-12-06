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

  const calculateTotal = (deliveryCost: number | null) => {
    let total = 0;

    // Calculate base items cost
    Object.entries(selectedItems).forEach(([uniqueId, quantity]) => {
      const [category, itemId] = uniqueId.split('_');
      const item = menuItems[category]?.find((i) => i.id === parseInt(itemId));
      if (item) {
        total += item.cena * quantity;
      }
    });

    // Add additional ingredients cost
    customizations.forEach((customization) => {
      const itemQuantity = selectedItems[customization.uniqueId] || 0;
      customization.addedIngredients.forEach((ingredientId) => {
        const ingredient = additionalIngredients.find((i) => i.id === ingredientId);
        if (ingredient) {
          total += ingredient.cena * itemQuantity;
        }
      });
    });

    // Add delivery cost
    return total + (deliveryCost || 0);
  };

  const handleSubmit = async (customerData: CustomerData, deliveryCost: number | null) => {
    setIsSubmitting(true);
    setError(null);

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
          name: item?.nazwa,
          quantity,
          price: item?.cena,
          removedIngredients: customization?.removedIngredients || [],
          addedIngredients: addedIngredientsDetails,
        };
      });

    const totalPrice = calculateTotal(deliveryCost);

    try {
      await submitOrder({
        ...customerData,
        items: orderItems,
        totalPrice,
      });

      // Print the order
      printOrder({
        customerData,
        items: orderItems,
        totalPrice,
        deliveryCost: deliveryCost || 0,
      });

      setSuccess(true);
      setSelectedItems({});
      setCustomizations([]);
    } catch (err) {
      setError('Wystąpił błąd podczas składania zamówienia. Spróbuj ponownie.');
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
  };
}