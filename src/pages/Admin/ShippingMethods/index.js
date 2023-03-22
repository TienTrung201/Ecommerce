import { api } from '@/api';
import { getData } from '@/api/service';
import styles from '@/components/Admin/Layout/LayoutAdmin/LayoutAdmin.module.scss';
import classNames from 'classnames/bind';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const cx = classNames.bind(styles);

function ShippingMethods() {
  const [shippingMethods, setShippingMethods] = useState([]);

  useEffect(() => {
    getData(api.shippingMethods)
      .then((response) => {
        console.log(response);
        setShippingMethods(response);
      })
      .catch((error) => {
        console.warn(error);
      });
  }, []);

  return (
    <>
      <div className={cx('page-header', 'align-middle')}>
        <h3 className={cx('page-title', 'mt-0')}> Quản lý vận chuyển </h3>
        <nav aria-label="breadcrumb">
          <ol className={cx('breadcrumb')}>
            <li className={cx('breadcrumb-item')}></li>
            <li className={cx('breadcrumb-item', 'active')} aria-current="page">
              Quản lý vận chuyển
            </li>
          </ol>
        </nav>
      </div>
      <div className={cx('card')}>
        <div className={cx('card-body')}>
          <div className={cx('d-flex', 'justify-between', 'align-items-center', 'mb-5')}>
            <h4 className={cx('card-title', 'mb-0')}>Tất cả đơn vị vận chuyển</h4>
            <Link to="/admin/shipping-methods/create/0" className={cx('btn', 'btn-gradient-primary', 'btn-md')}>
              Thêm đơn vị vận chuyển
            </Link>
          </div>

          <table className={cx('table', 'table-striped', 'overflow-x-auto')}>
            <thead>
              <tr>
                <th>Tên đơn vị vận chuyển</th>
                <th>Giá cước</th>
              </tr>
            </thead>
            <tbody>
              {shippingMethods.map((item) => (
                <tr key={item.shippingMethodId}>
                  <td className={cx('py-1')}>
                    <Link to={`/admin/shipping-methods/update/${item.shippingMethodId}`}>{item.name}</Link>
                  </td>
                  <td>{item.price}đ</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

export default ShippingMethods;
