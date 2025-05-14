import React from 'react';
import { MenuSectionProps, MenuItem } from '../../../server/types';



export default function MenuSection({ title, items }: MenuSectionProps) {
  return (
    <div className="mb-8">
      <h2 className="text-2xl font-semibold mb-4">{title}</h2>
      <div className="space-y-4">
      <ol>
        {items.map((item, index) => (
          <li
            key={item.id}
            className="flex justify-between items-start p-4 bg-white/50 rounded-lg shadow-sm"
          >
            <div>
              
                   <h3 className="font-medium text-lg">{index + 1}. {item.nazwa}</h3>
              {item.skladniki && (
                <p className="text-sm text-gray-600 mt-1">{item.skladniki}</p>
              )}
               
             
            </div>
            <span className="font-semibold text-lg">{item.cena} zł</span>
          </li>
        ))}
         </ol>
      </div>
    </div>
  );
}
