import axios from 'axios';
import React, { Component } from 'react';
import {connect} from "react-redux";
import {logoutUser} from "../../store/actions";
import Question from './Question';
import classes from './Result.css';
import CompanyOnly from '../Login/CompanyOnly';
import AuthHandler from '../Login/AuthHandler';
import setting from '../../assets/settings/setting';

class Result extends Component {
  AuthHandler = new AuthHandler();
  constructor() {
    super();
    this.state = {
      surveys: [],
      owner: this.AuthHandler.getData().owner
    };
  }
  componentDidMount() {
    if(this.AuthHandler.getData().type === "admin"){
      axios
      .get(setting.api.url + '/surveys/')
      .then(res => {
        const surveys = res.data;
        this.setState({ surveys });
      });
    }
    else{
      axios
      .get(setting.api.url + '/surveys/owner/' + this.state.owner)
      .then(res => {
        const surveys = res.data;
        this.setState({ surveys });
      });
    }

  }

  render() {
    return (
      <div className={classes.result}>
        <div className="container">
          {this.state.surveys.map(survey => (
            <div>
              <div className="row justify-content-center">
                <div className="col-3">
                  <h4>{survey.title}</h4>
                </div>
              </div>
              <div className="row justify-content-center">
                <div className="col">
                  <Question survey={survey.id} />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onLogoutUser: () => dispatch(logoutUser())
  }
}

export default connect(null, mapDispatchToProps)(CompanyOnly(Result));
