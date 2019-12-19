import React from 'react'
import Head from 'next/head'

import Navigation from '../components/navigation'


import styles from '../css/about.css'

export default class About extends React.Component {
    render() {
        return (
            <div>
                <Head>
                    <title>About</title>
                    <link rel="icon" href="/favicon.ico" />
                </Head>
                
                <Navigation title='About'></Navigation>
                    <div id={`${styles.about_content_id}`}>
                        <table id={`${styles.about_view_id}`}>
                            {/* <table> */}
                                <tr>
                                    <th>12312</th>
                                    <th>12312</th>
                                    <th>12312</th>
                                    <th>12312</th>
                                    <th>12312</th>
                                    <th>12312</th>
                                    <th>12312</th>
                                </tr>
                            {/* </table> */}
                        </table>
                    </div>
            </div>
        )
    }
}