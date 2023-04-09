import { api } from '@/api';
import { getData } from '@/api/service';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import userOrderSlice from './UserOrderSlice';
import { optionsSelector, userOrderSelector } from '@/redux/selector';
import { convertVnd } from '@/components/GlobalStyles/fuction';

function Order() {
    const dispatch = useDispatch();
    const dataOrder = useSelector(userOrderSelector);
    const optionItems = useSelector(optionsSelector);
    useEffect(() => {
        getData(api.shopOrders)
            .then((response) => {
                dispatch(userOrderSlice.actions.setDataOrder(response.data));
                console.log(response);
            })
            .catch((error) => {
                console.log(error);
            });
    }, [dispatch]);
    useEffect(() => {
        console.log(dataOrder);
    }, [dataOrder]);
    return (
        <div className="shopping-cart">
            <div className="table-responsive">
                {dataOrder.length !== 0
                    ? dataOrder.map((order) => {
                          return (
                              <div key={order.orderId} className="table cart-table">
                                  <div className="product-thumbnail">Mã đơn</div>

                                  <div>
                                      {order.items.map((item) => {
                                          return (
                                              <div key={item.orderItemId} className="cart-items-bytrung">
                                                  <div className="cart-img">
                                                      <img src={item.product.image} alt="" />
                                                  </div>
                                                  <div className="cart-info">
                                                      <h5 className="item-name">{item.product.name}</h5>
                                                      <p className="item-type">
                                                          {item.product.items[0].optionsId.map((optionCurrentItem) => {
                                                              const typeOption = optionItems.find(
                                                                  (o) => o.productOptionId === optionCurrentItem,
                                                              );
                                                              return typeOption.name + ' ';
                                                          })}
                                                      </p>
                                                      <span className="item-quantity">x{item.qty}</span>
                                                  </div>
                                                  <div className="cart-total">
                                                      {convertVnd(item.product.items[0].price)}
                                                  </div>
                                              </div>
                                          );
                                      })}
                                  </div>
                                  <div>
                                      <div className="cart-total-order">
                                          <div className="order-total-box">
                                              <p className="total-title"> Thành tiền</p>
                                              <p className="total-price">{convertVnd(order.orderTotal)}</p>
                                          </div>
                                      </div>
                                  </div>
                              </div>
                          );
                      })
                    : false}
            </div>
        </div>
    );
}

export default Order;
