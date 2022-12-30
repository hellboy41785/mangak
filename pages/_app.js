import "../styles/globals.css";
import Layout from "../components/Layout";
import { QueryClientProvider, QueryClient, Hydrate } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import Head from "next/head";


function MyApp({ Component, pageProps }) {
  
  if (Component.getLayout){
    return Component.getLayout(<Component {...pageProps} />)
  }

  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      <Head>
        <title>Mangak</title>
        <meta name='Home' content="Latest Manga"/>
        <link rel="icon" href="https://img.icons8.com/color/240/null/berserk.png"/>
      </Head>
      <Hydrate state={pageProps.dehydratedState}>
        <Layout >
          <Component {...pageProps} />
        </Layout>
        <ReactQueryDevtools initialIsOpen={false} />
      </Hydrate>
    </QueryClientProvider>
  );
}

export default MyApp;
