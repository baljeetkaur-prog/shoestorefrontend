import axios from "axios";
import { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { toast } from "react-toastify";
import { useRef } from "react";
function Managecategory(){
	const [catname, setcatname]=useState();
	const [catpic, setcatpic]=useState(null)
	const [loadings,setLoadings]=useState(false);
	const [allcat,setallcat]=useState([]); 
	const [imgname,setimgname]=useState(); 
	const [editmode,seteditmode]=useState(false); 
	const [cid,setcid] = useState();
	const fileInputRef=useRef(null);

	const handlesubmit=async(e)=>
	{
		e.preventDefault();
		if(editmode===false)
		{
		try
		{
			setLoadings(true); 

            const formData=new FormData()
            formData.append("cname",catname)
            if(catpic!==null)
				{
					formData.append("cpic",catpic)
				}

			const apiresp= await axios.post(`${process.env.REACT_APP_APIURL}/api/addcategory`,formData, {withCredentials:true})
			if(apiresp.status>=200 && apiresp.status<300)
			{
				toast.success(apiresp.data)
				fetchallcat();
				oncancel();
				if(fileInputRef.current){
					fileInputRef.current.value="";
				}
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
else if(editmode===true)
{
	try
	{
	setLoadings(true)
	const formData=new FormData();
	formData.append("cname",catname) //either old name or new name
	if(catpic!==null)
	{
		formData.append("cpic",catpic)
	}
	formData.append("oldpicname",imgname)
	formData.append("cid",cid)
				const apiresp = await axios.put(`${process.env.REACT_APP_APIURL}/api/updatecategory`,formData);
					if(apiresp.status>=200 && apiresp.status<300)
					{
						if(apiresp.data.success===true)
						{
							toast.success("Category Updated Successfully")
							oncancel();
							if(fileInputRef.current){
								fileInputRef.current.value="";
							}
						}
						else
						{
							toast.error("Category not updated")
						}
						fetchallcat();
					}
				}
				catch(e)
				{
					toast.error("Error Occured " + e.message)
				}
				finally 
				{
					setLoadings(false);
				}
}
	}
const fetchallcat=async()=>{
	try
	{
		setLoadings(true)
		const apiresp=await axios.get(`${process.env.REACT_APP_APIURL}/api/getallcat`)
		if(apiresp.status>=200 && apiresp.status<300){
			if(apiresp.data.success===true){
				setallcat(apiresp.data.catdata)
			}
			else
			{
				toast.info("No Categories found")
				setallcat([])

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
useEffect(()=>{
	fetchallcat();
},[])
const onupdate=(cdata)=>
{
	seteditmode(true)
	setcatname(cdata.catname)
	setimgname(cdata.picname)
	setcid(cdata._id)
}
const oncancel=()=>
{
	seteditmode(false)
	setcatname("")
	setimgname("")
	setcid("")
	setcatpic(null)
	
}
const ondelcat=async(_id)=>
{
	const uchoice=window.confirm("Are you sure to delete this category")
	if(uchoice)
	{
		try
		{
		setLoadings(true); 
		const apireq=await axios.delete(`${process.env.REACT_APP_APIURL}/api/delcat/${_id}`)
		if(apireq.status>=200 && apireq.status<300){
			if(apireq.data.success===true){
				toast.success("Category Deleted Successfully")
				fetchallcat();
				oncancel();
			}
			else
			{
				toast.error("Error while deleting")
			}
		}
		else
		{
			toast.error("Some error occured try again")
		}
	}
	catch(e)
	{
		toast.error("Error occured "+e.message)
	}
	finally
	{		setLoadings(false)
	}
}
};
    return(
        <>
        <Helmet>
            <title>Add Product Category</title>
        </Helmet>
		<div className="breadcrumbs">
			<div className="container">
				<div className="breadcrumbs-main">
					<ol className="breadcrumb">
						<li><a href="index.html">Home</a></li>
						<li className="active">Manage Category</li>
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
						<h3>Manage Category</h3>
					</div>
					<div className="address">
						<span>Category Name</span>
						<input type="text" name="cname" value={catname} onChange={(e)=>setcatname(e.target.value)}/>
					</div>
					<div className="address">
						{editmode?
						<>
						<img src={`uploads/${imgname}`} height="50"/><br/>
						Choose new image if required<br/><br/>
						</>:null}
						<span>Category Picture</span>
						<input type="file" name="cpic" accept="image/*" ref={fileInputRef} onChange={(e)=>setcatpic(e.target.files[0])}/>
					</div>
					<div className="address new">
						{
							editmode===false?
							<button type="submit" disbaled={loadings}>{loadings?"Adding...":"Add Category"}</button>:
							<>
							<button type="submit">Update Category</button>
							<button type="button" onClick={oncancel}>Cancel</button>
							</>
						}
					</div>
					</form>
				</div>
				<div className="clearfix"> </div>
				{loadings===true?<h3>Processing...</h3>:null}
				{
					allcat.length>0?
					<>
					<h2>Added Categories</h2><br/>
					<table className="table table-striped">
						<tbody>
							<tr>
								<th>Picture</th>
								<th>Category Name</th>
								<th>Update</th>
								<th>Delete</th>
							</tr>
							{
								allcat.map((data,i)=>
								<tr key={i}>
									<td><img src={`uploads/${data.picname}`} alt="Category Image" height="50"/></td>
									<td>{data.catname}</td>
									<td><button onClick={()=>onupdate(data)}>Update</button></td>
									<td><button onClick={()=>ondelcat(data._id)}>Delete</button></td>
								</tr>)
							}
						</tbody>
					</table>
					</>:null

				}
			</div>
		</div>
	</div>
        </>
    )
}
export default Managecategory;