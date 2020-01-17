import React from 'react'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Button from '@material-ui/core/Button'
import IconButton from '@material-ui/core/IconButton'
import Typography from '@material-ui/core/Typography'
import Drawer from '@material-ui/core/Drawer'
import Divider from '@material-ui/core/Divider'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import Avatar from '@material-ui/core/Avatar'
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'


import MenuIcon from '@material-ui/icons/Menu'
import HomeIcon from '@material-ui/icons/Home'
import AppsIcon from '@material-ui/icons/Apps'
import AboutIcon from '@material-ui/icons/Info'
import GestureIcon from '@material-ui/icons/Gesture'

import styles from '../css/navigation.css'

export default class Navigation extends React.Component {
    constructor(props) {
        super(props)
        this.adminSideData = [
            [{
                icon: <HomeIcon/>,
                name: 'Home',
                path: '/'
            },
            {
                icon: <AppsIcon/>,
                name: 'Application',
                path: '/app'
            },
            {
                icon: <GestureIcon/>,
                name: 'Guess',
                path: '/guess'
            }],
            [{
                icon: <AboutIcon/>,
                name: 'About',
                path: '/about'
            }]
        ]
        this.sideData = [
            [{
                icon: <HomeIcon/>,
                name: 'Home',
                path: '/'
            },
            {
                icon: <AppsIcon/>,
                name: 'Application',
                path: '/app'
            }],
            [{
                icon: <AboutIcon/>,
                name: 'About',
                path: '/about'
            }]
        ]
        this.state = {user: null, drawerOpen: false, userMenuTarget: null, sideData: this.sideData}
    }
    
    componentDidMount() {
        let user = JSON.parse(localStorage.getItem('user'))
        this.setState({user: user})
        if (user && user.admin) {
            this.setState({sideData: this.adminSideData})
        }
    }

    //点击侧边菜单按钮
    handlerMenuButton = () => {
        this.setState({drawerOpen: true})
    }
    handleSideMenuItem = (path, e) => {
        this.setState({drawerOpen: false})
        location.href = path
    }
    //关闭侧边抽屉
    handlerCloseDrawer = ()=> {
        this.setState({drawerOpen: false})
    }
    //点击登陆
    handlerSignIn = () => {
        location.href = '/login'
    }
    //点击头像
    handleAvatar = (event) => {
        this.setState({userMenuTarget: event.target})
    }
    handleUserMenuClose = () => {
        this.setState({userMenuTarget: null})
    }
    handleSignOut = () => {
        localStorage.removeItem('user')
        window.location.reload()
        // this.setState({user: null, sideData: this.sideData})
    }

    render() {
        let sideHtml = (
            <div id={`${styles.navigation_side_id}`}>
            {this.state.sideData.map((array, index) => (
                <div key={index}>
                <List>
                    {array.map((model, index) => (
                        <ListItem button key={model.name} onClick={this.handleSideMenuItem.bind(this, model.path)}>
                            <ListItemIcon>{model.icon}</ListItemIcon>
                            <ListItemText >{model.name}</ListItemText>
                        </ListItem>
                    ))}
                </List>
    
                <Divider></Divider>
                </div>
            ))}
            </div>
        )

        let userHtml
        if (this.state.user == null) {
            userHtml = (
                <Button color="inherit" onClick={this.handlerSignIn}>
                    <Typography variant='body2'>SignIn / SignUp</Typography>
                </Button>
            )
        }else {
            userHtml = (
                <div>
                <Button>
                    <Avatar onClick={this.handleAvatar}>H</Avatar>

                </Button>
                <Menu
                    open={Boolean(this.state.userMenuTarget)}
                    anchorEl={this.state.userMenuTarget}
                    keepMounted
                    onClose={this.handleUserMenuClose}
                >
                <MenuItem>
                    Profile
                </MenuItem>
                <MenuItem onClick={this.handleSignOut}>
                    Sign Out
                </MenuItem>
                </Menu>
                </div>
            )
        }
        return (
            <div id={`${styles.navigation_root_id}`}>
            <AppBar position="static">
                <Toolbar>
                <IconButton edge="start" id={`${styles.navigation_menu_button_id}`} onClick={this.handlerMenuButton} color="inherit" aria-label="menu">
                    <MenuIcon></MenuIcon>
                </IconButton>
                <Typography variant="h6" id={`${styles.navigation_title_id}`}>
                    {this.props.title}
                </Typography>
                    {userHtml}
                </Toolbar>
            </AppBar>
            
            <Drawer open={this.state.drawerOpen} onClose={this.handlerCloseDrawer}>
                {sideHtml}
            </Drawer>
            </div>
        );
    }
}