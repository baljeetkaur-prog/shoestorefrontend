import { Helmet } from "react-helmet"

function NotAuthorizedpage(){
    return(
        <>
        <Helmet>
            <title>Not Authorized</title>
        </Helmet>
        <div className="ckeckout">
                <div className="container">
                    <h2>You are not authorized to access this page</h2>
                </div>
            </div>
        </>
    )
}
export default NotAuthorizedpage