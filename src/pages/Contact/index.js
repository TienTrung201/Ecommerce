import { faFacebook, faInstagram, faTwitter } from '@fortawesome/free-brands-svg-icons';
import { faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';

function Contact() {
    return (
        <>
            <>
                <div className="container container-content">
                    <ul className="breadcrumb">
                        <li>
                            <Link to="/">Home</Link>
                            <i className="iconRight">
                                <FontAwesomeIcon icon={faChevronRight} />
                            </i>
                        </li>
                        <li>
                            <Link to="/">Pages</Link>
                            <i className="iconRight">
                                <FontAwesomeIcon icon={faChevronRight} />
                            </i>
                        </li>
                        <li className="active">About Us</li>
                    </ul>
                </div>
                <div className="container">
                    <div className="contact-form">
                        <div className="row">
                            <div className="col-md-6 col-sm-6 col-xs-12 contact-item">
                                <div className="contact-img hover-images">
                                    <Link href="#" className="">
                                        <img
                                            src={require('@/assets/image/contact_img.jpg')}
                                            alt=""
                                            className="img-responsive"
                                        />
                                    </Link>
                                    <div className="box-center overlay-img contact-overlay-img">
                                        <Link className="email" href="#">
                                            Zoa@engotheme.com
                                        </Link>
                                        <div className="social">
                                            <Link href="#">
                                                <i className="fa fa-facebook">
                                                    <FontAwesomeIcon icon={faFacebook} />
                                                </i>
                                            </Link>
                                            <Link href="#">
                                                <FontAwesomeIcon icon={faTwitter} />
                                                <i className="fa fa-twitter"></i>
                                            </Link>
                                            <Link href="#">
                                                <FontAwesomeIcon icon={faInstagram} />
                                                <i className="fa fa-instagram"></i>
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-6 col-sm-6 col-xs-12">
                                <h3 className="contact-title">Contact us</h3>
                                <form method="post" className="form-customer form-login">
                                    <div className="form-group">
                                        <input
                                            type="email"
                                            className="form-control form-account"
                                            placeholder="Full Name"
                                        />
                                    </div>
                                    <div className="form-group">
                                        <input type="text" className="form-control form-account" placeholder="E-mail" />
                                    </div>
                                    <div className="form-group">
                                        <input
                                            type="text"
                                            className="form-control form-account"
                                            placeholder="Office / Mobile"
                                        />
                                    </div>
                                    <div className="form-group">
                                        <textarea
                                            rows={7}
                                            name="note"
                                            placeholder="Tell Us More"
                                            className="form-control form-account"
                                            defaultValue={''}
                                        />
                                    </div>
                                    <div className="btn-button-group mg-top-30 mg-bottom-15">
                                        <button type="submit" className="zoa-btn btn-login hover-white">
                                            Send Message
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                    <div className="contact-bottom">
                        <div className="row">
                            <div className="col-md-3 col-sm-6 col-xs-12 about-element">
                                <h3>say hello</h3>
                                <p>
                                    <Link href="#">Zoa@haintheme.com</Link>{' '}
                                </p>
                                <p>
                                    <Link href="#">support@zoa.vn</Link>
                                </p>
                            </div>
                            <div className="col-md-3 col-sm-6 col-xs-12 about-element">
                                <h3>call me</h3>
                                <p>+01 2 345 678 90</p>
                                <p>+01 2 987 654 21</p>
                            </div>
                            <div className="col-md-3 col-sm-6 col-xs-12 about-element">
                                <h3>address</h3>
                                <p>113 Sail-docomo st. </p>
                                <p>Montreal (melboun). USA</p>
                            </div>
                            <div className="col-md-3 col-sm-6 col-xs-12 about-element">
                                <h3>working on</h3>
                                <p>Mon - Fri:&nbsp;&nbsp;&nbsp; 9:80am - 6:30pm</p>
                                <p>Mon - Fri:&nbsp;&nbsp;&nbsp; 9:80am - 6:30pm</p>
                                <p>Sun &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp; off</p>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        </>
    );
}

export default Contact;
