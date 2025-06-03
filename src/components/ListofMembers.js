import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom"
import { toast } from "react-toastify";
import preloader from '../Image2/preloader.gif'; 
import { Helmet } from "react-helmet";

function ListofMembers() {
    const [loading, setLoading] = useState(false);
    const [usersdata, setusersdata] = useState([]);
    const fetchmembs = async () => {
        try {
            setLoading(true)
            const apireq = await axios.get(`${process.env.REACT_APP_APIURL}/api/fetchallmembs`)
            if (apireq.status >= 200 && apireq.status < 300) {
                if (apireq.data.success === false) {
                    setusersdata([])
                }
                else if (apireq.data.success === true) {
                    setusersdata(apireq.data.membsdata)
                }
            }
            else {
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
    useEffect(()=>
        {
            fetchmembs();
        },[]);
    const onuserdel=async(un)=>{ //here use un
        const uchoice=window.confirm(`Are you sure to delete this user`)
        if(uchoice)
        {
            try {
                setLoading(true)
                const apireq = await axios.delete(`${process.env.REACT_APP_APIURL}/api/delmem/${un}`) //un
                if (apireq.status >= 200 && apireq.status < 300) {
                    if (apireq.data.success === true) {
                        toast.success("User deleted successfully")
                        fetchmembs();
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
            <title>List of Users Registered</title>
        </Helmet>
            <div class="breadcrumbs">
                <div class="container">
                    <div class="breadcrumbs-main">
                        <ol class="breadcrumb">
                            <li><Link to="/adminhome">Home</Link></li>
                            <li class="active">List of Members</li>
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
                        usersdata.length > 0 ?
                            <>
                                <h2>List of Members</h2><br />
                                <table class="table table-striped">
                                    <tbody>
                                    <tr>
                                    <th>Serial No.</th>
                                    <th>Name</th>
                                    <th>Phone</th>
                                    <th>Email</th>
                                    <th>Delete</th>
                                    </tr>
                                    {
                                        usersdata.map((mdata,i)=>
                                        <tr key={i}>
                                            <td>{i+1}</td>
                                            <td>{mdata.name}</td>
                                            <td>{mdata.phone}</td>
                                            <td>{mdata.username}</td>
                                            <td><button onClick={()=>onuserdel(mdata.username)}>Delete</button></td> 
                                            </tr>
                                    )
                                    }
                                    <h4>{usersdata.length} member(s) found</h4>
                                    </tbody>
                                </table>
                            </> : <h2>No Member Found</h2>
                    }
                </div>
            </div>
        </>
    )
}
export default ListofMembers