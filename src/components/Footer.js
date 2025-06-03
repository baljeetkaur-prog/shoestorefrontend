import { Link } from "react-router-dom"
import Contactus from "./Contactus";

function Footer(){
    return(
        <>
           <div className="footer">
		<div className="container">
			<div className="footer-top">
				<div className="col-md-3 footer-left">
					<h3>ABOUT US</h3>
					<ul>
						<li><Link to="/whoweare">Who We Are</Link></li>
						<li><Link to="/contactus">Contact Us</Link></li>
						<li><Link to="/team">Team</Link></li>			 
					</ul>
				</div>
				<div className="col-md-3 footer-left">
					<h3>YOUR ACCOUNT</h3>
					<ul>
						<li><Link to='/account'>Your Account</Link></li>
						<li><Link to="/discount">Discount</Link></li>
						<li><Link to="/orderhistory">Track your order</Link></li>					 					 
					</ul>
				</div>
				<div className="col-md-3 footer-left">
					<h3>CUSTOMER SERVICES</h3>
					<ul>
						<li><Link to="/faq">FAQ</Link></li>
						<li><Link to="/shipping">Shipping</Link></li>
						<li><Link to="shippingguide">Buying Guides</Link></li>					 
					</ul>
				</div>
				<div className="col-md-3 footer-left">
					<h3>CATEGORIES</h3>
					<ul>
						<li><a href="#">Sports Shoes</a></li>
						<li><a href="#">Casual Shoes</a></li>
						<li><a href="#">Formal Shoes</a></li>		 
					</ul>
				</div>
				<div className="clearfix"> </div>
			</div>
		</div>
	</div>
        </>
    )
}
export default Footer