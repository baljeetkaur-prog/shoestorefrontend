import { Helmet } from "react-helmet"
import { Link, useSearchParams } from "react-router-dom";
import useFetchSubCategories from "./customhooks/useFetchSubCategories";
function DisplaySubCategory(){
    const {scdata,loadings}=useFetchSubCategories(); 
    return(
        <>
        <Helmet>
            <title>Sub-Category Display</title>
        </Helmet>
        <div class="shoes"> 
		<div class="container"> 
            <h1 align="center">Sub-Product Categories - 
                {scdata.length>0?
                scdata[0].catid.catname:null}
            </h1>
			<div class="product-one">
                {
                    scdata.length>0?
                    scdata.map((scdata,i)=>
				<div class="col-md-3 product-left" key={i}> 
					<div class="p-one simpleCart_shelfItem">							
							<Link to={`/products?scid=${scdata._id}`}>
								<img src={`uploads/${scdata.picname}`} alt="" height="150"/>
						<h4>{scdata.subcatname}</h4>
                        </Link>
					</div>
				</div>):null}
                </div>
                </div>
                </div>
        </>
    )
}
export default DisplaySubCategory