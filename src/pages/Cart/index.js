import { faClose } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useRef } from 'react';
import { Link } from 'react-router-dom';

function Cart() {
    const cart = useRef();
    const wishlist = useRef();
    const cartItem = useRef();
    const wishlistItem = useRef();

    const handleChangeCart = (e) => {
        cart.current.classList.add('active', 'in');
        wishlist.current.classList.remove('active', 'in');
        cartItem.current.classList.add('active');
        wishlistItem.current.classList.remove('active');
    };
    const handleChangeWishlist = (e) => {
        cart.current.classList.remove('active', 'in');
        wishlist.current.classList.add('active', 'in');
        cartItem.current.classList.remove('active');
        wishlistItem.current.classList.add('active');
    };
    return (
        <div className="container">
            <div className="zoa-cart">
                <ul className="account-tab">
                    <li ref={cartItem} onClick={handleChangeCart} className="active">
                        <Link data-toggle="tab" to="#" aria-expanded="false">
                            Shopping Cart
                        </Link>
                    </li>
                    <li ref={wishlistItem} onClick={handleChangeWishlist} className="">
                        <Link data-toggle="tab" to="#" aria-expanded="true">
                            Wishlist
                        </Link>
                    </li>
                </ul>
                <div className="tab-content">
                    <div ref={cart} id="cart" className="tab-pane fade in active">
                        <div className="shopping-cart">
                            <div className="table-responsive">
                                <table className="table cart-table">
                                    <thead>
                                        <tr>
                                            <th className="product-thumbnail">Product</th>
                                            <th className="product-name">Description</th>
                                            <th className="product-name">Color</th>
                                            <th className="product-name">Size</th>
                                            <th className="product-price">Price</th>
                                            <th className="product-quantity">Quantity</th>
                                            <th className="product-subtotal">Total</th>
                                            <th className="product-remove">Delete</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr className="item_cart">
                                            <td className=" product-name">
                                                <div className="product-img">
                                                    <img
                                                        src={require('@/assets/image/product/cart_product_1.jpg')}
                                                        alt="Product"
                                                    />
                                                </div>
                                            </td>
                                            <td className="product-desc">
                                                <div className="product-info">
                                                    <Link href="#" title="">
                                                        Harman Kardon Onyx Studio{' '}
                                                    </Link>
                                                    <span>#SKU: 113106</span>
                                                </div>
                                            </td>
                                            <td className="product-same">
                                                <div className="product-info">
                                                    <p>Dark</p>
                                                </div>
                                            </td>
                                            <td className="product-same">
                                                <div className="product-info">
                                                    <p>L</p>
                                                </div>
                                            </td>
                                            <td className="product-same total-price">
                                                <p className="price">$19.00</p>
                                            </td>
                                            <td className="bcart-quantity single-product-detail">
                                                <div className="cart-qtt">
                                                    <button
                                                        type="button"
                                                        className="quantity-left-minus btn btn-number js-minus"
                                                        data-type="minus"
                                                        data-field=""
                                                    >
                                                        <span className="minus-icon">
                                                            <i className="ion-ios-minus-empty" />
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
                                                            <i className="ion-ios-plus-empty" />
                                                        </span>
                                                    </button>
                                                </div>
                                            </td>
                                            <td className="total-price">
                                                <p className="price">$19.00</p>
                                            </td>
                                            <td className="product-remove">
                                                <Link href="#" className="btn-del">
                                                    <FontAwesomeIcon icon={faClose} />
                                                </Link>
                                            </td>
                                        </tr>
                                        <tr className="item_cart">
                                            <td className="product-name">
                                                <div className="product-img">
                                                    <img
                                                        src={require('@/assets/image/product/cart_product_3.jpg')}
                                                        alt="Product"
                                                    />
                                                </div>
                                            </td>
                                            <td className="product-desc">
                                                <div className="product-info">
                                                    <Link href="#" title="">
                                                        Harman Kardon Onyx Studio{' '}
                                                    </Link>
                                                    <span>#SKU: 113106</span>
                                                </div>
                                            </td>
                                            <td className="product-same">
                                                <div className="product-info">
                                                    <p>Dark</p>
                                                </div>
                                            </td>
                                            <td className="product-same">
                                                <div className="product-info">
                                                    <p>L</p>
                                                </div>
                                            </td>
                                            <td className="product-same total-price">
                                                <p className="price">$19.00</p>
                                            </td>
                                            <td className="bcart-quantity single-product-detail">
                                                <div className="cart-qtt">
                                                    <button
                                                        type="button"
                                                        className="quantity-left-minus btn btn-number js-minus"
                                                        data-type="minus"
                                                        data-field=""
                                                    >
                                                        <span className="minus-icon">
                                                            <i className="ion-ios-minus-empty" />
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
                                                            <i className="ion-ios-plus-empty" />
                                                        </span>
                                                    </button>
                                                </div>
                                            </td>
                                            <td className="total-price">
                                                <p className="price">$19.00</p>
                                            </td>
                                            <td className="product-remove">
                                                <Link href="#" className="btn-del">
                                                    <FontAwesomeIcon icon={faClose} />
                                                </Link>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                            <div className="table-cart-bottom">
                                <div className="row">
                                    <div className="col-md-7 col-sm-6 col-xs-12">
                                        <div className="cart-btn-group">
                                            <Link href="" className="btn-continue">
                                                Continue shopping
                                            </Link>
                                            <Link href="" className="btn-clear">
                                                clear cart
                                            </Link>
                                        </div>
                                        <div className="coupon-group">
                                            <form className="form_coupon" action="#" method="post">
                                                <input
                                                    type="email"
                                                    defaultValue=""
                                                    placeholder="COUPON CODE"
                                                    name="EMAIL"
                                                    id="mail"
                                                    className="newsletter-input form-control"
                                                />
                                                <div className="input-icon">
                                                    <img src={require('@/assets/image/product/coupon.png')} alt="" />
                                                </div>
                                            </form>
                                            <Link href="#" className="btn-update">
                                                Update cart
                                            </Link>
                                        </div>
                                    </div>
                                    <div className="col-md-5 col-sm-6 col-xs-12">
                                        <div className="cart-text">
                                            <div className="cart-element">
                                                <p>Total products:</p>
                                                <p>$118.00</p>
                                            </div>
                                            <div className="cart-element">
                                                <p>Estimated shipping costs:</p>
                                                <p>$0.00</p>
                                            </div>
                                            <div className="cart-element text-bold">
                                                <p>Total:</p>
                                                <p>$118.00</p>
                                            </div>
                                        </div>
                                        <Link href="" className="zoa-btn zoa-checkout">
                                            Checkout
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div ref={wishlist} id="wishlist" className="tab-pane fade">
                        <div className="shopping-cart">
                            <div className="table-responsive">
                                <table className="table cart-table">
                                    <tbody>
                                        <tr className="item_cart">
                                            <td className="product-remove pd-right-30">
                                                <Link href="#" className="btn-del">
                                                    <FontAwesomeIcon icon={faClose} />
                                                </Link>
                                            </td>
                                            <td className=" product-name">
                                                <div className="product-img">
                                                    <img
                                                        src={require('@/assets/image/product/cart_product_1.jpg')}
                                                        alt="Product"
                                                    />
                                                </div>
                                            </td>
                                            <td className="product-desc">
                                                <div className="product-info">
                                                    <Link href="#" title="">
                                                        Harman Kardon Onyx Studio{' '}
                                                    </Link>
                                                    <span>#SKU: 113106</span>
                                                </div>
                                            </td>
                                            <td className="wl total-price">
                                                <p className="price">$19.00</p>
                                            </td>
                                            <td>
                                                <Link href="" className="zoa-select">
                                                    Select Options
                                                </Link>
                                            </td>
                                            <td>
                                                <Link href="" className="zoa-btn zoa-wl-addcart">
                                                    ADD TO CART
                                                </Link>
                                            </td>
                                        </tr>
                                        <tr className="item_cart">
                                            <td className="product-remove pd-right-30">
                                                <Link href="#" className="btn-del">
                                                    <FontAwesomeIcon icon={faClose} />
                                                </Link>
                                            </td>
                                            <td className=" product-name">
                                                <div className="product-img">
                                                    <img
                                                        src={require('@/assets/image/product/cart_product_3.jpg')}
                                                        alt="Product"
                                                    />
                                                </div>
                                            </td>
                                            <td className="product-desc">
                                                <div className="product-info">
                                                    <Link href="#" title="">
                                                        Harman Kardon Onyx Studio{' '}
                                                    </Link>
                                                    <span>#SKU: 113106</span>
                                                </div>
                                            </td>
                                            <td className="wl total-price">
                                                <p className="price">$19.00</p>
                                            </td>
                                            <td>
                                                <Link href="" className="zoa-select">
                                                    Select Options
                                                </Link>
                                            </td>
                                            <td>
                                                <Link href="" className="zoa-btn zoa-wl-addcart">
                                                    ADD TO CART
                                                </Link>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                            <div className="table-cart-bottom v2">
                                <div className="cart-btn-group v2">
                                    <Link href="" className="btn-continue">
                                        Continue shopping
                                    </Link>
                                    <Link href="" className="btn-clear">
                                        Share my wishlist via mail{' '}
                                        <img src={require('@/assets/image/Icon_mail.png')} alt="" />
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Cart;
