import images from '@/assets/admin/images';
import styles from '@/components/Admin/Layout/LayoutAdmin/LayoutAdmin.module.scss';
import { faPen, faPlus, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button, Collapse, Divider, Image, Input, Select, Space } from 'antd';
import classNames from 'classnames/bind';
import { useEffect, useMemo, useRef, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { getData, postData } from '@/api/service';
import { api } from '@/api';
import { useDispatch } from 'react-redux';
import notificationsSlice from '@/components/Admin/Notification/notificationsSlice';
import { uploadFile } from '@/firebase/service';

const { Panel } = Collapse;

const cx = classNames.bind(styles);

function ProductsCreate() {
  const [providers, setProviders] = useState([]);
  const [categories, setCategories] = useState([]);
  const [productOptions, setProductOptions] = useState([]);

  const [productNameInput, setProductNameInput] = useState('');
  const [productDescInput, setProductDescInput] = useState('');
  const [productImageInput, setProductImageInput] = useState({ image: null, imagePreview: '' });
  const [productIsDisplay, setProductIsDisplay] = useState(true);
  const [productProviderId, setProductProviderId] = useState(null);
  const [productCategoriesId, setProductCategoriesId] = useState([]);
  const [productItems, setProductItems] = useState([]);

  const [itemSku, setItemSku] = useState('');
  const [itemQty, setItemQty] = useState('');
  const [itemImage, setItemImage] = useState({ image: null, imagePreview: '' });
  const [itemProperties, setItemProperties] = useState([]);
  const [itemPrice, setItemPrice] = useState('');
  const [itemCostPrice, setItemCostPrice] = useState('');

  const productImageInputRef = useRef();
  const itemImageInputRef = useRef();

  const dispatch = useDispatch();

  const { action, id } = useParams();

  // ------ Get dependen data ------
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
  // ------ End Get dependen data ------

  // ------ Handle input change ------
  // Product
  const handleProductNameChange = (e) => {
    setProductNameInput(e.target.value);
  };

  const handleProducDescChange = (e) => {
    setProductDescInput(e.target.value);
  };

  const handleProductImageChange = (e) => {
    setProductImageInput({
      image: e.target.files[0],
      imagePreview: URL.createObjectURL(e.target.files[0]),
    });
  };

  const handleProductIsDisplayChange = (value) => {
    setProductIsDisplay(value);
  };

  const handleProductProviderIdChange = (value) => {
    setProductProviderId(value);
  };

  const handleProductCategoriesIdChange = (values) => {
    setProductCategoriesId(values);
  };

  // Product items
  const handleItemSkuChange = (e) => {
    setItemSku(e.target.value);
  };

  const handleItemQtyChange = (e) => {
    setItemQty(e.target.value);
  };

  const handleItemImageChange = (e) => {
    setItemImage({
      image: e.target.files[0],
      imagePreview: URL.createObjectURL(e.target.files[0]),
    });
  };

  const handleItemPropertiesChange = (e) => {
    setItemProperties(e);
  };

  const handleItemPriceChange = (e) => {
    setItemPrice(e.target.value);
  };

  const handleItemCostPriceChange = (e) => {
    setItemCostPrice(e.target.value);
  };
  // ------ End Handle input change ------

  const handleAddProductItem = (e) => {
    e.preventDefault();

    if (itemSku && itemQty && itemProperties.length > 0 && itemPrice) {
      const item = {
        sku: itemSku,
        qtyInStock: Number(itemQty),
        image: itemImage.image,
        price: Number(itemPrice),
        costPrice: Number(itemCostPrice),
        optionsId: itemProperties,
      };

      setProductItems((prev) => [...prev, item]);

      clearItemInput();
    }
  };

  const handleRemoveProductItem = (removeIndex) => {
    const newItems = productItems.filter((item, index) => index !== removeIndex);
    console.log('Remove: ', removeIndex, newItems);
    setProductItems(newItems);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (productNameInput && productItems.length > 0) {
      dispatch(notificationsSlice.actions.showLoading('Đang tạo sản phẩm'));

      const data = {
        name: productNameInput,
        description: productDescInput,
        image: productImageInput.image,
        isDisplay: productIsDisplay,
        providerId: productProviderId,
        categoriesId: productCategoriesId,
        items: productItems,
      };

      // Upload product image
      if (data.image) {
        const UploadedProductImg = await uploadFile(data.image, 'images/products');
        data.image = UploadedProductImg.url;
      }

      // Upload items image
      const uploadedItemImages = await Promise.all(
        data.items.map(async (item) => {
          if (item.image) {
            const uploadedItemImg = await uploadFile(item.image, 'images/product-items');
            return uploadedItemImg.url;
          }
          return null;
        }),
      );

      data.items = data.items.map((item, index) => {
        item.image = uploadedItemImages[index];
        return item;
      });

      postData(api.products, data)
        .then((response) => {
          console.log(response);

          setTimeout(() => {
            dispatch(notificationsSlice.actions.showSuccess('Tạo sản phẩm thành công'));
          }, 1000);
        })
        .catch((error) => {
          console.warn(error);
          dispatch(notificationsSlice.actions.showError('Tạo sản phẩm thất bại'));
          setTimeout(() => {
            dispatch(notificationsSlice.actions.destroy());
          }, 1000);
        });
    }
  };

  const clearItemInput = () => {
    setItemSku('');
    setItemQty('');
    setItemProperties([]);
    setItemPrice('');
    setItemCostPrice('');
  };

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
                    onChange={handleProductNameChange}
                    value={productNameInput}
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
                    onChange={handleProducDescChange}
                    value={productDescInput}
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
                    Ảnh sản phẩm{' '}
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        productImageInputRef.current && productImageInputRef.current.click();
                      }}
                      className={cx('btn', 'btn-sm', 'btn-link', 'pe-0')}
                    >
                      Thêm ảnh sản phẩm
                    </button>
                  </h4>
                  <input ref={productImageInputRef} onChange={handleProductImageChange} hidden type="file" />
                  <div className={cx('d-flex')}>
                    <Image
                      style={{ borderRadius: 6 }}
                      height={200}
                      src={productImageInput.imagePreview || images.placeholder}
                    />
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
                            onChange={handleItemSkuChange}
                            value={itemSku}
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
                            onChange={handleItemQtyChange}
                            value={itemQty}
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
                            onChange={handleItemPropertiesChange}
                            value={itemProperties}
                            mode="multiple"
                            placeholder="Chọn thuộc tính"
                            style={{ width: '100%' }}
                            options={productOptionsPreview}
                          />
                        </div>
                        {/* End Select properties */}

                        {/* Add more properties */}
                        <div className={cx('col-md-12')}>
                          <Collapse ghost>
                            <Panel header="Thêm thuộc tính">
                              <p>This is panel header 1</p>
                            </Panel>
                          </Collapse>
                        </div>
                        {/* End Add more properties */}

                        {/* Price input */}
                        <div className={cx('col-md-6')}>
                          <label htmlFor="exampleInputName1">Giá bán</label>
                          <input
                            onChange={handleItemPriceChange}
                            value={itemPrice}
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
                            onChange={handleItemCostPriceChange}
                            value={itemCostPrice}
                            type="number"
                            className={cx('form-control', 'form-control-sm', 'border-secondary')}
                            id="exampleInputName1"
                            placeholder="Nhập giá gốc"
                          />
                        </div>
                        {/* End Cost price input */}

                        {/* Submit */}
                        <div className={cx('col-md-12')}>
                          <button
                            onClick={handleAddProductItem}
                            type="submit"
                            className={cx('btn', 'btn-sm', 'btn-gradient-info', 'me-2')}
                          >
                            Thêm thuộc tính
                          </button>
                          <button
                            onClick={(e) => {
                              e.preventDefault();
                              clearItemInput();
                            }}
                            className={cx('btn', 'btn-sm', 'btn-light')}
                          >
                            Hủy
                          </button>
                        </div>
                        {/* Submit */}
                      </div>
                    </div>
                    {/* End Options information */}

                    {/* Options image */}
                    <div className={cx('col-md-3')}>
                      <label htmlFor="exampleInputName1">Ảnh</label>
                      <input ref={itemImageInputRef} onChange={handleItemImageChange} hidden type="file" />
                      <div className={cx('d-flex', 'flex-column')}>
                        <Image
                          style={{ borderRadius: 6, border: '1px solid #d9d9d9' }}
                          width={'100%'}
                          src={itemImage.imagePreview || images.placeholder}
                        />
                        <button
                          onClick={(e) => {
                            e.preventDefault();
                            itemImageInputRef.current && itemImageInputRef.current.click();
                          }}
                          className={cx('btn', 'btn-sm', 'btn-inverse-info', 'mt-2')}
                        >
                          Tải lên
                        </button>
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
                          {productItems.map((item, index) => (
                            <tr key={index} className={cx('pointer')}>
                              <td className={cx('py-1')}>
                                <img src={images.faces.face2} alt="" />
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
                                <button className={cx('btn', 'btn-gradient-info', 'btn-rounded', 'btn-icon')}>
                                  <FontAwesomeIcon icon={faPen} />
                                </button>
                                <button
                                  onClick={(e) => {
                                    e.preventDefault();
                                    handleRemoveProductItem(index);
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
                    </div>
                    {/* End Options table */}
                  </div>
                </div>
                {/* End Product Options*/}

                <Divider />
                <div>
                  {action === 'create' ? (
                    <button
                      onClick={handleSubmit}
                      type="submit"
                      className={cx('btn', 'btn-lg', 'btn-gradient-primary', 'me-2')}
                    >
                      Thêm sản phẩm
                    </button>
                  ) : (
                    <button
                      onClick={handleSubmit}
                      type="submit"
                      className={cx('btn', 'btn-lg', 'btn-gradient-primary', 'me-2')}
                    >
                      Cập nhật
                    </button>
                  )}
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
                      onChange={() => {
                        handleProductIsDisplayChange(true);
                      }}
                      type="radio"
                      className={cx('form-check-input')}
                      name="optionsRadios"
                      id="optionsRadios1"
                      checked={productIsDisplay}
                    />{' '}
                    Hiển thị <i className={cx('input-helper')} />
                  </label>
                </div>
                <div className={cx('form-check')}>
                  <label className={cx('form-check-label')}>
                    <input
                      onChange={() => {
                        handleProductIsDisplayChange(false);
                      }}
                      type="radio"
                      className={cx('form-check-input')}
                      name="optionsRadios"
                      id="optionsRadios2"
                      checked={!productIsDisplay}
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
                  onChange={handleProductProviderIdChange}
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
                  onChange={handleProductCategoriesIdChange}
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
