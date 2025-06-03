import { Navigate, Route, Routes } from "react-router-dom"
import Account from "./Account";
import SearchUser from "./SearchUser";
import Home from "./Home";
import ListofMembers from "./ListofMembers";
import PageNotFound from "./PageNotFound";
import AdminHome from "./AdminHome";
import CreateAdmin from "./CreateAdmin";
import Managecategory from "./Managecategory";
import Managesubcategory from "./Managesubcategory";
import Manageproducts from "./Manageproducts";
import Updateproduct from "./Updateproduct";
import DisplayCategory from "./DisplayCategory";
import DisplaySubCategory from "./DisplaySubCategory";
import DisplayProducts from "./DisplayProducts";
import Details from "./Details";
import Changepass from "./Changepass";
import CartDetails from "./CartDetails";
import Checkout from "./Checkout";
import OrderSummary from "./OrderSummary";
import ViewOrder from "./ViewOrder";
import OrderDetails from "./OrderDetails";
import UpdateStatus from "./UpdateStatus";
import OrderHistory from "./OrderHistory";
import SearchResult from "./SearchResult";
import Contactus from "./Contactus";
import Activateaccount from "./Activateaccount";
import Resendactivation from "./Resendactivation";
import ForgotPassword from "./ForgotPassword";
import ResetPassword from "./ResetPassword";
import Weather from "./Weather";
import ExtAPIs from "./ExtAPIs";
import Whoweare from "./Whoweare";
import RoutesProtector from "./RoutesProtector";
import NotAuthorizedpage from "./NotAuthorizedpage";
import Team from "./Team";
import MyCookie from "./MyCookie";
import Discount from "./Discount";
import FAQ from "./FAQ";
import Shipping from "./Shipping";
import Shippingguides from "./Shippingguides";

function SiteRoutes(){
    return(
        <Routes>
            <Route path="/homepage" element={<Home/>}/>
            <Route path="/" element={<Navigate to="/homepage"/>}/>
             <Route path="/account" element={<Account/>}/> 
             <Route path="/searchuser" element={<RoutesProtector CompName={SearchUser} adminOnly={true}/>}/>
             {/* <Route path="/searchuser" element={<SearchUser/>}/> */}
             <Route path="/fetchallmembs" element={<RoutesProtector CompName={ListofMembers} adminOnly={true}/>}/>
             {/* <Route path="/fetchallmembs" element={<ListofMembers/>}/> */}
             <Route path="/adminhome" element={<RoutesProtector CompName={AdminHome} adminOnly={true}/>}/>
             {/* <Route path="/adminhome" element={<AdminHome/>}/> */}
             <Route path="/createadmin" element={<RoutesProtector CompName={CreateAdmin} adminOnly={true}/>}/>
             {/* <Route path="/createadmin" element={<CreateAdmin/>}/> */}
               <Route path="/addcategory" element={<RoutesProtector CompName={Managecategory} adminOnly={true}/>}/>
             {/* <Route path="/addcategory" element={<Managecategory/>}/> */}
               <Route path="/addsubcategory" element={<RoutesProtector CompName={Managesubcategory} adminOnly={true}/>}/>
             {/* <Route path="/addsubcategory" element={<Managesubcategory/>}/> */}
               <Route path="/addproduct" element={<RoutesProtector CompName={Manageproducts} adminOnly={true}/>}/>
             {/* <Route path="/addproduct" element={<Manageproducts/>}/> */}
               <Route path="/updateproduct" element={<RoutesProtector CompName={Updateproduct} adminOnly={true}/>}/>
             {/* <Route path="/updateproduct" element={<Updateproduct/>}/> */}
             <Route path="/categories" element={<DisplayCategory/>}/>
             <Route path="/subcategories" element={<DisplaySubCategory/>}/>
             <Route path="/products" element={<DisplayProducts/>}/>
             <Route path="/details" element={<Details/>}/>
             <Route path="/changepass" element={<RoutesProtector CompName={Changepass}/>}/>
             {/* <Route path="/changepass" element={<Changepass/>}/> */}
             <Route path="/cart" element={<CartDetails/>}/>
             <Route path="/checkout" element={<Checkout/>}/>
             <Route path="/ordersummary" element={<OrderSummary/>}/>
               <Route path="/vieworders" element={<RoutesProtector CompName={ViewOrder} adminOnly={true}/>}/>
             {/* <Route path="/vieworders" element={<ViewOrder/>}/> */}
             <Route path="/orderdetails" element={<OrderDetails/>}/>
             <Route path="/updatestatus" element={<UpdateStatus/>}/>
             <Route path="/orderhistory" element={<RoutesProtector CompName={OrderHistory} />} />
             {/* <Route path="/orderhistory" element={<OrderHistory/>}/> */}
             <Route path="/searchresults" element={<SearchResult/>}/>
             <Route path="/contactus" element={<Contactus/>}/>
             <Route path="/activateaccount" element={<Activateaccount/>}/>
             <Route path="/resendactivation" element={<Resendactivation/>}/>
             <Route path="/forgotpassword" element={<ForgotPassword/>}/>
             <Route path="/resetpassword" element={<ResetPassword/>}/>
             <Route path="/weatherapi" element={<Weather/>}/>
             <Route path="/postdata" element={<ExtAPIs/>}/>
             <Route path="/whoweare" element={<Whoweare/>}/>
             <Route path="/notauthorized" element={<NotAuthorizedpage/>}/>
             <Route path="/team" element={<Team/>}/>
             <Route path="/mycookie" element={<MyCookie/>}/>
             <Route path="/discount" element={<Discount/>}/>
             <Route path="/faq" element={<FAQ/>}/>
             <Route path="/shipping" element={<Shipping/>}/>
             <Route path="shippingguide" element={<Shippingguides/>}/>
             <Route path="/*" element={<PageNotFound/>}/>
        </Routes>

    )
}
export default SiteRoutes