import React, { useEffect, useState } from "react";
import Footer from "../../../components/Footer";
import Navbar from "../../../components/Navbar";
import AdminSidebar from "../AdminSidebar";
import { Link } from "react-router-dom";
import { getUsers} from "../../../api/userAPI";

const User = () => {
     const [users, setUsers] = useState([]);

     useEffect(() => {
          getUsers()
               .then((data) => {
                    if (data.error) {
                         console.log(data.error);
                    } else {
                         setUsers(data);
                    }
               })
               .catch((err) => console.log(err));
     }, []);

     return (
          <>
               <Navbar />
               <div className="row">
                    <div className="col-md-3">
                         <AdminSidebar users />
                    </div>
                    <div className="col-md-9 p-5 text-start">
                         <div className="d-flex justify-content-between w-75">
                              <h3>Users</h3>
                         </div>
                         <div className="container">
                              <table className="table table-hover table-striped text-center p-3 my-5 shadow-sm w-75">
                                   <thead>
                                        <tr>
                                             <th>S.No.</th>
                                             <th>Username</th>
                                             <th>Email</th>
                                             <th>Orders</th>
                                             <th>Action</th>
                                        </tr>
                                   </thead>
                                   <tbody>
                                        {users.map((user, i) => {
                                             if (user.role === 0) {

                                                  return (
                                                       <tr key={i}>
                                                            <td>{i}</td>
                                                       
                                                            <td>
                                                                 <h4>{user.username}</h4>
                                                            </td>
                                                            <td>
                                                                 <h4>{user.email}</h4>
                                                            </td>
                                                            <td>
                                                                 <div>
                                                                      <Link to={`/admin/user/userOrders/${user._id}`} className='btn btn-info'>Click</Link>
                                                                 </div>
                                                            </td>
                                                            <td>
                                                                 <div>
                                                                      <Link to={`/admin/user/delete/${user._id}`} className='btn btn-danger'><i className='bi bi-trash' /></Link>
                                                                 </div>
                                                            </td>
                                                       </tr>
                                                  );
                                             }
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

export default User;
