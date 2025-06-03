import axios from "axios";
import { useState } from "react";
import { Helmet } from "react-helmet";
import { Navigate, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { encryptPassword } from "../utils/encryptionUtils";
function CreateAdmin(){
	const [name, setname]=useState();
	const [phone, setphone]=useState();
	const [email, setemail]=useState();
	const [pass, setpass]=useState();
	const [cpass, setcpass]=useState();
	const [loadings,setLoadings]=useState(false);
	const navigate=useNavigate();
	const clearfields=()=>{
		setname("");
		setphone("");
		setemail("");
		setpass("");
		setcpass("");
	}
	const onregister=async(e)=>
	{
		e.preventDefault();
		try
		{
			setLoadings(true); 
		if(pass===cpass){
			const { encryptedData, iv } = await encryptPassword(pass);
			const apidata={pname:name,phone,email,pass:encryptedData,iv} //can take key value like pname:name or just phone, this takes value automatically
			const apiresp= await axios.post(`${process.env.REACT_APP_APIURL}/api/createadmin`,apidata)
			if(apiresp.status>=200 && apiresp.status<300)
			{
				toast.success(apiresp.data)
				clearfields();
			}
		}
		else{
			toast.info("Password doesn't match")
		}
	}
	catch(e)
	{
		toast.error("Frontend Error Occured " + e.message)
	}
	finally
	{
		setLoadings(false); 
	}
}
    return(
        <>
        <Helmet>
            <title>Admin registeration</title>
        </Helmet>
		<div className="breadcrumbs">
			<div className="container">
				<div className="breadcrumbs-main">
					<ol className="breadcrumb">
						<li><a href="index.html">Home</a></li>
						<li className="active">Account</li>
					</ol>
				</div>
			</div>
		</div>
           <div className="account">
		<div className="container"> 
			<div className="account-bottom">
				<div className="col-md-6 account-left">
					<form name="form1" onSubmit={onregister}>
					<div className="account-top heading">
						<h3>Create New Admin</h3>
					</div>
					<div className="address">
						<span>Name</span>
						<input type="text" name="pname" value={name} onChange={(e)=>setname(e.target.value)}/>
					</div>
					<div className="address">
						<span>Phone</span>
						<input type="number" name="phone" value={phone} onChange={(e)=>setphone(e.target.value)}/>
					</div>
					<div className="address">
						<span>Email Address(Username)</span>
						<input type="email" name="em" value={email} onChange={(e)=>setemail(e.target.value)}/>
					</div>
					<div className="address">
						<span>Password</span>
						<input type="password" name="pass" value={pass} onChange={(e)=>setpass(e.target.value)}/>
					</div>
					<div className="address">
						<span>Confirm Password</span>
						<input type="password" name="cpass" value={cpass} onChange={(e)=>setcpass(e.target.value)}/>
					</div>
					<div className="address new">
						<button type="submit" disabled={loadings}>{loadings?"Registering...":"Register"}</button>
					</div>
					</form>
				</div>
				<div className="clearfix"> </div>
			</div>
		</div>
	</div>
        </>
    )
}
export default CreateAdmin;