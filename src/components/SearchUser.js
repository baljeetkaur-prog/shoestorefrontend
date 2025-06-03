import axios from "axios";
import { useState } from "react";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom"
import { toast } from "react-toastify";

function SearchUser() {
    const [un,setun]=useState();
    const [loading,setLoading]=useState(false);
    const [userdata,setuserdata]=useState({});
    const onsearch=async(e)=>
    {
        e.preventDefault(e);
        try
        {
            setLoading(true)
            const apireq=await axios.get(`${process.env.REACT_APP_APIURL}/api/searchuser?uname=${un}`)
            if(apireq.status>=200 && apireq.status<300)
            {
                if(apireq.data.success===false)
                {
                    toast.error("Incorrect Username/Email")
                    setuserdata({})
                }
                else if(apireq.data.success===true)
                {
                    setuserdata(apireq.data.udata)
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
            <title>Search User</title>
        </Helmet>
            <div class="breadcrumbs">
                <div class="container">
                    <div class="breadcrumbs-main">
                        <ol class="breadcrumb">
                            <li><Link to="/adminhome">Home</Link></li>
                            <li class="active">Search User</li>
                        </ol>
                    </div>
                </div>
            </div>
            <div className="ckeckout">
                <div className="container">
                    <h3>Search User</h3>
                    <form name="form1" onSubmit={onsearch}>
                        <input type="email" name="uname" placeholder="Username(Email ID)" onChange={(e)=>setun(e.target.value)}/><br/><br/>
                        <button type="submit" disabled={loading}>{loading?"Searching...":"Search"}</button><br/><br/>
                        {
                            Object.keys(userdata).length>0?
                            <>
                            <b>Name: </b>{userdata.name}<br/>
                            <b>Phone: </b>{userdata.phone}<br/>
                            </>:null
                        }
                    </form>
                </div>
            </div>
        </>
    )
}
export default SearchUser