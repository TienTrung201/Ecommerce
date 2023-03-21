import images from '@/assets/admin/images';
import styles from '@/components/Admin/Layout/LayoutAdmin/LayoutAdmin.module.scss';
import { faPen, faPlus, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button, Collapse, Divider, Image, Input, Select, Space } from 'antd';
import classNames from 'classnames/bind';
import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { getData } from '@/api/service';
import { api } from '@/api';

const { Panel } = Collapse;

const cx = classNames.bind(styles);

function ProductsCreate() {
  const [providers, setProviders] = useState([]);
  const [categories, setCategories] = useState([]);
  const [productOptions, setProductOptions] = useState([]);

  useEffect(() => {
    // Get providers
    getData(api.providers)
      .then((data) => {
        setProviders(data);
      })
      .catch((error) => {
        console.warn(error);
      });

    // Get categories
    getData(api.categories)
      .then((data) => {
        setCategories(data);
      })
      .catch((error) => {
        console.warn(error);
      });

    // Get productOptions
    getData(api.productOptions)
      .then((data) => {
        console.log(data);
        setProductOptions(data);
      })
      .catch((error) => {
        console.warn(error);
      });
  }, []);

  const productOptionsPreview = useMemo(() => {
    return productOptions.map((p) => ({
      label: p.name,
      options: p.options.map((o) => ({ label: o.name, value: o.productOptionId })),
    }));
  }, [productOptions]);

  return (
    <>
      {/* Page header */}
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
      {/* End Page header */}

      <div className={cx('row', 'g-4', 'align-items-start')}>
        {/* Main content */}
        <div className={cx('col-md-8', 'grid-margin', 'stretch-card')}>
          <div className={cx('card')}>
            <div className={cx('card-body')}>
              <h4 className={cx('card-title')}>Thêm sản phẩm</h4>
              <p className={cx('card-description')}></p>

              {/* Form */}
              <form className={cx('forms-sample')}>
                {/* Product name */}
                <div className={cx('form-group')}>
                  <label htmlFor="exampleInputName1">Tên sản phẩm *</label>
                  <input
                    type="text"
                    className={cx('form-control', 'form-control-sm', 'border-secondary')}
                    id="exampleInputName1"
                    placeholder="Nhập tên sản phẩm"
                  />
                </div>
                {/* End Product name */}

                {/* Product description */}
                <div className={cx('form-group')}>
                  <label htmlFor="exampleTextarea1">Nội dung</label>
                  <textarea
                    className={cx('form-control', 'border-secondary')}
                    id="exampleTextarea1"
                    rows="10"
                  ></textarea>
                </div>
                {/* End Product description */}

                <Divider />

                {/* Product Image */}
                <div className={cx('form-group')}>
                  <h4 className={cx('card-title', 'd-flex', 'justify-between', 'align-items-center')}>
                    Ảnh sản phẩm <button className={cx('btn', 'btn-sm', 'btn-link', 'pe-0')}>Thêm ảnh sản phẩm</button>
                  </h4>
                  <div className={cx('d-flex')}>
                    <Image style={{ borderRadius: 6 }} height={200} src={images.placeholder} />
                  </div>
                </div>
                {/* End Product Image */}

                <Divider />

                {/* Product Options*/}
                <div className={cx('form-group')}>
                  <h4 className={cx('card-title', 'd-flex', 'justify-between', 'align-items-center')}>
                    Thuộc tính sản phẩm
                  </h4>

                  <div className={cx('row', 'g-4')}>
                    {/* Options information */}
                    <div className={cx('col-md-9')}>
                      <div className={cx('row', 'g-4')}>
                        {/* SKU input */}
                        <div className={cx('col-md-6')}>
                          <label htmlFor="exampleInputName1">SKU *</label>
                          <input
                            type="text"
                            className={cx('form-control', 'form-control-sm', 'border-secondary')}
                            id="exampleInputName1"
                            placeholder="Nhập mã SKU"
                          />
                        </div>
                        {/* End SKU input */}

                        {/* Quantity input */}
                        <div className={cx('col-md-6')}>
                          <label htmlFor="exampleInputName1">Số lượng *</label>
                          <input
                            type="number"
                            className={cx('form-control', 'form-control-sm', 'border-secondary')}
                            id="exampleInputName1"
                            placeholder="Nhập số lượng"
                          />
                        </div>
                        {/* End Quantity input */}

                        {/* Select properties */}
                        <div className={cx('col-md-12')}>
                          <label htmlFor="exampleInputName1">Thuộc tính</label>
                          <Select
                            mode="multiple"
                            placeholder="Chọn thuộc tính"
                            style={{ width: '100%' }}
                            options={productOptionsPreview}
                          />
                        </div>
                        {/* End Select properties */}

                        {/* Add more properties */}
                        <div className={cx('col-md-12')}>
                          <Collapse defaultActiveKey={['1']} ghost>
                            <Panel header="Thêm thuộc tính" key="1">
                              <p>This is panel header 1</p>
                            </Panel>
                          </Collapse>
                        </div>
                        {/* End Add more properties */}

                        {/* Price input */}
                        <div className={cx('col-md-6')}>
                          <label htmlFor="exampleInputName1">Giá bán</label>
                          <input
                            type="number"
                            className={cx('form-control', 'form-control-sm', 'border-secondary')}
                            id="exampleInputName1"
                            placeholder="Nhập giá bán"
                          />
                        </div>
                        {/* End Price input */}

                        {/* Cost price input */}
                        <div className={cx('col-md-6')}>
                          <label htmlFor="exampleInputName1">Giá gốc</label>
                          <input
                            type="number"
                            className={cx('form-control', 'form-control-sm', 'border-secondary')}
                            id="exampleInputName1"
                            placeholder="Nhập giá gốc"
                          />
                        </div>
                        {/* End Cost price input */}

                        {/* Submit */}
                        <div className={cx('col-md-12')}>
                          <button type="submit" className={cx('btn', 'btn-sm', 'btn-gradient-info', 'me-2')}>
                            Thêm thuộc tính
                          </button>
                          <Link to="/admin/products" className={cx('btn', 'btn-sm', 'btn-light')}>
                            Hủy
                          </Link>
                        </div>
                        {/* Submit */}
                      </div>
                    </div>
                    {/* End Options information */}

                    {/* Options image */}
                    <div className={cx('col-md-3')}>
                      <label htmlFor="exampleInputName1">Ảnh</label>
                      <div>
                        <Image
                          style={{ borderRadius: 6, border: '1px solid #d9d9d9' }}
                          width={'100%'}
                          src={images.placeholder}
                        />
                      </div>
                    </div>
                    {/* End Options image */}

                    {/* Options table */}
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
                              <button className={cx('btn', 'btn-gradient-info', 'btn-rounded', 'btn-icon')}>
                                <FontAwesomeIcon icon={faPen} />
                              </button>
                              <button className={cx('btn', 'btn-gradient-danger', 'btn-rounded', 'btn-icon', 'ms-2')}>
                                <FontAwesomeIcon icon={faTrash} />
                              </button>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                    {/* End Options table */}
                  </div>
                </div>
                {/* End Product Options*/}

                <Divider />
                <div>
                  <button type="submit" className={cx('btn', 'btn-lg', 'btn-gradient-primary', 'me-2')}>
                    Thêm sản phẩm
                  </button>
                  <Link to="/admin/products" className={cx('btn', 'btn-lg', 'btn-light')}>
                    Hủy
                  </Link>
                </div>
              </form>
              {/* End Form */}
            </div>
          </div>
        </div>
        {/* End Main content */}

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
                      defaultValue="obtion1"
                      defaultChecked
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
                  options={providers.map((item) => ({ label: item.name, value: item.providerId }))}
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
                  options={categories.map((item) => ({
                    label: item.name,
                    value: item.categoryId,
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
