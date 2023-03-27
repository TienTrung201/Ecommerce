import classNames from 'classnames/bind';
import styles from '@/components/Admin/Layout/LayoutAdmin/LayoutAdmin.module.scss';
import images from '@/assets/admin/images';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button, Divider, Image, Input, Popconfirm, Select, Space } from 'antd';
import { useEffect, useMemo, useRef, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import notificationsSlice from '@/components/Admin/Notification/notificationsSlice';
import { uploadFile } from '@/firebase/service';
import ItemsTable from '@/components/Admin/Products/ItemsTable';

import { deleteData, getData, postData, updateData } from '@/api/service';
import { api } from '@/api';

import TextEditor from '@/components/Admin/TextEditor';

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
  const [selectedItem, setSelectedItem] = useState({});

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

  const navigate = useNavigate();

  // ------ Get dependen data -------
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
        setProductOptions(data);
      })
      .catch((error) => {
        console.warn(error);
      });
  }, []);

  useEffect(() => {
    if (action === 'update' && id) {
      // Get productOptions
      getData(api.products + '/' + id)
        .then((data) => {
          console.log(data);
          // Product
          setProductNameInput(data.name);
          setProductDescInput(data.description);
          setProductImageInput({ image: data.image, imagePreview: data.image });
          setProductIsDisplay(data.isDisplay);
          setProductProviderId(data.providerId);
          setProductCategoriesId(data.categoriesId);

          // Product items
          setProductItems(data.items);
        })
        .catch((error) => {
          console.warn(error);
        });
    }
  }, [action, id]);

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

  const handleProductDescChange = (value) => {
    setProductDescInput(value);
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

  // ------ Handle submit  ------
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

  const handleSetSelectProductItem = (item) => {
    setSelectedItem(item);
    console.log('selected: ', item);
    setItemSku(item.sku);
    setItemQty(item.qtyInStock);
    setItemProperties(item.optionsId);
    setItemPrice(item.price);
    setItemCostPrice(item.costPrice);
    setItemImage({
      image: item.image,
      imagePreview: item.image,
    });
  };

  const handleUpdateProductItem = (e) => {
    e.preventDefault();

    selectedItem.sku = itemSku;
    selectedItem.qtyInStock = itemQty;
    selectedItem.optionsId = itemProperties;
    selectedItem.price = itemPrice;
    selectedItem.costPrice = itemCostPrice;
    selectedItem.image = itemImage.image;
    clearItemInput();
  };

  // Generate data
  const generateData = async () => {
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
    if (data.image && typeof data.image !== 'string') {
      const UploadedProductImg = await uploadFile(data.image, 'images/products');
      data.image = UploadedProductImg.url;
    }

    // Upload items image
    const uploadedItemImages = await Promise.all(
      data.items.map(async (item) => {
        if (item.image && typeof item.image !== 'string') {
          const uploadedItemImg = await uploadFile(item.image, 'images/product-items');
          return uploadedItemImg.url;
        } else if (typeof item.image === 'string') {
          return item.image;
        }
        return null;
      }),
    );

    data.items = data.items.map((item, index) => {
      item.image = uploadedItemImages[index];
      return item;
    });

    return data;
  };

  // Create product
  const handleCreateProduct = async (e) => {
    e.preventDefault();

    if (action === 'create' && productNameInput && productItems.length > 0) {
      dispatch(notificationsSlice.actions.showLoading('Đang tạo sản phẩm'));

      const data = await generateData();

      postData(api.products, data)
        .then((response) => {
          console.log(response);

          setTimeout(() => {
            dispatch(notificationsSlice.actions.showSuccess('Tạo sản phẩm thành công'));
            navigate('/admin/products');
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
  // ------ End Handle submit ------

  // ------ Handle update ------
  const handleUpdateProduct = async (e) => {
    e.preventDefault();
    if (action === 'update' && productNameInput && productItems.length > 0) {
      dispatch(notificationsSlice.actions.showLoading('Đang cập nhật sản phẩm'));

      const data = await generateData();

      console.log('update data: ', data);

      updateData(api.products + '/' + id, data)
        .then((response) => {
          console.log(response);

          setTimeout(() => {
            dispatch(notificationsSlice.actions.showSuccess('Cập nhật sản phẩm thành công'));
          }, 1000);
        })
        .catch((error) => {
          console.warn(error);
          dispatch(notificationsSlice.actions.showError('Cập nhật sản phẩm thất bại'));
          setTimeout(() => {
            dispatch(notificationsSlice.actions.destroy());
          }, 1000);
        });
    }
  };
  // ------ End Handle update ------

  // ------ Handle delete product ------
  const handleDeleteProduct = () => {
    dispatch(notificationsSlice.actions.showLoading('Đang xóa'));

    deleteData(api.products + '/' + id)
      .then((response) => {
        console.log(response);

        setTimeout(() => {
          dispatch(notificationsSlice.actions.showSuccess('Xóa thành công'));
          navigate('/admin/products');
        }, 1000);
      })
      .catch((error) => {
        console.warn(error);
        dispatch(notificationsSlice.actions.showError('Xóa thất bại'));
        setTimeout(() => {
          dispatch(notificationsSlice.actions.destroy());
        }, 1000);
      });
  };
  // ------ End Handle delete product ------

  // ------ Handle clear input ------
  const clearItemInput = () => {
    setItemSku('');
    setItemQty('');
    setItemProperties([]);
    setItemPrice('');
    setItemCostPrice('');
    setSelectedItem({});
  };
  // ------ End Handle clear input ------

  return (
    <>
      {/* Page header */}
      <div className={cx('page-header', 'align-middle')}>
        <h3 className={cx('page-title', 'mt-0')}>{action === 'update' ? 'Cập nhật sản phẩm' : 'Thêm mới sản phẩm'}</h3>
        <nav aria-label="breadcrumb">
          <ol className={cx('breadcrumb')}>
            <li className={cx('breadcrumb-item')}>
              <Link to="/admin/products">Danh sách sản phẩm</Link>
            </li>
            <li className={cx('breadcrumb-item', 'active')} aria-current="page">
              {action === 'update' ? 'Cập nhật sản phẩm' : 'Thêm sản phẩm'}
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
              <h4 className={cx('card-title')}>Sản phẩm</h4>
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
                  <TextEditor onChange={handleProductDescChange} editorState={productDescInput} />
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
                        {/* Select properties */}
                        <div className={cx('col-md-12')}>
                          <label htmlFor="inputProperties">Thuộc tính</label>
                          <Select
                            onChange={handleItemPropertiesChange}
                            value={itemProperties}
                            mode="multiple"
                            placeholder="Chọn thuộc tính"
                            style={{ width: '100%' }}
                            options={productOptionsPreview}
                            id="inputProperties"
                          />
                        </div>
                        {/* End Select properties */}

                        {/* SKU input */}
                        <div className={cx('col-md-6')}>
                          <label htmlFor="intputSku">SKU *</label>
                          <input
                            onChange={handleItemSkuChange}
                            value={itemSku}
                            type="text"
                            className={cx('form-control', 'form-control-sm', 'border-secondary')}
                            id="intputSku"
                            placeholder="Nhập mã SKU"
                          />
                        </div>
                        {/* End SKU input */}

                        {/* Quantity input */}
                        <div className={cx('col-md-6')}>
                          <label htmlFor="inputQty">Số lượng *</label>
                          <input
                            onChange={handleItemQtyChange}
                            value={itemQty}
                            type="number"
                            className={cx('form-control', 'form-control-sm', 'border-secondary')}
                            id="inputQty"
                            placeholder="Nhập số lượng"
                          />
                        </div>
                        {/* End Quantity input */}

                        {/* Price input */}
                        <div className={cx('col-md-6')}>
                          <label htmlFor="inputPrice">Giá bán</label>
                          <input
                            onChange={handleItemPriceChange}
                            value={itemPrice}
                            type="number"
                            className={cx('form-control', 'form-control-sm', 'border-secondary')}
                            id="inputPrice"
                            placeholder="Nhập giá bán"
                          />
                        </div>
                        {/* End Price input */}

                        {/* Cost price input */}
                        <div className={cx('col-md-6')}>
                          <label htmlFor="inputCostPrice">Giá gốc</label>
                          <input
                            onChange={handleItemCostPriceChange}
                            value={itemCostPrice}
                            type="number"
                            className={cx('form-control', 'form-control-sm', 'border-secondary')}
                            id="inputCostPrice"
                            placeholder="Nhập giá gốc"
                          />
                        </div>
                        {/* End Cost price input */}

                        {/* Add or edit item */}
                        <div className={cx('col-md-12')}>
                          {Object.keys(selectedItem).length > 0 ? (
                            <button
                              onClick={handleUpdateProductItem}
                              type="submit"
                              className={cx('btn', 'btn-sm', 'btn-gradient-info', 'me-2')}
                            >
                              Cập nhật
                            </button>
                          ) : (
                            <button
                              onClick={handleAddProductItem}
                              type="submit"
                              className={cx('btn', 'btn-sm', 'btn-gradient-info', 'me-2')}
                            >
                              Thêm thuộc tính
                            </button>
                          )}
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
                        {/* End Add or edit item */}
                      </div>
                    </div>
                    {/* End Options information */}

                    {/* Options image */}
                    <div className={cx('col-md-3')}>
                      <label htmlFor="">Ảnh</label>
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
                          className={cx('btn', 'btn-sm', 'btn-inverse-info', 'mt-4')}
                        >
                          Tải lên
                        </button>
                      </div>
                    </div>
                    {/* End Options image */}

                    {/* Options table */}
                    <div className={cx('col-md-12', 'overflow-x-auto')}>
                      <ItemsTable
                        items={productItems}
                        productOptions={productOptions}
                        handleRemoveItem={handleRemoveProductItem}
                        handleSelectItem={handleSetSelectProductItem}
                      />
                    </div>
                    {/* End Options table */}
                  </div>
                </div>
                {/* End Product Options*/}

                <Divider />
                <div>
                  {action === 'create' ? (
                    <button
                      onClick={handleCreateProduct}
                      type="submit"
                      className={cx('btn', 'btn-lg', 'btn-gradient-primary', 'me-2')}
                    >
                      Tạo sản phẩm
                    </button>
                  ) : (
                    <>
                      <button
                        onClick={handleUpdateProduct}
                        type="submit"
                        className={cx('btn', 'btn-lg', 'btn-gradient-primary', 'me-2')}
                      >
                        Cập nhật
                      </button>
                      <Popconfirm
                        title="Xóa sản phẩm"
                        description="Bạn có chắc chắn muốn xóa sản phẩm này?"
                        onConfirm={handleDeleteProduct}
                        okText="Xóa"
                        cancelText="Hủy"
                      >
                        <button
                          onClick={(e) => {
                            e.preventDefault();
                          }}
                          className={cx('btn', 'btn-inverse-danger', 'me-2')}
                        >
                          Xóa
                        </button>
                      </Popconfirm>
                    </>
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
                <label htmlFor="inputProvider">Hãng sản xuất</label>
                <Select
                  onChange={handleProductProviderIdChange}
                  style={{ width: '100%' }}
                  allowClear
                  value={productProviderId}
                  placeholder="Nhập hãng sản xuất"
                  id="inputProvider"
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
                <label htmlFor="inputCategories">Danh mục</label>
                <Select
                  onChange={handleProductCategoriesIdChange}
                  value={productCategoriesId}
                  mode="multiple"
                  allowClear
                  style={{ width: '100%' }}
                  placeholder="Chọn danh mục"
                  id="inputCategories"
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
