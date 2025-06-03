import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { Helmet } from "react-helmet";
import { toast } from "react-toastify";
function Managesubcategory(){
	const [subcatname, setsubcatname]=useState();
	const [subcatpic, setsubcatpic]=useState(null)
	const [loadings,setLoadings]=useState(false);
	const [allcat,setallcat]=useState([]); 
	const [imgname,setimgname]=useState(); 
	const [editmode,seteditmode]=useState(false);
	const [cid,setcid] = useState("");
	const [scid,setscid]=useState();
	const [scdata,setscdata]=useState([]);
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
            formData.append("catid",cid);
            formData.append("scname",subcatname); 
            if(subcatpic!==null)
				{
					formData.append("scpic",subcatpic)
				}

			const apiresp= await axios.post(`${process.env.REACT_APP_APIURL}/api/addsubcategory`,formData)
			if(apiresp.status>=200 && apiresp.status<300)
			{
				toast.success(apiresp.data)
				fetchsubcatbycat();
				oncancel();
				if(fileInputRef.current){
					fileInputRef.current.value="";
				}
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
else if(editmode===true)
{
	try
	{
	setLoadings(true)
	const formData=new FormData();
    formData.append("scname",subcatname) //either old name or new name
	if(subcatpic!==null)
	{
		formData.append("scpic",subcatpic)
	}
	formData.append("oldpicname",imgname);
	formData.append("catid",cid); //either old or new cat
	formData.append("scid",scid);
				const apiresp = await axios.put(`${process.env.REACT_APP_APIURL}/api/updatesubcategory`,formData);
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
                        fetchsubcatbycat();
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
const fetchsubcatbycat=async()=>
{
	try
	{
		setLoadings(true);
		const apiresp=await axios.get(`${process.env.REACT_APP_APIURL}/api/getsubcatbycat?catid=${cid}`)
		if(apiresp.status>=200 && apiresp.status<300)
		{
			if(apiresp.data.success===true)
			{
				setscdata(apiresp.data.subcatdata)
			}
			else
			{
				setscdata([]);
				toast.info("No Categories Found")
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
	if(cid!=="")
	{
		fetchsubcatbycat();
	}

},[cid])
const onupdate=(subcatinfo)=>
{
	seteditmode(true);
	setsubcatname(subcatinfo.subcatname);
	setimgname(subcatinfo.picname);
	setscid(subcatinfo._id)
}
const oncancel=()=>
{
	seteditmode(false);
	setsubcatname("")
	setimgname("")
	setscid("")
	setsubcatpic(null)
	if(fileInputRef.current){
		fileInputRef.current.value="";
	}
}
const ondelsubcat=async(_id)=>
	{	
	const uchoice=window.confirm("Are you sure to delete this sub-category")
	if(uchoice)
	{
		try
		{
			setLoadings(true); 
			const apiresp=await axios.delete(`${process.env.REACT_APP_APIURL}/api/delsubcat/${_id}`)
			if(apiresp.status>=200 && apiresp.status<300)
			{
			if(apiresp.data.success===true)
			{
				toast.success("Sub-category Deleted Successfully!")
				fetchsubcatbycat();
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
		toast.error("Error Occured "+e.message)
	}
	finally
	{
		setLoadings(false)
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
						<h3>Manage Sub Category</h3>
					</div>
                    <div className="address">
                        <span>Choose Category</span>
                        <select name="cat" onChange={(e)=>setcid(e.target.value)}>
                            <option value="">Choose</option>
                            {
                                allcat.map((cdata,i)=>
                                <option value={cdata._id} key={i}>{cdata.catname}</option>
                                )
                            }
                        </select>
                    </div>
					<div className="address">
						<span>Sub Category Name</span>
						<input type="text" name="cname" value={subcatname} onChange={(e)=>setsubcatname(e.target.value)}/>
					</div>
					<div className="address">
						{editmode?
						<>
						<img src={`uploads/${imgname}`} height="50"/><br/>
						Choose new image if required<br/><br/>
						</>:null}
						<span>Sub Category Picture</span>
						<input type="file" name="cpic" accept="image/*" ref={fileInputRef} onChange={(e)=>setsubcatpic(e.target.files[0])}/>
					</div>
					<div className="address new">
						{
							editmode===false?
							<button type="submit" disbaled={loadings}>{loadings?"Adding...":"Add Sub Category"}</button>:
							<>
							<button type="submit">Update Category</button>
							<button type="button" onClick={oncancel}>Cancel</button>
							</>
						}
					</div>
					</form>
				</div>
				<div className="clearfix"> </div>
			</div>
			{
                        scdata.length>0?
                        <>
                            <h2>Added Sub Categories</h2><br/>
                            <table className="table table-striped">
                                <tbody>
                                    <tr>
                                        <th>Picture</th>
                                        <th>Sub Category Name</th>
                                        <th>Update</th>
                                        <th>Delete</th>
                                    </tr>
                            {
                                scdata.map((data,i)=>
                                    <tr key={i}>
                                        <td><img src={`uploads/${data.picname}`} alt="CategoryImage" height='50'/></td>
                                        <td>{data.subcatname}</td>
                                        <td><button onClick={()=>onupdate(data)}>Update</button></td>
                                        <td><button onClick={()=>ondelsubcat(data._id)}>Delete</button></td>
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
export default Managesubcategory;