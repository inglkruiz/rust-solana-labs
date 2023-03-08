import {
  AppBar,
  ContentContainer,
  Footer,
  NotificationList,
} from '@rust-solana-labs/solana-workshops/nft-minter/components';
import { ContextProvider } from '@rust-solana-labs/solana-workshops/nft-minter/contexts';
import '@solana/wallet-adapter-react-ui/styles.css';
import { AppProps } from 'next/app';
import Head from 'next/head';
import './styles.css';

function CustomApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>NFT Minter</title>
      </Head>

      <ContextProvider>
        <div className="flex flex-col h-screen">
          <NotificationList />
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
