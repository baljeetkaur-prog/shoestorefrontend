import axios from "axios";
import { useEffect, useState } from "react";
import { Helmet } from "react-helmet"
import { Link, useSearchParams} from "react-router-dom";
import { toast } from "react-toastify";
function SearchResult(){
    const [loading,setloading]=useState(false); 
    const [prodsdata,setprodsdata]=useState([]); 
    const [params]=useSearchParams(); 
    const query=params.get("q"); 
    const searchprodsbyname=async()=>
    {
        try
        {
            setloading(true); 
            const apiresp=await axios.get(`${process.env.REACT_APP_APIURL}/api/getprodsbyname/${query}`); 
            if(apiresp.status>=200 && apiresp.status<300)
            {
                setprodsdata(Array.isArray(apiresp.data.pdata)?apiresp.data.pdata:[]); 
            }
            else
            {
                setprodsdata([]); 
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
        if(query!==null)
        {
            searchprodsbyname(); 
        }
            
    },[query]); 
    return(
        <>
        <Helmet>
            <title>Search Result</title>
        </Helmet>
        <div class="shoes"> 
		<div class="container"> 
            <h1 align="center">Products</h1>
			<div class="product-one">
                {
                    prodsdata.length>0?
                    prodsdata.map((pdata,i)=>
				<div class="col-md-3 product-left" key={i}> 
					<div class="p-one simpleCart_shelfItem">							
							<Link to={`/details?pid=${pdata._id}`}>
								<img src={`uploads/${pdata.picname}`} alt="" height="150"/>
						<h4>{pdata.prodname}</h4>
                        </Link>
					</div>
				</div>):<h2>No Products Found</h2>}
                </div>
                </div>
                </div>
        </>
    )
}
export default SearchResult