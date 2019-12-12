import React from 'react'
import Head from 'next/head'

import Navigation from '../components/navigation'

export default class About extends React.Component {
    render() {
        return (
            <div>
                <Head>
                    <title>About</title>
                    <link rel="icon" href="/favicon.ico" />
                </Head>
                
                <Navigation title='About'></Navigation>
            </div>
        )
    }
}