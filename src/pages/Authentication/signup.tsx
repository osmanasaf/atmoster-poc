import React, {useState} from "react";
import {Button, NumberInput, TextInput} from "@mantine/core";
import {DatePicker} from "@mantine/dates";

const Signup = () => {

    const [birthDay, setBirthDay] = useState<Date | null>(null)
    const [name, setName] = useState('');
    const [surname, setSurname] = useState('')
    const [email, setEmail] = useState({email: '', error: ''})
    const [phone, setPhone] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('');
    const isValidEmail = (email: string) => /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email);

    const isValidPhone = (phone: string) => /(^[0\s]?[\s]?)([(]?)([5])([0-9]{2})([)]?)([\s]?)([0-9]{3})([\s]?)([0-9]{2})([\s]?)([0-9]{2})$/g.test(phone);
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
    };

    const handleChangeEmail = (event: string) => {
        if (!isValidEmail(event)) {
            setEmail({email: '', error: 'email is invalid'});
        } else {
            setEmail({email: event, error: ''});
        }
    };
    const handleChangePhone = (event: string) => {
        if (!isValidPhone(event)) {
            setError('Phone is invalid');
        } else {
            setError('');
        }
        setPhone(event);
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
                style={{display: "flex", flexDirection: "column", maxWidth: "300px"}}
            >
                <DatePicker value={birthDay} onChange={setBirthDay}/>
                <TextInput
                    label="Name"
                    value={name}
                    onChange={(e) => setName(e.currentTarget.value)}
                    required
                    style={{marginBottom: "8px"}}
                />
                <TextInput
                    label="Surname"
                    value={surname}
                    onChange={(e) => setSurname(e.currentTarget.value)}
                    required
                    style={{marginBottom: "8px"}}
                />
                <TextInput
                    label="Email"
                    placeholder="example@example.com"
                    onChange={(e) => handleChangeEmail(e.currentTarget.value)}
                    required
                    style={{marginBottom: "8px"}}
                />
                {<p style={{color: 'red'}}>{email.error}</p>}
                <TextInput
                    label="Phone"
                    value={phone}
                    type={"number"}
                    placeholder="05XXXXXXXXX"
                    onChange={(e) => handleChangePhone(e.currentTarget.value)}
                    required
                    style={{marginBottom: "8px"}}
                />
                {error && <p style={{color: 'red'}}>{error}</p>}
                <TextInput
                    label="Password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.currentTarget.value)}
                    required
                    style={{marginBottom: "8px"}}
                />
                <div style={{display: "flex", justifyContent: "space-between"}}>
                    <div>
                        <Button type="submit" style={{flexGrow: 1}}>
                            Login
                        </Button>
                    </div>
                    <div style={{width: "16px"}}/>
                </div>
                <div
                    style={{
                        display: "flex",
                        justifyContent: "flex-end",
                        marginTop: "8px",
                        fontSize: "12px",
                    }}
                >
                </div>
            </form>
        </div>
    )
}
export default Signup;
