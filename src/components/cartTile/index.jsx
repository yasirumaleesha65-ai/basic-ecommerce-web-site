import { Fragment, useContext } from "react";
import { shoppingCartContext } from "../../context";

function CartTile({ singleCartItem }) {
  const { removeItemFromCart, handleCartProducts } =
    useContext(shoppingCartContext);

  function name(params) {}

  return (
    <Fragment>
      <div className="grid items-start grid-cols-3 gap-5">
        <div className="flex items-start col-span-2 gap-4">
          <div className="p-1 bg-gray-400 rounded-sm w-28 h-28 max-sm:w-20 shrink-0">
            <img
              className="object-contain w-full h-full"
              src={singleCartItem?.thumbnail}
              alt={singleCartItem?.title}
            />
          </div>
          <div>
            <h3 className="text-base font-bold text-gray-900 ">
              {singleCartItem?.title}
            </h3>
            <button
              onClick={() => {
                removeItemFromCart(singleCartItem, true);
              }}
              className="text-sm border-2 border-black"
            >
              REMOVE
            </button>
          </div>
        </div>
        <div className="ml-auto">
          <h3 className="text-lg font-bold text-gray-900">
            ${singleCartItem.totalPrice.toFixed(2)}
          </h3>
          <h3 className="font-extrabold">
            Quantity : {singleCartItem.quantity}
          </h3>
          <div className="mt-2 disabled:border-none ">
            <button
              disabled={singleCartItem?.quantity === 1}
              onClick={() => {
                removeItemFromCart(singleCartItem, false);
              }}
              className="mx-1 "
            >
              -
            </button>
            <button
              onClick={() => {
                handleCartProducts(singleCartItem);
              }}
              className="mx-1 "
            >
              +
            </button>
          </div>
        </div>
      </div>
      <hr />
    </Fragment>
  );
}

export default CartTile;
