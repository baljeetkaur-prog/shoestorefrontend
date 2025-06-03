import { Helmet } from "react-helmet"
import { Link} from "react-router-dom";
import useFetchProducts from "./customhooks/useFetchProducts";
function DisplayProducts(){
    const {prodsdata,loadings}=useFetchProducts(); 
    return(
        <>
        <Helmet>
            <title>Products Display</title>
        </Helmet>
        <div class="shoes"> 
		<div class="container"> 
            <h1 align="center">Products Display - 
                {prodsdata.length>0?
                prodsdata[0].catid.catname:null} - 
                {prodsdata.length>0?
                prodsdata[0].subcatid.subcatname:null}
            </h1>
			<div class="product-one">
                {
                    prodsdata.length>0?
                    prodsdata.map((pdata,i)=>
				<div class="col-md-3 product-left" key={i}> 
					<div class="p-one simpleCart_shelfItem">							
							<Link to={`/details?pid=${pdata._id}`}>
								<img src={`uploads/${pdata.picname}`} alt="" height="150"/>
						<h4>{pdata.prodname}</h4>
                        </Link>
					</div>
				</div>):null}
                </div>
                </div>
                </div>
        </>
    )
}
export default DisplayProducts