import {useContext, useEffect, useState} from 'react'; 
import { useNavigate } from "react-router-dom";
import { dataContext } from "../App";
import { toast } from 'react-toastify';

var RoutesProtector=({CompName, adminOnly=false})=>
{
    const {pdata}=useContext(dataContext); 
    const mynavigate=useNavigate(); 
    const [isallow,setisallow]=useState(false);     
    useEffect(()=>
    {
        if(pdata===null)
        {
            mynavigate("/account")
            toast.info("Please login first")
        }
        else if(adminOnly && pdata.usertype!=='admin'){
            mynavigate("/notauthorized")
            toast.warning("You are not authorized to access this page")
        }
        else
        {
            setisallow(true); 
        }
    },[pdata, adminOnly, mynavigate])
    return(
        <>
        {/* {pdata && (!adminOnly || pdata.usertype==="admin")?<CompName/>:null} */}
        {isallow? <CompName/>:null}
        </>
    )
}
export default RoutesProtector; 