import { api } from '@/api';
import { deleteData, getData } from '@/api/service';
import notificationsSlice from '@/components/Admin/Notification/notificationsSlice';
import { convertVnd } from '@/components/GlobalStyles/fuction';
import { cartSelector, userSelector } from '@/redux/selector';
import { faClose } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import cartSlice from './CartSlice';

function WishList() {
    const dispatch = useDispatch();
    // const [wishlist, setWishlist] = useState([]);
    const cartUser = useSelector(cartSelector);
    const user = useSelector(userSelector);

    const handleDeleteWishlist = (wishlistId) => {
        deleteData(api.wishLists + '/' + wishlistId)
            .then((response) => {
                setTimeout(() => {
                    dispatch(notificationsSlice.actions.showSuccess('Đã xóa khỏi danh sách yêu thích'));
                }, 1000);
                setTimeout(() => {
                    dispatch(notificationsSlice.actions.destroy());
                }, 2000);
                getData(api.wishLists, user.uid)
                    .then((response) => {
                        dispatch(cartSlice.actions.setWishlist(response));

                        console.log('wishlist', response);
                    })
                    .catch((error) => {
                        console.log(error);
                    });
                console.log('delete wishlist', response);
            })
            .catch((err) => {
                console.log('delete wishlist', err);
            });
    };
    return (
        <div className="shopping-cart">
            <div className="table-responsive">
                <table className="table cart-table">
                    <tbody>
                        {cartUser.wishlist.map((wishlist) => {
                            return (
                                <tr key={wishlist.wishlistId} className="item_cart">
                                    <td className="product-remove pd-right-30">
                                        <Link
                                            onClick={() => {
                                                handleDeleteWishlist(wishlist.wishlistId);
                                            }}
                                            to=""
                                            className="btn-del"
                                        >
                                            <FontAwesomeIcon icon={faClose} />
                                        </Link>
                                    </td>
                                    <td className=" product-name">
                                        <div className="product-img">
                                            <img src={wishlist.product.image} alt="Product" />
                                        </div>
                                    </td>
                                    <td className="product-desc">
                                        <div className="product-info">
                                            <Link
                                                to={`/product/${wishlist.product.name.replace(/ /g, '-')}/${
                                                    wishlist.productId
                                                }`}
                                                title=""
                                            >
                                                {wishlist.product.name}{' '}
                                            </Link>
                                        </div>
                                    </td>
                                    <td className="wl total-price">
                                        <p className="price">
                                            {convertVnd(
                                                (wishlist.product.items[0].price *
                                                    wishlist.product.items[0].discountRate) /
                                                    100,
                                            )}
                                        </p>
                                    </td>

                                    <td>
                                        <Link
                                            to={`/product/${wishlist.product.name.replace(/ /g, '-')}/${
                                                wishlist.productId
                                            }`}
                                            className="zoa-btn zoa-wl-addcart"
                                        >
                                            Xem chi tiết sản phẩm
                                        </Link>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
            <div className="table-cart-bottom v2">
                <div className="cart-btn-group v2">
                    <Link to="/shop" className="btn-continue">
                        Continue shopping
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default WishList;
