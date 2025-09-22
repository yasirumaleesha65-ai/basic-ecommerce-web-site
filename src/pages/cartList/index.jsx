import { useContext } from "react";
import { shoppingCartContext } from "../../context";
import { useNavigate } from "react-router-dom";
import CartTile from "../../components/cartTile";

function CartListPage() {
  const { cartDetails } = useContext(shoppingCartContext);
  const navigate = useNavigate();
  return (
    <div className="max-w-5xl py-4 mx-auto max-md:max-w-xl">
      <h1 className="text-2xl font-bold text-center text-gray-800">
        My Cart Page
      </h1>
      <div className="grid gap-8 mt-12 md:grid-cols-3">
        <div className="space-y-2 md:col-span-2 ">
          {cartDetails?.length ? (
            cartDetails.map((singleCartItem) => (
              <CartTile singleCartItem={singleCartItem} />
            ))
          ) : (
            <h1>No Items Available In The Cart</h1>
          )}
        </div>
        <div className="p-4 bg-gray-100 rounded-sm h-max">
          <h3 className="pb-2 text-xl font-extrabold border-b border-gray-300 text-gray-950">
            Order Summary
          </h3>
          <ul className="mt-4 space-y-2 text-gray-700">
            <p className="flex flex-wrap gap-4 text-sm font-bold">
              Total <span></span>
            </p>
          </ul>
          <div className="flex justify-start gap-2 mt-5 ">
            <button className="text-sm border-2 border-black">Check Out</button>
            <button
              onClick={() => navigate("/product-list")}
              className="text-sm border-2 border-black"
            >
              Continue Shopping
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CartListPage;
