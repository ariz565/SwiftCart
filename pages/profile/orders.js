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

// ----------------- Define the Order Component -----------------
export default function Orders({ user, tab, orders }) {
  const router = useRouter();
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
                    slugify(link.name, { lower: true }) ==
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
                    {order.paymentMethod == "paypal"
                      ? "Paypal"
                      : order.paymentMethod == "credit_card"
                      ? "Credit card"
                      : "Cash on delivery"}
                  </td>
                  <td>${order.total}</td>
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
    case "canceled":
      filter = "Canceled";
      break;
  }

  
  if (!filter) {
    orders = await Order.find({ user: session?.user.id })
      .sort({
        createdAt: -1,
      })
      .lean();


  } else if (filter == "paid") {
    orders = await Order.find({ user: session?.user.id, isPaid: true })
      .sort({
        createdAt: -1,
      })
      .lean();

   
  } else if (filter == "unpaid") {
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
