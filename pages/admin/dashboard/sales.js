import Layout from "../../../components/admin/layout";
import Order from "../../../models/Order";
import Product from "../../../models/Product";
import db from "../../../utils/db";
import { useState } from "react";
import { Bar, Pie } from "react-chartjs-2";
import Chart from "chart.js/auto";

export default function Sales({ sales, products, topSpender }) {
  const [salesData, setSalesData] = useState(sales);

  // Aggregate sales data by month and year
  const aggregatedSales = salesData.reduce((acc, sale) => {
    const date = new Date(sale.createdAt);
    const month = date.toLocaleDateString("en-US", { month: "long" });
    const year = date.getFullYear();
    const key = `${month} ${year}`;

    if (!acc[key]) {
      acc[key] = 0;
    }
    acc[key] += sale.total;

    return acc;
  }, {});

  const chartLabels = Object.keys(aggregatedSales).sort((a, b) => {
    const [monthA, yearA] = a.split(" ");
    const [monthB, yearB] = b.split(" ");

    const dateA = new Date(`${monthA} 1, ${yearA}`);
    const dateB = new Date(`${monthB} 1, ${yearB}`);

    return dateA - dateB;
  });

  const chartData = {
    labels: chartLabels,
    datasets: [
      {
        label: "Total Sales",
        data: chartLabels.map((label) => aggregatedSales[label]),
        backgroundColor: "rgba(75,192,192,0.6)",
        borderColor: "rgba(75,192,192,1)",
        borderWidth: 1,
      },
    ],
  };

  const chartOptions = {
    scales: {
      x: {
        title: {
          display: true,
          text: "Month",
        },
      },
      y: {
        title: {
          display: true,
          text: "Revenue",
        },
        beginAtZero: true,
      },
    },
    plugins: {
      tooltip: {
        callbacks: {
          label: function (context) {
            return `Total Sales: $${context.raw}`;
          },
        },
      },
    },
  };

  // Aggregate sales data by category
  const categorySales = salesData.reduce((acc, sale) => {
    sale.products.forEach((product) => {
      const category = product.product.category.name;
      if (!acc[category]) {
        acc[category] = 0;
      }
      acc[category] += sale.total;
    });
    return acc;
  }, {});

  const pieChartLabels = Object.keys(categorySales);
  const pieChartData = {
    labels: pieChartLabels,
    datasets: [
      {
        data: pieChartLabels.map((label) => categorySales[label]),
        backgroundColor: pieChartLabels.map(
          () =>
            `rgba(${Math.floor(Math.random() * 255)}, ${Math.floor(
              Math.random() * 255
            )}, ${Math.floor(Math.random() * 255)}, 0.6)`
        ),
        borderColor: pieChartLabels.map(
          () =>
            `rgba(${Math.floor(Math.random() * 255)}, ${Math.floor(
              Math.random() * 255
            )}, ${Math.floor(Math.random() * 255)}, 1)`
        ),
        borderWidth: 1,
      },
    ],
  };

  const pieChartOptions = {
    aspectRatio: 0.8, // Adjust the aspect ratio to reduce size
  };

  return (
    <Layout>
      <h1>Sales</h1>
      <Bar data={chartData} options={chartOptions} />
      <h2>Category-wise Sales</h2>
      <Pie data={pieChartData} options={pieChartOptions} />
      <h2>Top Spender</h2>
      <p>{`User: ${topSpender.userName}`}</p>
      <p>{`Total Spent: ₹${topSpender.totalSpent.toFixed(2)}`}</p>{" "}
      {/* Adjust the currency format as needed */}
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
                  <div key={product.product._id}>{product.product.name}</div>
                ))}
              </td>
              <td>
                {sale.products.map((product) => (
                  <div key={product.product._id}>{product.qty}</div>
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
  const sales = await Order.find({})
    .populate({
      path: "products.product",
      populate: {
        path: "category",
        model: "Category",
      },
    })
    .populate("user") // Ensure user is populated
    .exec();

  const products = await Product.find({}).exec();

  // Aggregate user spending
  const userSpending = sales.reduce((acc, sale) => {
    const userId = sale.user._id;
    const userName = `${sale.user.firstName} ${sale.user.lastName}`;
    if (!acc[userId]) {
      acc[userId] = {
        userName: userName,
        totalSpent: 0,
      };
    }
    acc[userId].totalSpent += sale.total;

    return acc;
  }, {});

  // Find top spender
  const topSpender = Object.values(userSpending).reduce(
    (max, user) => (user.totalSpent > max.totalSpent ? user : max),
    { totalSpent: 0 }
  );

  return {
    props: {
      sales: JSON.parse(JSON.stringify(sales)),
      topSpender,
    },
  };
}
