import axios from "axios";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { toast } from "react-toastify";
// import { Editor } from '@tinymce/tinymce-react';
function Updateproduct() {
	const [prodname, setprodname] = useState();
	const [prate, setprate] = useState();
	const [dis, setdis] = useState();
	const [descrip,setdescrip] = useState();
	const [stock, setstock] = useState();
	const [feat, setfeat] = useState();
	const [prodpic, setprodpic] = useState(null);
	const [loading, setLoading] = useState(false);
	const [allcat, setallcat] = useState([]);
	const [cid, setcid] = useState("");
	const [scid, setscid] = useState("");
	const [scdata, setscdata] = useState([]);
	const [params] = useSearchParams();
	const pid = params.get("prod")
	const [imgname, setimgname] = useState();

	const handlesubmit = async (e) => {
		e.preventDefault();
		try {
			setLoading(true);

			const formData = new FormData()
			formData.append("pid", pid);
			formData.append("catid", cid);
			formData.append("subcatid", scid);
			formData.append("pname", prodname)
			formData.append("rate", prate)
			formData.append("dis", dis)
			formData.append("descrip",descrip)
			formData.append("stock", stock)
			formData.append("featured", feat)
			formData.append("oldpicname", imgname);
			if (prodpic !== null) {
				formData.append("ppic", prodpic)
			}

			const apiresp = await axios.put(`${process.env.REACT_APP_APIURL}/api/updateproduct`, formData);
			if (apiresp.status >= 200 && apiresp.status < 300) {
				if (apiresp.data.success === true) {
					toast.success("Category Updated Successfully")
				}
				else {
					toast.error("Category not updated")
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
	const fetchallcat = async () => {
		try {
			setLoading(true);
			const apiresp = await axios.get(`${process.env.REACT_APP_APIURL}/api/getallcat`);
			if (apiresp.status >= 200 && apiresp.status < 300) {
				if (apiresp.data.success === true) {
					setallcat(apiresp.data.catdata)
				}
				else {
					toast.info("No categories found");
					setallcat([])
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
		fetchallcat();
	}, [])

	const fetchsubcatbycat = async () => {
		try {
			setscdata([]);
			setLoading(true);
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
			setLoading(false);
		}
	}

	useEffect(() => {
		if (cid !== "") {
			fetchsubcatbycat();
		}
	}, [cid])

	useEffect(() => {
		fetchproddetailsbyid();
	}, [])

	const fetchproddetailsbyid = async () => {
		try {
			const apiresp = await axios.get(`${process.env.REACT_APP_APIURL}/api/getproddetailsbyid?prodid=${pid}`);
			if (apiresp.status >= 200 && apiresp.status < 300) {
				if (apiresp.data.success === true) {
					console.log("Image Name:", apiresp.data.pdata.picname);
					setprodname(apiresp.data.pdata.prodname)
					setprate(apiresp.data.pdata.rate)
					setdis(apiresp.data.pdata.discount)
					setdescrip(apiresp.data.pdata.description)
					setstock(apiresp.data.pdata.stock)
					setfeat(apiresp.data.pdata.feat)
					setcid(apiresp.data.pdata.catid)
					setscid(apiresp.data.pdata.subcatid)
					setimgname(apiresp.data.pdata.picname)
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

	return (
		<>
			<div className="breadcrumbs">
				<div className="container">
					<div className="breadcrumbs-main">
						<ol className="breadcrumb">
							<li><a href="index.html">Home</a></li>
							<li className="active">Update Product</li>
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
									<h3>Update Product</h3>
								</div>

								<div className="address">
									<span>Choose Category</span>
									<select name="cat" onChange={(e) => setcid(e.target.value)} value={cid}>
										<option value="">Choose</option>
										{
											allcat.map((cdata, i) =>
												<option value={cdata._id} key={i}>{cdata.catname}</option>
											)
										}
									</select>
								</div>

								<div className="address">
									<span>Choose Sub Category</span>
									<select name="subcat" onChange={(e) => setscid(e.target.value)} value={scid}>
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
									<input type="text" value={prate} name="prate" onChange={(e) => setprate(e.target.value)} />
								</div>

								<div className="address">
									<span>Discount(In percent, do not add any percent symbol)</span>
									<input type="text" value={dis} name="pdis" onChange={(e) => setdis(e.target.value)} />
								</div>

								<div className="address">
									<span>Description</span>
									{/* <Editor
										  apiKey='ozpzovip8gyrh56ytft5j0ejc2m704rh8d1zcddlucqq5tit'
										  init={{
											plugins: [
											  // Core editing features
											  'anchor', 'autolink', 'charmap', 'codesample', 'emoticons', 'image', 'link', 'lists', 'media', 'searchreplace', 'table', 'visualblocks', 'wordcount',
											  // Your account includes a free trial of TinyMCE premium features
											  // Try the most popular premium features until Apr 24, 2025:
											  'checklist', 'mediaembed', 'casechange', 'formatpainter', 'pageembed', 'a11ychecker', 'tinymcespellchecker', 'permanentpen', 'powerpaste', 'advtable', 'advcode', 'editimage', 'advtemplate', 'ai', 'mentions', 'tinycomments', 'tableofcontents', 'footnotes', 'mergetags', 'autocorrect', 'typography', 'inlinecss', 'markdown','importword', 'exportword', 'exportpdf'
											],
											toolbar: 'undo redo | blocks fontfamily fontsize | bold italic underline strikethrough | link image media table mergetags | addcomment showcomments | spellcheckdialog a11ycheck typography | align lineheight | checklist numlist bullist indent outdent | emoticons charmap | removeformat',
											tinycomments_mode: 'embedded',
											tinycomments_author: 'Author name',
											mergetags_list: [
											  { value: 'First.Name', title: 'First Name' },
											  { value: 'Email', title: 'Email' },
											],
											ai_request: (request, respondWith) => respondWith.string(() => Promise.reject('See docs to implement AI Assistant')),
										  }}
										  value={descrip}
											onEditorChange={(content) => setdescrip(content)}
										/> */}
								<textarea name="descp" value={descrip} onChange={(e)=>setdescrip(e.target.value)} style={{minHeight:"200px"}}></textarea>
						</div>

						<div className="address">
							<span>Stock</span>
							<input type="text" value={stock} name="pstock" onChange={(e) => setstock(e.target.value)} />
						</div>

						<div className="address">
							<span>Featured</span>
							<label><input type="radio" name="feat" checked={feat === "yes"} value="yes" onChange={(e) => setfeat(e.target.value)} />Yes</label>&nbsp;
							<label><input type="radio" name="feat" checked={feat === "no"} value="no" onChange={(e) => setfeat(e.target.value)} />No</label>
						</div>

						<div className="address">

							<span>Product Picture</span>
							<img src={`/uploads/${imgname}`} height="50" /><br /><br />
							Choose new image if required<br /><br />

							<input type="file" name="ppic" accept="image/*" onChange={(e) => setprodpic(e.target.files[0])} />
						</div>
						<div className="address new">

							<button type="submit" disabled={loading}>{loading ? "Updating..." : "Update Product"}</button>


						</div>
					</form>
				</div>
				<div className="clearfix"> </div>
			</div>
		</div >
			</div >
		</>
	)
}
export default Updateproduct;