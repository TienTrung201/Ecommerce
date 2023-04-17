import { Rate } from 'antd';
import { useEffect, useState } from 'react';

function ProductReviews({ orderItems, optionItems, setOrderItems }) {
    // const handleReviewProduct = () => {};
    const [chooseProductReviewId, setChooseProductReviewId] = useState(orderItems[0].orderItemId);
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
    //handle send review product
    // const handleSubmitReviewProduct =(positionArrayOrderItems)=>{

    // }
    useEffect(() => {
        console.log(orderItems);
    }, [orderItems]);
    return (
        <>
            <div className="product-review">
                {orderItems.length !== 0
                    ? orderItems.map((orderItem) => {
                          return (
                              <div
                                  onClick={() => {
                                      setChooseProductReviewId(orderItem.orderItemId);
                                  }}
                                  key={orderItem.orderItemId}
                                  className={
                                      chooseProductReviewId === orderItem.orderItemId
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
                                          placeholder="Đánh giá của bạn"
                                          //   defaultValue={''}
                                      />
                                      <button
                                          className={
                                              chooseProductReviewId !== orderItem.orderItemId ? 'button-noChecked' : ''
                                          }
                                      >
                                          Đánh giá
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
