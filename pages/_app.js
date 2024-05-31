import "@/styles/globals.scss";
import { Provider } from "react-redux";
import store from "../store";
import { PersistGate } from "redux-persist/integration/react";
import { persistStore } from "redux-persist";
import { SessionProvider } from "next-auth/react";
import Head from "next/head";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { PagesProgressBar as ProgressBar } from "next-nprogress-bar";

//  Wrap the MyApp component with the SessionProvider
let persistor = persistStore(store);

function MyApp({ Component, pageProps: { session, ...pageProps } }) {
  return (
    <>
      <Head>
        <title>Swift Cart - All in One</title>
        <meta name="description" content="SwiftCart-CMS" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <SessionProvider session={session}>
        <Provider store={store}>
          <PersistGate loading={null} persistor={persistor}>
            <ProgressBar
              height="4px"
              color="#000000"
              options={{ showSpinner: false }}
              shallowRouting
            />
            <ToastContainer
              position="top-right"
              autoClose={5000}
              hideProgressBar={false}
              newestOnTop={false}
              closeOnClick
              rtl={false}
              pauseOnFocusLoss
              draggable
              pauseOnHover
              theme="colored"
            />
            <Component {...pageProps} />
          </PersistGate>
        </Provider>
      </SessionProvider>
    </>
  );
}

export default MyApp;
