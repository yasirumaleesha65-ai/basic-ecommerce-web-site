import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export const shoppingCartContext = createContext(null);

function ShoppingCartContextProvider({ children }) {
  const [loading, setLoading] = useState(true);
  const [productList, setProductList] = useState([]);
  const [productDetails, setProductDetails] = useState(null);
  const [cartDetails, setCartDetails] = useState([]);

  const navigate = useNavigate();

  async function fetchListOfProducts() {
    // setLoading(true);
    const apiResponse = await fetch("https://dummyjson.com/products");
    const result = await apiResponse.json();
    if (result && result.products) {
      setProductList(result?.products);
      setLoading(false);
    }
  }

  function restoreCart() {
    const previousCartDetails = JSON.parse(localStorage.getItem("cartItems"));
    if (previousCartDetails.length === 0) {
      setCartDetails([]);
    } else {
      setCartDetails(previousCartDetails);
    }
  }

  function removeItemFromCart(itemDetails, isFullyRemove) {
    let cpyCartDetails2 = [...cartDetails];
    const findIndexofCurrentCartItem = cpyCartDetails2.findIndex(
      (item) => item.id === itemDetails.id
    );
    if (isFullyRemove) {
      cpyCartDetails2.splice(findIndexofCurrentCartItem, 1);
    } else {
      cpyCartDetails2[findIndexofCurrentCartItem] = {
        ...cpyCartDetails2[findIndexofCurrentCartItem],
        quantity: cpyCartDetails2[findIndexofCurrentCartItem].quantity - 1,
        totalPrice:
          cpyCartDetails2[findIndexofCurrentCartItem].price *
          (cpyCartDetails2[findIndexofCurrentCartItem].quantity - 1),
      };
    }
    localStorage.setItem("cartItems", JSON.stringify(cpyCartDetails2));
    setCartDetails(cpyCartDetails2);
  }

  useEffect(() => {
    fetchListOfProducts();
    restoreCart();
  }, []);

  function handleCartProducts(addedProductDetails) {
    let cpyCartDetails = [...cartDetails];
    const checkAlreadyAdded = cpyCartDetails.findIndex(
      (cartItem) => cartItem.id === addedProductDetails.id
    );
    console.log(checkAlreadyAdded);
    if (checkAlreadyAdded === -1) {
      cpyCartDetails.push({
        ...addedProductDetails,
        quantity: 1,
        totalPrice: addedProductDetails.price,
      });
    } else {
      cpyCartDetails[checkAlreadyAdded] = {
        ...cpyCartDetails[checkAlreadyAdded],
        quantity: cpyCartDetails[checkAlreadyAdded].quantity + 1,
        totalPrice:
          cpyCartDetails[checkAlreadyAdded].price *
          (cpyCartDetails[checkAlreadyAdded].quantity + 1),
      };
    }

    console.log(cartDetails);
    setCartDetails(cpyCartDetails);
    localStorage.setItem("cartItems", JSON.stringify(cpyCartDetails));
    navigate("/cart");
  }

  return (
    <shoppingCartContext.Provider
      value={{
        loading,
        productList,
        productDetails,
        setProductDetails,
        setLoading,
        handleCartProducts,
        cartDetails,
        removeItemFromCart,
      }}
    >
      {children}
    </shoppingCartContext.Provider>
  );
}

export default ShoppingCartContextProvider;
