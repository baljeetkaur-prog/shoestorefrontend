import axios from "axios";
import { useEffect, useState } from "react";
import { Helmet } from "react-helmet"
import { useNavigate, useSearchParams } from "react-router-dom"
import { toast } from "react-toastify";

function Resendactivation(){
    const [loading, setloading]=useState(false); 
    const navigate=useNavigate(); 
    const [message,setmessage]=useState(""); 
    const [email,setemail]=useState("")
    const resendactivation = async () => {
  if (!email) {
    toast.error("Missing email or activation token.");
    return;
  }

  try {
    setloading(true);
    const apidata = { email };
    const apiresp = await axios.post(`${process.env.REACT_APP_APIURL}/api/resendactivation`, apidata);
    
    if (apiresp.status >= 200 && apiresp.status < 300) {
      if (apiresp.data.success === true) {
        setmessage(apiresp.data.message);
      } else {
        setmessage(apiresp.data.message || "Error sending activation link");
      }
    }
  } catch (e) {
    toast.error(e.response?.data?.message || "Error Occurred: " + e.message);
  } finally {
    setloading(false);
  }
};
    return(
        <>
        <Helmet>
            <title>Resend Activation Link</title>
        </Helmet>
        <div className="ckeckout">
                <div className="container">
                    <h2>Resend Activation Link</h2>
                     <input
        type="email"
        placeholder="Enter registered email"
        value={email}
        onChange={(e) => setemail(e.target.value)}/>
         <button onClick={resendactivation}>Resend Link</button>
      <p>{message}</p>
                </div>
            </div>
        </>
    )
}
export default Resendactivation

