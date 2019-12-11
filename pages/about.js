import React from 'react'
import Head from 'next/head'

export default class About extends React.Component {
    render() {
        return (
            <div>
                <Head>
                    <title>About</title>
                    <link rel="icon" href="/favicon.ico" />
                </Head>
                <h1>About</h1>
            </div>
        )
    }
}