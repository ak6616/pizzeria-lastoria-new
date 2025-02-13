import { useState } from 'react';
import { submitOrder } from '../services/api';
import { ProductCustomization, MenuItem, CustomerData, OrderItem} from '../types';
// import type { OrderData } from '../index';



export function useOrderForm(
  menuItems: Record<string, MenuItem[]>, 
  additionalIngredients: any[],
  location: string
) {
  const [selectedItems, setSelectedItems] = useState<Record<string, number>>({});
  const [customizations, setCustomizations] = useState<ProductCustomization[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const updateQuantity = (uniqueId: string, quantity: number) => {
    if (quantity < 0) return;
    
    setSelectedItems(prev => {
      const updated = { ...prev };
      if (quantity === 0) {
        delete updated[uniqueId];
      } else {
        updated[uniqueId] = quantity;
      }
      return updated;
    });

    // Dodaj lub usuń customizację w zależności od ilości
    if (quantity === 0) {
      setCustomizations(prev => prev.filter(c => c.uniqueId !== uniqueId));
    } else if (!customizations.find(c => c.uniqueId === uniqueId)) {
      setCustomizations(prev => [...prev, {
        uniqueId,
        instanceId: '',
        removedIngredients: [],
        addedIngredients: [],
      }]);
    }
  };

  const toggleIngredient = (uniqueId: string, instanceId: string, ingredient: string) => {
    setCustomizations((prev) => {
      const existing = prev.find((c) => c.instanceId === instanceId);
      if (!existing) {
        return [
          ...prev,
          {
            uniqueId,
            instanceId,
            removedIngredients: [ingredient],
            addedIngredients: [],
          },
        ];
      }

      const updatedIngredients = existing.removedIngredients.includes(ingredient)
        ? existing.removedIngredients.filter((i) => i !== ingredient)
        : [...existing.removedIngredients, ingredient];

      return prev.map((c) =>
        c.instanceId === instanceId
          ? { ...c, removedIngredients: updatedIngredients }
          : c
      );
    });
  };

  const toggleAdditionalIngredient = (uniqueId: string, instanceId: string, ingredientId: number) => {
    setCustomizations((prev) => {
      const existing = prev.find((c) => c.instanceId === instanceId);
      if (!existing) {
        return [
          ...prev,
          {
            uniqueId,
            instanceId,
            removedIngredients: [],
            addedIngredients: [ingredientId],
          },
        ];
      }

      const updatedIngredients = existing.addedIngredients.includes(ingredientId)
        ? existing.addedIngredients.filter((i) => i !== ingredientId)
        : [...existing.addedIngredients, ingredientId];

      return prev.map((c) =>
        c.instanceId === instanceId
          ? { ...c, addedIngredients: updatedIngredients }
          : c
      );
    });
  };

  const calculateTotal = (deliveryCost: number | null = 0) => {
    let total = 0;

    // Iteruj po każdym produkcie w zamówieniu
    Object.entries(selectedItems).forEach(([uniqueId, quantity]) => {
      const item = Object.values(menuItems)
        .flat()
        .find((item) => item.uniqueId === uniqueId);
      
      if (item) {
        // Dla każdej sztuki produktu
        for (let i = 0; i < quantity; i++) {
          const instanceId = `${uniqueId}_${i}`;
          const customization = customizations.find(c => c.instanceId === instanceId);
          
          // Dodaj cenę podstawową produktu
          total += Number(item.cena);

          // Dodaj cenę dodatkowych składników dla tej konkretnej sztuki
          if (customization) {
            customization.addedIngredients.forEach(ingredientId => {
              const ingredient = additionalIngredients.find(i => i.id === ingredientId);
              if (ingredient) {
                total += Number(ingredient.cena);
              }
            });
          }
        }
      }
    });

    // Dodaj koszt dostawy (jeśli nie jest null)
    if (deliveryCost !== null) {
      total += Number(deliveryCost);
    }

    return Number(total).toFixed(2);
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

      // Tworzymy tablicę wszystkich pojedynczych produktów z ich customizacjami
      const orderItems = Object.entries(selectedItems)
        .filter(([_, quantity]) => quantity > 0)
        .flatMap(([uniqueId, quantity]) => {
          const item = Object.values(menuItems)
            .flat()
            .find(menuItem => menuItem.uniqueId === uniqueId);

          if (!item) {
            console.error(`Nie znaleziono przedmiotu dla uniqueId: ${uniqueId}`);
            return [];
          }

          // Tworzymy osobny wpis dla każdej sztuki produktu
          return Array(quantity).fill(null).map((_, index) => {
            const instanceId = `${uniqueId}_${index}`;
            const customization = customizations.find(c => c.instanceId === instanceId);

            const addedIngredientsDetails = customization?.addedIngredients.map((id) => {
              const ingredient = additionalIngredients.find((i) => i.id === id);
              return {
                id,
                name: ingredient?.nazwa || '',
                price: ingredient?.cena || 0,
              };
            }) || [];

            return {
              uniqueId,
              instanceId,
              id: item.id,
              category: item.category,
              name: item.nazwa,
              quantity: 1, // każdy produkt ma ilość 1
              price: item.cena,
              removedIngredients: customization?.removedIngredients || [],
              addedIngredients: addedIngredientsDetails
            };
          });
        });

      const totalPrice = calculateTotal(deliveryCost);
      const orderDateTime = new Date().toISOString();

      await submitOrder({
        ...customerData,
        items: orderItems,
        orderDateTime,
        totalPrice: parseFloat(totalPrice),
        deliveryCost: deliveryCost || 0,
        location,
        type: "delivery",
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
    setSelectedItems({});
    setCustomizations([]);
    setIsSubmitting(false);
    setError(null);
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
    setCustomizations,
  };
}