import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { Helmet } from "react-helmet";
import { toast } from "react-toastify";

function Contactus() {
  const [name, setname] = useState("");
  const [phone, setphone] = useState("");
  const [email, setemail] = useState("");
  const [message, setmessage] = useState("");
  const [loading, setloading] = useState(false);
  const [captchatoken, setcaptchatoken] = useState(null);
  const recaptchaRef = useRef(null);

  useEffect(() => {
    const renderrecaptcha = () => {
      if (window.grecaptcha && recaptchaRef.current) {
        window.grecaptcha.render(recaptchaRef.current, {
          sitekey: "6LeK8jwrAAAAAP7I_guUfIiEldXA565SA8-boH8W",
          callback: (token) => setcaptchatoken(token),
          "expired-callback": () => setcaptchatoken(null),
        });
      }
    };
    if (window.grecaptcha) {
      renderrecaptcha();
    } else {
      window.onloadCallback = () => {
        renderrecaptcha();
      };
    }
  }, []);

  const handlesubmit = async (e) => {
    e.preventDefault();
    if (!captchatoken) {
      toast.error("Please complete the reCAPTCHA");
      return;
    }
    try {
      setloading(true);
      const apidata = { name, phone, email, message, captchatoken };
      const apiresp = await axios.post(
        `${process.env.REACT_APP_APIURL}/api/contactus`,
        apidata
      );
      if (apiresp.status >= 200 && apiresp.status < 300) {
        toast.success(apiresp.data.message);
        setname("");
        setphone("");
        setemail("");
        setmessage("");
      } else {
        toast.error("Some error occured, try again");
      }
    } catch (e) {
      const errormessage = e.response?.data?.errmsg || e.message;
      toast.error("Error Occured " + errormessage);
    } finally {
      setloading(false);
    }
  };

  return (
    <>
      <Helmet>
        <title>Contact Us</title>
      </Helmet>
      <div className="breadcrumbs">
        <div className="container">
          <div className="breadcrumbs-main">
            <ol className="breadcrumb">
              <li>
                <a href="index.html">Home</a>
              </li>
              <li className="active">Contact Us</li>
            </ol>
          </div>
        </div>
      </div>
      <div className="account">
        <div className="container">
          <div className="account-bottom" style={{ display: "flex", gap: "20px" }}>
            <div className="col-md-6 account-left" style={{ flex: 1 }}>
              <form name="form1" onSubmit={handlesubmit}>
                <div className="account-top heading">
                  <h3>CONTACT US</h3>
                </div>
                <div className="address">
                  <span>Name</span>
                  <input
                    type="text"
                    name="pname"
                    value={name}
                    onChange={(e) => setname(e.target.value)}
                  />
                </div>
                <div className="address">
                  <span>Phone</span>
                  <input
                    type="number"
                    name="phone"
                    value={phone}
                    onChange={(e) => setphone(e.target.value)}
                  />
                </div>
                <div className="address">
                  <span>Email Address(Username)</span>
                  <input
                    type="email"
                    name="em"
                    value={email}
                    onChange={(e) => setemail(e.target.value)}
                  />
                </div>
                <div className="address">
                  <span>Message</span>
                  <textarea
                    name="msg"
                    value={message}
                    onChange={(e) => setmessage(e.target.value)}
                  />
                  <br />
                  <br />
                  <div ref={recaptchaRef} id="recaptcha-container"></div>
                  <br />
                  <input type="submit" name="btn" value="submit" disabled={loading} />
                </div>
              </form>
            </div>

            {/* Image on right side */}
            <div className="col-md-6 account-right" style={{ flex: 1 }}>
              <img
                src="../images/contact.webp"
                alt="Contact Illustration"
                style={{ width: "100%", height: "auto", borderRadius: "10px", marginTop: '75px', marginLeft: '50px', opacity: '0.8', filter:'brightness(0.7)' }}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Contactus;

