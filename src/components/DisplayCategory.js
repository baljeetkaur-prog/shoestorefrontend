import { Helmet } from "react-helmet"
import { Link } from "react-router-dom";
import useFetchCategories from "./customhooks/useFetchCategories";

function DisplayCategory(){
    const {allcat,loadings}=useFetchCategories();  
    return(
        <>
        <Helmet>
            <title>Category Display</title>
        </Helmet>
        <div className="shoes"> 
		<div className="container"> 
            <h1 align="center">Product Categories</h1>
			<div className="product-one">
                {
                    allcat.length>0?    
                    allcat.map((cdata,i)=>
				<div className="col-md-3 product-left" key={i}> 
					<div className="p-one simpleCart_shelfItem">							
							<Link to={`/subcategories?cid=${cdata._id}`}>
								<img src={`uploads/${cdata.picname}`} alt="" height="150"/>
						<h4>{cdata.catname}</h4>
                        </Link>
					</div>
				</div>):null}
                </div>
                </div>
                </div>
        </>
    )
}
export default DisplayCategory; 