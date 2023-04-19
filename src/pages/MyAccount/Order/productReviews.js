import { api } from '@/api';
import { postData, updateData } from '@/api/service';
import notificationsSlice from '@/components/Admin/Notification/notificationsSlice';
import Loading from '@/components/Loading/Loading';
import { Rate } from 'antd';
import { useState } from 'react';

function ProductReviews({
    orderItems,
    optionItems,
    setOrderItems,
    getDataMyOrder,
    dispatch,
    setVisible,
    typeActionRating,
}) {
    // const handleReviewProduct = () => {};
    const [chooseProductReview, setChooseProductReview] = useState(0);

    const desc = ['Tệ', 'Không hài lòng', 'Bình thường', 'Hài lòng', 'Tuyệt vời'];
    // handle change review input and rating
    const handleChangeReviewOrderItem = (id, value, name) => {
        const orderItemsWhenReview = orderItems.map((item) => {
            if (id === item.orderItemId) {
                if (name === 'ratingValue') {
                    return { ...item, [name]: value, title: desc[value - 1] };
                }
                return { ...item, [name]: value };
            }
            return item;
        });
        setOrderItems(orderItemsWhenReview);
    };
    // handle send review product
    const handleSubmitReviewProduct = (positionArrayOrderItems) => {
        const title = desc[orderItems[positionArrayOrderItems].ratingValue - 1];
        const postItemReviewData = {
            comment: orderItems[positionArrayOrderItems].comment,
            ratingValue: orderItems[positionArrayOrderItems].ratingValue,
            title: title,
            orderItemId: orderItems[positionArrayOrderItems].orderItemId,
        };
        console.log(postItemReviewData);
        dispatch(notificationsSlice.actions.showLoading('Đang cập nhật'));
        postData(api.userReview, postItemReviewData)
            .then((response) => {
                const newData = orderItems.filter((orderItem) => orderItem.orderItemId !== response.data.orderItemId);

                getDataMyOrder();
                setTimeout(() => {
                    setOrderItems(newData);
                    if (newData.length === 0) {
                        setVisible(false);
                    }
                    dispatch(notificationsSlice.actions.showSuccess('Đánh giá thành công'));
                    setChooseProductReview(0);
                    console.log('review', response.data);
                }, 1000);
                setTimeout(() => {
                    dispatch(notificationsSlice.actions.destroy());
                }, 2000);
            })
            .catch((error) => {
                dispatch(notificationsSlice.actions.showError('Lỗi'));
                setTimeout(() => {
                    dispatch(notificationsSlice.actions.destroy());
                }, 1000);
                console.log(error);
            });
    };

    const handleEditReviewProduct = (orderItemId, positionArrayOrderItems) => {
        const title = desc[orderItems[positionArrayOrderItems].ratingValue - 1];
        const postItemReviewData = {
            comment: orderItems[positionArrayOrderItems].comment,
            ratingValue: orderItems[positionArrayOrderItems].ratingValue,
            title: title,
            orderItemId: orderItems[positionArrayOrderItems].orderItemId,
        };
        dispatch(notificationsSlice.actions.showLoading('Đang cập nhật'));
        updateData(api.userReview + `/${orderItemId}`, postItemReviewData)
            .then((response) => {
                getDataMyOrder();
                setTimeout(() => {
                    const newData = orderItems.filter(
                        (orderItem) => orderItem.orderItemId !== response.data.orderItemId,
                    );
                    setOrderItems(newData);
                    if (newData.length === 0) {
                        setVisible(false);
                    }
                    dispatch(notificationsSlice.actions.showSuccess('Thay đổi thành công'));
                }, 1000);

                setTimeout(() => {
                    dispatch(notificationsSlice.actions.destroy());
                }, 2000);
                console.log('review', response.data);
            })
            .catch((err) => {
                dispatch(notificationsSlice.actions.showError('Không thể thay đổi'));

                setTimeout(() => {
                    dispatch(notificationsSlice.actions.destroy());
                }, 1000);
                console.log(err);
            });
    };
    return (
        <>
            <div className="product-review">
                {orderItems.length !== 0 ? (
                    orderItems.map((orderItem, i) => {
                        return (
                            <div
                                onClick={() => {
                                    setChooseProductReview(i);
                                }}
                                key={orderItem.orderItemId}
                                className={
                                    chooseProductReview === i
                                        ? 'product_review-item choose-review'
                                        : 'product_review-item'
                                }
                            >
                                <div className="product-item-review">
                                    <div className="cart-items-bytrung">
                                        <div className="cart-img">
                                            <img src={orderItem.product.image} alt="" />
                                        </div>
                                        <div className="cart-info">
                                            <h5 className="item-name">{orderItem.product.name}</h5>
                                            <p className="item-type">
                                                Phân loại:{' '}
                                                {orderItem.product.items[0].optionsId.map((optionCurrentItem) => {
                                                    const typeOption = optionItems.find(
                                                        (o) => o.productOptionId === optionCurrentItem,
                                                    );
                                                    return typeOption.name + ' ';
                                                })}
                                            </p>
                                        </div>
                                    </div>
                                    <div className="rate-star">
                                        <p>Chất lượng sản phẩm</p>
                                        <Rate
                                            allowClear={false}
                                            onChange={(value) => {
                                                handleChangeReviewOrderItem(
                                                    orderItem.orderItemId,
                                                    value,
                                                    'ratingValue',
                                                );
                                            }}
                                            defaultValue={orderItem.ratingValue}
                                        />
                                        {orderItem.ratingValue ? (
                                            <span className="ant-rate-text">{desc[orderItem.ratingValue - 1]}</span>
                                        ) : (
                                            ''
                                        )}
                                    </div>
                                </div>
                                <div className="form-review">
                                    <textarea
                                        onChange={(e) => {
                                            handleChangeReviewOrderItem(
                                                orderItem.orderItemId,
                                                e.target.value,
                                                'comment',
                                            );
                                            //   setCommentReview(e.target.value);
                                        }}
                                        value={orderItem.comment}
                                        placeholder="Hãy chia sẻ những điều bạn thích về sản phẩm này với những người bạn đã mua nhé"
                                        //   defaultValue={''}
                                    />
                                    <button
                                        onClick={() => {
                                            if (typeActionRating === 'edit') {
                                                handleEditReviewProduct(orderItem.orderItemId, i);
                                            } else {
                                                handleSubmitReviewProduct(i);
                                            }
                                        }}
                                        className={chooseProductReview !== i ? 'button-noChecked' : ''}
                                    >
                                        {typeActionRating === 'edit' ? 'Đánh giá lại' : 'Hoàn thành'}
                                    </button>
                                </div>
                            </div>
                        );
                    })
                ) : (
                    <div style={{ padding: '100px' }}>
                        <Loading />
                    </div>
                )}
            </div>
        </>
    );
}

export default ProductReviews;
