import { faFacebookF, faTwitter } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';

function SignIn({ setOptionsLogin }) {
    return (
        <>
            {' '}
            <div className="col-md-4">
                <form method="post" className="form-customer form-register">
                    <div className="form-group">
                        <label htmlFor="exampleInputEmail2">E-mail</label>
                        <input type="email" className="form-control form-account" id="exampleInputEmail2" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="exampleInputPassword3">Password</label>
                        <input type="password" className="form-control form-account" id="exampleInputPassword3" />
                    </div>
                    <div className="flex justify-content-between mg-30">
                        <div className="checkbox">
                            <input
                                data-val="true"
                                data-val-required="The Remember me? field is required."
                                id="RememberMe"
                                name="RememberMe"
                                type="checkbox"
                                defaultValue="true"
                            />
                            <input name="RememberMe" type="hidden" defaultValue="false" />
                            <label htmlFor="RememberMe">Remember me</label>
                        </div>
                        <Link
                            onClick={() => {
                                setOptionsLogin('ForgotPassword');
                            }}
                            to=""
                            className="text-note no-mg"
                        >
                            Forgot Password?
                        </Link>
                    </div>
                    <div className="btn-button-group mg-top-30 mg-bottom-15">
                        <button type="submit" className="zoa-btn btn-login hover-white">
                            Sign In
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
                        setOptionsLogin('SignUp');
                    }}
                    className="text-note"
                >
                    Don’t have an account? <Link to="">Register!</Link>
                </span>
            </div>
        </>
    );
}

export default SignIn;
