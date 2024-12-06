export interface MenuItem {
  id: number;
  name: string;
  description: string;
  price: number;
  category: 'pizza' | 'burger' | 'extras' | 'drinks';
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