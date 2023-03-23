import { api } from '@/api';
import { getData } from '@/api/service';
import images from '@/assets/admin/images';
import styles from '@/components/Admin/Layout/LayoutAdmin/LayoutAdmin.module.scss';
import classNames from 'classnames/bind';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const cx = classNames.bind(styles);

function ProductCategories() {
  const [categories, setCategories] = useState([]);
  const [promotions, setPromotions] = useState([]);

  useEffect(() => {
    Promise.all([getData(api.categories), getData(api.promotions)])
      .then((values) => {
        console.log(values);
        setCategories(values[0]);
        setPromotions(values[1]);
      })
      .catch((error) => {
        console.warn(error);
      });
  }, []);

  return (
    <>
      <div className={cx('page-header', 'align-middle')}>
        <h3 className={cx('page-title', 'mt-0')}> Danh mục sản phẩm </h3>
        <nav aria-label="breadcrumb">
          <ol className={cx('breadcrumb')}>
            <li className={cx('breadcrumb-item')}>
              <Link to="/admin/products">Sản phẩm</Link>
            </li>
            <li className={cx('breadcrumb-item', 'active')} aria-current="page">
              Danh mục sản phẩm
            </li>
          </ol>
        </nav>
      </div>
      <div className={cx('card')}>
        <div className={cx('card-body')}>
          <div className={cx('d-flex', 'justify-between', 'align-items-center', 'mb-5')}>
            <h4 className={cx('card-title', 'mb-0')}>Tất cả danh mục</h4>
            <Link to="/admin/categories/create/0" className={cx('btn', 'btn-gradient-primary', 'btn-md')}>
              Tạo danh mục
            </Link>
          </div>

          <table className={cx('table', 'table-striped')}>
            <thead>
              <tr>
                <th> Ảnh </th>
                <th> Tên danh mục </th>
                <th> Khuyến mãi </th>
              </tr>
            </thead>
            <tbody>
              {categories.map((category) => (
                <tr key={category.categoryId}>
                  <td className={cx('py-1')}>
                    <img src={category.image || images.placeholder} alt="" />
                  </td>
                  <td>
                    <Link to={`/admin/categories/update/${category.categoryId}`}>{category.name}</Link>
                  </td>
                  <td>{promotions.find((p) => p.promotionId === category.promotionId)?.name || 'N/A'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

export default ProductCategories;
