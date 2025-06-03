import axios from "axios";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { toast } from "react-toastify";

const useFetchSubCategories=()=>{
    const [params]=useSearchParams(); 
    const catid=params.get("cid"); 
    const [scdata,setscdata]=useState([]);
    const [loadings,setLoadings]=useState(false);
const fetchsubcatbycat=async()=>
    {
        try
        {
            setLoadings(true);
            const apiresp=await axios.get(`${process.env.REACT_APP_APIURL}/api/getsubcatbycat?catid=${catid}`)
            if(apiresp.status>=200 && apiresp.status<300)
            {
                if(apiresp.data.success===true)
                {
                    setscdata(apiresp.data.subcatdata)
                }
                else
                {
                    setscdata([]);
                    toast.info("No Categories Found")
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
        if(catid!=="")
        {
            fetchsubcatbycat();
        }
    
    },[catid])
    return {scdata, loadings}; 
}
export default useFetchSubCategories; 