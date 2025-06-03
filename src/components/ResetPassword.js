import axios from "axios"
import { useEffect, useState } from "react";
import { Helmet } from "react-helmet"
import { useNavigate, useSearchParams } from "react-router-dom"
import { toast } from "react-toastify";

function ResetPassword(){
    const [params]=useSearchParams(); 
    const token=params.get("token"); 
    const [loading, setloading]=useState(false); 
    const [username,setusername]=useState(""); 
    const [valid,setvalid]=useState(false); 
    const [newpass,setnewpass]=useState("");
    const [cpass,setcpass]=useState(""); 
    const navigate=useNavigate(); 
    useEffect(()=>{
        const validatetoken=async()=>
        {
            try
            {
            const apiresp=await axios.get(`${process.env.REACT_APP_APIURL}/api/verifytoken?token=${token}`)
            if(apiresp.data.success===true)
            {
                setusername(apiresp.data.username)
                setvalid(true);
            }
            else
            {
                toast.error(apiresp.data.message); 
                setvalid(false); 
            }
        }
        catch(e)
        {
            toast.error("Error: "+e.message)
        }
        }
        if(token)
        {
            validatetoken(); 
        }
    },[token])
    const handleresetpass=async()=>
    {
        if(newpass!==cpass)
        {
            toast.error("Passwords do not match")
            return; 
        }
        try
        {
            setloading(true); 
            const apidata= {username, password:newpass}; 
            const apiresp=await axios.put(`${process.env.REACT_APP_APIURL}/api/resetpassword`,apidata);
            if(apiresp.status>=200 && apiresp.status<300)
            {
                if(apiresp.data.success===true)
                {
                    toast.success(apiresp.data.message); 
                    navigate("/account")
                }
                else
                {
                    toast.error(apiresp.data.message)
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
    return(
        <>
        <Helmet>
            <title>Reset Password</title>
        </Helmet>
        <div className="ckeckout">
                <div className="container">
                    {valid?(
                        <>
                        <h2>Reset Password</h2>
                        <input type="password" placeholder="New Password" value={newpass} onChange={(e)=>setnewpass(e.target.value)}/><br/><br/>
                        <input type="password" placeholder="Confirm Password" value={cpass} onChange={(e)=>setcpass(e.target.value)}/><br/><br/>
                        <button onClick={handleresetpass} disabled={loading}>{loading?"Reseting..." : "Reset Password"}</button>
                        </>
                        ):(
                            <h2>Invalid or Expired Token</h2>
                        )}
                </div>
            </div>
        </>
    )
}
export default ResetPassword

