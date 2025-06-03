import axios from "axios";
import { useState } from "react";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom"
import { toast } from "react-toastify";

function Weather() {
    const [city,setcity]=useState();
    const [loading,setLoading]=useState(false);
    const [wdata,setwdata]=useState([]);
    const onsearch=async(e)=>
    {
        e.preventDefault(e);
        try
        {
            setLoading(true)
            const apiresp=await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=70e7f8a880d9d773377905c9b138111c&units=metric`)
            if(apiresp.status>=200 && apiresp.status<300)
            {
                setwdata(apiresp.data)
            }
            else
            {
                toast.error("Some error occured try again")
            }
        }
        catch(e)
        {
            toast.error("Error occured"+e.message)
        }
        finally
        {
            setLoading(false)
        }
    }
    return (
        <>
        <Helmet>
            <title>Search Weather Report by City Name</title>
        </Helmet>
            <div class="breadcrumbs">
                <div class="container">
                    <div class="breadcrumbs-main">
                        <ol class="breadcrumb">
                            <li><Link to="/home">Home</Link></li>
                            <li class="active">Weather Report</li>
                        </ol>
                    </div>
                </div>
            </div>
            <div className="ckeckout">
                <div className="container">
                    <h3>Weather</h3>
                    <form name="form1" onSubmit={onsearch}>
                        <input type="text" name="city" placeholder="City Name" onChange={(e)=>setcity(e.target.value)}/><br/><br/>
                        <button type="submit" disabled={loading}>{loading?"Searching...":"Search"}</button><br/><br/>
                        {
                            Object.keys(wdata).length>0?
                            <>
                            <b>Temperature: </b>{wdata.main.temp}<br/>
                            <b>Sky: </b>{wdata.weather[0].main}<br/>
                            </>:null
                        }
                    </form>
                </div>
            </div>
        </>
    )
}
export default Weather