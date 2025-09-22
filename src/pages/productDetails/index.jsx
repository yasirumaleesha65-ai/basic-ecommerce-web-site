import { useContext, useEffect } from "react";
import { shoppingCartContext } from "../../context";
import { useParams } from "react-router-dom";

function ProductDetailsPage() {
  const {
    productDetails,
    setProductDetails,
    loading,
    setLoading,
    handleCartProducts,
  } = useContext(shoppingCartContext);

  const { id } = useParams();

  console.log(id, "id");
  async function fetchProductDetails() {
    const apiResponse = await fetch(`https://dummyjson.com/products/${id}`);
    const result = await apiResponse.json();
    console.log(result);
    if (result) {
      setLoading(false);
      setProductDetails(result);
    }
  }

  useEffect(() => {
    fetchProductDetails();
  }, [id]);
  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <h1>Product details Loading Please wait...</h1>
      </div>
    );
  }
  return (
    <div className="flex items-center justify-center h-screen gap-20 px-10 py-10">
      <div className="w-1/2 h-full">
        <div className="flex items-center justify-center w-full shadow-2xl h-4/5">
          {<img className="h-full" src={productDetails.thumbnail} alt="" />}
        </div>
        <div className="flex justify-between h-1/5">
          {productDetails.images.map((images) => (
            <img className="h-full shadow-lg" src={images} alt="images" />
          ))}
        </div>
      </div>
      <div className="flex items-center justify-center w-1/2">
        <div className="">
          <h1 className="text-5xl font-extrabold">{productDetails.title}</h1>
          <h2 className="my-6 text-4xl font-bold">${productDetails.price}</h2>
          <button
            onClick={() => {
              handleCartProducts(productDetails);
            }}
            className="border-4 border-black w-[400px] text-3xl "
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductDetailsPage;
