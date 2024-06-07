import Layout from "../../../components/admin/layout";
import Order from "../../../models/Order";
import db from "../../../utils/db";
import { useState, useEffect } from "react";
import { Line } from "react-chartjs-2";
import Chart from 'chart.js/auto';

export default function Sales({ sales }) {
  const [salesData, setSalesData] = useState(sales);

  // Prepare data for the chart
  const chartData = {
    labels: salesData.map((sale) =>
      new Date(sale.createdAt).toLocaleDateString("en-US", {
        month: "long",
        year: "numeric",
      })
    ),
    datasets: [
      {
        label: "Total Sales",
        data: salesData.map((sale) => sale.total),
        borderColor: "rgba(75,192,192,1)",
        backgroundColor: "rgba(75,192,192,0.2)",
        fill: true,
      },
    ],
  };

  return (
    <Layout>
      <h1>Sales</h1>
      <Line data={chartData} />

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
        <tbody>
          {salesData.map((sale) => (
            <tr key={sale._id}>
              <td>{sale._id}</td>
              <td>{`${sale.shippingAddress.firstName} ${sale.shippingAddress.lastName}`}</td>
              <td>
                {sale.products.map((product) => (
                  <div key={product.product}>{product.name}</div>
                ))}
              </td>
              <td>
                {sale.products.map((product) => (
                  <div key={product.product}>{product.qty}</div>
                ))}
              </td>
              <td>{sale.total}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </Layout>
  );
}

export async function getServerSideProps() {
  await db.connectDb();

  // Fetch sales data
  const sales = await Order.find({}).populate("products.product");

  return {
    props: {
      sales: JSON.parse(JSON.stringify(sales)),
    },
  };
}
