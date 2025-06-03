import { createContext, useEffect, useState } from "react";
import Footer from "./components/Footer";
import Headernav from "./components/Headernav";
import SiteRoutes from "./components/SiteRoutes";
import { toast, ToastContainer } from 'react-toastify';
import Cookies from "universal-cookie";
import axios from "axios";

const dataContext = createContext(null);

function App() {
  const [pdata, setpdata] = useState(() => {
    const savedUser = sessionStorage.getItem("uinfo");
    return savedUser ? JSON.parse(savedUser) : null;
  });

  const [carttotal, setcarttotal] = useState(0);
  const [itemcount, setitemcount] = useState(0);
  const [isadmin,setisadmin]=useState(false); 
  const cookies=new Cookies(null, {path:'/'}); 
  useEffect(()=>
  {
    if(cookies.get("ucookie")!==undefined)
    {
      fetchuserdetailsbyid(cookies.get("ucookie"))
    }
  },[])
  const fetchuserdetailsbyid=async(uid)=>
  {
    try
    {
      const apiresp=await axios.get(`${process.env.REACT_APP_APIURL}/api/getuserbyid?id=${uid}`); 
      if(apiresp.status>=200 && apiresp.status<300)
      {
        if(apiresp.data.success===true)
        {
          setpdata(apiresp.data.udata)
        }
      }
      else
      {
        toast.error("Some error occured, try again")
      }
    }
    catch(e)
    {
      console.log("Error occured "+e.message)
    }
  }
  useEffect(() => {
    if (pdata) {
      setisadmin(pdata.usertype === "admin");  
    } else {
      setisadmin(false);
    }
  }, [pdata]);

  return (
    <>
      <dataContext.Provider value={{ pdata, setpdata, carttotal, setcarttotal, itemcount, setitemcount, isadmin,setisadmin }}>
        <Headernav />
        <SiteRoutes />
        <Footer />
      </dataContext.Provider>
      <ToastContainer theme="colored" />
    </>
  );
}

export default App;
export { dataContext };



// import { createContext, useEffect, useState } from "react";
// import Footer from "./components/Footer";
// import Headernav from "./components/Headernav";
// import SiteRoutes from "./components/SiteRoutes";
// import { ToastContainer} from 'react-toastify';
// const dataContext=createContext(null);
// function App() {
//   const [pdata,setpdata]=useState(null); 
//   const [carttotal,setcarttotal]=useState(0); 
//   const [itemcount,setitemcount]=useState(0); 
//   useEffect(()=>{
//     if(sessionStorage.getItem("uinfo")!==null)
//     {
//       setpdata(JSON.parse(sessionStorage.getItem("uinfo")))
//     }
//   },[]); 
//   return (
//     <>
//     <dataContext.Provider value={{pdata,setpdata,carttotal,setcarttotal,itemcount,setitemcount}}>
//     <Headernav/>
//     <SiteRoutes/>
//     <Footer/>
//     </dataContext.Provider>
//     <ToastContainer theme="colored"/>
//     </>
//   );
// }

// export default App;
// export {dataContext}

