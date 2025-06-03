import { FaShippingFast, FaMapMarkedAlt, FaClock, FaExclamationTriangle, FaBoxOpen } from "react-icons/fa";
import { Link } from "react-router-dom";
function Shipping() {
  return (
    <>
      <div className="breadcrumbs">
        <div className="container">
          <div className="breadcrumbs-main">
            <ol className="breadcrumb">
              <li>
                <Link to="/homepage">Home</Link>
              </li>
              <li className="active">Shipping</li>
            </ol>
          </div>
        </div>
      </div>
      <div className="ckeckout">
        <div className="container">
          <div className="shipcontainer">
            <h2 className="shiphead">Shipping & Delivery Information</h2>

            <div className="shipgrid">
              <div className="shipcard">
                <FaClock className="shipicon" />
                <h3>Delivery Timeline</h3>
                <p>We process all orders within 1–2 business days. You can expect delivery within 3–7 working days based on your location.</p>
              </div>

              <div className="shipcard">
                <FaMapMarkedAlt className="shipicon" />
                <h3>Where We Ship</h3>
                <p>We currently ship across all locations in India. International shipping is coming soon to bring Freestyle shoes worldwide.</p>
              </div>

              <div className="shipcard">
                <FaShippingFast className="shipicon" />
                <h3>Shipping Charges</h3>
                <p>Enjoy Free Shipping on orders over ₹999. For smaller orders, a flat fee of ₹49 is applied at checkout.</p>
              </div>

              <div className="shipcard">
                <FaExclamationTriangle className="shipicon" />
                <h3>Delays & Support</h3>
                <p>If your order hasn't arrived after 10 days, don’t worry. Reach out to us at <Link to="/contactus">Contact Us</Link>, and our team will assist you.</p>
              </div>
              <div className="shipcard">
                <FaMapMarkedAlt className="shipicon" />
                <h3>Order Tracking</h3>
                <p>
                  Once your order is shipped, you'll receive a tracking link via email or SMS. Use it to monitor your package in real time.
                </p>
              </div>

              <div className="shipcard">
                <FaBoxOpen className="shipicon" />
                <h3>Packaging</h3>
                <p>
                  All products are carefully packed in durable, eco-friendly boxes to ensure your shoes arrive safe and stylish.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Shipping;