import { faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';

function CheckOut() {
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

                    <li className="active">Check Out</li>
                </ul>
            </div>
            <div className="check-out">
                <div className="container">
                    <div className="titlell">
                        <h2>Checkout</h2>
                    </div>
                    <div className="row">
                        <div className="col-md-7 col-sm-7">
                            <div className="form-name">
                                <div className="content">
                                    <h5>
                                        Returning Custumer?{' '}
                                        <span style={{ textTransform: 'uppercase' }}>
                                            {' '}
                                            click
                                            <Link href="#" style={{ color: '#333', textDecoration: 'underline' }}>
                                                {' '}
                                                here{' '}
                                            </Link>
                                            to login
                                        </span>
                                    </h5>
                                    <h5>
                                        Have a coupon?
                                        <span style={{ textTransform: 'uppercase' }}>
                                            {' '}
                                            click{' '}
                                            <Link href="#" style={{ color: '#333', textDecoration: 'underline' }}>
                                                {' '}
                                                here
                                            </Link>{' '}
                                            to enter your code
                                        </span>
                                    </h5>
                                </div>
                                <div className="billing">
                                    <h2 style={{ fontSize: 26, paddingBottom: 20, fontWeight: 'bold' }}>
                                        billing details
                                    </h2>
                                    <form action="#" method="post">
                                        <div className="row">
                                            <div className="col-md-6 col-sm-6">
                                                <label className="out">
                                                    firt name<span style={{ color: '#f33' }}>*</span>
                                                </label>
                                                <br />
                                                <input
                                                    type="text"
                                                    name="country"
                                                    placeholder="invalix text input"
                                                    required=""
                                                    className="firstname"
                                                />
                                            </div>
                                            <div className="col-md-6 col-sm-6">
                                                <label className="out">
                                                    Last name<span>*</span>
                                                </label>
                                                <br />
                                                <input
                                                    type="text"
                                                    name="city"
                                                    placeholder="felix Nguyen"
                                                    required=""
                                                    className="lastname"
                                                />
                                            </div>
                                        </div>
                                        <label className="out">company name</label>
                                        <br />
                                        <input type="text" name="city" required="" className="district" />
                                        <div className="row">
                                            <div className="col-md-6 col-sm-6">
                                                <label className="out">email address *</label>
                                                <br />
                                                <input type="text" name="email" required="" className="country" />
                                            </div>
                                            <div className="col-md-6 col-sm-6">
                                                <label className="out">phone *</label>
                                                <br />
                                                <input type="text" name="phone" required="" className="district" />
                                                <i className="fa fa-caret-down" aria-hidden="true" />
                                            </div>
                                        </div>
                                        <label className="out">country *</label>
                                        <br />
                                        <input type="text" name="country" required="" className="district" />
                                        <label className="out">address *</label>
                                        <br />
                                        <input type="text" name="address" required="" className="district" />
                                        <div className="row">
                                            <div className="col-md-6 col-sm-6 ">
                                                <label className="out">Postcode/ZIP</label>
                                                <br />
                                                <input type="text" name="zip" required="" className="country" />
                                            </div>
                                            <div className="col-md-6 col-sm-6">
                                                <label className="out">town/city *</label>
                                                <br />
                                                <input type="text" name="town" required="" className="district" />
                                            </div>
                                        </div>
                                        <input type="checkbox" name="vehicle1" />
                                        <span style={{ color: '#333', fontSize: 13 }}> Creat an acount</span>
                                        <br />
                                        <label className="out" style={{ marginTop: 20 }}>
                                            order note
                                        </label>
                                        <textarea name="message" className="comment" defaultValue={''} />
                                    </form>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-5 col-sm-5 ">
                            <div className="order">
                                <div className="content-order">
                                    <div className="table">
                                        <table>
                                            <caption>your order</caption>
                                            <thead>
                                                <tr>
                                                    <th>product</th>
                                                    <th />
                                                    <th>total</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr>
                                                    <td>religion polo shirt</td>
                                                    <td>
                                                        <i className="fa fa-times" aria-hidden="true" />1
                                                    </td>
                                                    <td>$1,499.00</td>
                                                </tr>
                                                <tr>
                                                    <td>religion jersey polo shirt</td>
                                                    <td>
                                                        <i className="fa fa-times" aria-hidden="true" />1
                                                    </td>
                                                    <td>$1,499.00</td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                    <div className="content-total">
                                        <div className="total">
                                            <h5 className="sub-total">sub total</h5>
                                            <h5 className="prince">$1,750.00</h5>
                                        </div>
                                        <div className="content-radio">
                                            <h5 style={{ color: '#222', fontSize: 14, fontWeight: 'bold' }}>
                                                shipping:
                                            </h5>
                                            <div className="radio">
                                                <form action="#" method="post">
                                                    <input type="radio" />{' '}
                                                    <span style={{ color: '#333', fontSize: 14 }}>FLAT RATE:</span>{' '}
                                                    <span id="prince1">$12.00</span>
                                                    <br />
                                                    <input type="radio" className="button2" />
                                                    <span style={{ color: '#6c6c6c', fontSize: 14, paddingTop: 15 }}>
                                                        {' '}
                                                        FREE SHIPPING
                                                    </span>
                                                    <br />
                                                    <input type="radio" className="button3" />
                                                    <span style={{ color: '#6c6c6c', fontSize: 14, paddingTop: 15 }}>
                                                        {' '}
                                                        LOCAL DELIVERY:
                                                    </span>
                                                    <span id="prince2" style={{ color: '#6c6c6c', fontSize: 14 }}>
                                                        {' '}
                                                        $5.00
                                                    </span>
                                                    <br />
                                                </form>
                                            </div>
                                        </div>
                                        <div className="total">
                                            <h5 className="sub-total">sub total</h5>
                                            <h5 className="prince">$1,750.00</h5>
                                        </div>
                                        <div className="payment">
                                            <input type="radio" name="gender" className="so1" />
                                            <span style={{ fontSize: 16, color: '#494949', fontWeight: 'bold' }}>
                                                {' '}
                                                Direct Bank Transfer
                                            </span>
                                            <p style={{ paddingLeft: 20, paddingBottom: 20 }}>
                                                Make your payment directly into our bank account.Please use your Order
                                                ID as the payment reference. Your order shipped until the funds have
                                                cleared in our account.
                                            </p>
                                            <hr />
                                            <input type="radio" name="gender" className="so2" />
                                            <span style={{ fontSize: 16, color: '#494949' }}> Check Payments</span>
                                            <br />
                                            <hr />
                                            <input type="radio" name="gender" className="so2" />
                                            <span style={{ fontSize: 16, color: '#494949' }}> Cash On Delivery</span>
                                        </div>
                                        <div className="place-ober">
                                            <button className="ober">place order</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default CheckOut;
