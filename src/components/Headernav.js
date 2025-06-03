import { Link, useNavigate } from "react-router-dom"
import { dataContext } from "../App"
import { useContext, useEffect, useState } from "react"
import useFetchCart from "./customhooks/useFetchCart"
import { toast } from "react-toastify"
import axios from "axios"
import Cookies from "universal-cookie"

function Headernav(){
	const {pdata,setpdata,carttotal,itemcount,isadmin}=useContext(dataContext)
	const {fetchcart}=useFetchCart(); 
	const [stext,setstext]=useState(); 
	const cookies=new Cookies(null,{path:'/'}); 
	const navigate=useNavigate(); 
	const onlogout=async()=>
	{
		try {
		const res = await axios.post(`${process.env.REACT_APP_APIURL}/api/logout`,{},{ withCredentials: true });
		if (res.data.success) {
			toast.success(res.data.message);
		} else {
			toast.error("Failed to logout from server");
		}
	} catch (err) {
		toast.error("Logout error: " + err.message);
	}
		setpdata(null); 
		sessionStorage.clear();
		if(cookies.get("ucookie")!==undefined)
		{
			cookies.remove("ucookie")
		}
		navigate("/homepage")
	}
	useEffect(()=>{
		if(pdata)
		{
			fetchcart(pdata.username);
		}
	},[pdata]); 
	const onsearch=(e)=>
	{
		e.preventDefault(); 
		if(stext!=="")
		{
			navigate(`/searchresults?q=${stext}`)
		}
		else
		{
			toast.info("Please enter something to search")
		}
	}
    return(
        <>
          <div className="top-header">
	<div className="container">
		<div className="top-header-main">
			<div className="col-md-4 top-header-left">
				<div className="search-bar">
					<form onSubmit={onsearch}>
					<input type="text" placeholder="Search" onChange={(e)=>setstext(e.target.value)}/>
					<input type="submit" name="btn" value=""/>
					</form>
				</div>
			</div>
			<div className="col-md-4 top-header-middle">
				<Link to="/"><img src="images/logo-4.png" alt="" /></Link>
			</div>
			<div className="col-md-4 top-header-right">
				{
					pdata!==null?
				<div className="cart box_1">
						<Link to="/cart">
						<h3> <div className="total">
							<span>Rs. {carttotal}/- </span>(<span id="simpleCart_quantity">{itemcount}</span> items)</div>
							<img src="images/cart-1.png" alt="" />
                            </h3>
						</Link>
						<div className="clearfix"> </div>
					</div>:null
}
			</div>
			<div className="clearfix"></div>
		</div>
	</div>
</div>
	<div className="header-bottom">
		<div className="container">
			<div className="top-nav">
				<ul className="memenu skyblue">
					{
						pdata===null?
						<li><Link>Welcome Guest</Link></li>:
						<><li><Link>Welcome {pdata.name}</Link></li></>
					}
					{isadmin===true?
					<li className="active"><Link to="/adminhome">Admin Home</Link></li>:
					<li className="active"><Link to="/">Home</Link></li>}
					<li className="grid"><Link to="/categories">Products</Link></li>
					<li className="grid"><Link to="/contactus">Contact Us</Link></li>
					{
						pdata===null?
						<>
						<li><Link to="/account">Sign Up/Login</Link></li>
						</>: 
						<>
						<li><Link to="/orderhistory">Order History</Link></li>
						<li><Link to="/changepass">Change Password</Link></li>
						<li><button onClick={onlogout}>Logout</button></li>
						</>
					}
						
									</ul>	
								</div>
							</div>
						</div>
			<div className="clearfix"> </div>
        </>
    )
}
export default Headernav
