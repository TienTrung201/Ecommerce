import { useState } from 'react';
import { Link } from 'react-router-dom';
import ForgotPassword from './ForgotPasswprd';
import SignIn from './SignIn';
import SignUp from './SignUp';

function Login() {
    const [optionsLogin, setOptionsLogin] = useState('SignIn');

    return (
        <div className="account-form-wrapper account--open">
            <div className="container">
                <div className="account-wrapper">
                    <ul className={optionsLogin === 'ForgotPassword' ? 'displayNone' : 'account-tab text-center'}>
                        <li
                            onClick={() => {
                                setOptionsLogin('SignIn');
                            }}
                            className={optionsLogin === 'SignIn' ? 'active' : ''}
                        >
                            <Link data-toggle="tab" to="">
                                Login
                            </Link>
                        </li>
                        <li
                            className={optionsLogin === 'SignUp' ? 'active' : ''}
                            onClick={() => {
                                setOptionsLogin('SignUp');
                            }}
                        >
                            <Link data-toggle="tab" to="">
                                Register
                            </Link>
                        </li>
                    </ul>
                    <div className="tab-content">
                        <div id="login" className="tab-pane fade in active">
                            <div className="row">
                                {optionsLogin === 'SignIn' && <SignIn setOptionsLogin={setOptionsLogin} />}
                                {optionsLogin === 'SignUp' && <SignUp setOptionsLogin={setOptionsLogin} />}
                                {optionsLogin === 'ForgotPassword' && (
                                    <ForgotPassword setOptionsLogin={setOptionsLogin} />
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* End Account */}
        </div>
    );
}

export default Login;
