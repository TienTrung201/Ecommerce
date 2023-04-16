import images from '@/assets/admin/images';
import styles from '@/components/Admin/Layout/LayoutAdmin/LayoutAdmin.module.scss';
import * as Unicons from '@iconscout/react-unicons';
import { Popconfirm } from 'antd';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);
function ItemsTable({ items, productOptions, handleRemoveItem, handleSelectItem }) {
    return (
        <>
            <table className={cx('table', 'table-responsive', 'table-hover')}>
                <thead>
                    <tr>
                        <th> Ảnh </th>
                        <th> Thuộc tính </th>
                        <th> SKU </th>
                        <th> Số lượng </th>
                        <th> Giá bán </th>
                        <th> Giá gốc </th>
                        <th className={cx('text-center')}> Hành động </th>
                    </tr>
                </thead>
                <tbody>
                    {items.map((item, index) => (
                        <tr key={index}>
                            <td className={cx('py-1')}>
                                <img
                                    src={
                                        (item.image &&
                                            (typeof item.image === 'string'
                                                ? item.image
                                                : URL.createObjectURL(item.image))) ||
                                        images.placeholder
                                    }
                                    className={cx('rounded-6', 'border')}
                                    alt=""
                                />
                            </td>

                            <td>
                                {productOptions
                                    .reduce((result, po) => {
                                        const options = po.options.filter((o) =>
                                            item.optionsId.includes(o.productOptionId),
                                        );
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
                                {/* Edit button */}
                                <button
                                    onClick={(e) => {
                                        e.preventDefault();
                                        handleSelectItem(item);
                                    }}
                                    className={cx('btn', 'btn-light', 'btn-rounded', 'btn-icon')}
                                >
                                    {/* <FontAwesomeIcon icon={faPen} /> */}
                                    <Unicons.UilPen size="18" />
                                </button>
                                {/* End Edit button */}

                                {/* Delete button */}
                                <Popconfirm
                                    title="Xóa cấu hình sản phẩm"
                                    description="Bạn có chắc chắn muốn xóa cấu hình này?"
                                    onConfirm={() => {
                                        handleRemoveItem(index);
                                    }}
                                    okText="Xóa"
                                    cancelText="Hủy"
                                >
                                    <button
                                        onClick={(e) => {
                                            e.preventDefault();
                                        }}
                                        className={cx('btn', 'btn-light', 'btn-rounded', 'btn-icon', 'ms-2')}
                                    >
                                        {/* <FontAwesomeIcon icon={faTrash} /> */}
                                        <Unicons.UilTrash size="18" />
                                    </button>
                                </Popconfirm>
                                {/* End Delete button */}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </>
    );
}

export default ItemsTable;
