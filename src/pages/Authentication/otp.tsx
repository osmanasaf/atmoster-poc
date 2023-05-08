import React, { useState, useEffect, useCallback } from "react";
import {Button, TextInput} from "@mantine/core";
import VerifyOtp from "../../dto/VerifyOtp";
import {verifyOtp, verifyRegister} from "../../service/auth.service";
import {useHistory} from "react-router-dom";
import jwt_decode from "jwt-decode";

interface DecodedToken {
    sub: string;
    iat: number;
    exp: number;
    role: string;
}

function OtpInput() {
    const [message, setMessage] = useState(false);
    const operation = sessionStorage.getItem("operation");
    const history = useHistory();

    const handleClick = async (e: any) => {
        e.currentTarget.disabled = true;
        operation === "login" ? await loginOperation() : await registerOperation();
    };

    async function loginOperation() {
        const email = sessionStorage.getItem("email");
        const password = sessionStorage.getItem("password");
        const credentials: VerifyOtp = {username: email, password: password, otp: otp};
        const response = await verifyOtp(credentials);
        var responseString = String(response);
        if(responseString.startsWith('ey')){
            setLocalStorage(responseString);

        }else{
            alert("Invalid OTP");
        }
    }

    async function registerOperation() {
        const mail = sessionStorage.getItem("registerMail");
        const response = await verifyRegister(mail, otp);
        var responseString = String(response);
        if(responseString.startsWith('ey')){
            setLocalStorage(responseString);

        }else{
            alert("Invalid OTP");
        }
    }

    const setLocalStorage= (token: string) => {
        const decodedToken: DecodedToken = jwt_decode(token)
        localStorage.setItem("token", token);
        localStorage.setItem("role", decodedToken.role);
        localStorage.setItem("email", decodedToken.sub);
        sessionStorage.clear();
        history.push("")
    }

    const [otp, setOtp] = useState("");
    const handleChange = (e : string) => {
        setOtp(e);
        if(e.length==6){
            setMessage(true);
        }
        else{
            setMessage(false);
        }

    };


    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log(otp);
    };

    const [timer, setTimer] = useState(120);
    const timeOutCallback = useCallback(() => setTimer(currTimer => currTimer - 1), []);

    useEffect(() => {
        timer > 0 && setTimeout(timeOutCallback, 1000);
    }, [timer, timeOutCallback]);

    console.log(timer);

    const resetTimer = function () {
        if (!timer) {
            setTimer(120);
        }
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
        <form onSubmit={handleSubmit}
              style={{ display: "flex", flexDirection: "column", maxWidth: "300px" }}
        >
            <TextInput
                label="Otp"
                value={otp}
                onChange={event => handleChange(event.target.value)}
                required
                style={{ marginBottom: "8px" }}
                maxLength={6}
            />

            <div>Time: {timer} seconds</div>

            <div style={{display: "flex", justifyContent: "space-around", marginTop: "8px"}}>
                <div>
                    <Button disabled={!message} onClick={handleClick}    type="submit" style={{flexGrow: 1}}>
                        Verify
                    </Button>
                </div>
                <div>
                    <Button onClick={resetTimer}>Resend</Button>
                </div>

            </div>
        </form>
            </div>
    );
}

export default OtpInput;