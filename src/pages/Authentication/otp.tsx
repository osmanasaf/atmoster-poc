import React, { useState, useEffect, useCallback } from "react";
import {Button, TextInput} from "@mantine/core";

function OtpInput() {
    const [otp, setOtp] = useState("");
    const handleChange = (e : any) => {
        const { value } = e.target;
        setOtp(value);
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
                onChange={handleChange}
                required
                style={{ marginBottom: "8px" }}
            />

            <div>Time ({timer})</div>

            <div style={{display: "flex", justifyContent: "space-between", marginTop: "8px"}}>
                <div>
                    <Button type="submit" style={{flexGrow: 1}}>
                        Verify
                    </Button>
                </div>
                <div style={{width: "16px"}}/>
            </div>
        </form>
            </div>
    );
}

export default OtpInput;