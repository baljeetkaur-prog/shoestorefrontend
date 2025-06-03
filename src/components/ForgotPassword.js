import axios from "axios";
import { useState } from "react";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom"
import { toast } from "react-toastify";

function ForgotPassword() {
    const [un,setun]=useState();
    const [loading,setLoading]=useState(false); 
    const handlesubmit=async(e)=>
    {
        e.preventDefault(e);
        try
        {
            setLoading(true)
            const apiresp=await axios.get(`${process.env.REACT_APP_APIURL}/api/forgotpassword?uname=${un}`)
            if(apiresp.status>=200 && apiresp.status<300)
            {
                if(apiresp.data.success===false)
                {
                    toast.error(apiresp.data.msg)
                }
                else if(apiresp.data.success===true)
                {
                    toast.success(apiresp.data.msg)
                }
            }
            else
            {
                toast.error("Some error occured try again")
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
    return (
        <>
        <Helmet>
            <title>Forgot Password</title>
        </Helmet>
            <div class="breadcrumbs">
                <div class="container">
                    <div class="breadcrumbs-main">
                        <ol class="breadcrumb">
                            <li><Link to="/home">Home</Link></li>
                            <li class="active">Forgot Password</li>
                        </ol>
                    </div>
                </div>
            </div>
            <div className="ckeckout">
                <div className="container">
                    <h3>Forgot Password</h3>
                    <form name="form1" onSubmit={handlesubmit}>
                        <input type="email" name="uname" placeholder="Username(Email ID)" onChange={(e)=>setun(e.target.value)}/><br/><br/>
                        <button type="submit" disabled={loading}>{loading?"Submitting...":"Submit"}</button><br/><br/>
                    </form>
                </div>
            </div>
        </>
    )
}
export default ForgotPassword