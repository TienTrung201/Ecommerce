import images from '@/assets/admin/images';
import styles from '@/components/Admin/Layout/LayoutAdmin/LayoutAdmin.module.scss';
import { faPen, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);
function ItemsTable({ items, productOptions, handleRemoveItem }) {
  return (
    <>
      <table className={cx('table', 'table-responsive', 'table-striped')}>
        <thead>
          <tr>
            <th> Ảnh </th>
            <th> Thuộc tính </th>
            <th> SKU </th>
            <th> Số lượng </th>
            <th> Giá bán </th>
            <th> Giá gốc </th>
            <th> Hành động </th>
          </tr>
        </thead>
        <tbody>
          {items.map((item, index) => (
            <tr key={index} className={cx('pointer')}>
              <td className={cx('py-1')}>
                <img
                  src={
                    (item.image && (typeof item.image === 'string' ? item.image : URL.createObjectURL(item.image))) ||
                    images.placeholder
                  }
                  alt=""
                />
              </td>

              <td>
                {productOptions
                  .reduce((result, po) => {
                    const options = po.options.filter((o) => item.optionsId.includes(o.productOptionId));
                    result = [...result, options.map((i) => i.name)];
                    return result;
                  }, [])
                  .join(', ')}
              </td>
              <td>{item.sku}</td>
              <td>{item.qtyInStock}</td>
              <td>{item.price}</td>
              <td>{item.costPrice}</td>
              <td className={cx('text-center')}>
                <button className={cx('btn', 'btn-gradient-info', 'btn-rounded', 'btn-icon')}>
                  <FontAwesomeIcon icon={faPen} />
                </button>
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    handleRemoveItem(index);
                  }}
                  className={cx('btn', 'btn-gradient-danger', 'btn-rounded', 'btn-icon', 'ms-2')}
                >
                  <FontAwesomeIcon icon={faTrash} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}

export default ItemsTable;
