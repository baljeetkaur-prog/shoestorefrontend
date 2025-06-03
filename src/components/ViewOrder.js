import axios from "axios";
import { Link} from "react-router-dom";
import { toast } from "react-toastify";
import { Helmet } from "react-helmet";
import { useState } from "react";

function ViewOrder() {
    const [loading, setLoading] = useState(false);
    const [odata, setodata] = useState([]);
    const [odate, setodate] = useState();
    const [selectedOrder, setSelectedOrder] = useState(null);
    const [showViewModal, setShowViewModal] = useState(false);
    const [showUpdateModal, setShowUpdateModal] = useState(false);
    const [nstatus, setnstatus] = useState("");

    const fetchorders = async () => {
        try {
            setLoading(true);
            const apireq = await axios.get(`${process.env.REACT_APP_APIURL}/api/fetchorders?odate=${odate}`);
            if (apireq.status >= 200 && apireq.status < 300) {
                if (apireq.data.success === false) {
                    setodata([]);
                    toast.info("No orders found");
                } else if (apireq.data.success === true) {
                    setodata(apireq.data.orddata);
                }
            } else {
                toast.error("Some error occurred. Try again.");
            }
        } catch (e) {
            toast.error("Error occurred: " + e.message);
        } finally {
            setLoading(false);
        }
    };

    const handleView = (order) => {
        setSelectedOrder(order);
        setShowViewModal(true);
    };

    const closeModals = () => {
        setShowViewModal(false);
        setShowUpdateModal(false);
        setSelectedOrder(null);
    };

    const updateOrderStatus = async () => {
        if (!nstatus) {
            toast.warning("Please select a new status.");
            return;
        }
        try {
            const response = await axios.post(`${process.env.REACT_APP_APIURL}/api/updatestatus`, {
                orderId: selectedOrder._id,
                nstatus: nstatus,
            });
            if (response.data.success) {
                toast.success("Status updated successfully");
                fetchorders(); // refresh list
                closeModals();
            } else {
                toast.error("Failed to update status");
            }
        } catch (error) {
            toast.error("Error updating status: " + error.message);
        }
    };

    return (
        <>
            <Helmet>
                <title>List of Placed Orders</title>
            </Helmet>

            <div className="breadcrumbs">
                <div className="container">
                    <div className="breadcrumbs-main">
                        <ol className="breadcrumb">
                            <li><Link to="/adminhome">Home</Link></li>
                            <li className="active">List of Placed Orders</li>
                        </ol>
                    </div>
                </div>
            </div>

            <div className="ckeckout">
                <div className="container">
                    Choose Date:{" "}
                    <input type="date" name="odate" onChange={(e) => setodate(e.target.value)} />
                    <button onClick={fetchorders}>Submit</button>
                    {loading && <h3>Processing...</h3>}

                    {odata.length > 0 && (
                        <>
                            <h2>List of Orders</h2>
                            <br />
                            <table className="table table-striped">
                                <thead>
                                        <th>ID</th>
                                        <th>Username</th>
                                        <th>Address</th>
                                        <th>Payment Mode</th>
                                        <th>Total Bill</th>
                                        <th>Date</th>
                                        <th>Status</th>
                                        <th>Update</th>
                                </thead>
                                <tbody>
                                    {odata.map((odata, i) => {
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
                                                        style={{ color: "#800000", textDecoration: "underline", cursor: "pointer" }}
                                                        onClick={() => handleView(odata)}
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
                                                <td>
                                                    <button onClick={() => {
                                                        setSelectedOrder(odata);
                                                        setnstatus(odata.status);
                                                        setShowUpdateModal(true);
                                                    }}>
                                                        Update
                                                    </button>
                                                </td>
                                            </tr>
                                        );
                                    })}
                                </tbody>
                            </table>
                        </>
                    )}

                    {/* View Modal */}
                    {showViewModal && selectedOrder && (
                        <div className="modal fade in" style={{ display: "block", backgroundColor: "rgba(0,0,0,0.5)" }}>
                            <div className="modal-dialog modal-lg">
                                <div className="modal-content">
                                    <div className="modal-header">
                                        <button type="button" className="close" onClick={closeModals}>
                                            &times;
                                        </button>
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
                                        <button className="btn btn-default" onClick={closeModals}>Close</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Update Modal */}
                    {showUpdateModal && selectedOrder && (
                        <div className="modal fade in" style={{ display: "block", backgroundColor: "rgba(0,0,0,0.5)" }}>
                            <div className="modal-dialog">
                                <div className="modal-content">
                                    <div className="modal-header">
                                        <button type="button" className="close" onClick={closeModals}>
                                            &times;
                                        </button>
                                        <h4 className="modal-title">Update Status for Order: {selectedOrder._id}</h4>
                                    </div>
                                    <div className="modal-body">
                                        <select className="form-control" value={nstatus} onChange={(e) => setnstatus(e.target.value)}>
                                            <option value="Processing">Processing</option>
                                            <option value="Shipped">Shipped</option>
                                            <option value="Delivered">Delivered</option>
                                            <option value="Cancelled">Cancelled</option>
                                        </select>
                                    </div>
                                    <div className="modal-footer">
                                        <button className="btn btn-success" onClick={updateOrderStatus}>Update</button>
                                        <button className="btn btn-default" onClick={closeModals}>Cancel</button>
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

export default ViewOrder;
