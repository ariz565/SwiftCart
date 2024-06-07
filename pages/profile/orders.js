import { getSession } from "next-auth/react";
import Head from "next/head";
import Link from "next/link";
import slugify from "slugify";
import { useRouter } from "next/router";
import { FiExternalLink } from "react-icons/fi";
import styles from "../../styles/profile.module.scss";
import Layout from "@/components/profile/layout";
import Order from "../../models/Order";
import { ordersLinks } from "../../data/profile";
import Swal from "sweetalert2";
import { useEffect } from "react";

// Define the Orders Component
export default function Orders({ user, tab, orders }) {
  const router = useRouter();

  // Function to handle order cancellation
  // Function to handle order cancellation
  const cancelOrder = async (orderId) => {
    // Display confirmation dialog
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "Once canceled, you will not be able to recover this order!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, cancel it!",
    });

    // If user confirms cancellation, proceed with cancellation
    if (result.isConfirmed) {
      try {
        const response = await fetch(`/api/order/${orderId}/cancel`, {
          method: "PUT",
        });
        if (response.ok) {
          // Show success message
          Swal.fire("Canceled!", "Your order has been canceled.", "success");
          // Reload orders after cancellation
          router.reload();
        } else {
          console.error("Failed to cancel order");
          Swal.fire("Error!", "Failed to cancel order.", "error");
        }
      } catch (error) {
        console.error("Error canceling order:", error);
        Swal.fire("Error!", "Failed to cancel order.", "error");
      }
    }
  };
  // Function to automatically update order statuses
  useEffect(() => {
    const orderStatusUpdater = async () => {
      try {
        const response = await fetch(`/api/order/updateStatus`, {
          method: "PUT",
        });
        if (!response.ok) {
          console.error("Failed to update order statuses");
        }
      } catch (error) {
        console.error("Error updating order statuses:", error);
      }
    };

    // Run the updater on mount and then every hour
    orderStatusUpdater();
    const interval = setInterval(orderStatusUpdater, 60 * 60 * 1000); // 1 hour

    return () => clearInterval(interval);
  }, []);
  return (
    <>
      <Layout session={user.user} tab={tab}>
        <Head>
          <title>Orders</title>
        </Head>
        <div className={styles.orders}>
          <div className={styles.header}>
            <h1 className={styles.title}>MY ORDERS</h1>
          </div>
          <nav>
            <ul>
              {ordersLinks.map((link, i) => (
                <li
                  key={i}
                  className={
                    slugify(link.name, { lower: true }) ===
                    router.query.q.split("__")[0]
                      ? styles.active
                      : ""
                  }
                >
                  <Link
                    href={`orders?tab=${tab}&q=${slugify(link.name, {
                      lower: true,
                    })}${link.filter ? `__${link.filter}` : ""}`}
                  >
                    {link.name.replace("Orders", "")}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          <table>
            <thead>
              <tr>
                <td>Order ID</td>
                <td>Products</td>
                <td>Payment method</td>
                <td>Total</td>
                <td>Paid</td>
                <td>Status</td>
                <td>View</td>
                <td>Action</td> {/* New column for cancellation action */}
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order._id}>
                  <td>{order._id}</td>
                  <td className={styles.orders__images}>
                    {order.products.map((p) => (
                      <img key={p._id} alt="" src={p.image} />
                    ))}
                  </td>
                  <td>
                    {order.paymentMethod === "razorpay"
                      ? "Razorpay"
                      : order.paymentMethod === "credit_card"
                      ? "Credit card"
                      : "Cash on delivery"}
                  </td>
                  <td>₹{order.total}</td>
                  <td className={styles.orders__paid}>
                    {order.isPaid ? (
                      <div className={styles.ver}>
                        <img src="/images/verified.png" alt="" /> Paid
                      </div>
                    ) : (
                      <div className={styles.unver}>
                        <img src="/images/unverified.png" alt="" /> Unpaid
                      </div>
                    )}
                  </td>
                  <td>{order.status}</td>
                  <td>
                    <Link href={`/order/${order._id}`} target="_blank">
                      <FiExternalLink />
                    </Link>
                  </td>
                  <td>
                    {!order.isPaid &&
                      order.status !== "Cancelled" && ( // Display cancel button if order is unpaid and not already canceled
                        <button onClick={() => cancelOrder(order._id)}>
                          Cancel
                        </button>
                      )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Layout>
    </>
  );
}

export async function getServerSideProps(ctx) {
  const { query, req } = ctx;
  const session = await getSession(ctx);
  const tab = query.tab || 0;

  let filter = query.q.split("__")[1];

  let orders = [];

  switch (filter) {
    case "processing":
      filter = "Processing";
      break;
    case "not_processed":
      filter = "Not Processed";
      break;
    case "dispatched":
      filter = "Dispatched";
      break;
    case "completed":
      filter = "Completed";
      break;
    case "cancelled":
      filter = "Cancelled";
      break;
  }

  if (!filter) {
    orders = await Order.find({ user: session?.user.id })
      .sort({
        createdAt: -1,
      })
      .lean();
  } else if (filter === "paid") {
    orders = await Order.find({ user: session?.user.id, isPaid: true })
      .sort({
        createdAt: -1,
      })
      .lean();
  } else if (filter === "unpaid") {
    orders = await Order.find({ user: session?.user.id, isPaid: false })
      .sort({
        createdAt: -1,
      })
      .lean();
  } else {
    orders = await Order.find({ user: session?.user.id, status: filter })
      .sort({
        createdAt: -1,
      })
      .lean();
  }

  return {
    props: {
      user: session,
      tab,
      orders: JSON.parse(JSON.stringify(orders)),
    },
  };
}
