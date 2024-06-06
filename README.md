This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

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

## Project Structure
swiftcart/
├── components/
│   ├── Actions/
│   │   ├── index.js
│   │   └── styles.module.scss
│   ├── breadCrumb/
│   │   ├── index.js
│   │   └── styles.module.scss
│   ├── nextImage/
│   │   └── index.js
│   ├── popup/
│   │   └── index.js
│   ├── shimmerEffect/
│   │   └── index.js
│   ├── admin/
│   │   ├── categories/
│   │   │   ├── index.js
│   │   │   └── styles.module.scss
│   │   ├── coupons/
│   │   │   ├── index.js
│   │   │   └── styles.module.scss
│   │   ├── createProduct/
│   │   │   ├── index.js
│   │   │   └── styles.module.scss
│   │   ├── dashboard/
│   │   │   ├── index.js
│   │   │   └── styles.module.scss
│   │   ├── layout/
│   │   │   ├── index.js
│   │   │   └── styles.module.scss
│   │   ├── orders/
│   │   │   └── table/
│   │   │       ├── index.js
│   │   │       └── styles.module.scss
│   │   ├── products/
│   │   │   ├── index.js
│   │   │   └── styles.module.scss
│   │   ├── subCategories/
│   │   │   ├── index.js
│   │   │   └── styles.module.scss
│   │   └── users/
│   │       ├── index.js
│   │       └── styles.module.scss
│   ├── browse/
│   │   ├── brandsFilter/
│   │   │   └── index.js
│   │   ├── categoryFilter/
│   │   │   └── index.js
│   │   ├── colorsFilter/
│   │   │   └── index.js
│   │   ├── genderFilter/
│   │   │   └── index.js
│   │   ├── headingFilter/
│   │   │   └── index.js
│   │   ├── materialsFilter/
│   │   │   └── index.js
│   │   ├── patternsFilter/
│   │   │   └── index.js
│   │   ├── sizesFilter/
│   │   │   └── index.js
│   │   └── stylesFilter/
│   │       └── index.js
│   ├── buttons/
│   │   ├── circledIconBtn/
│   │   │   └── index.js
│   │   └── hasIconBtn/
│   │       └── index.js
│   ├── cart/
│   │   ├── cartHeader/
│   │   │   └── index.js
│   │   ├── checkout/
│   │   │   └── index.js
│   │   ├── empty/
│   │   │   └── index.js
│   │   ├── header/
│   │   │   └── index.js
│   │   ├── paymentMethods/
│   │   │   └── index.js
│   │   └── products/
│   │       └── index.js
│   ├── checkout/
│   │   ├── payment/
│   │   │   └── index.js
│   │   ├── products/
│   │   │   └── index.js
│   │   ├── shipping/
│   │   │   └── index.js
│   │   └── summary/
│   │       └── index.js
│   ├── countdown/
│   │   ├── index.js
│   │   ├── styles.module.scss
│   │   └── utils.js
│   ├── dialogModal/
│   │   └── index.js
│   ├── footer/
│   │   ├── copyright.js
│   │   ├── links.js
│   │   ├── newsletter.js
│   │   ├── payment.js
│   │   ├── policy.js
│   │   ├── socials.js
│   │   ├── index.js
│   │   └── styles.module.scss
│   ├── header/
│   │   ├── ad.js
│   │   ├── headerCartItem.js
│   │   ├── Main.js
│   │   ├── Top.js
│   │   ├── userMenu.js
│   │   ├── index.js
│   │   └── styles.module.scss
│   ├── home/
│   │   ├── category/
│   │   │   └── index.js
│   │   ├── flashDeals/
│   │   │   └── index.js
│   │   ├── main/
│   │   │   └── index.js
│   │   └── recentlyViewed/
│   │       └── index.js
│   ├── inputs/
│   │   ├── adminInput/
│   │   │   └── index.js
│   │   ├── loginInput/
│   │   │   └── index.js
│   │   └── shippingInput/
│   │       └── index.js
│   ├── loaders/
│   │   ├── dotLoader/
│   │   │   └── index.js
│   │   └── dotLoader2/
│   │       └── index.js
│   ├── productCard/
│   │   ├── index.js
│   │   └── styles.module.scss
│   │   └── ProductSwiper.js
│   ├── productPage/
│   │   ├── infos/
│   │   ├── mainSwiper/
│   │   └── reviews/
│   ├── productsSwiper/
│   │   ├── index.js
│   │   └── styles.module.scss
│   ├── profile/
│   │   ├── Sidebar.js
│   │   ├── SidebarItem.js
│   │   ├── index.js
│   │   └── styles.module.scss
│   ├── razorpayPayment/
│   │   ├── index.js
│   │   └── styles.module.scss
│   ├── selects/
│   │   ├── MultipleSelect.js
│   │   ├── SingularSelect.js
│   │   └── styles.module.scss
│   └── stripePayment/
│       ├── Form.js
│       ├── index.js
│       └── styles.module.scss
├── data/
│   ├── categories.json
│   ├── countries.js
│   ├── home.js
│   ├── notifications.js
│   ├── paymentMethods.js
│   ├── products.js
│   ├── products.json
│   └── profile.js
├── emails/
│   ├── activateEmailTemplate.js
│   ├── orderConfirmationTemplate.js
│   └── resetEmailTemplate
├── models/
│   ├── Cart.js
│   ├── Category.js
│   ├── Coupon.js
│   ├── Order.js
│   ├── Product.js
│   ├── SubCategory.js
│   └── User.js
├── pages/
│   ├── admin/
│   │   ├── dashboard/
│   │   │   ├── product/
│   │   │   │   ├── all.js
│   │   │   │   └── create.js
│   │   │   ├── categories.js
│   │   │   ├── coupons.js
│   │   │   ├── index.js
│   │   │   ├── orders.js
│   │   │   ├── sales.js
│   │   │   ├── subCategories.js
│   │   │   └── users.js
│   ├── api/
│   │   ├── admin/
│   │   │   ├── product/
│   │   │   │   └── index.js
│   │   │   └── category.js
│   │   │   └── coupon.js
│   │   │   └── deleteUser.js
│   │   │   └── subcategory.js
│   │   ├── auth/
│   │   │   ├── lib/
│   │   │   │   └── mongodb.js
│   │   │   ├── [...nextauth].js
│   │   │   ├── forgot.js
│   │   │   ├── reset.js
│   │   │   └── signup.js
│   │   ├── cloudinary/
│   │   │   └── index.js
│   │   ├── coupon/
│   │   │   └── index.js
│   │   ├── order/
│   │   │   ├── [id]/
│   │   │   │   ├── cancel.js
│   │   │   │   ├── pay.js
│   │   │   │   ├── payWithRazorpay.js
│   │   │   │   └── payWithStripe.js
│   │   │   ├── create.js
│   │   │   └── updateStatus.js
│   │   ├── product/
│   │   │   ├── [id]/
│   │   │   │   ├── index.js
│   │   │   │   └── review.js
│   │   │   └── recent.js
│   │   └── user/
│   │       ├── bag/
│   │       │   ├── [id].js
│   │       │   └── index.js
│   │       ├── applyCoupon.js
│   │       ├── changeInfo.js
│   │       ├── changePM.js
│   │       ├── changePassword.js
│   │       ├── deleteAddress.js
│   │       ├── manageAddress.js
│   │       ├── saveAddress.js
│   │       ├── saveCart.js
│   │   └── newsletter.js
│   ├── auth/
│   │   ├── reset/
│   │   │   └── [token].js
│   │   └── forgot.js
│   ├── order/
│   │   └── [id].js
│   ├── product/
│   │   └── [slug].js
│   ├── profile/
│   │   ├── Address.js
│   │   ├── index.js
│   │   ├── orders.js
│   │   ├── payment.js
│   │   ├── recent.js
│   │   ├── security.js
│   │   └── wishlist.js
│   ├── _app.js
│   ├── _document.js
│   ├── browse.js
│   ├── cart.js
│   ├── checkout.js
│   ├── complete.js
│   ├── index.js
│   ├── signin.js
│   └── success.js
├── public/
│   ├── icons/
│   ├── images/
│   ├── favicon.ico
│   ├── logo.png
│   ├── next.svg
│   └── vercel.svg
├── requests/
│   ├── upload.js
│   └── user.js
├── store/
│   ├── DialogSlice.js
│   ├── ExplandSlice.js
│   ├── cartSlice.js
│   └── userSlice.js
├── styles/
│   ├── base.scss
│   ├── browse.module.scss
│   ├── cart.module.scss
│   ├── checkout.module.scss
│   ├── dashboard.module.scss
│   ├── forgot.module.scss
│   ├── globals.scss
│   ├── home.module.scss
│   ├── order.module.scss
│   ├── product.module.scss
│   ├── products.module.scss
│   ├── profile.module.scss
│   ├── signin.module.scss
│   └── success.module.scss
├── utils/
│   ├── arrays_utils.js
│   ├── dataURItoblob.js
│   ├── db.js
│   ├── orderStatusUpdater.js
│   ├── orderSuccess.js
│   ├── productUtils.js
│   ├── sendEmails.js
│   ├── tokens.js
│   └── validation.js
├── .gitignore
├── jsconfig.json
├── middleware.js
├── next.config.mjs
├── package.json
├── README.md
└── yarn.lock
