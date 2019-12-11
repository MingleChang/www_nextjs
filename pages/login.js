import React from 'react'
import Head from 'next/head'
import Hidden from '@material-ui/core/Hidden'
import Grid from '@material-ui/core/Grid';

import LoginView from '../components/loginView'

import styles from '../css/login.css'

export default class SignIn extends React.Component {
  render() {
    return (
      <div>
        <Head>
          <title>Sign In</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>
          <Grid container id={`${styles.login_root_id}`}>
            <Hidden smDown>
            <Grid item md={7} id={`${styles.login_left_id}`}>
              <img id={`${styles.login_image_bg_id}`} src='img/login_bg.jpg'></img>
            </Grid>
            </Hidden>
            <Grid item xs={12} md={5} id={`${styles.login_right_id}`}>
              
            <div id={`${styles.login_right_box_id}`}>
                <LoginView></LoginView>
            </div>
            </Grid>
          </Grid>
      </div>
    )
  }
}