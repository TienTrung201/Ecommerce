import classNames from 'classnames/bind';
import styles from '@/components/Admin/Layout/LayoutAdmin/LayoutAdmin.module.scss';
import images from '@/assets/admin/images';
import * as Unicons from '@iconscout/react-unicons';
import { Collapse, Divider, Image, Popconfirm, Select } from 'antd';
import { useEffect, useMemo, useRef, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import notificationsSlice from '@/components/Admin/Notification/notificationsSlice';
import { uploadFile } from '@/firebase/service';
import ItemsTable from '@/components/Admin/Products/ItemsTable';

import { deleteData, getData, postData, updateData } from '@/api/service';
import { api } from '@/api';

import TextEditor from '@/components/Admin/TextEditor';
import Validator from '@/Validator/Validator';

const cx = classNames.bind(styles);
const { Panel } = Collapse;

function ProductsCreate() {
    const [providers, setProviders] = useState([]);
    const [categories, setCategories] = useState([]);
    const [productOptions, setProductOptions] = useState([]);

    // Product
    const [productNameInput, setProductNameInput] = useState('');
    const [productDescInput, setProductDescInput] = useState('');
    const [productImageInput, setProductImageInput] = useState({ image: null, imagePreview: '' });
    const [productIsDisplay, setProductIsDisplay] = useState(true);
    const [productProviderId, setProductProviderId] = useState(null);
    const [productCategoriesId, setProductCategoriesId] = useState([]);

    const [productItems, setProductItems] = useState([]);
    const [selectedItem, setSelectedItem] = useState({});

    // Product item
    const [itemSku, setItemSku] = useState('');
    const [itemQty, setItemQty] = useState('');
    const [itemImage, setItemImage] = useState({ image: null, imagePreview: '' });
    const [itemProperties, setItemProperties] = useState([]);
    const [itemPrice, setItemPrice] = useState('');
    const [itemCostPrice, setItemCostPrice] = useState('');

    // Validate
    const [productNameError, setProductNameError] = useState('');
    const [skuError, setSkuError] = useState('');
    const [qtyError, setQtyError] = useState('');
    const [priceError, setPriceError] = useState('');
    const [optionIdsError, setOptionIdsError] = useState('');
    const [productItemsError, setProductItemsError] = useState('');

    const [activeCollapse, setActiveCollapse] = useState([]);

    const productImageInputRef = useRef();
    const itemImageInputRef = useRef();

    const dispatch = useDispatch();

    const { action, id } = useParams();

    const navigate = useNavigate();

    // ------ Get dependencies data -------
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
    // ------ End Get dependencies data ------

    // ------ Handle validate input ------
    const handleValidateProductName = () => {
        const isValidate = Validator({
            setErrorMessage: setProductNameError,
            rules: [Validator.isRequired(productNameInput, 'Bạn chưa nhập tên sản phẩm')],
        });

        return isValidate;
    };

    const handleValidateSku = () => {
        const isValidate = Validator({
            setErrorMessage: setSkuError,
            rules: [Validator.isRequired(itemSku, 'Bạn chưa nhập SKU')],
        });

        return isValidate;
    };

    const handleValidateQty = () => {
        const isValidate = Validator({
            setErrorMessage: setQtyError,
            rules: [Validator.isRequired(itemQty, 'Bạn chưa nhập số lượng')],
        });

        return isValidate;
    };

    const handleValidatePrice = () => {
        const isValidate = Validator({
            setErrorMessage: setPriceError,
            rules: [Validator.isRequired(itemPrice, 'Bạn chưa nhập giá bán')],
        });

        return isValidate;
    };

    const handleValidateOptionIds = () => {
        const isValidate = Validator({
            setErrorMessage: setOptionIdsError,
            rules: [Validator.isRequired(itemProperties, 'Bạn chưa chọn thuộc tính')],
        });

        return isValidate;
    };

    const handleValidateProductItems = () => {
        const isValidate = Validator({
            setErrorMessage: setProductItemsError,
            rules: [Validator.isRequired(productItems, 'Bạn chưa thêm phiên bản sản phẩm')],
        });

        return isValidate;
    };
    // ------ End Handle validate input ------

    // ------ Handle input change ------
    // Product
    const handleProductNameChange = (e) => {
        setProductNameInput(e.target.value);
        setProductNameError('');
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
        setSkuError('');
    };

    const handleItemQtyChange = (e) => {
        setItemQty(e.target.value);
        setQtyError('');
    };

    const handleItemImageChange = (e) => {
        setItemImage({
            image: e.target.files[0],
            imagePreview: URL.createObjectURL(e.target.files[0]),
        });
    };

    const handleItemPropertiesChange = (e) => {
        setItemProperties(e);
        setOptionIdsError('');
    };

    const handleItemPriceChange = (e) => {
        setItemPrice(e.target.value);
        setPriceError('');
    };

    const handleItemCostPriceChange = (e) => {
        setItemCostPrice(e.target.value);
    };
    // ------ End Handle input change ------

    // ------ Handle submit  ------
    const handleAddProductItem = (e) => {
        e.preventDefault();

        if (handleValidateSku() && handleValidateQty() && handleValidateOptionIds() && handleValidatePrice()) {
            const item = {
                sku: itemSku,
                qtyInStock: Number(itemQty),
                image: itemImage.image,
                price: Number(itemPrice),
                costPrice: Number(itemCostPrice),
                optionsId: itemProperties,
            };

            setProductItems((prev) => [...prev, item]);

            setProductItemsError('');
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

        setActiveCollapse(['1']);
    };

    const handleUpdateProductItem = (e) => {
        e.preventDefault();
        if (handleValidateSku() && handleValidateQty() && handleValidateOptionIds() && handleValidatePrice()) {
            selectedItem.sku = itemSku;
            selectedItem.qtyInStock = itemQty;
            selectedItem.optionsId = itemProperties;
            selectedItem.price = itemPrice;
            selectedItem.costPrice = itemCostPrice;
            selectedItem.image = itemImage.image;
            clearItemInput();
        }
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

        if (action === 'create' && handleValidateProductName() && handleValidateProductItems()) {
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
        if (action === 'update' && handleValidateProductName() && handleValidateProductItems()) {
            dispatch(notificationsSlice.actions.showLoading('Đang cập nhật sản phẩm'));

            const data = await generateData();

            console.log('update data: ', data);

            updateData(api.products + '/' + id, data)
                .then((response) => {
                    console.log(response);

                    setTimeout(() => {
                        dispatch(notificationsSlice.actions.showSuccess('Cập nhật sản phẩm thành công'));
                        navigate('/admin/products');
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
        setItemImage({ image: null, imagePreview: '' });

        setSkuError('');
        setQtyError('');
        setPriceError('');
        setOptionIdsError('');
    };
    // ------ End Handle clear input ------

    // ------ Handle active collapse ------
    const handleActiveCollapse = (value) => {
        setActiveCollapse(value);
    };
    // ------ End Handle active collapse ------

    return (
        <>
            {/* Page header */}
            <div className={cx('page-header', 'align-middle', 'mt-2')}>
                <h3 className={cx('page-title', 'mt-0')}>
                    {action === 'update' ? 'Cập nhật sản phẩm' : 'Thêm mới sản phẩm'}
                </h3>
                <nav aria-label="breadcrumb">
                    <ol className={cx('breadcrumb')}>
                        <li className={cx('breadcrumb-item')}>
                            <Link to="/admin/products">Sản phẩm</Link>
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
                    <div className={cx('card', 'shadow-sm')}>
                        <div className={cx('card-body')}>
                            <h4 className={cx('card-title', 'm-0')}>Sản phẩm</h4>
                            <p className={cx('card-description')}></p>

                            {/* Form */}
                            <form className={cx('forms-sample')}>
                                {/* Product name */}
                                <div className={cx('form-group')}>
                                    <label htmlFor="exampleInputName1">Tên sản phẩm</label>
                                    <input
                                        onChange={handleProductNameChange}
                                        onBlur={handleValidateProductName}
                                        value={productNameInput}
                                        type="text"
                                        className={cx('form-control', 'form-control-sm', 'border-secondary')}
                                        id="exampleInputName1"
                                        placeholder="Nhập tên sản phẩm"
                                    />
                                    <span className={cx('text-danger', 'fs-14')}>{productNameError}</span>
                                </div>
                                {/* End Product name */}

                                {/* Product description */}
                                <div className={cx('form-group')}>
                                    <label htmlFor="exampleTextarea1">Nội dung</label>
                                    <TextEditor
                                        onChange={handleProductDescChange}
                                        editorState={productDescInput}
                                        height={240}
                                    />
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
                                    <input
                                        ref={productImageInputRef}
                                        onChange={handleProductImageChange}
                                        hidden
                                        type="file"
                                    />
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
                                        Phiên bản
                                    </h4>
                                    <Collapse
                                        onChange={handleActiveCollapse}
                                        activeKey={activeCollapse}
                                        ghost
                                        size="small"
                                        expandIconPosition="end"
                                    >
                                        <Panel header="Thêm phiên bản sản phẩm" key="1">
                                            <div className={cx('row', 'g-4')}>
                                                {/* Options information */}
                                                <div className={cx('col-md-9')}>
                                                    <div className={cx('row', 'g-4')}>
                                                        {/* SKU input */}
                                                        <div className={cx('col-md-6')}>
                                                            <label htmlFor="intputSku">SKU</label>
                                                            <input
                                                                onChange={handleItemSkuChange}
                                                                onBlur={handleValidateSku}
                                                                value={itemSku}
                                                                type="text"
                                                                className={cx(
                                                                    'form-control',
                                                                    'form-control-sm',
                                                                    'border-secondary',
                                                                )}
                                                                id="intputSku"
                                                                placeholder="Nhập mã SKU"
                                                            />
                                                            <span className={cx('text-danger', 'fs-14')}>
                                                                {skuError}
                                                            </span>
                                                        </div>
                                                        {/* End SKU input */}

                                                        {/* Quantity input */}
                                                        <div className={cx('col-md-6')}>
                                                            <label htmlFor="inputQty">Số lượng</label>
                                                            <input
                                                                onChange={handleItemQtyChange}
                                                                onBlur={handleValidateQty}
                                                                value={itemQty}
                                                                type="number"
                                                                className={cx(
                                                                    'form-control',
                                                                    'form-control-sm',
                                                                    'border-secondary',
                                                                )}
                                                                id="inputQty"
                                                                placeholder="Nhập số lượng"
                                                            />
                                                            <span className={cx('text-danger', 'fs-14')}>
                                                                {qtyError}
                                                            </span>
                                                        </div>
                                                        {/* End Quantity input */}

                                                        {/* Price input */}
                                                        <div className={cx('col-md-6')}>
                                                            <label htmlFor="inputPrice">Giá bán</label>
                                                            <input
                                                                onChange={handleItemPriceChange}
                                                                onBlur={handleValidatePrice}
                                                                value={itemPrice}
                                                                type="number"
                                                                className={cx(
                                                                    'form-control',
                                                                    'form-control-sm',
                                                                    'border-secondary',
                                                                )}
                                                                id="inputPrice"
                                                                placeholder="Nhập giá bán"
                                                            />
                                                            <span className={cx('text-danger', 'fs-14')}>
                                                                {priceError}
                                                            </span>
                                                        </div>
                                                        {/* End Price input */}

                                                        {/* Cost price input */}
                                                        <div className={cx('col-md-6')}>
                                                            <label htmlFor="inputCostPrice">Giá gốc</label>
                                                            <input
                                                                onChange={handleItemCostPriceChange}
                                                                value={itemCostPrice}
                                                                type="number"
                                                                className={cx(
                                                                    'form-control',
                                                                    'form-control-sm',
                                                                    'border-secondary',
                                                                )}
                                                                id="inputCostPrice"
                                                                placeholder="Nhập giá gốc"
                                                            />
                                                        </div>
                                                        {/* End Cost price input */}

                                                        {/* Select properties */}
                                                        <div className={cx('col-md-12')}>
                                                            <label htmlFor="inputProperties">Thuộc tính</label>
                                                            <Select
                                                                onChange={handleItemPropertiesChange}
                                                                onBlur={handleValidateOptionIds}
                                                                value={itemProperties}
                                                                mode="multiple"
                                                                placeholder="Chọn thuộc tính"
                                                                style={{ width: '100%' }}
                                                                options={productOptionsPreview}
                                                                id="inputProperties"
                                                            />
                                                            <span className={cx('text-danger', 'fs-14')}>
                                                                {optionIdsError}
                                                            </span>
                                                        </div>
                                                        {/* End Select properties */}

                                                        {/* Add or edit item */}
                                                        <div className={cx('col-md-12')}>
                                                            {Object.keys(selectedItem).length > 0 ? (
                                                                <button
                                                                    onClick={handleUpdateProductItem}
                                                                    type="submit"
                                                                    className={cx(
                                                                        'btn',
                                                                        'btn-sm',
                                                                        'btn-gradient-info',
                                                                        'me-2',
                                                                    )}
                                                                >
                                                                    Cập nhật
                                                                </button>
                                                            ) : (
                                                                <button
                                                                    onClick={handleAddProductItem}
                                                                    type="submit"
                                                                    className={cx(
                                                                        'btn',
                                                                        'btn-sm',
                                                                        'btn-gradient-info',
                                                                        'me-2',
                                                                    )}
                                                                >
                                                                    Thêm phiên bản
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
                                                    <input
                                                        ref={itemImageInputRef}
                                                        onChange={handleItemImageChange}
                                                        hidden
                                                        type="file"
                                                    />
                                                    <div className={cx('d-flex', 'flex-column')}>
                                                        <Image
                                                            style={{ borderRadius: 6, border: '1px solid #d9d9d9' }}
                                                            width={'100%'}
                                                            src={itemImage.imagePreview || images.placeholder}
                                                        />
                                                        <button
                                                            onClick={(e) => {
                                                                e.preventDefault();
                                                                itemImageInputRef.current &&
                                                                    itemImageInputRef.current.click();
                                                            }}

                                                            className={cx(
                                                                'btn',
                                                                'btn-sm',
                                                                'btn-outline-secondary',
                                                                'mt-4',
                                                            )}
                                                        >
                                                            <Unicons.UilUpload size="14" className={cx('me-1')} />
                                                            Tải lên
                                                        </button>
                                                    </div>
                                                </div>
                                                {/* End Options image */}
                                            </div>
                                        </Panel>
                                    </Collapse>

                                    {/* Options table */}
                                    <div className={cx('overflow-x-auto')}>
                                        <ItemsTable
                                            items={productItems}
                                            productOptions={productOptions}
                                            handleRemoveItem={handleRemoveProductItem}
                                            handleSelectItem={handleSetSelectProductItem}
                                        />
                                        <span className={cx('text-danger', 'fs-14')}>{productItemsError}</span>
                                    </div>
                                    {/* End Options table */}
                                </div>
                                {/* End Product Options*/}

                                {/* <Divider /> */}
                                <div className={cx('mt-5')}>
                                    {action === 'create' ? (
                                        <button
                                            onClick={handleCreateProduct}
                                            type="submit"
                                            className={cx('btn', 'btn-gradient-primary', 'me-2')}
                                        >
                                            Tạo sản phẩm
                                        </button>
                                    ) : (
                                        <>
                                            <button
                                                onClick={handleUpdateProduct}
                                                type="submit"
                                                className={cx('btn', 'btn-gradient-primary', 'me-2')}
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
                                    <Link to="/admin/products" className={cx('btn', 'btn-light')}>
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
                    <div className={cx('card', 'shadow-sm')}>
                        <div className={cx('card-body')}>
                            <h4 className={cx('card-title', 'm-0')}>Trạng thái hiển thị</h4>
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
