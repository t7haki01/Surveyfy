import React, { Component } from 'react'

import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';

import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

import {Link} from 'react-router-dom'
import AuthHandler from '../components/Login/AuthHandler';

export class Drawer extends Component {  
  AuthHandler = new AuthHandler ();
    state = {
        left: false,
      };
    
      toggleDrawer = (side, open) => () => {
        this.setState({
          [side]: open,
        });
      };
    
  render() {
      const style = {
        drawerStyle:{
            padding: '0.5rem 2rem',
      },
        link:{
            textDecoration:'none'
        }
    }
      const menuItemsAdmin = [
          {
              name: "Home",
              link: "/home",
          },
          {
              name: "Surveys",
              link: "/surveys",
              
          },
          {
              name: "Users Manager",
              link: "/usersmanager",
              
          },
          {
            name: "Result Chart",
            link: "/result"
          },
          {
            name: "Survey Manager",
            link: "/surveysmanager"
          },
          {
              name: "Accounts Manager",
              link: "/accountsmanager",
          },
      ]

      const sideListAdmin = (
        <div>
          {menuItemsAdmin.map( (items, idx) => {
            return (
            <List key={idx} style={style.link} component={Link} to={items.link}>
                <ListItem button>
                    
                    <ListItemText primary={items.name} />
                </ListItem>
            </List>)
          })}

        </div>
      );
      //From here company

      const menuItemsCompany = [
        {
            name: "Home",
            link: "/home",
        },
        {
            name: "Surveys",
            link: "/surveys",
            
        },
        {
          name: "Result Chart",
          link: "/result"
        },
        {
          name: "Survey Manager",
          link: "/surveysmanager"
        }
    ]

    const sideListCompany = (
      <div>
        {menuItemsCompany.map( (items, idx) => {
          return (
          <List key={idx} style={style.link} component={Link} to={items.link}>
              <ListItem button>
                  <ListItemText primary={items.name} />
              </ListItem>
          </List>)
        })}

      </div>
    );

    //From here Client

    const menuItemsClient = [
      {
          name: "Home",
          link: "/home",
      },
      {
          name: "Surveys",
          link: "/surveys",
      }
  ]

  const sideListClient = (
    <div>
      {menuItemsClient.map( (items, idx) => {
        return (
        <List key={idx} style={style.link} component={Link} to={items.link}>
            <ListItem button>
                <ListItemText primary={items.name} />
            </ListItem>
        </List>)
      })}

    </div>
  );

    return (
      <div style={style.drawerStyle}>
        <IconButton onClick={this.toggleDrawer('left', true)} style={{outline:"none"}} color="inherit" aria-label="Menu">
            <MenuIcon />
        </IconButton>

        <SwipeableDrawer
        anchor="left"
        open={this.state.left}
        onClose={this.toggleDrawer('left', false)}
        onOpen={this.toggleDrawer('left', true)}
      >
        <div
          tabIndex={0}
          role="button"
          onClick={this.toggleDrawer('left', false)}
          onKeyDown={this.toggleDrawer('left', false)}
        >
      
        {!this.props.isLogged ? null : [
          this.AuthHandler.getData().type === "admin" ? sideListAdmin :
          [
            this.AuthHandler.getData().type === "company" ? sideListCompany : [
              this.AuthHandler.getData().type === "client" ? sideListClient : null
            ]
          ]
        ]
        }
          
        </div>
      </SwipeableDrawer>
      </div>
    )
  }
}

export default Drawer