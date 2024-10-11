export const BASE_URL = "http://127.0.0.1:8000/api/";
export const USERS_REGISTER = `${BASE_URL}users/register/`;
export const USER_LOGIN = `${BASE_URL}users/login/`;

export const USERS = `${BASE_URL}users/profile/sellerlist/`;
export const CATEGORIES = `${BASE_URL}category/`;
export const PRODUCT = `${BASE_URL}product/`;
export const CART = `${BASE_URL}cart/cart/`;
export const CARTITEM = `${BASE_URL}cart/cartitem/`;

export const ORDER_URL = `${BASE_URL}order/order/`;
export const ORDER_SELLER_URL = `${BASE_URL}order/seller/`;
export const ORDERS_URL = `${BASE_URL}order/create/`;

export const ORDER_SALES_URL = `${BASE_URL}suborder/`;
export const PRODUCT_SALES_URL = `${BASE_URL}suborder_product/`;

export const PROFILE = "/profile";
export const USER_DETAIL = `${BASE_URL}users/profile/`;
export const UPDATE_USER = `${BASE_URL}users/profile/update/`;
export const DELETE_USER = `${BASE_URL}users/profile/delete/`;

export const PASSWORD_RESET = `${BASE_URL}users/password_reset/`;
export const PASSWORD_RESET_DONE = `${BASE_URL}users/password_reset/done/`;
export const PASSWORD_RESET_CONFIRM = (uid, token) =>
  `${BASE_URL}users/reset/${uid}/${token}/`;
export const PASSWORD_RESET_COMPLETE = `${BASE_URL}users/reset/done/`;
