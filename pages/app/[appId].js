import React from 'react'
import Head from 'next/head'
import Container from '@material-ui/core/Container'
import Box from '@material-ui/core/Box'
import CircularProgress from '@material-ui/core/CircularProgress'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'


import Navigation from '../../components/navigation'

import {GetAppInfoAPI} from '../../api/app'

import styles from '../../css/app/appId.css'

export default class AppId extends React.Component {
  constructor(props) {
    super(props)
    this.state = {app: null, loading: true}
  }
  componentDidUpdate(preProps) {
    if (this.props.url.query.appId == preProps.url.query.appId) {
      return
    }
    GetAppInfoAPI(this.props.url.query.appId)
    .then((response) => {
      this.setState({app: response, loading: false})
    }).catch((error) => {
      this.setState({loading: false})
      console.log(error)
    })
  }
  
  navigationTitle = () => {
    if (this.state.app) {
      return 'Aplication / ' + this.state.app.name
    }else {
      return 'Aplication / '
    }
  }

  handlerDownload = () => {
    if (this.state.app.platform == 'iOS') {
      location.href='itms-services://?action=download-manifest&url=https://api.minglechang.com/app/plist/' + this.state.app.id
    }else {
      location.href='https://api.minglechang.com/app/download/' + this.state.app.id
    }
  }

  render() {
    return (
      <div>
        <Head>
          <title>App</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <Navigation title={this.navigationTitle()}></Navigation>
        <Container>
          <Box id={`${styles.app_detail_box_id}`}>
          {this.state.loading && <CircularProgress color="secondary" size={50} id={`${styles.app_detail_progress_id}`}></CircularProgress>}
          {this.state.app && <Box id={`${styles.app_detail_content_id}`} lineHeight={10}>
            <Typography variant='h2'>{this.state.app.displayName}</Typography>
          <Typography variant='h6'>{this.state.app.packageId}</Typography>
          <Typography variant='h6'>{this.state.app.version}</Typography>
          <Button 
          variant='contained' 
          color="primary" 
          size='large'
          onClick={this.handlerDownload}>下载</Button>
          </Box>
          }</Box>
        </Container>
      </div>
    )
  }
}