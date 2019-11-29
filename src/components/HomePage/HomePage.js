
import React, {Component} from 'react';
import {connect} from 'react-redux';
import classes from "./HomePage.css";

class HomePage extends Component {
    
    render() {
        return (
            <div className={classes.content}>
                <div className={classes.featureHero}> 
                    <div className="container"> 
                        <h1 className={classes.featureHeading}>
                            Survey is <span> a feedback </span> 
                            for education
                        </h1>
                        <a className={classes.featureBtn} href="/login">{!this.props.app.logged_in ? "Sign In" : "Get Started"}</a>
                        <div> Current Version: <strong> v0.10.0 </strong></div>
                    </div>
                </div>
                <div className={classes.featureLight}> 
                    <div className="container"> 
                    
                        <div className="row">
                        <div className="col-12 col-md-7">
                            <h2 className={classes.featureLightHeading}> Survey Better </h2>
                            <p className={classes.featureLightText}> Don't have fun in finding idea? Survey identifies exactly the need for your work and what to improve, give a try. </p>
                            <a className={classes.featureLightBtn} href="/survey">Learn More</a>
                        </div>
                        <div className="col-12 col-md-5">
                            <img className="img-fluid rounded" src={require('./img/survey-01.gif')} alt=""/>
                        </div>
                        </div>
                    </div>
                </div>
                <div className={classes.featureGray}> 
                    <div className="container"> 
                        <div className="row">
                        <div className="col-12 col-md-7 order-md-1">
                            <h2 className={classes.featureLightHeading}> Survey Smarter </h2>
                            <p className={classes.featureLightText}> It's difficult to create smart tools for educators. Survey understands your work and make it convenient to use, encouraging smarter creation of ideas  . </p>
                            <a className={classes.featureLightBtn} href="/survey">Learn More</a>
                        </div>
                        <div className="col-12 col-md-5">
                            <img className="img-fluid rounded" src={require('./img/survey-02.gif')} alt=""/>
                        </div>
                        </div>
                    </div>
                </div>
                <div className={classes.featureDark}> 
                    <div className="container"> 
                        <div className="row">
                        <div className="col-12 col-md-7">
                            <h2 className={classes.featureDarkHeading}> Survey Confidently </h2>
                            <p className={classes.featureDarkText}> Learning the majority of opinions can be overwhelming. Survey helps you do so calmly, focus on what you need to do and not be afraid of overloading. </p>
                            <a className={classes.featureBtn} href="/survey">Learn More</a>
                        </div>
                        <div className="col-12 col-md-5">
                            <img className="img-fluid rounded" src={require('./img/survey-03.gif')} alt=""/>
                        </div>
                        </div>
                    </div>
                </div>
                <div className={classes.featureYellow}> 
                    <div className="container"> 
                        <div className="row">
                        <h2 className={classes.featureYellowHeading}>Ready Get Going? </h2>
                        </div>
                        <div className="row">
                        <div className="col-12 col-md-6">
                            <a className={classes.featureYellowBtn} href="/survey">Get Started</a>
                        </div>
                        <div className="col-12 col-md-6 d-none d-md-block">
                            <a className={classes.featureYellowBtn} href="/survey">Learn More</a>
                        </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        app: state.app
    }
};

export default connect(mapStateToProps)(HomePage);
