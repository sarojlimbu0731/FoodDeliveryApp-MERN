import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import Navbar from "../../../components/Navbar";
import Footer from "../../../components/Footer";
import AdminSidebar from "../AdminSidebar";
import { isAuthenticated } from "../../../api/userAPI";
import { myOrders } from "../../../redux/actions/orderActions";


const UserOrders = () => {
  const { token} = isAuthenticated();
  const { userId } = useParams()
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(myOrders(userId,token));
  }, []);

  const myorders = useSelector((state) => state.myOrders.orders);

  return (
    <>
      <Navbar />
      <div className='row'>
        <div className='col-md-3'>
          <AdminSidebar users />
        </div>

        <div className='col-md-9 p-5 text-start'>
          <div className='d-flex justify-content-between w-75 mb-5'>
            <h3>
              User Orders
            </h3>
            <Link to='/admin/users' className='btn btn-primary'>GO BACK</Link>
          </div>
          <div className='container d-flex'>
            <table className="table my-3 w-75 shadow-sm text-center">
              <thead>
                <tr>
                  <th>S.No.</th>
                  <th>No. of items</th>
                  <th>Total Price</th>
                  <th>Status</th>
                  <th>Order Details</th>
                </tr>
              </thead>
              <tbody>
                {myorders &&
                  myorders.map((item, i) => {
                    let order_items_number_arr = item.orderItems.map(
                      (items) => items.quantity
                    );
                    let order_items_number = order_items_number_arr.reduce(
                      (acc, cur) => acc + cur
                    );

                    return (
                      <tr key={i}>
                        <td>{i + 1}</td>
                        <td>{order_items_number}</td>
                        <td>Rs. {item.totalAmount}</td>
                        <td>{item.status}</td>
                        <td><Link to={`/admin/order/orderInfo/${item._id}`} className='btn btn-info'>click</Link></td>
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

export default UserOrders;
