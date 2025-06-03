import axios from "axios";
import { useState } from "react";
import { Helmet } from "react-helmet";
import { Link, useSearchParams } from "react-router-dom"
import { toast } from "react-toastify";

function UpdateStatus() {
    const [loading,setLoading]=useState(false);
    const [nstatus,setnstatus]=useState(""); 
    const [params]=useSearchParams(); 
    const orderid=params.get("oid"); 
    const cstatus=params.get("currst")
    const onupdate=async(e)=>
    {
        e.preventDefault();
        try
        {
            setLoading(true)
            const apidata={orderid,nstatus}; 
            const apiresp=await axios.put(`${process.env.REACT_APP_APIURL}/api/changestatus`,apidata)
            if(apiresp.status>=200 && apiresp.status<300)
            {
                if(apiresp.data.success===false)
                {
                    toast.error("Error while updating status, try again")
                }
                else if(apiresp.data.success===true)
                {
                    toast.success("Status updated successfully")
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
            <title>Update Order Status</title>
        </Helmet>
            <div class="breadcrumbs">
                <div class="container">
                    <div class="breadcrumbs-main">
                        <ol class="breadcrumb">
                            <li><Link to="/adminhome">Home</Link></li>
                            <li class="active">Update Status</li>
                        </ol>
                    </div>
                </div>
            </div>
            <div className="ckeckout">
                <div className="container">
                    <h3>Update Status</h3>
                    <form name="form1" onSubmit={onupdate}>
                        <strong>Current Status: </strong>{cstatus}<br/><br/>
                        <select name="newstatus" onChange={(e)=>setnstatus(e.target.value)}>
                        <option>Choose</option>
                        <option>Confirmed</option>
                        <option>Packed</option>
                        <option>Shipped</option>
                        <option>Out for Delivery</option>
                        <option>Delivered</option>
                        <option>Cancelled</option>
                        <option>Not Accepted</option>
                        </select><br/><br/>
                        <button type="submit" disabled={loading}>{loading?"Updating...":"Update"}</button><br/>
                    </form>
                </div>
            </div>
        </>
    )
}
export default UpdateStatus