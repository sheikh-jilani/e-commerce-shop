import React from "react";
import { Container, Table } from "react-bootstrap";
import { FaEdit } from "react-icons/fa";
import { FaDeleteLeft } from "react-icons/fa6";
import { ImCross } from "react-icons/im";
import { IoCheckmarkDoneCircleOutline } from "react-icons/io5";
import { LinkContainer } from "react-router-bootstrap";
import { Link } from "react-router-dom";
import Message from "../../component/Message";
import { errorAlert, successAlert } from "../../component/alert";
import Loader from "../../component/loader";
import {
  useDeleteUserByIdMutation,
  useGetAllUsersQuery,
} from "../../slices/authSlice";

const OrderListScreen = () => {
  const [deleteUser, { isLoading: LoadingDelete }] =
    useDeleteUserByIdMutation();
  const { data: users, isLoading, error, refetch } = useGetAllUsersQuery();
  React.useEffect(() => {
    refetch();
  }, [refetch]);
  const onClickHandler = async (id) => {
    try {
      if (window.confirm("do you want to delete")) {
        const res = await deleteUser(id).unwrap();
        successAlert(res);
        refetch();
      }
    } catch (error) {
      errorAlert(error?.data?.message || error?.error);
    }
  };
  return (
    <>
      <Container>
        <h3>All Users</h3>
        <Table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Admin</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {isLoading ? (
              <Loader />
            ) : error ? (
              <Message>{error?.data?.message || error?.error}</Message>
            ) : (
              users.map((x) => (
                <tr key={x._id}>
                  <td>{x._id}</td>
                  <td>{x.name}</td>
                  <td>
                    <Link to={`mailto:${x.username}`}>{x.username}</Link>
                  </td>
                  <td>
                    {x.isAdmin ? (
                      <IoCheckmarkDoneCircleOutline
                        style={{ color: "green", fontSize: "2em" }}
                      />
                    ) : (
                      <ImCross style={{ color: "red" }} />
                    )}
                  </td>
                  <td>
                    <LinkContainer
                      to={`/users/edit/${x._id}`}
                      style={{ marginRight: "20px", fontSize: "1.6em" }}
                    >
                      <FaEdit />
                    </LinkContainer>
                    {LoadingDelete ? (
                      <Loader />
                    ) : (
                      <FaDeleteLeft
                        onClick={() => onClickHandler(x._id)}
                        style={{ color: "red", fontSize: "1.6em" }}
                      />
                    )}
                  </td>
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
