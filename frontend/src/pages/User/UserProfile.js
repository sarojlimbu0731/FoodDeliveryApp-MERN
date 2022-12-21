import React, { useEffect, useState } from "react";
import Footer from "../../components/Footer";
import Navbar from "../../components/Navbar";
import { useDispatch, useSelector } from "react-redux";
import { Link} from "react-router-dom";
import { isAuthenticated, updateUser } from "../../api/userAPI";
import { myOrders } from "../../redux/actions/orderActions";
import './userprofile.css'


const UserProfile = () => {
  const { user, token } = isAuthenticated();
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState('')
  const [email, setEmail] = useState(user.email)
  const [username, setUsername] = useState(user.username);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(myOrders(user._id,token));
  }, []);

  const myorders = useSelector((state) => state.myOrders.orders);

  const handleSubmit = (e) => {
    e.preventDefault()
    updateUser(user._id, email, username, token)
      .then(data => {
        if (data.error) {
          setError(data.error)
          setSuccess(false)
        }
        else {
          setSuccess(true)
          setError('')
        }
      })
  }

  const showError = () => {
    if (error) {
      return <div className='alert alert-danger'>{error}</div>
    }
  }
  const showSuccess = () => {
    if (success) {
      return <div className='alert alert-success'>Update Successful.</div>
    }
  }

  return (
    <>
      <Navbar />
      <div id="test"></div>
      <div className=" mx-auto" id="userprofile">
        <hr className=" mx-auto my-3" />
        <div className="row my-5">
          <div className="col-6 shadow-sm p-2">
            <h4 className="text-decoration-underline">My Orders</h4>
            <table className="table my-3 text-center text-white fs-5  mx-auto w-75">
              <thead>
                <tr>
                  <th>S.No.</th>
                  <th>No. of items</th>
                  <th>Total Price</th>
                  <th>Status</th>
                  <th>Action</th>
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
                        <td>
                          <Link
                            to={`/user/orderDetails/${item._id}`}
                            className="btn btn-info"
                          >
                            View Details
                          </Link>
                        </td>
                      </tr>
                    );
                  })}
              </tbody>
            </table>
          </div>
          <div className="col-6 shadow-sm p-2">
            <h4 className="text-decoration-underline">Profile</h4>
            <div >
              <form className='mt-3 w-75 mx-auto'>
                {showError()}
                {showSuccess()}
                <div className="mb-3 row">
                  <label htmlFor="userid" className="col-sm-2 col-form-label">UserId</label>
                  <div className="col-sm-10">
                    <input readOnly type="text" className="form-control" id="userid" value={user._id} />
                  </div>
                </div>

                <div className="mb-3 row">
                  <label htmlFor="email" className="col-sm-2 col-form-label">Email</label>
                  <div className="col-sm-10">
                    <input type="text" className="form-control" id="email" placeholder={email} onChange={e => setEmail(e.target.value)} />
                  </div>
                </div>

                <div className="mb-3 row">
                  <label htmlFor="username" className="col-sm-2 col-form-label">Username</label>
                  <div className="col-sm-10">
                    <input type="text" className="form-control" id="username" placeholder={username} onChange={e => setUsername(e.target.value)} />
                  </div>
                </div>

                <button className='btn btn-success mt-3 w-50' onClick={handleSubmit}>Update</button>
              </form>

            </div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default UserProfile;
