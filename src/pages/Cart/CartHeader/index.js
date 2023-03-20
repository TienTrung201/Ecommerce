import { faClose, faMinus, faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';

function CartHeader({ onCloseCart }) {
    return (
        <div className="cart-list">
            <div className="cart-list-heading">
                <h3 className="cart-title">My cart</h3>
                <span onClick={onCloseCart} className="close-left js-close">
                    <i className="ion-ios-close-empty">
                        <FontAwesomeIcon icon={faClose} />
                    </i>
                </span>
            </div>
            <div className="cart-inside">
                <ul className="list">
                    <li className="item-cart">
                        <div className="product-img-wrap">
                            <Link href="#" title="Product">
                                <img
                                    src={require('@/assets/image/product/cart_product_1.jpg')}
                                    alt="Product"
                                    className="img-responsive"
                                />
                            </Link>
                        </div>
                        <div className="product-details">
                            <div className="inner-left">
                                <div className="product-name">
                                    <Link href="#">Grosgrain tie cotton top</Link>
                                </div>
                                <div className="product-price">
                                    <span>$20.9</span>
                                </div>
                                <div className="cart-qtt">
                                    <button
                                        type="button"
                                        className="quantity-left-minus btn btn-number js-minus"
                                        data-type="minus"
                                        data-field=""
                                    >
                                        <span className="minus-icon">
                                            <i className="ion-ios-minus-empty">
                                                <FontAwesomeIcon icon={faMinus} />
                                            </i>
                                        </span>
                                    </button>
                                    <input
                                        type="text"
                                        name="number"
                                        defaultValue={1}
                                        className="product_quantity_number js-number"
                                    />
                                    <button
                                        type="button"
                                        className="quantity-right-plus btn btn-number js-plus"
                                        data-type="plus"
                                        data-field=""
                                    >
                                        <span className="plus-icon">
                                            <i className="ion-ios-plus-empty">
                                                <FontAwesomeIcon icon={faPlus} />
                                            </i>
                                        </span>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </li>
                    <li className="item-cart">
                        <div className="product-img-wrap">
                            <Link href="#" title="Product">
                                <img
                                    src={require('@/assets/image/product/cart_product_1.jpg')}
                                    alt="Product"
                                    className="img-responsive"
                                />
                            </Link>
                        </div>
                        <div className="product-details">
                            <div className="inner-left">
                                <div className="product-name">
                                    <Link href="#">Grosgrain tie cotton top</Link>
                                </div>
                                <div className="product-price">
                                    <span>$20.9</span>
                                </div>
                                <div className="cart-qtt">
                                    <button
                                        type="button"
                                        className="quantity-left-minus btn btn-number js-minus"
                                        data-type="minus"
                                        data-field=""
                                    >
                                        <span className="minus-icon">
                                            <i className="ion-ios-minus-empty">
                                                <FontAwesomeIcon icon={faMinus} />
                                            </i>
                                        </span>
                                    </button>
                                    <input
                                        type="text"
                                        name="number"
                                        defaultValue={1}
                                        className="product_quantity_number js-number"
                                    />
                                    <button
                                        type="button"
                                        className="quantity-right-plus btn btn-number js-plus"
                                        data-type="plus"
                                        data-field=""
                                    >
                                        <span className="plus-icon">
                                            <i className="ion-ios-plus-empty">
                                                <FontAwesomeIcon icon={faPlus} />
                                            </i>
                                        </span>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </li>
                </ul>
                <div className="cart-bottom">
                    <div className="cart-button mg-top-30">
                        <Link className="zoa-btn checkout" href="#" title="">
                            Check out
                        </Link>
                    </div>
                </div>
            </div>
            {/* End cart bottom */}
        </div>
    );
}

export default CartHeader;
