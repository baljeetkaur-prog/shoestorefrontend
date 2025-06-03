import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { Helmet } from "react-helmet";
import { dataContext } from "../App";

function OrderHistory() {
    const [loading, setLoading] = useState(false);
    const [ordersdata, setordersdata] = useState([]);
    const [selectedOrder, setSelectedOrder] = useState(null); // For modal
    const [showModal, setShowModal] = useState(false); // Modal visibility

    const { pdata } = useContext(dataContext);

    const fetchorders = async () => {
        try {
            setLoading(true);
            const apireq = await axios.get(`${process.env.REACT_APP_APIURL}/api/fetchuserorders?un=${pdata.username}`);
            if (apireq.status >= 200 && apireq.status < 300) {
                if (apireq.data.success === false) {
                    setordersdata([]);
                    toast.info("No orders found");
                } else {
                    setordersdata(apireq.data.orddata);
                }
            } else {
                toast.error("Some error occurred, try again");
            }
        } catch (e) {
            toast.error("Error occurred: " + e.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (pdata !== null) {
            fetchorders();
        }
    }, [pdata]);

    const openModal = (order) => {
        setSelectedOrder(order);
        setShowModal(true);
    };

    const closeModal = () => {
        setSelectedOrder(null);
        setShowModal(false);
    };

    return (
        <>
            <Helmet>
                <title>Your Orders</title>
            </Helmet>
            <div className="breadcrumbs">
                <div className="container">
                    <div className="breadcrumbs-main">
                        <ol className="breadcrumb">
                            <li><Link to="/homepage">Home</Link></li>
                            <li className="active">List of Orders</li>
                        </ol>
                    </div>
                </div>
            </div>
            <div className="ckeckout">
                <div className="container">
                    {loading && <h3>Processing...</h3>}
                    {
                        ordersdata.length > 0 &&
                        <>
                            <h2 style={{textAlign:'center', marginBottom:"30px"}}>List of Orders</h2>
                            <table className="table table-striped">
                                <thead>
                                        <th>ID</th>
                                        <th>Username</th>
                                        <th>Address</th>
                                        <th>Payment Mode</th>
                                        <th>Total Bill</th>
                                        <th>Date</th>
                                        <th>Status</th>
                                </thead>
                                <tbody>
                                    {
                                        ordersdata.map((odata, i) => {
                                            const readableDate = new Date(odata.orderDate).toLocaleString("en-IN", {
                                                timeZone: "Asia/Kolkata",
                                                day: "2-digit",
                                                month: "short",
                                                year: "numeric",
                                                hour: "2-digit",
                                                minute: "2-digit",
                                                second: "2-digit",
                                            });
                                            return (
                                                <tr key={i}>
                                                    <td>
                                                        <span
                                                            style={{ color: "#800000", cursor: "pointer", textDecoration: "underline" }}
                                                            onClick={() => openModal(odata)}
                                                        >
                                                            {odata._id}
                                                        </span>
                                                    </td>
                                                    <td>{odata.username}</td>
                                                    <td>{odata.address}</td>
                                                    <td>{odata.pmode}</td>
                                                    <td>{odata.billamt}</td>
                                                    <td>{readableDate}</td>
                                                    <td>{odata.status}</td>
                                                </tr>
                                            );
                                        })
                                    }
                                </tbody>
                            </table>
                        </>
                    }

                    {/* Modal */}
                    {showModal && (
  <div className="modal fade in" style={{ display: "block", backgroundColor: "rgba(0,0,0,0.5)" }}>
    <div className="modal-dialog modal-lg">
      <div className="modal-content">
        <div className="modal-header">
          <button type="button" className="close" onClick={closeModal}>&times;</button>
          <h4 className="modal-title">Order Details: {selectedOrder._id}</h4>
        </div>
        <div className="modal-body">
          <p><strong>Username:</strong> {selectedOrder.username}</p>
          <p><strong>Address:</strong> {selectedOrder.address}</p>
          <p><strong>Payment Mode:</strong> {selectedOrder.pmode}</p>
          <p><strong>Total Bill:</strong> ₹{selectedOrder.billamt}</p>
          <p><strong>Status:</strong> {selectedOrder.status}</p>
          <p><strong>Date:</strong> {new Date(selectedOrder.orderDate).toLocaleString()}</p>
        </div>
        <div className="modal-footer">
          <button type="button" className="btn btn-default" onClick={closeModal}>Close</button>
        </div>
      </div>
    </div>
  </div>
)}

                </div>
            </div>
        </>
    );
}
export default OrderHistory;
