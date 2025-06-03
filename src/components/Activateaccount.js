import axios from "axios";
import { useEffect, useState } from "react";
import { Helmet } from "react-helmet"
import { useNavigate, useSearchParams } from "react-router-dom"
import { toast } from "react-toastify";

function Activateaccount(){
    const [params]=useSearchParams(); 
    const token=params.get("acttoken"); 
    const [loading, setloading]=useState(false); 
    const navigate=useNavigate(); 
    const [message,setmessage]=useState(""); 
    const activateacct=async()=>
    {
        try
        {
            setloading(true); 
            const apidata= {token}; 
            const apiresp=await axios.put(`${process.env.REACT_APP_APIURL}/api/activateaccount`,apidata);
            if(apiresp.status>=200 && apiresp.status<300)
            {
                if(apiresp.data.success===true)
                {
                    toast.success(apiresp.data.message); 
                    setmessage(apiresp.data.message); 
                    navigate("/account")
                }
                else
                {
                    setmessage(apiresp.data.message)
                }
            }
        }
        catch(e)
        {
            toast.error("Error Occured "+e.message)
        }
        finally
        {
            setloading(false); 
        }
    }
    useEffect(()=>
    {
        if(token)
        {
            activateacct(); 
        }
    },[token]); 
    return(
        <>
        <Helmet>
            <title>Activate Account</title>
        </Helmet>
        <div className="ckeckout">
                <div className="container">
                    <h2>{message}</h2>
                </div>
            </div>
        </>
    )
}
export default Activateaccount

