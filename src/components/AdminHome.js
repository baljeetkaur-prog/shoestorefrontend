import { useContext, useEffect } from "react"
import { Link } from "react-router-dom"

function AdminHome() {
    useEffect(()=>{
        document.title="Admin Home Page"
    },[]);
    const adminfunctions=[
        {action: "List of Users", path: "/fetchallmembs"}, 
        {action: "Search User", path:"/searchuser"}, 
        {action: "Create Admin", path:"/createadmin"}, 
        {action:"Manage Product Category", path:"/addcategory"}, 
        {action:"Manage Sub Category", path:"/addsubcategory"}, 
        {action:"Manage Products", path:"/addproduct"}, 
        {action:"View Placed Orders", path:"/vieworders"}
    ]; 
    return (
        <>
            <div className="ckeckout">
                <div className="container">
                    <h2 style={{textAlign:'center', marginBottom:"30px"}}>Welcome Admin</h2>
                     <table className="table table-striped">
                    <thead>
                        <th>Action</th>
                        <th>Navigate</th>
                    </thead>
                    <tbody>
                        {adminfunctions.map((fun,i)=>(
                            <tr key={i}>
                                <td>{fun.action}</td>
                                <td><Link to={fun.path}>Go to {fun.action}</Link></td>
                            </tr>
                        ))}
                    </tbody>
                   
                    </table>
                </div>
            </div>
        </>

    )
}
export default AdminHome