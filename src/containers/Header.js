import React, { Component } from 'react'
import {connect} from "react-redux";
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Drawer from './Drawer';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import {NavLink} from 'react-router-dom';
import AuthHandler from '../components/Login/AuthHandler';
import {logoutUser} from '../store/actions/';

export class Header extends Component {
    AuthHandler = new AuthHandler();
    constructor(){
        super();
        this.state={
            anchorEl: null
        }
    }

    showDropdown = (e) => {
        e.preventDefault();
        this.setState({anchorEl : e.currentTarget});
    };

    closeDropdown = () =>{
        this.setState({anchorEl : null});
    };

    _handleLogout = () => {
        console.log("App, handleLogout");
        this.AuthHandler.logout();
        this.props.onLogoutUser();
        this.props.history.replace('/login');
    };

  render() {
    const navProps = {
        position:"relative", 
        style:{
            position: "fixed",
            backgroundColor: '#384048',
            color:'#FFF',
            fontWeight: 700,
            marginRight: 'auto',
            flexDirection: 'row',
            height: '4rem',
            boxShadow: '0px 2px 4px -1px rgba(0, 0, 0, 0.2), 0px 4px 5px 0px rgba(0, 0, 0, 0.14), 0px 1px 10px 0px rgba(0, 0, 0, 0.12)' 
        }
    } 
    
    const btnStyle = {
        marginLeft: "auto",
        padding: '0.9rem 2rem',
        display:  !this.props.app.logged_in ? "none" : "block"
    }

    const toolbarStyle = {
        marginLeft:  !this.props.app.logged_in ? 'auto' : '0',
        marginRight:  !this.props.app.logged_in ? 'auto' : '0',
        fontSize: "2rem",
        fontWeight: 400,
        letterSpacing: ".6rem",
        textTransform: "uppercase"

    } 
    const { anchorEl } = this.state;
    return (
      <div>
        <AppBar {...navProps}>

        {!this.props.app.loggedIn ? null : <Drawer isLogged={this.props.app.logged_in}/> }
            

        <Toolbar style={{...toolbarStyle}}> Survey App </Toolbar>

          {!this.props.app.loggedIn ? null :  <div style={{...btnStyle}}>
          <Button
            style = {{color:"#E8BD36", outline:"none", letterSpacing:".4rem", boxShadow:"0px 0px 5px"}}
            aria-owns={anchorEl ? 'simple-menu' : undefined}
            aria-haspopup="true"
            onClick={this.showDropdown}
            >
            <span style={{marginRight:"0.4rem"}}>Hello</span> {this.props.app.firstname}!
          </Button>
        <Menu
          id="simple-menu"
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={this.closeDropdown}
          className="dropMenu"
        >
          <MenuItem onClick={this.closeDropdown}><NavLink to="/user">Profile</NavLink></MenuItem>
          <MenuItem onClick={this.closeDropdown}><NavLink to="/account">My account</NavLink></MenuItem>
          <MenuItem onClick={this.closeDropdown}>
                <button
                  className="btn-sm btn-warning"
                  onClick={this._handleLogout}>
                  Logout
                </button>
          </MenuItem>
        </Menu></div>}

        </AppBar>
      </div>
    )
  }
}

const mapDispatchToProps = dispatch => {
    return {
          onLogoutUser: () => dispatch(logoutUser())
    };
};

const mapStateToProps = (state) => {
    return {
        app: state.app
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);