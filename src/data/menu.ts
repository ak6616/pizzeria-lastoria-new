import { MenuItem, Location } from '../types';

export const menuData: Record<string, Location> = {
  haczow: {
    id: 'haczow',
    name: 'Haczów',
    menu: [
      {
        id: 1,
        name: 'Margherita',
        description: 'Sos pomidorowy, ser, oregano',
        price: 28,
        category: 'pizza'
      },
      {
        id: 2,
        name: 'Capriciosa',
        description: 'Sos pomidorowy, ser, szynka, pieczarki',
        price: 32,
        category: 'pizza'
      },
      {
        id: 3,
        name: 'Classic Burger',
        description: 'Wołowina, ser, sałata, pomidor, ogórek',
        price: 25,
        category: 'burger'
      }
    ]
  },
  'miejsce-piastowe': {
    id: 'miejsce-piastowe',
    name: 'Miejsce Piastowe',
    menu: [
      {
        id: 101,
        name: 'Margherita',
        description: 'Sos pomidorowy, ser, oregano',
        price: 28,
        category: 'pizza'
      },
      {
        id: 102,
        name: 'Pepperoni',
        description: 'Sos pomidorowy, ser, pepperoni',
        price: 34,
        category: 'pizza'
      },
      {
        id: 103,
        name: 'Hawajska',
        description: 'Sos pomidorowy, ser, szynka, ananas',
        price: 32,
        category: 'pizza'
      },
      {
        id: 104,
        name: 'Cheeseburger',
        description: 'Wołowina, podwójny ser, sałata, pomidor',
        price: 27,
        category: 'burger'
      },
      {
        id: 105,
        name: 'Frytki',
        description: 'Złociste frytki z solą',
        price: 12,
        category: 'extras'
      },
      {
        id: 106,
        name: 'Cola',
        description: '0.5l',
        price: 7,
        category: 'drinks'
      }
    ]
  }
};