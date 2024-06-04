import Layout from "../../../components/admin/layout";
import db from "../../../utils/db";
import { useState } from "react";

export default function Sales({ sales }) {
  const [salesData, setSalesData] = useState(sales);

  return (
    <Layout>
      <h1>Sales</h1>
      <table>
        <thead>
          <tr>
            <th>Order ID</th>
            <th>Customer Name</th>
            <th>Product Name</th>
            <th>Quantity</th>
            <th>Price</th>
          </tr>
        </thead>
        {/* <tbody>
          {salesData.map((sale) => (
            <tr key={sale._id}>
              <td>{sale._id}</td>
              <td>{sale.customerName}</td>
              <td>{sale.productName}</td>
              <td>{sale.quantity}</td>
              <td>{sale.price}</td>
            </tr>
          ))}
        </tbody> */}
      </table>
    </Layout>
  );
}

