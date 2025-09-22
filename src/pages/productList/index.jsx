import { useContext } from "react";
import { shoppingCartContext } from "../../context";
import ProductTile from "../../components/productTile";
import { useNavigate } from "react-router-dom";

function ProductListPage() {
  const { productList, loading } = useContext(shoppingCartContext);

  const navigate = useNavigate();

  // console.log(productList);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <h1>Data is Loading Please Wait..!</h1>
      </div>
    );
  }

  return (
    <section className="h-auto py-12 bg-white sm:py-16 lg:py-20">
      <div className="px-4 mx-auto sm:px-6 lg:px-8 max-w-7xl">
        <div className="max-w-md mx-auto text-center ">
          <h2 className="text-4xl font-extrabold ">Our Featured Products</h2>
        </div>
        <div className="flex justify-end">
          <button
            onClick={() => navigate("/cart")}
            className="text-3xl font-extrabold bg-white border-none"
          >
            Cart
          </button>
        </div>
        <div className="grid grid-cols-2 gap-5 mt-10 lg:mt-16 lg:gap-8 lg:grid-cols-4">
          {productList && productList.length > 0 ? (
            productList.map((singleProductTile) => (
              <ProductTile productDetails={singleProductTile} />
            ))
          ) : (
            <h1>No Product Found</h1>
          )}
        </div>
      </div>
    </section>
  );
}

export default ProductListPage;
