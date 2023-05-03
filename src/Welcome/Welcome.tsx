import { Button, Stack, Text } from '@mantine/core';
import LoginForm from "../Authentication/Login/LoginForm";

const handleLogin = (email: string, password: string) => {
    // login operation
};

const handleRegister = () => {
    // register operation
};


const handleForgotPassword = () => {
    // forgot password operation
};

export function Welcome() {
    return (
        <div className="App">
            <LoginForm  onLogin={handleLogin} onRegister={handleRegister} onForgotPassword={handleForgotPassword} />
        </div>
    );
}
