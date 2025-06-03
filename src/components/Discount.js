import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom"
import { toast } from "react-toastify";

function Discount()
{
    const [disprods,setdisprods]=useState([]);
    const [loading,setloading]=useState(false); 
    const fetchdisprods=async()=>{
        setloading(true); 
        try
        {
            const apiresp=await axios.get(`${process.env.REACT_APP_APIURL}/api/discountedprods`); 
            if(apiresp.data.success===true)
            {
                setdisprods(apiresp.data.pdata)
            }
            else
            {
                setdisprods([]); 
            }
        }
        catch(e)
        {
            toast.error("Error Occured "+e.message)
        }
        finally{
            setloading(false); 
        }
    }
    useEffect(()=>
    {
        fetchdisprods(); 
    },[]); 
    return(
        <>
        <div className="breadcrumbs">
        <div className="container">
          <div className="breadcrumbs-main">
            <ol className="breadcrumb">
              <li>
                <Link to="/homepage">Home</Link>
              </li>
              <li className="active">Discounted Products</li>
            </ol>
          </div>
        </div>
      </div>
      <div className="ckeckout">
      <div className="shoes" style={{ padding: '30px' }}>
  <div className="container">
  {!loading && disprods.length>0 && (
    <h2 style={{fontWeight:'600', marginBottom:'10px', textAlign: 'center'}}>Mega Sale on Shoes <br/><br/> Up to 50% off. Limited time only!</h2>
  )}
    <div className="product-one" style={{ display: 'flex', flexWrap: 'wrap' }}>
        {loading ? (
            <p>Loading Discounted Products...</p>
        ):
      disprods.length > 0 ? (disprods.map((pdata, i) => (
        <div className="col-md-3 product-left" key={i} style={{ marginBottom: '20px' }}>
          <div className="p-one simpleCart_shelfItem">
            <Link to={`/details?pid=${pdata._id}`}>
              <img src={`uploads/${pdata.picname}`} alt="" height="150" />
              <h4>{pdata.prodname}</h4><br/>
              <span className="badge">-{pdata.discount}% OFF</span>
            </Link>
          </div>
        </div>
      ))): (<h2>No discounted products available.</h2>)}
    </div>
  </div>
</div>
</div>
        </>
    )
}
export default Discount