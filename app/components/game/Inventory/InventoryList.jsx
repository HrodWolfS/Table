import { getItemById } from "@/app/data/inventory";
import Image from "next/image";

const InventoryList = ({ userInventory }) => {
  return (
    <div className="inventory-container p-4 border rounded-lg bg-white/90">
      <h2 className="text-xl font-bold mb-4 text-amber-800">Mon Inventaire</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {userInventory.length > 0 ? (
          userInventory.map((itemId) => {
            const item = getItemById(itemId);
            return (
              <div
                key={item.id}
                className="flex flex-col items-center p-4 border-2 border-amber-800/30 rounded-lg bg-white/80 hover:shadow-lg transition-all"
              >
                <div className="w-24 h-24 relative mb-2">
                  <Image
                    src={item.image}
                    alt={item.name}
                    layout="fill"
                    objectFit="contain"
                  />
                </div>
                <h3 className="text-lg font-semibold text-amber-800 mb-1">
                  {item.name}
                </h3>
                <p className="text-sm text-gray-600 text-center">
                  {item.description}
                </p>
              </div>
            );
          })
        ) : (
          <p className="text-gray-500 col-span-full text-center">
            Aucun objet dans l'inventaire.
          </p>
        )}
      </div>
    </div>
  );
};

export default InventoryList;
