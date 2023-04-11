import { faClose } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';

function WishList() {
    return (
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
                                    <img src={require('@/assets/image/product/cart_product_1.jpg')} alt="Product" />
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
                                    <img src={require('@/assets/image/product/cart_product_3.jpg')} alt="Product" />
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
                        Share my wishlist via mail <img src={require('@/assets/image/Icon_mail.png')} alt="" />
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default WishList;
