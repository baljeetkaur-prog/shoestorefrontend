import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom"
import { toast } from "react-toastify";
import preloader from '../Image2/preloader.gif'; 
import { Helmet } from "react-helmet";
import { dataContext } from "../App";
import useFetchCart from "./customhooks/useFetchCart";

function CartDetails() {
    const [loading, setLoading] = useState(false);
    const {pdata,carttotal}=useContext(dataContext); 
    const {cartdata,fetchcart}=useFetchCart();  
    const navigate=useNavigate();
    useEffect(()=>
        {
            if(pdata!==null)
            {
            fetchcart(pdata.username);
            }
        },[pdata]);
    const oncartdel=async(id)=>{ 
        const uchoice=window.confirm(`Are you sure to delete this product`)
        if(uchoice)
        {
            try {
                setLoading(true)
                const apireq = await axios.delete(`${process.env.REACT_APP_APIURL}/api/delcart/${id}`) //un
                if (apireq.status >= 200 && apireq.status < 300) {
                    if (apireq.data.success === true) {
                        toast.success("Product deleted successfully")
                        fetchcart(pdata.username);
                    }
                    else{
                        toast.error("Error while deleting")
                    }
                }
                else 
                {
                    toast.error("Some error occured try again")
                }
            }
            catch (e) {
                toast.error("Error occured" + e.message)
            }
            finally {
                setLoading(false)
            }
        }
    };
    return (
        <>
        <Helmet>
            <title>List of Products in Your Cart</title>
        </Helmet>
            <div class="breadcrumbs">
                <div class="container">
                    <div class="breadcrumbs-main">
                        <ol class="breadcrumb">
                            <li><Link to="/homepage">Home</Link></li>
                            <li class="active">List of Cart Products</li>
                        </ol>
                    </div>
                </div>
            </div>
            <div className="ckeckout">
                <div className="container">
                    {loading? 
                    <div>
                        <img src={preloader} alt="Processing" width="100px" height="100px"/>
                        </div> : null}
                    {
                        cartdata.length > 0 ?
                            <>
                                <h2>List of Cart Products</h2><br />
                                <table class="table table-striped">
                                    <tbody>
                                    <tr>
                                    <th>Serial No.</th>
                                    <th>Product Image</th>
                                    <th>Product Name</th>
                                    <th>Rate</th>
                                    <th>Quantity</th>
                                    <th>Total Cost</th>
                                    <th>Delete</th>
                                    </tr>
                                    {
                                        cartdata.map((cdata,i)=>
                                        <tr key={i}>
                                            <td>{i+1}</td>
                                            <td><img src={`uploads/${cdata.picture}`} alt="prodImage" height="75"/></td>
                                            <td>{cdata.prodname}</td>
                                            <td>{cdata.rate}</td>
                                            <td>{cdata.quantity}</td>
                                            <td>{cdata.totalcost}</td>
                                            <td><button onClick={()=>oncartdel(cdata._id)}>Delete</button></td> 
                                            </tr>
                                    )
                                    }
                                    <h4>{cartdata.length} product(s) found</h4>
                                    </tbody>
                                </table>
                                <strong>Your Cart total is <em>₹{carttotal}/- </em></strong> <br/><br/>
                                <button onClick={()=>navigate("/checkout")}>Checkout</button>
                            </> : <h2>No product added in your cart yet.</h2>
                    }
                </div>
            </div>
        </>
    )
}
export default CartDetails