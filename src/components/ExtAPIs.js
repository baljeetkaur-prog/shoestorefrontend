import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom"
import { toast } from "react-toastify";
import preloader from '../Image2/preloader.gif'; 
import { Helmet } from "react-helmet";

function ExtAPIs() {
    const [loading, setLoading] = useState(false);
    const [postdata, setpostdata] = useState([]);
    const fetchposts = async () => {
        try {
            setLoading(true)
            const apiresp = await axios.get(`https://jsonplaceholder.typicode.com/posts`)
            if (apiresp.status >= 200 && apiresp.status < 300) {
                setpostdata(apiresp.data)
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
            fetchposts();
        },[]);
    return (
        <>
        <Helmet>
            <title>List of Posts</title>
        </Helmet>
            <div class="breadcrumbs">
                <div class="container">
                    <div class="breadcrumbs-main">
                        <ol class="breadcrumb">
                            <li><Link to="/home">Home</Link></li>
                            <li class="active">List of Posts</li>
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
                        postdata.length > 0 ?
                            <>
                                <h2>List of Posts</h2><br />
                                <table class="table table-striped">
                                    <tbody>
                                    <tr>
                                    <th>Post ID</th>
                                    <th>Title</th>
                                    <th>Post</th>
                                    </tr>
                                    {
                                        postdata.map((pdata,i)=>
                                        <tr key={i}>
                                            <td>{pdata.id}</td>
                                            <td>{pdata.title}</td>
                                            <td>{pdata.body}</td>
                                            </tr>
                                    )
                                    }
                                    <h4>{postdata.length} Posts(s) found</h4>
                                    </tbody>
                                </table>
                            </> : <h2>No Post Found</h2>
                    }
                </div>
            </div>
        </>
    )
}
export default ExtAPIs