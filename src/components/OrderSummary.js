import { useContext, useEffect, useState } from "react";
import { Helmet } from "react-helmet"
import { dataContext } from "../App";
import axios from "axios";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

function OrderSummary(){
    const [loading,setLoading]=useState(false); 
    const [odata,setodata]=useState({}); 
    const {pdata}=useContext(dataContext)
    const fetchorderdetails=async()=>
    {
        try
        {
            setLoading(true); 
            const apiresp=await axios.get(`${process.env.REACT_APP_APIURL}/api/fetchorderinfo?uname=${pdata.username}`)
            if(apiresp.status>=200 && apiresp.status<300)
            {
                if(apiresp.data.success===false)
                {
                    toast.error("Some error occured, try again")
                }
                else if(apiresp.data.success===true)
                {
                    setodata(apiresp.data.orderdata)
                }
            }
            else
            {
                toast.error("Some error occured try again")
            }
        }
        catch(e)
        {
            toast.error("Error occurred "+e.message)
        }
        finally
        {
            setLoading(false); 
        }
    }
    useEffect(()=>
    {
        if(pdata && pdata.username)
        {
        fetchorderdetails();
        }
    },[pdata])
    return(
        <>
        <Helmet>
            <title>Order Summary</title>
        </Helmet>
        <div className="breadcrumbs">
            <div className="container">
                <div className="breadcrumbs-main">
                    <ol className="breadcrumb">
                        <li><Link to="/homepage">Home</Link></li>
                        <li className="active">Order Summary</li>
                    </ol>
                </div>
            </div>
        </div>
        <div className="ckeckout">
                <div className="container">
                    <h2>Order Summary</h2>
                    Thanks for shopping on our website. Your order number is {odata._id}
                </div>
            </div>
        </>
    )
}
export default OrderSummary