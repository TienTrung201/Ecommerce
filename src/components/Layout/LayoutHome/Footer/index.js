import { faFacebookF, faInstagram, faLinkedinIn, faTiktok, faTwitter } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';

function Footer() {
    return (
        <footer className="footer v1 bd-top">
            <div className="container">
                <div className="f-content">
                    <div className="f-col">
                        <div className="social">
                            <Link href="">
                                <i className="fa fa-rss">
                                    {' '}
                                    <FontAwesomeIcon icon={faInstagram} />
                                </i>
                            </Link>
                            <Link href="">
                                <i className="fa fa-facebook">
                                    <FontAwesomeIcon icon={faTwitter} />
                                </i>
                            </Link>
                            <Link href="">
                                <i className="fa fa-twitter">
                                    <FontAwesomeIcon icon={faLinkedinIn} />
                                </i>
                            </Link>
                            <Link href="">
                                <i className="fa fa-linkedin">
                                    <FontAwesomeIcon icon={faFacebookF} />
                                </i>
                            </Link>
                            <Link href="">
                                <i className="fa fa-rss">
                                    <FontAwesomeIcon icon={faTiktok} />
                                </i>
                            </Link>
                        </div>
                    </div>
                    <div className="f-col align-items-center">
                        <p>
                            © 2018 <Link href="">Zoa.</Link>
                        </p>
                        <ul>
                            <li>
                                <Link href="">Privacy Policy</Link>
                            </li>
                            <li>
                                <Link href="">Terms of Use</Link>
                            </li>
                        </ul>
                    </div>
                    <div className="f-col">
                        <Link href="">
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
    );
}

export default Footer;
