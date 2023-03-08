import { HomeView } from '@rust-solana-labs/solana-workshops/nft-minter/views';
import type { NextPage } from 'next';
import Head from 'next/head';

const Home: NextPage = (props) => {
  return (
    <div>
      <Head>
        <title>NFT Minter</title>
        <meta name="description" content="Solana Scaffold" />
      </Head>
      <HomeView />
    </div>
  );
};

export default Home;
