import { useState } from "react";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import Cookies from "universal-cookie";

function MyCookie() {
  const [pname, setpname] = useState("");
  const [cookieValue, setCookieValue] = useState("");
  const cookies = new Cookies();

  // Set the cookie with expiry and path
  const savevalue = () => {
    if (pname.trim()) {
      const expiryDate = new Date();
      expiryDate.setDate(expiryDate.getDate() + 1); // Expires in 1 day

      cookies.set("ucookie", pname, {
        path: "/",         // Ensure visibility on all routes
        expires: expiryDate,
      });

      setCookieValue(`Cookie Value: ${pname}`);
    } else {
      alert("Please enter a name");
    }
  };

  // Read the cookie
  const readvalue = () => {
    const value = cookies.get("ucookie");
    if (value !== undefined) {
      setCookieValue(`Cookie Value: ${value}`);
    } else {
      setCookieValue("No cookie found.");
    }
  };

  // Remove the cookie
  const delcookie = () => {
    cookies.remove("ucookie", { path: "/" }); // Path must match
    setCookieValue("Cookie deleted.");
  };

  return (
    <>
      <Helmet>
        <title>Cookie</title>
      </Helmet>

      <div className="breadcrumbs">
        <div className="container">
          <div className="breadcrumbs-main">
            <ol className="breadcrumb">
              <li><Link to="/homepage">Home</Link></li>
              <li className="active">Cookies</li>
            </ol>
          </div>
        </div>
      </div>

      <div className="ckeckout">
        <div className="container">
          <h3>Cookies</h3>
          <form name="form1">
            <input
              type="text"
              name="pname"
              placeholder="Name"
              onChange={(e) => setpname(e.target.value)}
              value={pname}
            /><br /><br />
            <button type="button" onClick={savevalue}>SET</button>
            <button type="button" onClick={readvalue}>GET</button>
            <button type="button" onClick={delcookie}>REMOVE</button>
          </form>
          <br />
          <p>{cookieValue}</p>
        </div>
      </div>
    </>
  );
}

export default MyCookie;
