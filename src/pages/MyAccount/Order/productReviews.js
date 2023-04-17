import { api } from '@/api';
import { postData } from '@/api/service';
import notificationsSlice from '@/components/Admin/Notification/notificationsSlice';
import { Rate } from 'antd';
import { useState } from 'react';

function ProductReviews({ orderItems, optionItems, setOrderItems, getDataMyOrder, dispatch, setVisible }) {
    // const handleReviewProduct = () => {};
    const [chooseProductReview, setChooseProductReview] = useState(0);

    const desc = ['Tệ', 'Không hài lòng', 'Bình thường', 'Hài lòng', 'Tuyệt vời'];
    // handle change review input and rating
    const handleChangeReviewOrderItem = (id, value, name) => {
        const orderItemsWhenReview = orderItems.map((item) => {
            if (id === item.orderItemId) {
                if (name === 'rate') {
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
        const title = desc[orderItems[positionArrayOrderItems].rate - 1];
        const postItemReviewData = {
            comment: orderItems[positionArrayOrderItems].comment,
            ratingValue: orderItems[positionArrayOrderItems].rate,
            title: title,
            orderItemId: orderItems[positionArrayOrderItems].orderItemId,
        };
        console.log(postItemReviewData);
        dispatch(notificationsSlice.actions.showLoading('Đang cập nhật'));
        postData(api.userReview, postItemReviewData)
            .then((response) => {
                const newData = orderItems.filter((orderItem) => orderItem.orderItemId !== response.data.orderItemId);
                console.log(newData);
                setOrderItems(newData);
                if (newData.length === 0) {
                    setVisible(false);
                }
                getDataMyOrder();
                dispatch(notificationsSlice.actions.showSuccess('Đánh giá thành công'));
                setTimeout(() => {
                    dispatch(notificationsSlice.actions.destroy());
                }, 1000);
                setChooseProductReview(0);
                console.log(response);
            })
            .catch((error) => {
                dispatch(notificationsSlice.actions.showSuccess('Đánh giá không thành công'));
                setTimeout(() => {
                    dispatch(notificationsSlice.actions.destroy());
                }, 1000);
                console.log(error);
            });
    };

    return (
        <>
            <div className="product-review">
                {orderItems.length !== 0
                    ? orderItems.map((orderItem, i) => {
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
                                                  handleChangeReviewOrderItem(orderItem.orderItemId, value, 'rate');
                                              }}
                                              defaultValue={orderItem.rate}
                                          />
                                          {orderItem.rate ? (
                                              <span className="ant-rate-text">{desc[orderItem.rate - 1]}</span>
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
                                              handleSubmitReviewProduct(i);
                                          }}
                                          className={chooseProductReview !== i ? 'button-noChecked' : ''}
                                      >
                                          Hoàn thành
                                      </button>
                                  </div>
                              </div>
                          );
                      })
                    : false}
            </div>
        </>
    );
}

export default ProductReviews;
