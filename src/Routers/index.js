
import MerchantInfo from "../datatable/MerchantPage/information";
import OrganizationContent from "../datatable/table";
import AllProductsScreen from "../screens/AllProductsScreen";
import CartScreen from "../screens/CartScreen";
import HomeScreen from "../screens/HomeScreen";
import LoginScreen from "../screens/LoginScreen";
import OrderScreen from "../screens/OrderScreen";
import PaymentScreen from "../screens/PaymentScreen";
import PlaceOrderScreen from "../screens/PlaceOrderScreen";
import ProductScreen from "../screens/ProductScreen";
import ProfileScreen from "../screens/ProfileScreen";
import RegisterScreen from "../screens/RegisterScreen";
import ShippingScreen from "../screens/ShippingScreen";
import FavouriteProductScreen from '../screens/FavouriteProductScreen'
                                                            // done 

const ALLROLES = ["admin", "merchant", "user"];
 function pageNotFound(){
  return (
    <div>Page note found 404</div>
  )
 }
// All routes
export const ROUTES = [
  {
    path: "/admin",
    Component: OrganizationContent,
    roles: ["admin"],
    isPrivate: true,
  },
  {
    path: "/profile",
    Component: ProfileScreen,
    roles: ALLROLES,
    isPrivate: true,
  },
  {
    path: "/register",
    isPrivate: false,
    Component: RegisterScreen,
    roles:ALLROLES
  },
  {
    path: "/login",
    isPrivate: false,
    Component: LoginScreen,
    roles:ALLROLES
  },
  {
    path: "/",
    isPrivate: false,
    Component: HomeScreen,
    roles:ALLROLES,
  },
  {
    path: "/cart/:id?",
    isPrivate: true,
    Component: CartScreen,
    roles: ALLROLES,
  },
  {
    path: "/all-products",
    isPrivate: false,
    Component: AllProductsScreen,
    roles: ALLROLES,
  },
  {
    path: "/merchant",
    isPrivate: true,
    Component: MerchantInfo,
    roles: ["merchant",'admin'],
  },
  {
    path: "/product/:id",
    isPrivate: false,
    Component: ProductScreen,
    roles: ALLROLES,
  },
  {
    path: "/shipping",
    isPrivate: true,
    Component: ShippingScreen,
    roles: ALLROLES,
  },
  {
    path: "/payment",
    isPrivate: true,
    Component: PaymentScreen,
    roles:ALLROLES,
  },
  {
    path: "/order/:id",
    isPrivate: true,
    Component: OrderScreen,
    roles:ALLROLES,
  },
  {
    path: "/placeorder",
    isPrivate: true,
    Component: PlaceOrderScreen,
    roles: ALLROLES,
  },
  {
    path: "/favouriteScreen",
    isPrivate: true,
    Component: FavouriteProductScreen,
    roles: ALLROLES,
  },
  // {
  //   path: "/userPermission",
  //   isPrivate: true,
  //   // Component: Options,
  //   roles: ["OL"],
  // },
  // {
  //   path: "/securityCode",
  //   isPrivate: false,
  //   // Component: SecurityCode,
  //   roles: ALLROLES,
  // },
  // {
  //   path: "/notfound",
  //   isPrivate: false,
  //   // Component: NotFound,
  //   roles: ALLROLES,
  // },
  ,{
    path: "*",
    isPrivate: false,
     Component: pageNotFound,
    roles: ALLROLES,
  },
];