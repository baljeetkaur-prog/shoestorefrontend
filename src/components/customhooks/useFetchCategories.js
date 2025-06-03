import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

const useFetchCategories=()=>{
    const [allcat,setallcat]=useState([]);
    const [loadings,setLoadings]=useState(false);
    const fetchallcat=async()=>{
        try
        {
            setLoadings(true)
            const apiresp=await axios.get(`${process.env.REACT_APP_APIURL}/api/getallcat`)
            if(apiresp.status>=200 && apiresp.status<300){
                if(apiresp.data.success===true){
                    setallcat(apiresp.data.catdata)
                }
                else
                {
                    toast.info("No Categories found")
                    setallcat([])
    
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
    useEffect(()=>{
        fetchallcat();
    },[])
return {allcat,loadings}; 
}
export default useFetchCategories