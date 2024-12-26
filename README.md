# Swiftcart: Simplifying E-Commerce & Content Management

<img src="https://raw.githubusercontent.com/ariz565/SwiftCart/refs/heads/main/public/images/user%20login.png" alt="Project Screenshot" style="width:100%; height:auto;">

**Swiftcart** is a comprehensive e-commerce platform integrated with seamless content management capabilities. It is designed to simplify online shopping for customers and provide powerful tools for administrators to manage products, orders, and promotions efficiently.

## Project Overview

Swiftcart combines the best of e-commerce functionalities and a content management system (CMS) to create a seamless shopping experience. The platform allows users to browse products, make secure purchases, and receive personalized recommendations based on their browsing habits. Administrators can manage products, categories, orders, users, and promotions through a comprehensive dashboard.

This project leverages modern technologies like **Next.js** for the frontend, **Node.js** with **Express** for the backend, and **MongoDB** as the database. Additionally, the platform integrates **Amazon Personalize** for AI-driven product recommendations and **Cloudinary** for product image storage.

## Features

### **Features**

1. **User Authentication**
   - Registration with email verification and social login (Google, GitHub, etc.).
   - Secure authentication using **NextAuth**.
   - Password reset and session management.

2. **User Profile**
   - Update personal details and profile picture.
   - View and manage orders with order status and cancellation options.
   - Manage shipping addresses and payment methods.

3. **Shopping Catalogue**
   - Browse products with advanced search and filtering (category, size, color, price, etc.).
   - Sort products by price, popularity, ratings, etc.
   - View product details, reviews, and ratings.

4. **Shopping Cart**
   - Add products to cart, update quantities, and view cart summary.
   - Remove products and proceed to checkout.

5. **Checkout**
   - Review cart summary, select a shipping address, and choose payment methods (Stripe, Razorpay, etc.).
   - Apply coupons and place orders.

6. **Order Tracking**
   - View order history and track the status of current orders.

7. **Reviews & Ratings**
   - Leave reviews and ratings for purchased products.
   - View and filter product reviews.

8. **Newsletter Subscription**
   - Subscribe to newsletters for promotional emails and updates.

9. **Location Detection**
   - Detect user's location and display relevant products.

10. **Guest Access**
    - Browse products without logging in, preview flash deals, and view ratings.

## Technology Stack

- **Frontend:**  
  - Next.js (React-based framework for SSR)
  - Tailwind CSS (Styling)
  - Axios (API requests)
  
- **Backend:**  
  - Next js (Backend logic)
  - MongoDB (Database)
  - Amazon Services
  - Cloudinary 
  
- **Authentication & Session Management:**  
  - NextAuth.js for user authentication and session management

- **Payment Integration:**  
  - Razorpay and Stripe for secure payments

- **Deployment:**  
  - Vercel (Frontend deployment)
  - AWS Amplify
  - MongoDB Atlas (Database hosting)

## Installation

To run the project locally, follow these steps:

### Prerequisites
- Node.js (v14.x or higher)
- MongoDB
- Stripe and Razorpay accounts for payment integrations

### Steps

1. Clone the repository:
   ```bash
   git clone https://github.com/ariz565/swiftcart.git
   cd swiftcart
2 . Install the dependencies:
npm install
# or
yarn install


## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.js`. The page auto-updates as you edit the file.

[API routes](https://nextjs.org/docs/api-routes/introduction) can be accessed on [http://localhost:3000/api/hello](http://localhost:3000/api/hello). This endpoint can be edited in `pages/api/hello.js`.

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/api-routes/introduction) instead of React pages.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.


<!--  -->
