import { AppProps } from 'next/app';
import Head from 'next/head';
import '@solana/wallet-adapter-react-ui/styles.css';
import './styles.css';
import { ContextProvider } from '@rust-solana-labs/solana-workshops/nft-minter/contexts';

function CustomApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>NFT Minter</title>
      </Head>

      <ContextProvider>
        <div className="flex flex-col h-screen">
          <Notifications />
          <AppBar />
          <ContentContainer>
            <Component {...pageProps} />
          </ContentContainer>
          <Footer />
        </div>
      </ContextProvider>
    </>
  );
}

export default CustomApp;
