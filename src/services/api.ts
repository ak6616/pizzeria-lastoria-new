const API_BASE_URL = 'http://localhost:3000/api';

type LocationSuffix = '_mp' | '_hacz';

const getLocationSuffix = (location: string): string => {
  switch (location) {
    case 'miejsce-piastowe':
      return '_mp';
    case 'haczow':
      return '_hacz';
    default:
      return '_mp';
  }
};

//////////dodatki
export async function getAdditionalIngredients(location: string) {
  const suffix = getLocationSuffix(location);
  const response = await fetch(`${API_BASE_URL}/menu/dodatki${suffix}`);
  if (!response.ok) {
    throw new Error('Failed to fetch additional ingredients');
  }
  return response.json();
}
///////////galeria
export async function getGalleryImages() {
  const response = await fetch(`${API_BASE_URL}/gallery`);
  if (!response.ok) {
    throw new Error('Failed to fetch gallery images');
  }
  return response.json();
}

export async function addGalleryImage(data: { link: string }) {
  const response = await fetch(`${API_BASE_URL}/gallery`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data), // Dane są poprawnie serializowane do JSON
  });

  if (!response.ok) {
    throw new Error('Failed to add image');
  }
  return response.json();
}

export async function deleteGalleryImage(id: number) {
  const response = await fetch(`${API_BASE_URL}/gallery/${id}`, {
    method: 'DELETE',
  });

  if (!response.ok) {
    throw new Error('Failed to delete image');
  }
  return response.json();
}
//////////aktualności

export async function getNews() {
  const response = await fetch(`${API_BASE_URL}/news`);
  if (!response.ok) {
    throw new Error('Failed to fetch news');
  }
  return response.json();
}

export async function addNews(data: {
  tytul: string;
  tekst: string;
  data: string;
}) {
  const response = await fetch(`${API_BASE_URL}/news`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error('Failed to add news');
  }
  return response.json();
}

export async function updateNews(data: {
  id: number;
  tytul: string;
  tekst: string;
  data: string;
}) {
  const response = await fetch(`${API_BASE_URL}/news/${data.id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error('Failed to update news');
  }
  return response.json();
}

export async function deleteNews(id: number) {
  const response = await fetch(`${API_BASE_URL}/news/${id}`, {
    method: 'DELETE',
  });

  if (!response.ok) {
    throw new Error('Failed to delete news');
  }
  return response.json();
}
////////////obszar dostawy
export async function getDeliveryAreas(location: string) {
  const suffix = getLocationSuffix(location);
  const response = await fetch(`${API_BASE_URL}/delivery-areas${suffix}`);
  if (!response.ok) {
    throw new Error('Failed to fetch delivery areas');
  }
  return response.json();
}

export async function calculateDeliveryCost(
  city: string,
  street: string,
  pizzaCount: number,
  location: string
) {
  const suffix = getLocationSuffix(location);
  const response = await fetch(
    `${API_BASE_URL}/delivery-cost${suffix}?city=${encodeURIComponent(
      city
    )}&street=${encodeURIComponent(street)}&pizzaCount=${pizzaCount}`
  );
  if (!response.ok) {
    throw new Error('Failed to calculate delivery cost');
  }
  return response.json();
}
///////////////////zamówienia
export async function submitOrder(data: any, location: string) {
  const suffix = getLocationSuffix(location);
  const response = await fetch(`${API_BASE_URL}/orders/${suffix}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error('Failed to submit order');
  }
  return response.json();
}
export async function getOrders(location: string) {
  const suffix = getLocationSuffix(location);
  const response = await fetch(`${API_BASE_URL}/orders/${suffix}`);
  if (!response.ok) {
    throw new Error('Failed to fetch orders');
  }
  return response.json();
}
export async function deleteOrder(id: number, location: string) {
  const suffix = getLocationSuffix(location);
  const response = await fetch(`${API_BASE_URL}/orders${suffix}/${id}`, {
    method: 'DELETE',
  });

  if (!response.ok) {
    throw new Error('Failed to delete order');
  }
  return response.json();
}
//////////////////menu
export async function getMenuItems(category: string) {
  const response = await fetch(`${API_BASE_URL}/menu/${category}`);
  if (!response.ok) {
    throw new Error('Failed to fetch menu items');
  }
  return response.json();
}

export async function addMenuItem(data: {
  category: string;
  nazwa: string;
  cena: number;
  skladniki?: string;
}) {
  const response = await fetch(`${API_BASE_URL}/menu`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error('Failed to add menu item');
  }
  return response.json();
}

export async function updateMenuItem(data: {
  id: number;
  category: string;
  nazwa: string;
  cena: number;
  skladniki?: string;
}) {
  const response = await fetch(
    `${API_BASE_URL}/menu/${data.category}/${data.id}`,
    {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    }
  );

  if (!response.ok) {
    throw new Error('Failed to update menu item');
  }
  return response.json();
}

export async function deleteMenuItem(category: string, id: number) {
  const validCategories = ['pizza', 'fastfood', 'napoje', 'dodatki'];
  if (!validCategories.includes(category)) {
    throw new Error('Invalid category');
  }

  const response = await fetch(`${API_BASE_URL}/menu/${category}/${id}`, {
    method: 'DELETE',
  });

  if (!response.ok) {
    throw new Error('Failed to delete menu item');
  }
  return response.json();
}
////////////////zasady dostawy

export async function getDeliveryRules(category: string, location: string) {
  const suffix = getLocationSuffix(location);
  const response = await fetch(`${API_BASE_URL}/delivery/${category}${suffix}`);
  if (!response.ok) {
    throw new Error('Failed to fetch delivery rules');
  }
  return response.json();
}

export async function addDeliveryRule(data: {
  category: string;
  nazwa: string;
  ulica?: string;
  ilosc: number;
  koszt: number;
}) {
  const response = await fetch(`${API_BASE_URL}/delivery`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error('Failed to add delivery rule');
  }
  return response.json();
}

export async function updateDeliveryRule(data: {
  id: number;
  category: string;
  nazwa: string;
  ulica?: string;
  ilosc: number;
  koszt: number;
}) {
  const response = await fetch(
    `${API_BASE_URL}/delivery/${data.category}/${data.id}`,
    {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    }
  );

  if (!response.ok) {
    throw new Error('Failed to update delivery rule');
  }
  return response.json();
}

export async function deleteDeliveryRule(category: string, id: number) {
  const validCategories = ['weekday', 'weekend'];
  if (!validCategories.includes(category)) {
    throw new Error('Invalid category');
  }

  const response = await fetch(`${API_BASE_URL}/delivery/${category}/${id}`, {
    method: 'DELETE',
  });

  if (!response.ok) {
    throw new Error('Failed to delete delivery rules');
  }
  return response.json();
}

interface LoginCredentials {
  username: string;
  password: string;
}

export async function login(credentials: LoginCredentials) {
  const response = await fetch('/api/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(credentials),
  });

  if (!response.ok) {
    throw new Error('Login failed');
  }

  return response.json();
}

export async function logout() {
  const response = await fetch('/api/logout', {
    method: 'POST',
  });

  if (!response.ok) {
    throw new Error('Logout failed');
  }

  return response.json();
}
