import { useFetchProducts } from "@hooks/useFetchProducts";
import { ProductCatalogItem } from "./ProductCatalogItem";
import { useState } from "react";

export const ProductsCatalog = () => {
  const { data: productsData } = useFetchProducts();

  const [search, setSearch] = useState("");
  const filteredProducts = productsData?.filter((product) =>
    product.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      <div className="flex mb-4">
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Buscar productos"
          className="p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm w-full"
        />
      </div>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 max-h-96 overflow-y-auto">
        {filteredProducts?.map((product) => (
          <ProductCatalogItem key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};
