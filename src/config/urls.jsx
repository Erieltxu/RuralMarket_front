// Define la URL base del API
export const BASE_URL = 'http://127.0.0.1:8000/api/'; 
export const USERS_REGISTER = `${BASE_URL}users/register/`;
export const USER_LOGIN = `${BASE_URL}users/login/`;


export const USERS = `${BASE_URL}users/profile/sellerlist/`;  
export const CATEGORIES = `${BASE_URL}category/`;
export const PRODUCT = `${BASE_URL}product/`;
export const CART = `${BASE_URL}cart/cart/`;
export const CARTITEM = `${BASE_URL}cart/cartitem/`;

export const ORDER_SELLER_URL = `${BASE_URL}order/seller/`; 
export const ORDERS_URL = `${BASE_URL}order/create/`;  // Cambia esto para usar el nuevo endpoint


export const PROFILE = '/profile';
export const USER_DETAIL = `${BASE_URL}users/profile/`; 
export const UPDATE_USER = `${BASE_URL}users/profile/update/`; 
export const DELETE_USER = `${BASE_URL}users/profile/delete/`; 


// Agregar las URLs para la recuperación de contraseña
export const PASSWORD_RESET = `${BASE_URL}users/password_reset/`;
export const PASSWORD_RESET_DONE = `${BASE_URL}users/password_reset/done/`;
export const PASSWORD_RESET_CONFIRM = (uid, token) => `${BASE_URL}users/reset/${uid}/${token}/`; // Para el restablecimiento de contraseña
export const PASSWORD_RESET_COMPLETE = `${BASE_URL}users/reset/done/`;