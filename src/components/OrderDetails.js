import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom"
import { toast } from "react-toastify";
import { Helmet } from "react-helmet";

function OrderDetails() {
    const [loading, setLoading] = useState(false);
    const [orderdata, setorderdata] = useState([]);
    const [params]=useSearchParams(); 
    const oid=params.get("oid")
    const fetchorderproducts = async () => {
        try {
            setLoading(true)
            const apiresp = await axios.get(`${process.env.REACT_APP_APIURL}/api/getorderdetails?orderid=${oid}`)
            if (apiresp.status >= 200 && apiresp.status < 300) {
                if (apiresp.data.success === false) {
                    setorderdata([])
                }
                else if (apiresp.data.success === true) {
                    setorderdata(apiresp.data.orderdata.products)
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
            fetchorderproducts();
        },[]);
    return (
        <>
        <Helmet>
            <title>Product Details</title>
        </Helmet>
            <div class="breadcrumbs">
                <div class="container">
                    <div class="breadcrumbs-main">
                        <ol class="breadcrumb">
                            <li><Link to="/adminhome">Home</Link></li>
                            <li class="active">Product Details</li>
                        </ol>
                    </div>
                </div>
            </div>
            <div className="ckeckout">
                <div className="container">
                    {loading===true?<h3>Processing...</h3>:null}
                    {
                        orderdata.length > 0 ?
                            <>
                                <h2>Product Details</h2><br />
                                <table class="table table-striped">
                                    <tbody>
                                    <tr>
                                    <th>Picture</th>
                                    <th>Name</th>
                                    <th>Rate</th>
                                    <th>Quantity</th>
                                    <th>Total Cost</th>
                                    </tr>
                                    {
                                        orderdata.map((odata,i)=>
                                        <tr key={i}>
                                            <td><img src={`uploads/${odata.picture}`} height="75"/></td>
                                            <td>{odata.prodname}</td>
                                            <td>{odata.rate}</td>
                                            <td>{odata.quantity}</td>
                                            <td>{odata.totalcost}</td> 
                                            </tr>
                                    )
                                    }
                                    </tbody>
                                </table>
                            </> : <h2>No Details Found</h2>
                    }
                </div>
            </div>
        </>
    )
}
export default OrderDetails