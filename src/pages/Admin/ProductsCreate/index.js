import images from '@/assets/admin/images';
import styles from '@/components/Admin/Layout/LayoutAdmin/LayoutAdmin.module.scss';
import { faPen, faPlus, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button, Divider, Image, Input, Select, Space } from 'antd';
import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';

const cx = classNames.bind(styles);

function ProductsCreate() {
    return (
        <>
            <div className={cx('page-header', 'align-middle')}>
                <h3 className={cx('page-title', 'mt-0')}> Thêm mới sản phẩm </h3>
                <nav aria-label="breadcrumb">
                    <ol className={cx('breadcrumb')}>
                        <li className={cx('breadcrumb-item')}>
                            <Link to="/admin/products">Danh sách sản phẩm</Link>
                        </li>
                        <li className={cx('breadcrumb-item', 'active')} aria-current="page">
                            Thêm sản phẩm
                        </li>
                    </ol>
                </nav>
            </div>
            <div className={cx('row', 'g-4', 'align-items-start')}>
                <div className={cx('col-md-8', 'grid-margin', 'stretch-card')}>
                    <div className={cx('card')}>
                        <div className={cx('card-body')}>
                            <h4 className={cx('card-title')}>Thêm sản phẩm</h4>
                            <p className={cx('card-description')}></p>
                            <form className={cx('forms-sample')}>
                                <div className={cx('form-group')}>
                                    <label htmlFor="exampleInputName1">Tên sản phẩm *</label>
                                    <input
                                        type="text"
                                        className={cx('form-control', 'form-control-sm', 'border-secondary')}
                                        id="exampleInputName1"
                                        placeholder="Nhập tên sản phẩm"
                                    />
                                </div>
                                <div className={cx('form-group')}>
                                    <label htmlFor="exampleTextarea1">Nội dung</label>
                                    <textarea
                                        className={cx('form-control', 'border-secondary')}
                                        id="exampleTextarea1"
                                        rows="10"
                                    ></textarea>
                                </div>

                                {/* Product Image */}
                                <Divider />
                                <div className={cx('form-group')}>
                                    <h4 className={cx('card-title')}>Ảnh sản phẩm</h4>
                                    <div className="">
                                        <Image style={{ borderRadius: 6 }} height={200} src={images.faces.face1} />
                                    </div>
                                </div>
                                {/* End Product Image */}

                                {/* Product Options*/}
                                <Divider />
                                <div className={cx('form-group')}>
                                    <h4 className={cx('card-title')}>Thuộc tính sản phẩm</h4>
                                    <div className={cx('row', 'g-4')}>
                                        <div className={cx('col-md-3')}>
                                            <label htmlFor="exampleInputName1">Ảnh</label>
                                            <div>
                                                <Image
                                                    style={{ borderRadius: 6 }}
                                                    width={'100%'}
                                                    src={images.faces.face1}
                                                />
                                            </div>
                                        </div>
                                        <div className={cx('col-md-9')}>
                                            <div className={cx('row', 'g-4')}>
                                                <div className={cx('col-md-6')}>
                                                    <label htmlFor="exampleInputName1">SKU *</label>
                                                    <input
                                                        type="text"
                                                        className={cx(
                                                            'form-control',
                                                            'form-control-sm',
                                                            'border-secondary',
                                                        )}
                                                        id="exampleInputName1"
                                                        placeholder="Nhập mã SKU"
                                                    />
                                                </div>
                                                <div className={cx('col-md-6')}>
                                                    <label htmlFor="exampleInputName1">Số lượng *</label>
                                                    <input
                                                        type="number"
                                                        className={cx(
                                                            'form-control',
                                                            'form-control-sm',
                                                            'border-secondary',
                                                        )}
                                                        id="exampleInputName1"
                                                        placeholder="Nhập số lượng"
                                                    />
                                                </div>

                                                <div className={cx('col-md-12')}>
                                                    <label htmlFor="exampleInputName1">Thuộc tính</label>
                                                    <Select
                                                        style={{ width: '100%' }}
                                                        allowClear
                                                        placeholder="Nhập thuộc tính"
                                                        dropdownRender={(menu) => (
                                                            <>
                                                                {menu}
                                                                <Divider style={{ margin: '8px 0' }} />
                                                                <Space style={{ padding: '0 8px 4px' }}>
                                                                    <Input placeholder="Thêm thuộc tính" />
                                                                    <Button
                                                                        type="text"
                                                                        icon={<FontAwesomeIcon icon={faPlus} />}
                                                                    >
                                                                        Thêm
                                                                    </Button>
                                                                </Space>
                                                            </>
                                                        )}
                                                        options={['Dior', 'Chanel'].map((item) => ({
                                                            label: item,
                                                            value: item,
                                                        }))}
                                                    />
                                                </div>

                                                <div className={cx('col-md-6')}>
                                                    <label htmlFor="exampleInputName1">Giá bán</label>
                                                    <input
                                                        type="number"
                                                        className={cx(
                                                            'form-control',
                                                            'form-control-sm',
                                                            'border-secondary',
                                                        )}
                                                        id="exampleInputName1"
                                                        placeholder="Nhập giá bán"
                                                    />
                                                </div>
                                                <div className={cx('col-md-6')}>
                                                    <label htmlFor="exampleInputName1">Giá gốc</label>
                                                    <input
                                                        type="number"
                                                        className={cx(
                                                            'form-control',
                                                            'form-control-sm',
                                                            'border-secondary',
                                                        )}
                                                        id="exampleInputName1"
                                                        placeholder="Nhập giá gốc"
                                                    />
                                                </div>

                                                <div className={cx('col-md-12')}>
                                                    <button
                                                        type="submit"
                                                        className={cx('btn', 'btn-sm', 'btn-gradient-info', 'me-2')}
                                                    >
                                                        Thêm thuộc tính
                                                    </button>
                                                    <Link
                                                        to="/admin/products"
                                                        className={cx('btn', 'btn-sm', 'btn-light')}
                                                    >
                                                        Hủy
                                                    </Link>
                                                </div>
                                            </div>
                                        </div>

                                        <div className={cx('col-md-12', 'overflow-x-auto')}>
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
                                                    <tr className={cx('pointer')}>
                                                        <td className={cx('py-1')}>
                                                            <img src={images.faces.face2} alt="" />
                                                        </td>
                                                        <td> Messsy Adam </td>
                                                        <td>
                                                            <div className={cx('progress')}>
                                                                <div
                                                                    className={cx('progress-bar', 'bg-danger')}
                                                                    role="progressbar"
                                                                    style={{ width: '75%' }}
                                                                    aria-valuenow={75}
                                                                    aria-valuemin={0}
                                                                    aria-valuemax={100}
                                                                />
                                                            </div>
                                                        </td>
                                                        <td> July 1, 2015 </td>
                                                        <td> $245.30 </td>
                                                        <td> $245.30 </td>
                                                        <td className={cx('text-center')}>
                                                            <button
                                                                className={cx(
                                                                    'btn',
                                                                    'btn-gradient-info',
                                                                    'btn-rounded',
                                                                    'btn-icon',
                                                                )}
                                                            >
                                                                <FontAwesomeIcon icon={faPen} />
                                                            </button>
                                                            <button
                                                                className={cx(
                                                                    'btn',
                                                                    'btn-gradient-danger',
                                                                    'btn-rounded',
                                                                    'btn-icon',
                                                                    'ms-2',
                                                                )}
                                                            >
                                                                <FontAwesomeIcon icon={faTrash} />
                                                            </button>
                                                        </td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </div>
                                {/* End Product Options*/}

                                <Divider />
                                <div>
                                    <button
                                        type="submit"
                                        className={cx('btn', 'btn-lg', 'btn-gradient-primary', 'me-2')}
                                    >
                                        Thêm sản phẩm
                                    </button>
                                    <Link to="/admin/products" className={cx('btn', 'btn-lg', 'btn-light')}>
                                        Hủy
                                    </Link>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>

                {/* Right bar */}
                <div className={cx('col-md-4', 'grid-margin', 'stretch-card')}>
                    <div className={cx('card')}>
                        <div className={cx('card-body')}>
                            <h4 className={cx('card-title')}>Trạng thái hiển thị</h4>
                            <p className={cx('card-description')}></p>
                            <div className={cx('form-group')}>
                                <div className={cx('form-check')}>
                                    <label className={cx('form-check-label')}>
                                        <input
                                            type="radio"
                                            className={cx('form-check-input')}
                                            name="optionsRadios"
                                            id="optionsRadios1"
                                            defaultValue
                                        />{' '}
                                        Hiển thị <i className={cx('input-helper')} />
                                    </label>
                                </div>
                                <div className={cx('form-check')}>
                                    <label className={cx('form-check-label')}>
                                        <input
                                            type="radio"
                                            className={cx('form-check-input')}
                                            name="optionsRadios"
                                            id="optionsRadios2"
                                            defaultValue="option2"
                                            defaultChecked
                                        />{' '}
                                        Ẩn <i className={cx('input-helper')} />
                                    </label>
                                </div>
                            </div>

                            <Divider />
                            <h4 className={cx('card-title')}>Phân loại</h4>
                            <div className={cx('form-group')}>
                                <label htmlFor="">Hãng sản xuất</label>
                                <Select
                                    style={{ width: '100%' }}
                                    allowClear
                                    placeholder="Nhập hãng sản xuất"
                                    dropdownRender={(menu) => (
                                        <>
                                            {menu}
                                            <Divider style={{ margin: '8px 0' }} />
                                            <Space style={{ padding: '0 8px 4px' }}>
                                                <Input placeholder="Thêm hãng mới" />
                                                <Button type="text" icon={<FontAwesomeIcon icon={faPlus} />}>
                                                    Thêm
                                                </Button>
                                            </Space>
                                        </>
                                    )}
                                    options={['Dior', 'Chanel'].map((item) => ({ label: item, value: item }))}
                                />
                            </div>

                            <Divider />

                            <div className={cx('form-group')}>
                                <label htmlFor="">Danh mục</label>
                                <Select
                                    mode="multiple"
                                    allowClear
                                    style={{ width: '100%' }}
                                    placeholder="Chọn danh mục"
                                    defaultValue={['a10', 'c12']}
                                    options={['a10', 'a11', 'a12', 'c10', 'c11', 'c12'].map((item) => ({
                                        label: item,
                                        value: item,
                                    }))}
                                />
                            </div>
                        </div>
                    </div>
                </div>
                {/* End Right bar */}
            </div>
        </>
    );
}

export default ProductsCreate;
