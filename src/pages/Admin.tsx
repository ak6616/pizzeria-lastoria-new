import React, { useState } from 'react';
import { motion } from 'framer-motion';
import MenuManagement from '../components/admin/MenuManagement';
import NewsManagement from '../components/admin/NewsManagement';
import GalleryManagement from '../components/admin/GalleryManagement';
import DeliveryManagement from '../components/admin/DeliveryManagement';
import OrdersManagement from '../components/admin/OrdersManagement';

type Tab = 'news' | 'menu' | 'gallery' | 'delivery' | 'orders';

export default function Admin() {
  const [activeTab, setActiveTab] = useState<Tab>('news');

  return (
    <div className="max-w-6xl mx-auto bg-white/90 rounded-lg p-8">
      <h1 className="text-3xl font-bold mb-8 text-center">Panel Admina</h1>

      <div className="flex space-x-4 mb-8">
        {(['news', 'menu', 'gallery', 'delivery', 'orders'] as Tab[]).map(
          (tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 rounded-lg transition ${
                activeTab === tab
                  ? 'bg-yellow-500 text-white'
                  : 'bg-gray-200 hover:bg-gray-300'
              }`}
            >
              {tab === 'news' && 'Aktualności'}
              {tab === 'menu' && 'Menu'}
              {tab === 'gallery' && 'Galeria'}
              {tab === 'delivery' && 'Dostawa'}
              {tab === 'orders' && 'Zamówienia'}
            </button>
          )
        )}
      </div>

      <motion.div
        key={activeTab}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.2 }}
      >
        {activeTab === 'menu' && <MenuManagement />}
        {activeTab === 'news' && <NewsManagement />}
        {activeTab === 'gallery' && <GalleryManagement />}
        {activeTab === 'delivery' && <DeliveryManagement />}
        {activeTab === 'orders' && <OrdersManagement />}
      </motion.div>
    </div>
  );
}
