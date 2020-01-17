import React from 'react'
import Head from 'next/head'
import Navigation from '../components/navigation'

export default function Home(props) {
  return (
    <div>
      <Head>
        <title>Home</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Navigation title='Mingle'></Navigation>
    </div>
  )
}

// Home.getInitialProps = async (ctx) => {
//   return ctx.query
// }
