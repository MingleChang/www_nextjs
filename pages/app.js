import React from 'react'
import Head from 'next/head'
import Container from '@material-ui/core/Container'
import Fab from '@material-ui/core/Fab'

import AddIcon from '@material-ui/icons/Add'

import Navigation from '../components/navigation'

import styles from '../css/app.css'

export default class Application extends React.Component {
  handleFabClick = () => {
    location.href='/app/upload'
  }

  render() {
    return (
      <div>
        <Head>
          <title>App</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>
        
        <Navigation title='Aplication'></Navigation>
        <Container>
          <Fab id={`${styles.app_fab_id}`} color="primary" aria-label="add" onClick={this.handleFabClick}>
            <AddIcon></AddIcon>
          </Fab>
        </Container>
      </div>
    )
  }
}