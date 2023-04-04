import { faClose } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';

function Order() {
    return (
        <div className="shopping-cart">
            <div className="table-responsive">
                <table className="table cart-table">
                    <thead>
                        <tr>
                            <th className="product-thumbnail">Mã đơn</th>

                            {/* <th className="product-remove">Ngày mua</th> */}
                        </tr>
                    </thead>
                    <tbody>
                        <tr className="cart-items-bytrung">
                            <div className="cart-img">
                                <img
                                    src="https://th.bing.com/th/id/R.2f8e2ff49bc85a32ad0ea66ede00ab15?rik=HEQl9aC1EhBD1A&pid=ImgRaw&r=0"
                                    alt=""
                                />
                            </div>
                            <div className="cart-info">
                                <h5 className="item-name">Cart https://shopee.vn/user/purchase/</h5>
                                <p className="item-type">Hồng</p>
                                <span className="item-quantity">x2</span>
                            </div>
                            <div className="cart-total">200$</div>
                        </tr>
                        <tr className="cart-items-bytrung">
                            <div className="cart-img">
                                <img
                                    src="https://th.bing.com/th/id/R.2f8e2ff49bc85a32ad0ea66ede00ab15?rik=HEQl9aC1EhBD1A&pid=ImgRaw&r=0"
                                    alt=""
                                />
                            </div>
                            <div className="cart-info">
                                <h5 className="item-name">Cart https://shopee.vn/user/purchase/</h5>
                                <p className="item-type">Hồng</p>
                                <span className="item-quantity">x2</span>
                            </div>
                            <div className="cart-total">200$</div>
                        </tr>
                    </tbody>
                    <tfoot>
                        <tr className="cart-total-order">
                            <div className="order-total-box">
                                <p className="total-title"> Thành tiền</p>
                                <p className="total-price">$200</p>
                            </div>
                        </tr>
                    </tfoot>
                </table>
                <table className="table cart-table">
                    <thead>
                        <tr>
                            <th className="product-thumbnail">Mã đơn</th>

                            {/* <th className="product-remove">Ngày mua</th> */}
                        </tr>
                    </thead>
                    <tbody>
                        <tr className="cart-items-bytrung">
                            <div className="cart-img">
                                <img
                                    src="https://th.bing.com/th/id/R.2f8e2ff49bc85a32ad0ea66ede00ab15?rik=HEQl9aC1EhBD1A&pid=ImgRaw&r=0"
                                    alt=""
                                />
                            </div>
                            <div className="cart-info">
                                <h5 className="item-name">Cart https://shopee.vn/user/purchase/</h5>
                                <p className="item-type">Hồng</p>
                                <span className="item-quantity">x2</span>
                            </div>
                            <div className="cart-total">200$</div>
                        </tr>
                        <tr className="cart-items-bytrung">
                            <div className="cart-img">
                                <img
                                    src="https://th.bing.com/th/id/R.2f8e2ff49bc85a32ad0ea66ede00ab15?rik=HEQl9aC1EhBD1A&pid=ImgRaw&r=0"
                                    alt=""
                                />
                            </div>
                            <div className="cart-info">
                                <h5 className="item-name">Cart https://shopee.vn/user/purchase/</h5>
                                <p className="item-type">Hồng</p>
                                <span className="item-quantity">x2</span>
                            </div>
                            <div className="cart-total">200$</div>
                        </tr>
                    </tbody>
                    <tfoot>
                        <tr className="cart-total-order">
                            <div className="order-total-box">
                                <p className="total-title"> Thành tiền</p>
                                <p className="total-price">$200</p>
                            </div>
                        </tr>
                    </tfoot>
                </table>
            </div>
        </div>
    );
}

export default Order;
