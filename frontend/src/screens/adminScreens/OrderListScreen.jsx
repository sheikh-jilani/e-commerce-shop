import React from "react";
import { Container, Table } from "react-bootstrap";
import { RxCross2 } from "react-icons/rx";
import { LinkContainer } from "react-router-bootstrap";
import Message from "../../component/Message";
import Loader from "../../component/loader";
import { useAllOrdersQuery } from "../../slices/orderSlice";

const OrderListScreen = () => {
  const { data: orders, isLoading, error } = useAllOrdersQuery();
  return (
    <>
      <Container>
        <h3>OrderListScreen</h3>
        <Table responsive striped>
          <thead>
            <tr>
              <th>ID</th>
              <th>User</th>
              <th>DATE</th>
              <th>TOTAL</th>
              <th>PAID</th>
              <th>DELIVERED</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {isLoading ? (
              <Loader />
            ) : error ? (
              <Message variant={"danger"}>
                {error?.data?.message || error?.error}
              </Message>
            ) : (
              orders.map((order) => (
                <tr>
                  {console.log(order)}
                  <th>{order._id}</th>
                  <th>{order.userId.name}</th>
                  <th>{order.createdAt.substring(0, 10)}</th>
                  <th>{order.totalPrice} $</th>
                  <th>
                    {order.isPaid ? (
                      order.payedAt.substring(0, 10)
                    ) : (
                      <RxCross2 style={{ color: "red" }} />
                    )}
                  </th>
                  <th>
                    {order.isDelivered ? (
                      order.deliveredAt.substring(0, 10)
                    ) : (
                      <RxCross2 style={{ color: "red" }} />
                    )}
                  </th>
                  <th>
                    <LinkContainer to={`/orders/${order._id}`}>
                      <button className="btn btn-block">details</button>
                    </LinkContainer>
                  </th>
                </tr>
              ))
            )}
          </tbody>
        </Table>
      </Container>
    </>
  );
};

export default OrderListScreen;
