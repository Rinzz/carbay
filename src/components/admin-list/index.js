import React from "react";
import { Table } from "react-bootstrap";
import DeleteButton from "../../components/delete-button";

const AdminList = ({ items, collection }) => {
  return (
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>#</th>
          <th>Name</th>
        </tr>
      </thead>
      <tbody>
        {items.map((item, index) => (
          <tr key={index}>
            <td>{index + 1}</td>
            {item.name && <td>{item.name}</td>}
            {!item.name && <td>{item}</td>}
            <td>
              <DeleteButton
                id={item.id}
                collection={collection}
                to={"/admin/" + collection}
              />
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

export default AdminList;