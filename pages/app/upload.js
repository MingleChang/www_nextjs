import React from 'react'
import Head from 'next/head'
import Button from '@material-ui/core/Button'
import Container from '@material-ui/core/Container'
import Box from '@material-ui/core/Box'
import Typography from '@material-ui/core/Typography'
import FormControl from '@material-ui/core/FormControl'
import InputLabel from '@material-ui/core/InputLabel'
import Select from '@material-ui/core/Select'
import MenuItem from '@material-ui/core/MenuItem'
import Grid from '@material-ui/core/Grid'
import CircularProgress from '@material-ui/core/CircularProgress'
import Snackbar from '@material-ui/core/Snackbar'

import Navigation from '../../components/navigation'
import { UploadAppAPI } from '../../api/app'

import styles from '../../css/app/upload.css'

export default class AppUpload extends React.Component {
  constructor(props) {
    super(props)
    this.state = { file: null, 
      platform: '', 
      environment: '', 
      platformError: false, 
      environmentError: false, 
      uploading: false,
      messageOpen: false,
      message: ''}
    this.fileInputEl = React.createRef()
  }
  handleFileButton = () => {
    this.fileInputEl.current.click()
  }
  handleFileChange = (event) => {
    this.setState({ file: event.target.files[0] })
  }
  handlePlatform = (event) => {
    this.setState({ platform: event.target.value, platformError: false})
  }
  handleEnvironment = (event) => {
    this.setState({ environment: event.target.value, environmentError: false})
  }
  handleSnackbarClose = () => {
    this.setState({messageOpen: false, message: ''})
  }
  handleUpload = async () => {
    if (this.state.file == null) {
      this.setState({messageOpen: true, message: '请选择文件'})
      return
    }
    if (this.state.platform==null || this.state.platform=='') {
      this.setState({platformError: true, messageOpen: true, message: '请选择platform'})
      return
    }
    if (this.state.environment==null || this.state.environment=='') {
      this.setState({environmentError: true})
      return
    }
    this.setState({uploading: true})
    try {
      let response = await UploadAppAPI(this.state.file, this.state.platform, this.state.environment)
      location.href = '/app/' + response.id
      this.setState({uploading: false})
    } catch (error) {
      this.setState({uploading: false, messageOpen: true, message: error.message})
    }
  }
  render() {
    return (
      <div>
        <Head>
          <title>App</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <Navigation title='Aplication / Upload'></Navigation>

        <Container>
          <input type='file'
            id={`${styles.app_upload_input_file_id}`}
            onChange={this.handleFileChange}
            ref={this.fileInputEl}>
          </input>
          <Box id={`${styles.app_upload_file_content_id}`}
            border={1}
            borderColor="primary.main"
            borderRadius={10}>
            <ul id={`${styles.app_upload_file_content_list_id}`}>
              {this.state.file && <li><Typography variant='h6' id={`${styles.app_upload_file_name_id}`}>{this.state.file.name}</Typography></li>}
              <li>
                <Button
                  variant='contained'
                  color='primary'
                  size='large'
                  onClick={this.handleFileButton}>
                  选择上传文件
                </Button>
              </li>
            </ul>
            {this.state.uploading && <CircularProgress color="secondary" size={50} id={`${styles.app_upload_progress_id}`}></CircularProgress>}
          </Box>
          <Grid container spacing={2}>
            <Grid item xs={6} sm={4}>
              <FormControl id={`${styles.app_upload_platform_id}`} error={this.state.platformError}>
                <InputLabel>Platform</InputLabel>
                <Select
                  value={this.state.platform}
                  onChange={this.handlePlatform}
                >
                  <MenuItem value='iOS'>iOS</MenuItem>
                  <MenuItem value='Android'>Android</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={6} sm={4}>
              <FormControl id={`${styles.app_upload_environment_id}`} error={this.state.environmentError}>
                <InputLabel>Environment</InputLabel>
                <Select
                  value={this.state.environment}
                  onChange={this.handleEnvironment}
                >
                  <MenuItem value='PROD'>PROD</MenuItem>
                  <MenuItem value='UAT'>UAT</MenuItem>
                  <MenuItem value='TEST'>TEST</MenuItem>
                  <MenuItem value='DEV'>DEV</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={4}>
              <Button
                id={`${styles.app_upload_button_id}`}
                disabled={this.state.uploading}
                variant='contained'
                color='primary'
                size='large'
                onClick={this.handleUpload}>点击上传</Button>
            </Grid>
          </Grid>
          <Snackbar
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'center'
          }}
          open={this.state.messageOpen}
          autoHideDuration={4000}
          onClose={this.handleSnackbarClose}
          message={this.state.message}
          ></Snackbar>
        </Container>
      </div>
    )
  }
}