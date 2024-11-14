import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { removeItem } from "@redux/slices/orderSlice";
import { useAppDispatch, useAppSelector } from "@redux/store";
import { formatMoney } from "@utils/formatMoney";

export const SaveOrderSummary = ({
  labelButton = "Guardar orden",
}: {
  labelButton?: string;
}) => {
  const { miniOrderItems, total } = useAppSelector((state) => state.order);
  const dispatch = useAppDispatch();

  const handleRemoveItem = (productId: number) => {
    dispatch(removeItem(productId));
  };

  return (
    <div className="px-4">
      <h2 className="text-xl font-semibold mb-5">Productos agregados</h2>
      {miniOrderItems.length === 0 ? (
        <div className="bg-white p-4 mb-5 rounded-md shadow-sm divide-y">
          <p className="text-gray-500">No hay productos agregados</p>
        </div>
      ) : (
        <div className="bg-white mb-5 rounded-md shadow-sm divide-y">
          {miniOrderItems.map((item) => (
            <div className="py-2 flex justify-between pl-4">
              <div className="flex-1">
                <div className="flex justify-between">
                  <p className="font-semibold capitalize">
                    {item.product_name}
                  </p>
                  <p className="text-gray-400">${item.product_price}</p>
                </div>
                <div className="flex items-center justify-between">
                  <p className="text-gray-500">x {item.quantity}</p>
                  <p className="font-semibold">
                    ${formatMoney(item.quantity * item.product_price)}
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => handleRemoveItem(item.product_id)}
                className="text-red-500 hover:text-red-600 mx-5"
              >
                <FontAwesomeIcon icon={faTrash} />
              </button>
            </div>
          ))}
        </div>
      )}
      <div className="flex justify-between items-center">
        <div className="flex gap-x-2 items-end">
          <p className="font-semibold text-2xl">Total:</p>
          <p className="font-bold text-2xl">${formatMoney(total)}</p>
        </div>
        <button className="text-white bg-sky-600 hover:bg-sky-700 py-2 px-5 rounded">
          {labelButton}
        </button>
      </div>
    </div>
  );
};
