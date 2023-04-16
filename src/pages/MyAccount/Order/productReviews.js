import { Rate } from 'antd';
import { useState } from 'react';

function ProductReviews({ orderItems, optionItems }) {
    // const handleReviewProduct = () => {};
    const [chooseProductReview, setChooseAddressReview] = useState(orderItems[0].orderItemId);

    return (
        <>
            <div className="product-review">
                {orderItems.length !== 0
                    ? orderItems.map((orderItem) => {
                          return (
                              <div
                                  onClick={() => {
                                      setChooseAddressReview(orderItem.orderItemId);
                                  }}
                                  key={orderItem.orderItemId}
                                  className={
                                      chooseProductReview === orderItem.orderItemId
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
                                          <Rate allowHalf defaultValue={5} />
                                      </div>
                                  </div>
                                  <div className="form-review">
                                      <textarea placeholder="Đánh giá của bạn" defaultValue={''} />
                                      <button
                                          className={
                                              chooseProductReview !== orderItem.orderItemId ? 'button-noChecked' : ''
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
