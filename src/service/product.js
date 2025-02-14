import axios from "axios"

const token = localStorage.getItem("token");

const addCartHandlerService = async(data) => {
  
  return await axios.post(
        `${process.env.REACT_APP_API_BASE_PATH}/api/users/addTocart`,
        {
          userId: data.userId,
          productId: data.productId,
          quantity: data.quantity || 1,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      
}

const getetProducthandler = async() =>{
  
      if(token){
    return  axios.get(`${process.env.REACT_APP_API_BASE_PATH}/api/products`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        })
        
            
      }
      else{
     return  axios.get(`${process.env.REACT_APP_API_BASE_PATH}/api/products`);
            
      }
}

const deleteProducthHandler = (id) =>{
  return axios.delete(`${process.env.REACT_APP_API_BASE_PATH}/api/products/${id}`)
}

const updateProductHandler = ({id,obj}) => {
  console.log("rita ni id",id)
  return axios.put(`${process.env.REACT_APP_API_BASE_PATH}/api/products/${id}`, obj, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  })
}

const updateContInStockProductHandler = ({id,quantity}) =>{
   return  axios.patch(`${process.env.REACT_APP_API_BASE_PATH}/api/products/updateCount/${id}`,{quantity},{
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
   })
}

const updateProductReviewHandler = ({id,name,comment}) => {
  return  axios.patch(`${process.env.REACT_APP_API_BASE_PATH}/api/products/addReview/${id}`,{name,comment},{
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
   })
}

const ratingProductHandler = ({id,rating}) =>{
  return axios.patch(`${process.env.REACT_APP_API_BASE_PATH}/api/products/rating/${id}`,{rating},{
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
   })
}

const productActiveStatusHandler = (id) => {
  return axios.patch(`${process.env.REACT_APP_API_BASE_PATH}/api/products/${id}`,{
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
   })
}

const getProductByUsersId = () => {
  return axios.get(`${process.env.REACT_APP_API_BASE_PATH}/api/products/all/products`,{
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
   })
}

const addProductHandlerService = (obj) =>{
  // addProduct
  return axios.post(`${process.env.REACT_APP_API_BASE_PATH}/api/products/add`,obj,{
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  })
}

const removeProductFromCartHandler = ({userId, productId}) => {
 return axios.post(
    `${process.env.REACT_APP_API_BASE_PATH}/api/users/removecart`,
    { userId, productId},
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  );
}

const updateCartQuantityHandler = ({userId,
  productId,
  newQuantity}) => {
  return axios.post(
    `${process.env.REACT_APP_API_BASE_PATH}/api/users/updateqty`,
    {userId, productId, newQuantity },
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  );
}

const addToWishlistProductHandler = ({productId,userId}) =>{
  return axios.post(
    `${process.env.REACT_APP_API_BASE_PATH}/api/users/addTofavourite`,
    {
      productId,
      userId
    },
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  );
}

const removeWishlistProductHandler = ({ productId, userId}) =>{
  return axios.post(
    `${process.env.REACT_APP_API_BASE_PATH}/api/users/removeFav`,
    { productId, userId },
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  );
}

const displayCartListHandler = () =>{
 return axios.get(
    `${process.env.REACT_APP_API_BASE_PATH}/api/users/cartlist`,
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  );
}

const singleProductgetHandler = (id) => {
        return axios.get(`${process.env.REACT_APP_API_BASE_PATH}/api/products/${id}`)
}

const displayWishListHandler = () => {
 return axios.get(
    `${process.env.REACT_APP_API_BASE_PATH}/api/users/favouritelist`,
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  );
}

export {
    getetProducthandler,
    addCartHandlerService,
    deleteProducthHandler,
    updateProductHandler,
    updateContInStockProductHandler,
    updateProductReviewHandler,
    ratingProductHandler,
    productActiveStatusHandler,
    getProductByUsersId,
    addProductHandlerService,
    removeProductFromCartHandler,
    updateCartQuantityHandler,
    addToWishlistProductHandler,
    removeWishlistProductHandler,
    displayCartListHandler,
    singleProductgetHandler,
    displayWishListHandler
}
