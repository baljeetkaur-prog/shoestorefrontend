import axios from "axios";
import { useContext, useState } from "react";
import { Helmet } from "react-helmet";
import { Link, useNavigate } from "react-router-dom"
import { toast } from "react-toastify";
import { dataContext } from "../App";
import { encryptPassword } from "../utils/encryptionUtils";

function Changepass() {
    const [cpass,setcpass]=useState(""); 
    const [npass,setnpass]=useState(""); 
    const [npassw,setnpassw]=useState(""); 
    const [loading,setLoading]=useState(false);
    const {pdata,setpdata}=useContext(dataContext); 
    const navigate=useNavigate(); 
    const onChangepass=async(e)=>
    {
        e.preventDefault(e);
        try
        {
            if(npass===npassw)
            {
            const encryptOld = await encryptPassword(cpass);
            const encyrptNew= await encryptPassword(npass);  
            const apidata= {uid:pdata._id,cpass:encryptOld.encryptedData, cpassIv:encryptOld.iv, npass: encyrptNew.encryptedData,npassIv:encyrptNew.iv}
            setLoading(true)
            const apiresp=await axios.put(`${process.env.REACT_APP_APIURL}/api/changepassword`,apidata, {withCredentials:true})
            if(apiresp.status>=200 && apiresp.status<300)
            {
                if(apiresp.data.success===false)
                {
                    toast.error(apiresp.data.message)
                }
                else if(apiresp.data.success===true)
                {
                    toast.success("Password changed successfully"); 
                    toast.info("You have been logged out, please login with new password"); 
                    setpdata(null);
                    sessionStorage.clear(); 
                    navigate("/homepage")
                }
            }
            else
            {
                toast.error("Some error occured try again")
            }
        }
        else{
            toast.error("New password and confirm password doesn't match")
        }
    }
        catch(e)
        {
            if(e.response && e.response.data.message==="Token Expired or Invalid Token"){
                toast.info("Session Expired. Please login again")
                navigate('/account')
            }
            else{
            toast.error("Error occured"+e.message)
            }
        }
        finally
        {
            setLoading(false)
        }
    }
    return (
        <>
        <Helmet>
            <title>Search User</title>
        </Helmet>
            <div class="breadcrumbs">
                <div class="container">
                    <div class="breadcrumbs-main">
                        <ol class="breadcrumb">
                            <li><Link to="/adminhome">Home</Link></li>
                            <li class="active">Change Password</li>
                        </ol>
                    </div>
                </div>
            </div>
            <div className="ckeckout">
                <div className="container">
                    <h3>Change Password</h3>
                    <form name="form1" onSubmit={onChangepass}>
                        <input type="password" name="cpass" placeholder="Enter Current Password" onChange={(e)=>setcpass(e.target.value)}/><br/><br/>
                        <input type="password" name="npass" placeholder="Enter New Password" onChange={(e)=>setnpass(e.target.value)}/><br/><br/>
                        <input type="password" name="cnpass" placeholder="Confirm New Password" onChange={(e)=>setnpassw(e.target.value)}/><br/><br/>
                        <button type="submit" disabled={loading}>{loading?"Changing Password...":"Change Password"}</button><br/><br/>
                    </form>
                </div>
            </div>
        </>
    )
}
export default Changepass