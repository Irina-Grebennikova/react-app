import Head from 'next/head';
import { ReactElement } from 'react';

export default function Home(): ReactElement {
  return (
    <>
      <Head>
        <title>Dog Breeds Catalog</title>
        <meta name="description" content="Key information on dog breeds" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.png" />
      </Head>
      <main>Home Page</main>
    </>
  );
}
