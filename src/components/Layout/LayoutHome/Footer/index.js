import { faFacebookF, faInstagram, faLinkedinIn, faTiktok, faTwitter } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';

function Footer() {
    return (
        <>
            <div className="newsletter">
                <div className="container">
                    <div className="row">
                        <div className="col-md-5 col-sm-6 col-xs-12">
                            <div className="newsletter-heading">
                                <h3>get in touch</h3>
                                <p>Subscribe for latest stories and promotions (35% sale)</p>
                            </div>
                        </div>
                        <div className="col-md-7 col-sm-6 col-xs-12 flex-end">
                            <form className="form_newsletter" action="#" method="post">
                                <input
                                    type="email"
                                    placeholder="Enter your emaill"
                                    name="EMAIL"
                                    id="mail"
                                    className="newsletter-input form-control"
                                />
                                <button id="subscribe" className="button_mini zoa-btn" type="submit">
                                    Subscribe
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
            <div className="container">
                <div className="policy pad bd-top">
                    <div className="row">
                        <div className="col-xs-6 col-sm-6 col-md-3 policy-item">
                            <div className="policy-icon">
                                <img src={require('@/assets/image/policy/icon_1.png')} alt="" />
                            </div>
                            <div className="policy-content">
                                <h3>Free shipping</h3>
                                <p>on all orders over $49.00</p>
                            </div>
                        </div>
                        <div className="col-xs-6 col-sm-6 col-md-3 policy-item">
                            <div className="policy-icon">
                                <img src={require('@/assets/image/policy/icon_2.png')} alt="" />
                            </div>
                            <div className="policy-content">
                                <h3>15 days returns</h3>
                                <p>moneyback guarantee</p>
                            </div>
                        </div>
                        <div className="col-xs-6 col-sm-6 col-md-3 policy-item">
                            <div className="policy-icon">
                                <img src={require('@/assets/image/policy/icon_3.png')} alt="" />
                            </div>
                            <div className="policy-content">
                                <h3>Secure checkout</h3>
                                <p>100% protected by Paypal</p>
                            </div>
                        </div>
                        <div className="col-xs-6 col-sm-6 col-md-3 policy-item">
                            <div className="policy-icon">
                                <img src={require('@/assets/image/policy/icon_4.png')} alt="" />
                            </div>
                            <div className="policy-content">
                                <h3>100% free warranty</h3>
                                <p>moneyback guarantee</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <footer className="footer v1 bd-top">
                <div className="container">
                    <div className="f-content">
                        <div className="f-col">
                            <div className="social">
                                <Link to="/">
                                    <i className="fa fa-rss">
                                        {' '}
                                        <FontAwesomeIcon icon={faInstagram} />
                                    </i>
                                </Link>
                                <Link to="/">
                                    <i className="fa fa-facebook">
                                        <FontAwesomeIcon icon={faTwitter} />
                                    </i>
                                </Link>
                                <Link to="/">
                                    <i className="fa fa-twitter">
                                        <FontAwesomeIcon icon={faLinkedinIn} />
                                    </i>
                                </Link>
                                <Link to="/">
                                    <i className="fa fa-linkedin">
                                        <FontAwesomeIcon icon={faFacebookF} />
                                    </i>
                                </Link>
                                <Link to="/">
                                    <i className="fa fa-rss">
                                        <FontAwesomeIcon icon={faTiktok} />
                                    </i>
                                </Link>
                            </div>
                        </div>
                        <div className="f-col align-items-center">
                            <p>
                                © 2018 <Link to="/">Zoa.</Link>
                            </p>
                            <ul>
                                <li>
                                    <Link to="/">Privacy Policy</Link>
                                </li>
                                <li>
                                    <Link to="/">Terms of Use</Link>
                                </li>
                            </ul>
                        </div>
                        <div className="f-col">
                            <Link to="/">
                                <img
                                    src={require('@/assets/image/credit-card-icons.png')}
                                    alt=""
                                    className="img-responsive"
                                />
                            </Link>
                        </div>
                    </div>
                </div>
            </footer>
        </>
    );
}

export default Footer;
