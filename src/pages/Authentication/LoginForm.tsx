import React, { useState } from "react";
import { TextInput, Button } from "@mantine/core";

interface Props {
    onLogin: (email: string, password: string) => void;
    onRegister: () => void;
    onForgotPassword: () => void;
}

const LoginForm: React.FC<Props> = ({ onLogin, onRegister, onForgotPassword }) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        onLogin(email, password);
    };

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
                            onClick={onRegister}
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
                        onClick={onForgotPassword}
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
