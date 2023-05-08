import {Button, Container} from "@mantine/core";
import React, {useState} from "react";
import {BrowserRouter as Router, Switch, Route, Redirect} from "react-router-dom";
import LoginForm from "./LoginForm";
import HomePage from "../Home/HomePage";
import Signup from "./signup";
import OtpInput from "./otp";
import PositionDetails from "../Position/position-details";
import BayiCalisanlari from "../bayi-calisanlari";
import HrUser from "../Home/hr-user";
import ForgotPasswordForm from "./ForgotPassword";
import TechnicalUser from "../Home/technical-user";
import UcretlendirmePersonelUser from "../Home/ucretlendirme-personel-user";
import AdminUser from "../Home/admin-user";

const Auth: React.FC = () => {
    return (
        <Container style={{display: "flex", justifyContent: "center"}}>
            <Switch>
                <Route path="/home" component={HomePage}/>
                <Route path="/auth/login" component={LoginForm}/>
                <Route path="/auth/signup" component={Signup}/>
                <Route path="/auth/otp" component={OtpInput}/>
                <Route path="/auth/forgot-password" component={ForgotPasswordForm}/>
                <Redirect to="/auth/login"/>
                <Route path="/position/detail" component={PositionDetails}/>
                <Route path="/bayi-calisanlari" component={BayiCalisanlari}/>
                <Route path="/admin" component={AdminUser}/>
                <Route path="/hr-user" component={HrUser}/>
                <Route path="/technical-user" component={TechnicalUser}/>
                <Route path="/ucretlendirme-personel-user" component={UcretlendirmePersonelUser}/>
            </Switch>
        </Container>
    );
};

const App: React.FC = () => {
    const isLoggedIn = () => {
        const token = localStorage.getItem('token');
        console.log(token)
        return token;
    };

    const handleLogin = (email: string, password: string) => {

    };

    return (
        <Router>
            <div style={{maxWidth: 600, margin: "auto", padding: "16px"}}>
                <Switch>
                    <Route path="/auth" component={Auth}/>
                    <Route path="/">
                        {isLoggedIn() ? <HomePage/> : <Redirect to="/auth/login"/>}
                    </Route>
                </Switch>
            </div>
        </Router>
    );
};

export default App;
