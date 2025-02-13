export interface ProductCustomization {
  uniqueId: string;
  instanceId: string;
  removedIngredients: string[];
  addedIngredients: (string | number)[];
  notes?: string;
}

export interface OrderItem {
  uniqueId: string;
  id: number;
  category: string;
  name: string;
  quantity: number;
  price: number;
  removedIngredients: string[];
  addedIngredients: Array<{
    id: string | number;
    name: string;
    price: number;
  }>;
}

export interface CustomerData {
    firstName: string;
    lastName: string;
    city: string;
    street: string;
    houseNumber: string;
    apartmentNumber?: string;
    phone: string;
    email: string;
    deliveryTime?: string;
    }
  
export interface CustomerDataFormProps {
deliveryAreas: Array<{ id: number; nazwa: string; ulica: string }>;
onSubmit: (data: CustomerData) => void;
isSubmitting: boolean;
selectedItems: Record<string, number>;
deliveryCost: number | null;
deliveryError: string | null;
totalPrice: number;
}
export interface IngredientsModalProps {
    item: {
      uniqueId: string;
      nazwa: string;
      skladniki?: string;
      category?: string;
    };
    customization: {
      removedIngredients: string[];
      addedIngredients: (string | number)[];
    };
    onClose: () => void;
    onToggleIngredient: (uniqueId: string, ingredient: string) => void;
    onToggleAdditionalIngredient: (uniqueId: string, ingredientId: number) => void;
    additionalIngredients: Array<{
      id: number;
      nazwa: string;
      cena: number;
    }>;
}
export interface MenuItem {
    id: number;
    category: string;
    nazwa: string;
    cena: number;
    skladniki?: string;
    uniqueId: string;
    location: string;
}

export interface MenuSectionProps {
title: string;
items: MenuItem[];
}
export interface OrderFormProps {
    deliveryAreas: Array<{ id: number; nazwa: string; ulica: string }>;
    location: string;
    orderType: 'delivery' | 'pickup';
}
  
export interface PaymentOrderData {
firstName: string;
lastName: string;
city: string;
street?: string;
houseNumber: string;
apartmentNumber?: string;
phone: string;
deliveryTime?: string;
items: Record<string, number>;
totalPrice: number;
email?: string;
type: 'delivery' | 'pickup';
}
export interface RodoTooltipProps {
    children: React.ReactNode;
}
export interface SelectedItemBubbleProps {
    item: {
      uniqueId: string;
      nazwa: string;
      skladniki?: string;
      category?: string;
      instanceId: string;
    };
    onEditIngredients: (uniqueId: string, instanceId: string) => void;
    onClose: (uniqueId: string, instanceId: string) => void;
}
export interface DeliveryRule {
    uniqueId: string;
    id: number;
    nazwa: string;
    ulica?: string;
    ilosc: number;
    koszt: number;
}
  
export interface DeliveryRuleResponse {
id: number;
nazwa: string;
ulica?: string;
ilosc: number;
koszt: number;
}
export interface GalleryImage {
    id: number;
    link: string;
}

  
export interface AdditionalIngredient {
id: number;
nazwa: string;
cena: number;
}
export interface NewsArticle {
    id: number;
    tytul: string;
    data: string;
    tekst: string;
}


  

  

export interface Orders extends Order {}
export interface AddDeliveryRuleModalProps {
    onClose: () => void;
    onSuccess: () => void;
   location: string;
}
export interface AddGalleryItemModalProps {
    onClose: () => void;
    onSuccess: () => void;
}
export interface AddMenuItemModalProps {
    onClose: () => void;
    onSuccess: () => void;
    location: string;
}
export interface AddNewsModalProps {
    onClose: () => void;
    onSuccess: () => void;
}
export interface DeliveryManagementProps {
    location: string;
}
export interface EditDeliveryRuleModalProps {
    rule: any;
    onClose: () => void;
    onSuccess: () => void;
    location: string;
}
export interface EditMenuItemModalProps {
    item: any;
    onClose: () => void;
    onSuccess: () => void;
    location: string;
}
export interface EditNewsModalProps {
    article: NewsArticle;
    onClose: () => void;
    onSuccess: () => void;
}
export interface LoginFormProps {
    onLogin: (username: string, password: string) => Promise<boolean>;
}
export interface MenuManagementProps {
    location: string;
}
export interface Order {
    id: number;
    imie: string;
    nazwisko: string;
    miejscowosc: string;
    ulica: string;
    numerDomu: string;
    numerMieszkania: string;
    numerTelefonu: string;
    zamowienieNaGodzine: string;
    dataGodzinaZamowienia: string;
    zamowioneProdukty: string;
    suma: number;
    type: 'delivery' | 'pickup';
}
  
export interface OrdersManagementProps {
location: string;
}

export interface SelectedItemsBubblesProps {
    items: Array<{
      uniqueId: string;
      nazwa: string;
      skladniki?: string;
      category?: string;
      instanceId: string;
    }>;
    onEditIngredients: (uniqueId: string, instanceId: string) => void;
    onRemoveItem: (uniqueId: string, instanceId: string) => void;
}


export interface LoginCredentials {
    username: string;
    password: string;
}
  
export interface DeliveryArea {
id: number;
nazwa: string;
ulica: string;
}