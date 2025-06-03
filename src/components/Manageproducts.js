import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { Helmet } from "react-helmet";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
function Manageproducts() {
	const [prodname,setprodname] = useState();
	const [prate,setprate] = useState();
	const [dis,setdis] = useState();
	const [descrip,setdescrip] = useState();
	const [stock,setstock] = useState();
	const [feat,setfeat] = useState();
	const [prodpic,setprodpic] = useState(null);
	const [loadings, setLoadings] = useState(false);
	const [allcat,setallcat] = useState([]);
	const [cid,setcid] = useState("");
	const [scid,setscid] = useState("");
	const [scdata,setscdata] = useState([]);
    const [prodsdata,setprodsdata]=useState([])
    const navigate=useNavigate();
    const fileInputRef = useRef(null);

    const handlesubmit = async (e) => {
        e.preventDefault();
        try {
            setLoadings(true);

            const formData = new FormData()
            formData.append("catid", cid);
            formData.append("scid", scid);
            formData.append("pname", prodname)
            formData.append("rate", prate)
            formData.append("dis", dis)
            formData.append("descrip", descrip)
            formData.append("stock", stock)
            formData.append("featured", feat)
            if (prodpic !== null) {
                formData.append("ppic", prodpic)
            }

            const apiresp = await axios.post(`${process.env.REACT_APP_APIURL}/api/addproduct`, formData)
            if (apiresp.status >= 200 && apiresp.status < 300) {
                toast.success("Product added successfully")
                fetchprodsbysubcat(); 
                setprodname("");
            setprate("");
            setdis("");
            setdescrip("");
            setstock("");
            setfeat("");
            setprodpic(null);
                if (fileInputRef.current) {
                    fileInputRef.current.value = "";
                }
            }
        }
        catch (e) {
            toast.error("Error Occured " + e.message)
        }
        finally {
            setLoadings(false);
        }
    }

    const fetchallcat = async () => {
        try {
            setLoadings(true)
            const apiresp = await axios.get(`${process.env.REACT_APP_APIURL}/api/getallcat`)
            if (apiresp.status >= 200 && apiresp.status < 300) {
                if (apiresp.data.success === true) {
                    setallcat(apiresp.data.catdata)
                }
                else {
                    toast.info("No Categories found")
                    setallcat([])

                }
            }
        }
        catch (e) {
            toast.error("Error Occured " + e.message)
        }
        finally {
            setLoadings(false);
        }
    }
    useEffect(() => {
        fetchallcat();
    }, [])
    const fetchsubcatbycat = async () => {
        try {
            setscdata([]);
            setLoadings(true);
            const apiresp = await axios.get(`${process.env.REACT_APP_APIURL}/api/getsubcatbycat?catid=${cid}`);
            if (apiresp.status >= 200 && apiresp.status < 300) {
                if (apiresp.data.success === true) {
                    setscdata(apiresp.data.subcatdata)
                }
                else {
                    setscdata([])
                    toast.info("No sub categories found");

                }
            }
        }
        catch (e) {
            toast.error("Error Occured " + e.message)
        }
        finally {
            setLoadings(false);
        }
    }

    useEffect(() => {
        if (cid !== "") {
            setprodsdata([]);
            fetchsubcatbycat();
        }
    }, [cid])
    const fetchprodsbysubcat=async()=>
    {
        try
        {
            setLoadings(true); 
            const apiresp=await axios.get(`${process.env.REACT_APP_APIURL}/api/getprodsbysubcat/${scid}`)
            if(apiresp.status>=200 && apiresp.status<300)
            {
                if(apiresp.data.success===true)
                {
                setprodsdata(apiresp.data.pdata)
                }
                else
                {
                    setprodsdata([]); 
                    toast.info("No Products Found")
                }
        }
    }
    catch(e)
    {
        toast.error("Error Occured "+e.message)
    }
    finally
    {
        setLoadings(false);
    }
}
useEffect(()=>
{
    if(scid !=="")
    {
        console.log("Fetching products for sub-category: ", scid)
        fetchprodsbysubcat();
    }
},[scid])
const onupdate=(pid)=>{
    navigate(`/updateproduct?prod=${pid}`)
}
const ondelprod=async(_id)=>{
    const uchoice=window.confirm("Are you sure to delete this product")
    if(uchoice){
        try
        {
            setLoadings(true); 
            const apiresp=await axios.delete(`${process.env.REACT_APP_APIURL}/api/delprod/${_id}`)
            if(apiresp.status>=200 && apiresp.status<300){
                if(apiresp.data.success===true)
                {
                    toast.success("Product Deleted Successfully")
                    fetchprodsbysubcat(); 
                }
                else{
                    toast.error("Error while deleting")
                }
            }
            else{
                toast.error("Some error occured try again")
            }
        }
        catch(e)
        {
            toast.error("Error Occured "+e.message)
        }
        finally
        {
            setLoadings(false); 
        }
    }
}
    return (
        <>
            <Helmet>
                <title>Update Product</title>
            </Helmet>
            <div className="breadcrumbs">
                <div className="container">
                    <div className="breadcrumbs-main">
                        <ol className="breadcrumb">
                            <li><a href="index.html">Home</a></li>
                            <li className="active">Manage Product</li>
                        </ol>
                    </div>
                </div>
            </div>
            <div className="account">
                <div className="container">
                    <div className="account-bottom">
                        <div className="col-md-6 account-left">
                            <form name="form1" onSubmit={handlesubmit}>
                                <div className="account-top heading">
                                    <h3>Manage Product</h3>
                                </div>
                                <div className="address">
                                    <span>Choose Category</span>
                                    <select name="cat" onChange={(e) => setcid(e.target.value)}>
                                        <option value="">Choose</option>
                                        {
                                            allcat.map((cdata, i) =>
                                                <option value={cdata._id} key={i}>{cdata.catname}</option>
                                            )
                                        }
                                    </select>
                                </div>
                                <div className="address">
                                    <span>Choose Sub-category</span>
                                    <select name="subcat" onChange={(e) => setscid(e.target.value)}>
                                        <option value="">Choose</option>
                                        {
                                            scdata.map((scdata, i) =>
                                                <option value={scdata._id} key={i}>{scdata.subcatname}</option>
                                            )
                                        }
                                    </select>
                                </div>
                                <div className="address">
                                    <span>Product Name</span>
                                    <input type="text" value={prodname} name="pname" onChange={(e) => setprodname(e.target.value)} />
                                </div>
                                <div className="address">
                                    <span>Rate(Do not add any symbol, only numbers)</span>
                                    <input type="text" value={prate} name="pname" onChange={(e) => setprate(e.target.value)} />
                                </div>
                                <div className="address">
                                    <span>Discount(In percent, do not add any percent symbol)</span>
                                    <input type="text" value={dis} name="pname" onChange={(e) => setdis(e.target.value)} />
                                </div>
                                <div className="address">
                                    <span>Description</span>
                                    <textarea name="descp" value={descrip} onChange={(e) => setdescrip(e.target.value)}></textarea>
                                </div>
                                <div className="address">
                                    <span>Stock</span>
                                    <input type="text" value={stock} name="pname" onChange={(e) => setstock(e.target.value)} />
                                </div>
                                <div className="address">
                                    <span>Featured</span>
                                    <label><input type="radio" name="feat" value="yes"  checked={feat === "yes"} onChange={(e) => setfeat(e.target.value)} />Yes</label>&nbsp;
                                    <label><input type="radio" name="feat" value="no" checked={feat === "no"} onChange={(e) => setfeat(e.target.value)} />No</label>
                                </div>
                                <div className="address">
                                    <span>Product Picture</span>
                                    <input type="file" name="ppic" accept="image/*" ref={fileInputRef} onChange={(e) => setprodpic(e.target.files[0])} />
                                </div>
                                <div className="address new">
                                    <button type="submit" disabled={loadings}>{loadings ? "Adding..." : "Add Product"}</button>
                                </div>
                            </form>
                        </div>
                        <div className="clearfix"> </div>
                    </div>
                    {
                        prodsdata.length>0?
                        <>
                            <h2>Added Products</h2><br/>
                            <table className="table table-striped">
                                <tbody>
                                    <tr>
                                        <th>Picture</th>
                                        <th>Product Name</th>
                                        <th>Price</th>
                                        <th>Update</th>
                                        <th>Delete</th>
                                    </tr>
                            {
                                prodsdata.map((data,i)=>
                                    <tr key={i}>
                                        <td><img src={`uploads/${data.picname}`} alt="CategoryImage" height='50'/></td>
                                        <td>{data.prodname}</td>
                                        <td>{data.rate}</td>
                                        <td><button onClick={()=>onupdate(data._id)}>Update</button></td>
                                        <td><button onClick={()=>ondelprod(data._id)}>Delete</button></td>
                                    </tr>
                                )
                            }
                            </tbody>
                            </table>
                        </>:null
                    }
                </div>
            </div>
        </>
    )
}
export default Manageproducts;