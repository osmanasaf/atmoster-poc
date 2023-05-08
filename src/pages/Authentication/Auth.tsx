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

const Auth: React.FC = () => {
    return (
        <Container style={{display: "flex", justifyContent: "center"}}>
            <Switch>
                <Route path="/auth/login" component={LoginForm}/>
                <Route path="/auth/signup" component={Signup}/>
                <Route path="/auth/otp" component={OtpInput}/>
                <Route path="/auth/forgot-password" component={ForgotPasswordForm}/>
                <Redirect to="/auth/login"/>
                <Route path="/position/detail/:id" component={PositionDetails}/>
                <Route path="/bayi-calisanlari" component={BayiCalisanlari}/>
                <Route path="/hr-user" component={HrUser}/>
                <Route path="/technical-user" component={TechnicalUser}/>
                <Route path="/ucretlendirme-personel-user" component={UcretlendirmePersonelUser}/>
            </Switch>
        </Container>
    );
};

const App: React.FC = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(true);

    const handleLogin = (email: string, password: string) => {
        //  check user is logged in or not
        //
        setIsLoggedIn(true);
    };

    const handleLogout = () => {
        setIsLoggedIn(false);
    };

    return (
        <Router>
            <div style={{maxWidth: 600, margin: "auto", padding: "16px"}}>
                <header style={{display: "flex", justifyContent: "flex-end", marginBottom: "16px"}}>
                    {isLoggedIn && <Button onClick={handleLogout}>Logout</Button>}
                </header>
                <Switch>
                    <Route path="/auth" component={Auth}/>
                    <Route path="/">
                        {isLoggedIn ? <HomePage onLogout={handleLogout}/> : <Redirect to="/auth/login"/>}
                    </Route>
                </Switch>
            </div>
        </Router>
    );
};

export default App;
