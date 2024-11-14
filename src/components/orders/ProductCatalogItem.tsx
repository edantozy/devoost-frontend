import { Accordion } from "flowbite-react";
import { faMinus, faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IProduct } from "@hooks/useFetchProducts";
import { useState } from "react";
import { formatMoney } from "@utils/formatMoney";
import { useAppDispatch } from "@redux/store";
import { addItem } from "@redux/slices/orderSlice";

export const ProductCatalogItem = ({ product }: { product: IProduct }) => {
  const [quantity, setQuantity] = useState(1);
  const dispatch = useAppDispatch();

  const handleDecrement = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const handleIncrement = () => {
    setQuantity(quantity + 1);
  };

  const handleAddItem = () => {
    dispatch(
      addItem({
        product_id: product.id,
        product_name: product.name,
        product_price: product.price,
        quantity,
      })
    );
    setQuantity(1);
  };

  return (
    <div
      key={product.id}
      className="flex flex-col space-y-2 bg-white p-4 mb-5 justify-between rounded-md"
    >
      <div className="flex-1">
        <Accordion collapseAll style={{ border: "none" }}>
          <Accordion.Panel>
            <Accordion.Title>
              <p className="capitalize">{product.name}</p>
            </Accordion.Title>
            <Accordion.Content>
              <p>{product.description}</p>
            </Accordion.Content>
          </Accordion.Panel>
        </Accordion>
      </div>
      <div className="flex items-center justify-between md:flex-col flex-row md:gap-y-4">
        <p className="font-semibold">${formatMoney(product.price)}</p>
        <div className="flex items-center">
          <div>
            <button
              onClick={handleDecrement}
              type="button"
              className="bg-gray-500 text-white rounded-full w-8 h-8"
            >
              <FontAwesomeIcon icon={faMinus} />
            </button>
          </div>
          <div className="mx-4">{quantity}</div>
          <button
            onClick={handleIncrement}
            type="button"
            className="bg-gray-500 text-white rounded-full w-8 h-8"
          >
            <FontAwesomeIcon icon={faPlus} />
          </button>
        </div>
        <button
          onClick={handleAddItem}
          type="button"
          className="bg-blue-500 text-white p-2 rounded"
        >
          Agregar ${formatMoney(quantity * product.price)}
        </button>
      </div>
    </div>
  );
};
