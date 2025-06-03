import { useContext, useEffect, useState } from "react";
import { dataContext } from "../../App";
import axios from "axios";
import { toast } from "react-toastify";

const useFetchCart=()=>{
    const [cartdata,setcartdata]=useState([]); 
    const [loading,setLoading]=useState(false); 
    const {setcarttotal,setitemcount}=useContext(dataContext); 
    const fetchcart = async (username) => {
        try {
            setLoading(true)
            const apireq = await axios.get(`${process.env.REACT_APP_APIURL}/api/fetchcart/${username}`)
            if (apireq.status >= 200 && apireq.status < 300) {
                if (apireq.data.success === false) {
                    setcartdata([])

                }
                else if (apireq.data.success === true) {
                    setcartdata(apireq.data.cartdata)
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
            if(cartdata.length!==0)
            {
            setcarttotal(cartdata.reduce((acc,item)=>acc+item.totalcost,0))
            setitemcount(cartdata.length);
            }
            else
            {
                setcarttotal(0); 
                setitemcount(0); 
            }
        }, [cartdata]);
    return{
        cartdata,fetchcart
    };
}
export default useFetchCart