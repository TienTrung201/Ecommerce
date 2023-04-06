import { Link, useNavigate } from 'react-router-dom';
import images from '@/assets/image';
import { useDispatch, useSelector } from 'react-redux';
import { userSelector } from '@/redux/selector';
import { useEffect } from 'react';
import { getData } from '@/api/service';
import { api } from '@/api';
import userSlice from '@/pages/MyAccount/UserSlice';
import Notification from '@/components/Admin/Notification';
function UserAccount({ onOpenSearch, onOpenCart }) {
    const user = useSelector(userSelector);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    useEffect(() => {
        getData(api.userAccount)
            .then((response) => {
                dispatch(userSlice.actions.setUser(response.data));
            })
            .catch((error) => {
                if (error.message === 'unauthorized') {
                    navigate('/user/signin');
                } else {
                    const payload = JSON.parse(error.message);
                    console.warn(payload);
                }
            });
    }, [navigate, dispatch]);
    return (
        <div className="topbar-left">
            <Notification />
            <div className="element element-search hidden-xs hidden-sm">
                <Link onClick={onOpenSearch} to="#" className="zoa-icon search-toggle">
                    <img src={images.search} alt="menubar" />
                </Link>
            </div>

            <div onClick={onOpenCart} className="element element-cart">
                <Link className="zoa-icon icon-cart">
                    <img src={images.cart} alt="menubar" />
                    <span className="count cart-count">0</span>
                </Link>
            </div>
            {user.uid !== '' ? (
                <div className="user-account element element-user hidden-xs hidden-sm">
                    <Link to="/myaccount">
                        <img
                            src={
                                user.avatar === ''
                                    ? 'https://allenandclarke.com.au/wp-content/uploads/2020/08/Blank-Man_White-1343x1385px.jpg'
                                    : user.avatar
                            }
                            alt="menubar"
                        />
                    </Link>
                </div>
            ) : (
                <div className="user-account element element-user hidden-xs hidden-sm">
                    <Link to="/user/signin" className="zoa-icon js-user">
                        <img
                            src="https://allenandclarke.com.au/wp-content/uploads/2020/08/Blank-Man_White-1343x1385px.jpg"
                            alt="menubar"
                        />
                    </Link>
                </div>
            )}
        </div>
    );
}

export default UserAccount;
