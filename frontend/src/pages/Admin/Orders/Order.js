import React, { useEffect,useState } from "react";
import { Link} from "react-router-dom";
import Navbar from "../../../components/Navbar";
import Footer from "../../../components/Footer";
import AdminSidebar from "../AdminSidebar";
import { getOrders } from "../../../api/orderAPI";




const Order = () => {
  const [orders, setorders] = useState([]);

  useEffect(() => {
     getOrders()
         .then(data => {
             if (data.error) {
                 console.log(data.error)
             }
             else {
                 setorders(data)
                 console.log(data)
             }
         })
 }, [])

  return (
    <>
      <Navbar />
      <div className='row'>
        <div className='col-md-3'>
          <AdminSidebar orders />
        </div>

        <div className='col-md-9 p-5 text-start'>
          <div className='d-flex justify-content-between w-75 mb-5'>
            <h3>
              Orders
            </h3>
          </div>
          <div className='container d-flex'>
            <table className="table my-3 w-75 shadow-sm text-center">
              <thead>
                <tr>
                  <th>S.No.</th>
                  <th>OrderId</th>
                  <th>Total Amount</th>
                  <th>Ordered By</th>
                  <th>Status</th>
                  <th>Order Details</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {orders &&
                  orders.map((item, i) => {

                    return (
                      <tr key={i}>
                        <td>{i + 1}</td>
                        <td>{item._id}</td>
                        <td>Rs. {item.totalAmount}</td>
                        <td>{item.user.username}</td>
                        <td>{item.status}</td>
                        <td> <Link to={`/admin/order/orderInfo/${item._id}`} className='btn btn-info'>click</Link></td>
                        <td>                          
                            <Link to={`/admin/order/delete/${item._id}`} className='btn btn-danger'><i className='bi bi-trash' /></Link>
                        </td>
                      </tr>
                    );
                  })}
              </tbody>
            </table>
          </div>

        </div>
      </div>

      <Footer />
    </>
  );
};

export default Order;
