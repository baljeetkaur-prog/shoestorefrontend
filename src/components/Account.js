import axios from "axios";
import { useContext, useState } from "react";
import { Helmet } from "react-helmet";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { encryptPassword } from "../utils/encryptionUtils";
import { dataContext } from "../App";
import Cookies from "universal-cookie";
function Account() {
	const [name, setname] = useState();
	const [phone, setphone] = useState();
	const [email, setemail] = useState();
	const [pass, setpass] = useState();
	const [cpass, setcpass] = useState();
	const [em, setem] = useState();
	const [passw, setpassw] = useState();
	const [loadings, setLoadings] = useState(false);
	const [loadingl, setLoadingl] = useState(false);
	const navigate = useNavigate();
	const { setpdata,setisadmin } = useContext(dataContext);
	const [showresend, setshowresend] = useState(false);
	const [resendload, setresendload] = useState(false);
	const [remme,setremme]=useState(false); 
	const cookies = new Cookies();
	const clearfields = () => {
		setname("");
		setphone("");
		setemail("");
		setpass("");
		setcpass("");
	}
	const resendactivation = async () => {
		try {
			setresendload(true);
			const response = await axios.post(`${process.env.REACT_APP_APIURL}/api/resendactivation `,{ email: em });
			if (response.data.success) {
				toast.success(response.data.message);
				setshowresend(false); // hide resend button after success
			} else {
				toast.error(response.data.message);
			}
		} catch (err) {
			toast.error("Error resending activation link");
		} finally {
			setresendload(false);
		}
	};
	const onregister = async (e) => {
		e.preventDefault();
		try {
			setLoadings(true);
			if (pass === cpass) {
				const { encryptedData, iv } = await encryptPassword(pass);
				const apidata = { pname: name, phone, email, pass: encryptedData, iv } //can take key value like pname:name or just phone, this takes value automatically
				const apiresp = await axios.post(`${process.env.REACT_APP_APIURL}/api/signup`, apidata)
				if (apiresp.status >= 200 && apiresp.status < 300) {
					toast.success(apiresp.data.message)
					clearfields();
				}
			}
			else {
				toast.info("Password doesn't match")
			}
		}
		catch (e) {
			toast.error("Frontend Error Occured " + e.message)
		}
		finally {
			setLoadings(false);
		}
	}
	const onlogin = async (e) => {
		e.preventDefault();
		try {
			setLoadingl(true);
			const { encryptedData, iv } = await encryptPassword(passw);
			const logindata = { em, passw: encryptedData, iv }
			const apiresp = await axios.post(`${process.env.REACT_APP_APIURL}/api/login`, logindata)
			if (apiresp.data.success === false) {
				const message = apiresp.data.message;
				if (message === "Account not activated") {
					toast.info("Your account is not activated. Please resend the activation link.");
					setshowresend(true); // Show the resend button
				} else {
					toast.error("Incorrect Username or Password");
				}
			}
			else if (apiresp.data.success === true) {
				//storing in context
				setpdata(apiresp.data.udata)
				sessionStorage.setItem("uinfo", JSON.stringify(apiresp.data.udata)) //storing data in session
				const returnURL = sessionStorage.getItem("returnURL");
				if (returnURL) {
					sessionStorage.removeItem("returnURL");
					navigate(returnURL);
				}
				else {
					if (apiresp.data.udata.usertype === "superuser" || apiresp.data.udata.usertype === "admin") {
						setisadmin(true); 
						navigate("/adminhome")
					}
					else {
						if(remme===true)
						{
							cookies.set("ucookie",apiresp.data.udata._id, {maxAge:864000})
						}
						navigate("/homepage")
					}
				}
			}
		}
		catch (e) {
			toast.error("Error Occured" + e.message)
		}
		finally {
			setLoadingl(false);
		}
	}
	return (
		<>
			<Helmet>
				<title>User Login</title>
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
									<h3>NEW CUSTOMERS</h3>
								</div>
								<div className="address">
									<span>Name</span>
									<input type="text" name="pname" value={name} onChange={(e) => setname(e.target.value)} />
								</div>
								<div className="address">
									<span>Phone</span>
									<input type="number" name="phone" value={phone} onChange={(e) => setphone(e.target.value)} />
								</div>
								<div className="address">
									<span>Email Address(Username)</span>
									<input type="email" name="em" value={email} onChange={(e) => setemail(e.target.value)} />
								</div>
								<div className="address">
									<span>Password</span>
									<input type="password" name="pass" value={pass} onChange={(e) => setpass(e.target.value)} />
								</div>
								<div className="address">
									<span>Confirm Password</span>
									<input type="password" name="cpass" value={cpass} onChange={(e) => setcpass(e.target.value)} />
								</div>
								<div className="address new">
									<button type="submit" disabled={loadings}>{loadings ? "Registering..." : "Register"}</button>
								</div>
							</form>
						</div>
						<div className="col-md-6 account-left">
							<form name="form2" onSubmit={onlogin}>
								<div className="account-top heading">
									<h3>REGISTERED CUSTOMERS</h3>
								</div>
								<div className="address">
									<span>Email Address (Username)</span>
									<input type="email" name="email" onChange={(e) => setem(e.target.value)} />
								</div>
								<div className="address">
									<span>Password</span>
									<input type="password" name="pass" onChange={(e) => setpassw(e.target.value)} />
								</div><br/>
								<label><input type="checkbox" name="remme" onChange={(e)=>setremme(e.target.checked)}/>&nbsp;Remember Me</label>
								<div className="address">
									<Link className="forgot" to="/forgotpassword">Forgot Your Password?</Link>
									<button type="submit" disabled={loadingl}>{loadingl ? "Verifying..." : "Login"}</button>
									{showresend && (
										<div className="address">
											<button type="button" onClick={resendactivation} disabled={resendload}>
												{resendload ? "Sending..." : "Resend Activation Link"}
											</button>
										</div>
									)}
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
export default Account;