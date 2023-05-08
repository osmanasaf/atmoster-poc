import React, { useState } from "react";
import { TextInput, Button, Text } from "@mantine/core";
import {useHistory} from "react-router-dom";
import {forgotPassword} from "../../service/auth.service";
import {changeForgotPassword} from "../../service/user.service";

const ForgotPasswordForm: React.FC = () => {
    const history = useHistory();
    const [email, setEmail] = useState("");
    const [verificationCode, setVerificationCode] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [isCodeSent, setIsCodeSent] = useState(false);
    const [isCodeVerified, setIsCodeVerified] = useState(false);
    const [isPasswordChanged, setIsPasswordChanged] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [token, setToken] = useState("")

    const handleSubmitEmail = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        try {
            var response = await forgotPassword(email);
            setIsCodeSent(true);
            console.log(response);
            setToken(String(isCodeSent));
        } catch (error) {
            if(error){
                setErrorMessage(String(error));
            }else{
                setErrorMessage("Şifre Sıfırlama Kodu Gönderilemedi!");
            }
        }
    };

    const handleSubmitVerification = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        try {
            const credentials: { newPassword: string } = { newPassword}
            await changeForgotPassword(credentials, token);
            setIsPasswordChanged(true);
            setTimeout(() => {
                history.push("/login");
            }, 3000);

        } catch (error) {
            setErrorMessage(String(error));
        }
    };

    return (
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "100vh" }}>
            {isPasswordChanged ? (
                <div style={{ textAlign: "center" }}>
                    <Text size="xl">Password has been changed successfully!</Text>
                </div>
            ) : (
                <form onSubmit={isCodeSent ? handleSubmitVerification : handleSubmitEmail}>
                    <div style={{ marginBottom: "16px" }}>
                        {isCodeSent ? (
                            <TextInput
                                label="Verification Code"
                                placeholder="Enter verification code"
                                value={verificationCode}
                                onChange={(event) => setVerificationCode(event.currentTarget.value)}
                                required
                            />
                        ) : (
                            <TextInput
                                label="Email"
                                placeholder="Enter your email"
                                value={email}
                                onChange={(event) => setEmail(event.currentTarget.value)}
                                required
                            />
                        )}
                    </div>
                    {isCodeSent || isCodeVerified ? (
                        <div style={{ marginBottom: "16px" }}>
                            <TextInput
                                label="New Password"
                                placeholder="Enter new password"
                                value={newPassword}
                                onChange={(event) => setNewPassword(event.currentTarget.value)}
                                required
                                type="password"
                            />
                        </div>
                    ) : null}
                    {errorMessage ? (
                        <div style={{ marginBottom: "16px" }}>
                            <Text color="red">{errorMessage}</Text>
                        </div>
                    ) : null}
                    <div style={{ display: "flex", justifyContent: "center" }}>
                        <Button type="submit">{isCodeSent || isCodeVerified ? "Change Password" : "Send Verification Code"}</Button>
                    </div>
                </form>
            )}
        </div>
    );
};

export default ForgotPasswordForm;
