import React from 'react'
import Head from 'next/head'
import Container from '@material-ui/core/Container'
import Fab from '@material-ui/core/Fab'
import Grid from '@material-ui/core/Grid'
import Breadcrumbs from '@material-ui/core/Breadcrumbs'
import Typography from '@material-ui/core/Typography'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import Snackbar from '@material-ui/core/Snackbar'

import AddIcon from '@material-ui/icons/Add'

import Navigation from '../components/navigation'

import { GetPackageIdsAPI, GetPlatformsAPI, GetEnvironmentsAPI, GetVersionsAPI, GetAppListAPI } from '../api/app'

import styles from '../css/app.css'
import { version } from 'punycode'

export default class Application extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      packageIds: null, packageId: null,
      platforms: null, platform: null,
      environments: null, environment: null,
      versions: null, version: null,
      applications: null,
      messageOpen: false, message: ''
    }
  }
  componentDidMount() {
    this.requestPackageIds()
  }

  requestPackageIds = async () => {
    try {
      let response = await GetPackageIdsAPI()
      this.setState({ packageIds: response })
    } catch (error) {
      this.setState({ messageOpen: true, message: error.message })
    }
  }

  requestPlatforms = async (packageId) => {
    try {
      let response = await GetPlatformsAPI(packageId)
      this.setState({ platforms: response })
    } catch (error) {
      this.setState({ messageOpen: true, message: error.message })
    }
  }
  requestEnvironments = async (packageId, platform) => {
    try {
      let response = await GetEnvironmentsAPI(packageId, platform)
      this.setState({ environments: response })
    } catch (error) {
      this.setState({ messageOpen: true, message: error.message })
    }
  }
  reuqestVersions = async (packageId, platform, environment) => {
    try {
      let response = await GetVersionsAPI(packageId, platform, environment)
      this.setState({ versions: response })
    } catch (error) {
      this.setState({ messageOpen: true, message: error.message })
    }
  }
  requestApplications = async (packageId, platform, environment, version) => {
    try {
      let response = await GetAppListAPI(packageId, platform, environment, version)
      this.setState({ applications: response })
    } catch (error) {
      this.setState({ messageOpen: true, message: error.message })
    }
  }

  handlePackageIds = (model, event) => {
    this.setState({ packageId: model,
      platforms: null, platform: null,
      environments: null, environment: null,
      versions: null, version: null,
      applications: null})
    this.requestPlatforms(model.packageId)
  }
  handlePlatform = (model, event) => {
    this.setState({ platform: model,
      environments: null, environment: null,
      versions: null, version: null,
      applications: null})
    this.requestEnvironments(model.packageId, model.platform)
  }
  handleEnvironment = (model, event) => {
    this.setState({ environment: model,
      versions: null, version: null,
      applications: null})
    this.reuqestVersions(model.packageId, model.platform, model.environment)
  }
  handleVersion = (model, event) => {
    this.setState({ version: model, applications: null})
    this.requestApplications(model.packageId, model.platform, model.environment, model.version)
  }
  handleApplication = (model, event) => {
    location.href = '/app/' + model.id
  }
  handleFabClick = () => {
    location.href = '/app/upload'
  }
  handleSnackbarClose = () => {
    this.setState({ messageOpen: false, message: '' })
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
          <Breadcrumbs>
            <Typography color="textPrimary">Application</Typography>
            {this.state.packageId && <Typography color="textPrimary">{this.state.packageId.displayName}</Typography>}
            {this.state.platform && <Typography color="textPrimary">{this.state.platform.platform}</Typography>}
            {this.state.environment && <Typography color="textPrimary">{this.state.environment.environment}</Typography>}
            {this.state.version && <Typography color="textPrimary">{this.state.version.version}</Typography>}
          </Breadcrumbs>
          <Grid container>
            {this.state.packageIds && <Grid item xs={2}>
              <List>
                {this.state.packageIds.map((model, index) => (
                  <ListItem button key={model.id} onClick={this.handlePackageIds.bind(this, model)}>
                    <ListItemText>{model.displayName}</ListItemText>
                  </ListItem>
                ))}
              </List>
            </Grid>}
            {this.state.platforms && <Grid item xs={2}>
              <List>
                {this.state.platforms.map((model, index) => (
                  <ListItem button key={model.id} onClick={this.handlePlatform.bind(this, model)}>
                    <ListItemText>{model.platform}</ListItemText>
                  </ListItem>
                ))}
              </List>
            </Grid>}
            {this.state.environments && <Grid item xs={2}>
              <List>
                {this.state.environments.map((model, index) => (
                  <ListItem button key={model.id} onClick={this.handleEnvironment.bind(this, model)}>
                    <ListItemText>{model.environment}</ListItemText>
                  </ListItem>
                ))}
              </List>
            </Grid>}
            {this.state.versions && <Grid item xs={2}>
              <List>
                {this.state.versions.map((model, index) => (
                  <ListItem button key={model.id} onClick={this.handleVersion.bind(this, model)}>
                    <ListItemText>{model.version}</ListItemText>
                  </ListItem>
                ))}
              </List>
            </Grid>}

            {this.state.applications && <Grid item xs={2}>
              <List>
                {this.state.applications.map((model, index) => (
                  <ListItem button key={model.id} onClick={this.handleApplication.bind(this, model)}>
                    <ListItemText>{model.buildVersion}</ListItemText>
                  </ListItem>
                ))}
              </List>
            </Grid>}
          </Grid>
          <Fab id={`${styles.app_fab_id}`} color="primary" aria-label="add" onClick={this.handleFabClick}>
            <AddIcon></AddIcon>
          </Fab>
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