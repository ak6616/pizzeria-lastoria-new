export interface MenuItem {
  id: number;
  nazwa: string;
  cena: number;
  skladniki?: string;
  category: string;
  uniqueId: string;
}

export interface Location {
  id: 'haczow' | 'miejsce-piastowe';
  name: string;
  menu: MenuItem[];
}

export interface OrderFormData {
  firstName: string;
  lastName: string;
  city: string;
  street?: string;
  houseNumber: string;
  apartmentNumber?: string;
  phone: string;
  deliveryTime?: string;
  items: { itemId: number; quantity: number }[];
}

export interface CustomerData {
  firstName: string;
  lastName: string;
  city: string;
  street: string;
  houseNumber: string;
  apartmentNumber: string | '';
  phone: string;
  deliveryTime: string | '';
}