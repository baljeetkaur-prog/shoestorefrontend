import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { Link, useNavigate } from "react-router-dom"
import { toast } from "react-toastify";
import { dataContext } from "../App";
import useFetchCart from "./customhooks/useFetchCart";
function Checkout() {
    const [addr,setaddr]=useState(""); 
    const [pmode, setpmode]=useState(""); 
    const [cardno,setcardno]=useState(""); 
    const [hname,sethname]=useState("");
    const [exp,setexp]=useState(""); 
    const [cvv,setcvv]=useState(""); 
    const [flag,setflag]=useState(false); 
    const {pdata,carttotal}=useContext(dataContext); 
    const {cartdata,fetchcart}=useFetchCart(); 
    const [loading,setLoading]=useState(false);
    const navigate=useNavigate(); 
       useEffect(()=>
        {
            if(pdata!==null)
            {
            fetchcart(pdata.username);
            }
        },[pdata]);
    const oncheckout=async(e)=>
    {
        e.preventDefault();
        try
        {
            if(pdata!==null)
            {
                setLoading(true);
            const carddetails={cardno, hname,exp,cvv}
            const apidata={addr,pmode,carddetails,uname:pdata.username}
            //backend- cartdata,carttotal,orderstatus,orddate
            const apiresp=await axios.post(`${process.env.REACT_APP_APIURL}/api/saveorder`,apidata)
            if(apiresp.status>=200 && apiresp.status<300)
            {
                if(apiresp.data.success===false)
                {
                    toast.error("Error while placing order, try again")

                }
                else if(apiresp.data.success===true)
                {
                    toast.success("Order placed successfully")
                    await fetchcart(pdata.username)
                    navigate("/ordersummary")
                }
            }
            else
            {
                toast.error("Some error occured try again")
            }
        }
    }
        catch(e)
        {
            toast.error("Error occured"+e.message)
        }
        finally
        {
            setLoading(false)
        }
    }
    useEffect(()=>{
        if(pmode==="Card Payment")
        {
            setflag(true)
        }
        else
        {
            setflag(false)
        }
    },[pmode])
    return (
        <>
        <Helmet>
            <title>Checkout</title>
        </Helmet>
            <div class="breadcrumbs">
                <div class="container">
                    <div class="breadcrumbs-main">
                        <ol class="breadcrumb">
                            <li><Link to="/homepage">Home</Link></li>
                            <li class="active">Checkout</li>
                        </ol>
                    </div>
                </div>
            </div>
            <div className="ckeckout">
                <div className="container">
                    <h3>Checkout</h3>
                    <form name="form1" onSubmit={oncheckout}>
                    <textarea name="saddr" placeholder="Shipping Address" onChange={(e)=>setaddr(e.target.value)}></textarea><br/><br/>
                    <select name="pmode" onChange={(e)=>setpmode(e.target.value)}>
                        <option value="">Choose Payment Mode</option>
                        <option>Cash on Delivery</option>
                        <option>Card Payment</option>
                    </select><br/><br/>
                        {
                        flag?
                        <>
                        <input type="number" name="cno" placeholder="Card Number" onChange={(e)=>setcardno(e.target.value)}/><br/><br/>
                        <input type="text" name="hname" placeholder="Holder Name" onChange={(e)=>sethname(e.target.value)}/><br/><br/>
                        <input type="text" name="exp" placeholder="Expiry" onChange={(e)=>setexp(e.target.value)}/><br/><br/>
                        <input type="password" name="cvv" placeholder="CVV" onChange={(e)=>setcvv(e.target.value)}/><br/><br/>
                        </>:null
}
                        <button type="submit" disabled={loading}>{loading ? "Placing Order..." : "Place Order"}</button>
                        
                    </form>
                </div>
            </div>
        </>
    )
}
export default Checkout