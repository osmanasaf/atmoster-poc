import React, { useState } from "react";
import { TextInput, Button } from "@mantine/core";
import LoginCredentials from "../../dto/LoginDto";
import {login} from "../../service/auth.service";
import { useHistory } from "react-router-dom";


const LoginForm: React.FC = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const history = useHistory();

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
            e.preventDefault();
            const credentials: LoginCredentials = {email, password};
            login(credentials).then(r =>  {
                sessionStorage.setItem('operation', 'login');
                sessionStorage.setItem("email", email);
                sessionStorage.setItem("password", password);
                history.push("/auth/otp")
            }).catch(
                error => {
                    alert("Invalid credentials");
                }
            );
    };

    const redirectToRegister = () => {
        history.push("/auth/signup");
    }

    const redirectToForgotPassword = () => {
        history.push("/auth/forgot-password");
    }

    return (
        <div
            style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                minHeight: "100vh",
            }}
        >
            <form
                onSubmit={handleSubmit}
                style={{ display: "flex", flexDirection: "column", maxWidth: "300px" }}
            >
                <TextInput
                    label="Email"
                    placeholder="example@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.currentTarget.value)}
                    required
                    style={{ marginBottom: "8px" }}
                />
                <TextInput
                    label="Password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.currentTarget.value)}
                    required
                    style={{ marginBottom: "8px" }}
                />
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                    <div>
                        <Button type="submit" style={{ flexGrow: 1 }}>
                            Login
                        </Button>
                    </div>
                    <div style={{ width: "16px" }} />
                    <div>
                        <Button
                            variant="outline"
                            onClick={redirectToRegister}
                            style={{ flexGrow: 1 }}
                        >
                            Register
                        </Button>
                    </div>
                </div>
                <div
                    style={{
                        display: "flex",
                        justifyContent: "flex-end",
                        marginTop: "8px",
                        fontSize: "12px",
                    }}
                >
                    <Button
                        variant="link"
                        onClick={redirectToForgotPassword}
                        style={{ paddingRight: "0px" }}
                    >
                        Forgot Password?
                    </Button>
                </div>
            </form>
        </div>
    );
};

export default LoginForm;
