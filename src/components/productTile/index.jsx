import { useNavigate } from "react-router-dom";

function ProductTile({ productDetails }) {
  const navigate = useNavigate();

  function handleNavigateToTheProductDetailsPage(id) {
    navigate(`/product-details/${id}`);
  }

  return (
    <div className="relative p-6 border cursor-pointer group border-cyan-600">
      <div className="overflow-hidden aspect-auto">
        <img
          src={productDetails?.thumbnail}
          alt={productDetails?.title}
          className="object-cover h-full transition-all duration-300 group-hover:scale-125"
        />
      </div>
      <div className="flex justify-between gap-10 text-lg font-extrabold">
        <h3 className="truncate ">{productDetails.title}</h3>
        <h3 className="">${productDetails.price}</h3>
      </div>
      <div className="flex justify-center mt-4 text-white">
        <button
          onClick={() =>
            handleNavigateToTheProductDetailsPage(productDetails.id)
          }
          className="w-full text-lg font-bold bg-black "
        >
          View Details
        </button>
      </div>
    </div>
  );
}

export default ProductTile;
