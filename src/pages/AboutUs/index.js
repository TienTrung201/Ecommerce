import { faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';
import imgBanner from '@/assets/image/about/about-banner.jpg';

function AboutUs() {
    return (
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
            <>
                <div className="container container-content">
                    <div className="zoa-about text-center">
                        <h3>About us</h3>
                        <div className="about-banner">
                            <div className="hover-images">
                                <img src={imgBanner} className="img-responsive" alt="" />
                            </div>
                            <div className="zoa-info">
                                <div className="container">
                                    <div className="zoa-inside flex align-items-center justify-center">
                                        <p>
                                            Zoa - New York store. <span>OPEN</span> NOW
                                        </p>
                                        <p>+01 2 345 67 89 10</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="container">
                    <div className="about-content bd-bottom">
                        <div className="row">
                            <div className="col-md-7 col-sm-6 col-xs-12">
                                <div className="about-sm">
                                    <div className="hover-images">
                                        <img
                                            src={require('@/assets/image/about/small_img.jpg')}
                                            className="img-responsive"
                                            alt=""
                                        />
                                    </div>
                                </div>
                                <div className="about-info">
                                    <h2>
                                        A wayward
                                        <br /> <span>vision</span> in <br />
                                        fashion
                                    </h2>
                                    <div className="about-desc">
                                        <p>
                                            Housing an international selection of upcoming to established designers for
                                            over fifteen years.{' '}
                                        </p>
                                        <p>
                                            Zoa stands for a personal and obstinate selection. Surprising with new
                                            designers every season, great attention is given to the unique &amp;
                                            personal identity of all in-store designers. From clothing to jewellery,
                                            shoes &amp; bags, each piece is chosen with special care.
                                        </p>
                                    </div>
                                    <div className="sign">
                                        <img
                                            src={require('@/assets/image/about/signature.jpg')}
                                            className="img-responsive"
                                            alt=""
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-5 col-sm-6 col-xs-12">
                                <div className="about-img">
                                    <div className="hover-images">
                                        <img
                                            src={require('@/assets/image/about/about-2.jpg')}
                                            className="img-responsive"
                                            alt=""
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="about-bottom bd-bottom">
                        <div className="row">
                            <div className="col-md-4 col-sm-4 col-xs-12 about-element">
                                <h3>origin</h3>
                                <p>
                                    an aesthetically pleasing name, leaving
                                    <br /> room for personal interpretation
                                    <br /> through its actions.
                                </p>
                            </div>
                            <div className="col-md-4 col-sm-4 col-xs-12 about-element">
                                <h3>team</h3>
                                <p>
                                    three young individuals, convinced <br />
                                    that a lot has yet to be explored <br />
                                    in an indispensable and ubiquitous{' '}
                                </p>
                            </div>
                            <div className="col-md-4 col-sm-4 col-xs-12 about-element">
                                <h3>practicality</h3>
                                <p>
                                    garments should look good, and
                                    <br /> simultaneously making them <br />
                                    versatile is a nice challenge.{' '}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="container">
                    <div className="about-brand">
                        <div className="owl-carousel owl-theme js-owl-team centerRow">
                            <div className="brand-item">
                                <Link to="/" className="hover-images">
                                    <img
                                        src={require('@/assets/image/about/brand-urbane.png')}
                                        className="img-responsive"
                                        alt=""
                                    />
                                </Link>
                            </div>
                            <div className="brand-item">
                                <Link to="/" className="hover-images">
                                    <img
                                        src={require('@/assets/image/about/brand-nordic.png')}
                                        className="img-responsive"
                                        alt=""
                                    />
                                </Link>
                            </div>
                            <div className="brand-item">
                                <Link to="/" className="hover-images">
                                    <img
                                        src={require('@/assets/image/about/brand-cupcake.jpg')}
                                        className="img-responsive"
                                        alt=""
                                    />
                                </Link>
                            </div>
                            <div className="brand-item">
                                <Link to="/" className="hover-images">
                                    <img
                                        src={require('@/assets/image/about/brand-moment.png')}
                                        className="img-responsive"
                                        alt=""
                                    />
                                </Link>
                            </div>
                            <div className="brand-item">
                                <Link to="/" className="hover-images ">
                                    <img
                                        src={require('@/assets/image/about/brand-antonio.png')}
                                        className="img-responsive"
                                        alt=""
                                    />
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        </>
    );
}

export default AboutUs;
