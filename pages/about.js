import React from 'react'
import Head from 'next/head'
import Button from '@material-ui/core/Button'

import Navigation from '../components/navigation'


import styles from '../css/about.css'

export default function About(props) {
    function buttonClick(e, key) {
        console.log("Click" + key.target + e)
    }
    React.useEffect(() => {
        console.log('123123')
    })
    return (
        <div>
            <Head>
                <title>About</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <Navigation title='About'></Navigation>
            <Button onClick={buttonClick.bind(this, '123')}>Button</Button>
        </div>
    )
}
