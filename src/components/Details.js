import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { Helmet } from "react-helmet"
import { Link, useNavigate, useSearchParams } from "react-router-dom"
import { toast } from "react-toastify";
import { dataContext } from "../App";

function Details() {
	const [params] = useSearchParams();
	const prodid = params.get("pid")
	const [Loading, setLoading] = useState(false);
	const [remcost, setremcost] = useState();
	const [pdetails, setpdetails] = useState({});
	const [flag, setflag] = useState(false);
	const [quantity, setquantity] = useState(1);
	const { pdata } = useContext(dataContext);
	const navigate = useNavigate();
	useEffect(() => {
		fetchproddetailsbyid();
	}, [])
	const fetchproddetailsbyid = async () => {
		try {
			setLoading(true);
			const apiresp = await axios.get(`${process.env.REACT_APP_APIURL}/api/getproddetailsbyid?prodid=${prodid}`);
			if (apiresp.status >= 200 && apiresp.status < 300) {
				if (apiresp.data.success === true) {
					setpdetails(apiresp.data.pdata)
				}
				else {
					toast.info("No details found");
				}
			}
		}
		catch (e) {
			toast.error("Error Occured " + e.message)
		}
		finally {
			setLoading(false);
		}
	}
	useEffect(() => {
	if (pdetails && typeof pdetails.rate === 'number') {
		let discountAmount = 0;

		// Ensure discount is treated only as percentage and capped safely
		if (typeof pdetails.discount === 'number' && pdetails.discount > 0) {
			let validDiscount = pdetails.discount;
			if (validDiscount >= 100) {
				validDiscount = 99; // Cap at 99% to avoid 0 or negative remcost
			}
			discountAmount = (validDiscount / 100) * pdetails.rate;
		}

		const finalPrice = Math.max(1, Math.round(pdetails.rate - discountAmount)); // Avoid 0 or negative price
		setremcost(finalPrice);
	}

	if (pdetails && pdetails.stock > 0) {
		setflag(true);
	}
}, [pdetails]);
	const stripHTML = (html) => {
		const div = document.createElement("div");
		div.innerHTML = html;
		return div.textContent || div.innerText || "";
	};
	const addToCart = async () => {
		if (pdata === null) {
			toast.info("Please login to add the product to cart");
			sessionStorage.setItem("returnURL", window.location.pathname + window.location.search);
			navigate(`/account`);
		}
		else {
			setLoading(true);
			var tc = remcost * quantity;
			const cartdata = { prodid, imgname: pdetails.picname, pname: pdetails.prodname, remcost, quantity, tc, uname: pdata.username }
			const apiresp = await axios.post(`${process.env.REACT_APP_APIURL}/api/savecart`, cartdata)
			if (apiresp.status >= 200 && apiresp.status < 300) {
				if (apiresp.data.success === true) {
					navigate('/cart')
				}
				else {
					toast.error("Error while adding to cart, please try again")
				}
			}
		}
	}
	return (
		<>
			<Helmet>
				<title>Product Details</title>
			</Helmet>
			<div class="breadcrumbs">
				<div class="container">
					<div class="breadcrumbs-main">
						<ol class="breadcrumb">
							<li><Link to="/">Home</Link></li>
							<li class="active">Product Details</li>
						</ol>
					</div>
				</div>
			</div>
			<div class="single contact">
				<div class="container">
					<div class="single-main">
						<div class="col-md-9 single-main-left">
							<div class="sngl-top">
								<div class="col-md-5 single-top-left">
									<div class="flexslider">
									<ul class="slides">
											<li data-thumb="images/s1.jpg">
												<img src={`uploads/${pdetails.picname}`} />
											</li>
											</ul>
										</div>
								</div>
								<div class="col-md-7 single-top-right">
									<div class="details-left-info simpleCart_shelfItem">
										<h3>{pdetails.prodname}</h3>
										<div class="price_single">
											<span class="reducedfrom">₹{pdetails.rate}</span>
											<span class="actual item_price">₹{remcost}</span>
											{pdetails.discount > 0 && pdetails.discount <= 100 && (
												<p className="discount-info" style={{ color: "green", marginTop: "5px" }}>
													You save ₹{((pdetails.discount / 100) * pdetails.rate).toFixed(2)}
												</p>
											)}
										</div>
										<h2 class="quick">Quick Overview:</h2>
										<p class="quick_desc">{stripHTML(pdetails.description)}</p>
										{
											flag === true ?
												<>
													<div class="quantity_box">
														<ul class="product-qty">
															<span>Quantity:</span>
															<select value={quantity} onChange={(e) => setquantity(Number(e.target.value))}>
																{Array.from({ length: Math.min(pdetails.stock, 10) }, (_, i) => (
																	<option key={i + 1} value={i + 1}>{i + 1}</option>))}
															</select>
														</ul>
													</div>
													<div class="clearfix"> </div>
													<p class="availability">Availability: <span class="color">In stock</span></p>
													<div class="single-but item_add">
														<button type="submit" onClick={addToCart}>Add to Cart</button>
													</div>
												</> : <p class="availability">Availability: {" "}<span className="color">{pdetails.stock > 0 ? "In Stock" : "Out of Stock"}</span></p>
										}

									</div>
								</div>
								<div class="clearfix"></div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	)
}
export default Details