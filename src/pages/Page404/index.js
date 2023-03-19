import { faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';
import img404 from '@/assets/image/404.png';
function Page404() {
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
                    <li className="active">404</li>
                </ul>
            </div>
            <div className="zoa-404">
                <div className="container">
                    <div className="row">
                        <div className="col-xs-12 col-sm-6 col-md-6">
                            <img src={img404} className="img-responsive" alt="" />
                        </div>
                        <div className="col-xs-12 col-sm-6 col-md-6">
                            <h1>Whoops!</h1>
                            <h3>Your style does not exis!</h3>
                            <p>
                                Any question? please contact us, we're usually pretty quick. Cowboys to urbanites,
                                professional athletes to ski bums, business suits to fishing guides.
                            </p>
                            <Link to="/" className="zoa-back">
                                Go back
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Page404;
