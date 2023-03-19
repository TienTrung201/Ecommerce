import { faFacebookF, faTwitter } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';

function SignUp({ setOptionsLogin }) {
    return (
        <>
            <div className="col-md-4">
                <form method="post" className="form-customer form-login">
                    <div className="form-group">
                        <label htmlFor="exampleInputEmail1">E-mail *</label>
                        <input type="email" className="form-control form-account" id="exampleInputEmail1" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="zoaname">Name</label>
                        <input type="text" className="form-control form-account" id="zoaname" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="exampleInputPassword1">Password *</label>
                        <input type="password" className="form-control form-account" id="exampleInputPassword1" />
                    </div>
                    <div className="btn-button-group mg-top-30 mg-bottom-15">
                        <button type="submit" className="zoa-btn btn-login hover-white">
                            Sign Up
                        </button>
                    </div>
                </form>
                <div className="social-group-button">
                    <Link to="" className="twitter button">
                        <div className="slide">
                            <p>Connect with Twitter</p>
                        </div>
                        <div className="icon">
                            <i className="fa fa-twitter">
                                <FontAwesomeIcon icon={faTwitter} />
                            </i>
                        </div>
                    </Link>
                    <Link to="" className="facebook button">
                        <div className="slide">
                            <p>Connect with Facebook</p>
                        </div>
                        <div className="icon">
                            <i className="fa fa-facebook">
                                <FontAwesomeIcon icon={faFacebookF} />
                            </i>
                        </div>
                    </Link>
                </div>
                <span
                    onClick={() => {
                        setOptionsLogin('SignIn');
                    }}
                    className="text-note"
                >
                    Already have an account? <Link to="">Sign In!</Link>
                </span>
            </div>
        </>
    );
}

export default SignUp;
