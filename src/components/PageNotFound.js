import { Helmet } from "react-helmet"

function PageNotFound(){
    return(
        <>
        <Helmet>
            <title>404 Error Page</title>
        </Helmet>
        <div className="ckeckout">
                <div className="container">
                    <h2>No Page Found</h2>
                </div>
            </div>
        </>
    )
}
export default PageNotFound