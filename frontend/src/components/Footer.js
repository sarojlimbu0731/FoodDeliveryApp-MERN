import React from 'react'
import { Link } from 'react-router-dom'
import { AiOutlineApple} from 'react-icons/ai';
import { IoLogoGooglePlaystore} from 'react-icons/io5';


const Footer = () => {
    return (
        <>
            <div className="container mx-auto w-100">
                <hr className='w-100'></hr>
                <footer className="py-5">
                    <div className="row">
                        <div className="col-6 col-md-2 mb-3">
                            <h5>OUR COMPANY</h5>
                            <ul className="nav flex-column">
                                <li className="nav-item mb-2"><Link href="#" className="nav-link p-0 text-muted">About Us</Link></li>
                                <li className="nav-item mb-2"><Link href="#" className="nav-link p-0 text-muted">Available Areas</Link></li>
                                <li className="nav-item mb-2"><Link href="#" className="nav-link p-0 text-muted">Delivery Charges</Link></li>
                                <li className="nav-item mb-2"><Link href="#" className="nav-link p-0 text-muted">Blog</Link></li>
                            </ul>
                        </div>

                        <div className="col-4 col-md-2 mb-3">
                            <h5>GET HELP</h5>
                            <ul className="nav flex-column">
                                <li className="nav-item mb-2"><Link href="#" className="nav-link p-0 text-muted">How to Order?</Link></li>
                                <li className="nav-item mb-2"><Link href="#" className="nav-link p-0 text-muted">FAQs</Link></li>
                                <li className="nav-item mb-2"><Link href="#" className="nav-link p-0 text-muted">Pricing</Link></li>
                                <li className="nav-item mb-2"><Link href="#" className="nav-link p-0 text-muted">Contact Us</Link></li>
                            </ul>
                        </div>

                        <div className="col-4 col-md-2 mb-3">
                            <h5>CALL US</h5>
                            <ul className="nav flex-column">
                                <li className="nav-item mb-2"><Link href="#" className="nav-link p-0 text-muted">Kathmandu,New Baneshwor:5656211,5656422</Link></li>
                                <li className="nav-item mb-2"><Link href="#" className="nav-link p-0 text-muted">980000123</Link></li>
                                <li className="nav-item mb-2"><Link href="#" className="nav-link p-0 text-muted">Kathmandu,Putalisadak:5652211,5656782</Link></li>
                                <li className="nav-item mb-2"><Link href="#" className="nav-link p-0 text-muted">980333333</Link></li>
                            </ul>
                        </div>

                        <div className="col-4 col-md-6  mb-3">
                            <h5>DOWNLOAD APP</h5>
                            <div className='btn btn-dark'>
                                <p style={{fontSize:"10px"}}>ANDROID APP ON</p>
                                <IoLogoGooglePlaystore className='fs-2'/>Google Play
                            </div><br></br><br></br>
                            <div className='btn btn-dark'>
                                <p style={{fontSize:"10px"}}>DOWNLOAD ON THE</p>
                                <AiOutlineApple className='fs-2'/>App Store</div>

                        </div>
                    </div>

                    <div className="d-flex flex-column flex-sm-row justify-content-between border-top">
                        <p>&copy; 2022 Company, Inc. All rights reserved.</p>
                        <ul className="list-unstyled d-flex">
                            <li className="ms-3"><Link className="link-dark" href="#"><i className="bi bi-facebook fs-4"></i></Link></li>
                            <li className="ms-3"><Link className="link-dark" href="#"><i className="bi bi-instagram fs-4"></i></Link></li>
                            <li className="ms-3"><Link className="link-dark" href="#"><i className="bi bi-twitter fs-4"></i></Link></li>
                        </ul>
                    </div>
                </footer>
            </div>

        </>
    )
}

export default Footer