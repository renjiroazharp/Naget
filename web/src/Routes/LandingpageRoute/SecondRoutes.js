import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";
import Loadable from "react-loadable";
import PageNotFound from "../PageNotFound";

const loading = () => (
  <div className="loading-bro">
    <h1>Loading</h1>
    <svg id="load" x="0px" y="0px" viewBox="0 0 150 150">
      <circle id="loading-inner" cx="75" cy="75" r="60" />
    </svg>
  </div>
);

const Homepage = Loadable({
  loader: () => import("../../Containers/Landingpage/Homepage"),
  loading: loading
});

const Loginpage = Loadable({
  loader: () => import("../../Containers/Landingpage/Loginpage"),
  loading: loading
});

const Signuppage = Loadable({
  loader: () => import("../../Containers/Landingpage/Signuppage"),
  loading: loading
});

const Forgotpassword = Loadable({
    loader: () => import("../../Containers/Landingpage/Forgotpassword"),
    loading: loading
  });
  
const Checkout = Loadable({
    loader: () => import("../../Containers/Dashboard/Step/Checkout"),
    loading: loading
  });

const TestimoniContainer = Loadable({
    loader: () => import("../../Containers/Landingpage/Testimoni"),
    loading: loading
});

const PencapaianContainer = Loadable({
  loader: () => import("../../Containers/Landingpage/Pencapaian"),
  loading: loading
});


export default class SecondRoutes extends Component {
  
  login = () => {
      this.props.loginFunc();
  }

  render() {
    return (
            <div>
            <Switch>
                <Route exact path="/" component={Homepage} />
                <Route path="/login" render={()=> <Loginpage loginFunction={this.login}/>} />
                <Route path="/signup" component={Signuppage} />
                <Route path="/form" component={Checkout} />
                <Route path="/forgot_password" component={Forgotpassword} />
                <Route path="/testimoni" component={TestimoniContainer} />
                <Route path="/pencapaian" component={PencapaianContainer} />        
                <Route component={PageNotFound} />  
            </Switch>
            </div>
         
    );
  }
}
