import axios from "axios";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { toast } from "react-toastify";

const useFetchProducts=()=>{
    const [prodsdata,setprodsdata]=useState([]);
    const [loadings,setLoadings]=useState(false);
    const [params]=useSearchParams(); 
    const scatid=params.get("scid"); 
    const fetchprodsbysubcat=async()=>
        {
            try
            {
                setLoadings(true); 
                const apiresp=await axios.get(`${process.env.REACT_APP_APIURL}/api/getprodsbysubcat/${scatid}`)
                if(apiresp.status>=200 && apiresp.status<300)
                {
                    if(apiresp.data.success===true)
                    {
                    setprodsdata(apiresp.data.pdata)
                    }
                    else
                    {
                        setprodsdata([]); 
                        toast.info("No Products Found")
                    }
            }
        }
        catch(e)
        {
            toast.error("Error Occured "+e.message)
        }
        finally
        {
            setLoadings(false);
        }
    }
    useEffect(()=>
    {
        if(scatid !=="")
        {
            fetchprodsbysubcat();
        }
    },[scatid])
    return {prodsdata,loadings}; 
}
export default useFetchProducts; 