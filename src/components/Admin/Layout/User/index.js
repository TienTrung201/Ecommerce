import { Link, useNavigate } from 'react-router-dom';
import images from '@/assets/image';
import { useDispatch, useSelector } from 'react-redux';
import { userSelector } from '@/redux/selector';
import { useEffect } from 'react';
import { getData } from '@/api/service';
import { api } from '@/api';
import userSlice from '@/pages/MyAccount/UserSlice';
function UserAccount({ onOpenSearch, onOpenCart }) {
    const user = useSelector(userSelector);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    useEffect(() => {
        console.log(user);
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
                            src="https://scontent.fhan9-1.fna.fbcdn.net/v/t39.30808-6/217787396_1189274101592245_3569643062164622595_n.jpg?_nc_cat=105&ccb=1-7&_nc_sid=09cbfe&_nc_ohc=Qm7J-psdizkAX8BNQKb&_nc_ht=scontent.fhan9-1.fna&oh=00_AfDTC2-xc40hubsUW_AFn5qWujK2JEWkBVMHpG9yoGpB0A&oe=642B62C3"
                            alt="menubar"
                        />
                    </Link>
                </div>
            ) : (
                <div className="element element-user hidden-xs hidden-sm">
                    <Link to="/user/signin" className="zoa-icon js-user">
                        <img src={images.user} alt="menubar" />
                    </Link>
                </div>
            )}
        </div>
    );
}

export default UserAccount;
