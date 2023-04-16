import { Link } from 'react-router-dom';

function ForgotPassword({ setOptionsLogin }) {
    return (
        <>
            {' '}
            <div style={{ paddingTop: '100px' }} className="col-md-4 ">
                <form method="post" className="form-customer form-reset">
                    <div className="form-group">
                        <label htmlFor="exampleInputEmail5">E-mail *</label>
                        <input type="email" className="form-control form-account" id="exampleInputEmail5" />
                        <div
                            style={{ textAlign: 'right' }}
                            onClick={() => {
                                setOptionsLogin('SignIn');
                            }}
                            className="text-note"
                        >
                            <Link to="">Sign In!</Link>
                        </div>
                    </div>
                    <div className="btn-button-group mg-top-30 mg-bottom-15">
                        <button type="submit" className="zoa-btn btn-login hover-white">
                            Reset Password
                        </button>
                    </div>
                </form>
            </div>
        </>
    );
}

export default ForgotPassword;
