import { api } from '@/api';
import { getData } from '@/api/service';
import images from '@/assets/admin/images';
import styles from '@/components/Admin/Layout/LayoutAdmin/LayoutAdmin.module.scss';
import { faCircleCheck } from '@fortawesome/free-regular-svg-icons';
import { faShippingFast } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Badge, Divider, Timeline } from 'antd';
import classNames from 'classnames/bind';
import dayjs from 'dayjs';
import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';

const cx = classNames.bind(styles);

function ShopOrdersDetail() {
  const [shopOders, setShopOrder] = useState({});
  const { action, id } = useParams();

  useEffect(() => {
    Promise.all([getData(api.shopOrders + '/' + id)])
      .then((response) => {
        console.log(response);
        setShopOrder(response[0]);
      })
      .catch((error) => {
        console.warn(error);
      });
  }, [id]);

  return (
    <>
      <div className={cx('page-header', 'align-middle', 'mb-0')}>
        <h3 className={cx('page-title', 'mt-0')}>Chi tiết đơn hàng #{shopOders.orderId}</h3>
        <nav aria-label="breadcrumb">
          <ol className={cx('breadcrumb')}>
            <li className={cx('breadcrumb-item')}>
              <Link to="/admin/orders">Danh sách đơn hàng</Link>
            </li>
            <li className={cx('breadcrumb-item', 'active')} aria-current="page">
              Chi tiết đơn hàng
            </li>
          </ol>
        </nav>
      </div>
      <div className={cx('page-header', 'align-middle')}>
        <p>{dayjs(shopOders.orderDate).format('YYYY/MM/DD HH:MM')}</p>
      </div>
      <div className={cx('row', 'gx-4', 'gy-4')}>
        <div className={cx('col-md-8')}>
          <div className={cx('card')}>
            <div className={cx('card-body')}>
              {/* Card title */}
              <h4 className={cx('card-title')}>
                Chi tiết đơn hàng
                <Badge
                  count={'Chưa giao hàng'}
                  style={{
                    marginLeft: 12,
                    color: '#333',
                    backgroundColor: '#fed713',
                  }}
                />
              </h4>
              {/* End card title */}

              <Divider />
              <div className={cx('w-100', 'overflow-x-auto')}>
                <table className={cx('table')}>
                  <tbody>
                    {/* Order items */}
                    <tr>
                      <td className={cx('py-1', 'ps-0', 'vertical-align-top')}>
                        <img
                          style={{ width: 42, height: 42 }}
                          className={cx('rounded')}
                          src={images.faces.face1}
                          alt=""
                        />
                      </td>
                      <td className={cx('py-1')}>
                        <p className={cx('mb-0', 'small')}>Gấu bông Teddy cute</p>
                        <p className={cx('mb-0', 'small')}>25cm / Xanh</p>
                        <p className={cx('mb-0', 'small')}>SKU: SP001</p>
                      </td>
                      <td className={cx('py-1')}>500.000đ x 1</td>
                      <td className={cx('py-1', 'pe-0', 'text-end')}>500.000đ</td>
                    </tr>
                    {/* End order items */}

                    {/* Total price */}
                    <tr>
                      <td className={cx('py-1', 'ps-0', 'border-hide', 'vertical-align-top')}></td>
                      <td className={cx('py-1', 'border-hide')}></td>
                      <td className={cx('py-1', 'border-hide')}>Giá</td>
                      <td className={cx('py-1', 'pe-0', 'border-hide', 'text-end')}>500.000đ</td>
                    </tr>
                    <tr>
                      <td className={cx('py-1', 'ps-0', 'border-hide', 'vertical-align-top')}></td>
                      <td className={cx('py-1', 'border-hide')}></td>
                      <td className={cx('py-1', 'border-hide')}>Khuyến mãi</td>
                      <td className={cx('py-1', 'pe-0', 'border-hide', 'text-end')}>500.000đ</td>
                    </tr>
                    <tr>
                      <td className={cx('py-1', 'ps-0', 'border-hide', 'vertical-align-top')}></td>
                      <td className={cx('py-1', 'border-hide')}></td>
                      <td className={cx('py-1', 'border-hide')}>
                        <p className={cx('mb-0', 'small')}>Vận chuyển</p>
                        <p className={cx('mb-0', 'small', 'text-secondary')}>Shopee Express</p>
                      </td>
                      <td className={cx('py-1', 'pe-0', 'border-hide', 'text-end')}>500.000đ</td>
                    </tr>
                    <tr>
                      <td className={cx('py-1', 'border-hide')}></td>
                      <td className={cx('py-1', 'border-hide')}></td>
                      <td className={cx('py-1', 'border-hide', 'fw-semibold')}>Tổng cộng</td>
                      <td className={cx('py-1', 'pe-0', 'border-hide', 'text-end', 'fw-semibold')}>500.000đ</td>
                    </tr>
                    {/* End total price */}
                  </tbody>
                </table>
              </div>
              <Divider />
              <div className={cx('d-flex', 'justify-content-between', 'align-items-center')}>
                <div className={cx('d-flex', 'justify-content-between', 'align-items-center')}>
                  <FontAwesomeIcon className={cx('text-success', 'fs-5')} icon={faCircleCheck} />
                  <p className={cx('mb-0', 'ms-2', 'small', 'fw-semibold', 'text-uppercase')}>
                    Đơn hàng đã xác nhận thanh toán
                  </p>
                </div>
                <button className={cx('btn', 'btn-light')}>Hoàn trả</button>
              </div>

              <Divider className={cx('mt-4', 'mb-4')} />

              <div className={cx('d-flex', 'justify-content-between', 'align-items-center')}>
                <div className={cx('d-flex', 'justify-content-between', 'align-items-center')}>
                  <FontAwesomeIcon className={cx('text-secondary', 'fs-5')} icon={faShippingFast} />
                  <p className={cx('mb-0', 'ms-2', 'small', 'fw-semibold', 'text-uppercase')}>Giao hàng</p>
                </div>
                <button className={cx('btn', 'btn-gradient-primary')}>Giao hàng</button>
              </div>
            </div>
          </div>

          <div className={cx('card', 'mt-4')}>
            <div className={cx('card-body')}>
              <h4 className={cx('card-title')}>Trạng thái đơn hàng</h4>
              {/* <p className={cx('card-description')}>Không có khách hàng</p> */}

              <Timeline
                className={cx('mt-5')}
                items={[
                  {
                    children: 'Đã giao cho đơn vị vận chuyển 2023-09-01',
                  },
                  {
                    children: 'Đang chuẩn bị 2023-09-01',
                  },
                  {
                    children: 'Đã thanh toán 2023-09-01',
                  },
                  {
                    children: 'Đã đặt hàng 2023-09-01',
                  },
                ]}
              />
            </div>
          </div>
        </div>

        <div className={cx('col-md-4')}>
          <div className={cx('card')}>
            <div className={cx('card-body')}>
              <h4 className={cx('card-title')}>Khách hàng</h4>
              <p className={cx('card-description')}>Không có khách hàng</p>

              <Divider />

              <div>
                <p className={cx('h6')}>Liên hệ</p>
                <div>
                  <p className={cx('text-secondary', 'small', 'mb-0')}>Không có liên hệ</p>
                </div>
              </div>

              <Divider />

              <div>
                <p className={cx('h6')}>Địa chỉ giao hàng</p>
                <div>
                  <p className={cx('text-secondary', 'small', 'mb-0')}>Trần Xuân Phúc</p>
                  <p className={cx('text-secondary', 'small', 'mb-0')}>09334683579</p>
                  <p className={cx('text-secondary', 'small', 'mb-0')}>79, Dương Quảng Hàm, Hà nội</p>
                  <p className={cx('text-secondary', 'small', 'mb-0')}>Phường Quan Hoa</p>
                  <p className={cx('text-secondary', 'small', 'mb-0')}>Quận Cầu Giấy</p>
                  <p className={cx('text-secondary', 'small', 'mb-0')}>Hà Nội</p>
                  <p className={cx('text-secondary', 'small', 'mb-0')}>Việt Nam</p>
                </div>
              </div>

              <Divider />

              <div>
                <p className={cx('h6')}>Thông tin mua hàng</p>
                <div>
                  <p className={cx('text-secondary', 'small', 'mb-0')}>Không có thông tin mua hàng</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ShopOrdersDetail;
