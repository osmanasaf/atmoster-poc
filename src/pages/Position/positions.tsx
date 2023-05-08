import {useEffect, useState} from "react";
import {getRequest} from "../../service/auth.service";
import {Button, Table, Text, Switch, TextInput,} from '@mantine/core'; // import Switch component
import React from "react";
import {useHistory} from "react-router-dom";
import {Modal} from 'antd';

interface positionDto {
    id: number
    positionName: string
    numberOfRecourse: number
    title: string
}
const Position = () => {

    const [name, setName] = useState('');
    const [surname, setSurname] = useState('');
    const [address, setAddress] = useState('');
    const [description, setDescription] = useState('');
    const [error, setError] = useState('');
    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
    };
    const handleChangeAddress = (event: string) => {
        if (event) {
            setError('Address is invalid');
        } else {
            setError('');
        }
        setAddress(event);
    };
        const history = useHistory();
        const [serviceData, setServiceData] = useState<positionDto[]>([]);
        const [switchState, setSwitchState] = useState(false); // create a state for the switch

        useEffect(() => {
        getRequest().then((res:any) => setServiceData(res));
    }, [])

    const handleClick = (e : any) => {
        setIsModalVisible(true)
    };

    const positionDetails = (id: number) => {
        history.push(`/position/detail/${id}`)
    }

    const [isModalVisible, setIsModalVisible] = useState(false);

    const handleSwitchChange = () => { // create a handler for the switch change
        setSwitchState(!switchState); // toggle the switch state
        // do something based on the switch state
        if (switchState) {
            // switch is on
        } else {
            // switch is off
        }
    }
    function handleHide() {
        setIsModalVisible(false)
    }
    return (
        <div>
            <div
                style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    marginBottom: "10px",
                    marginRight: "25px",
                    marginLeft: "10px"
                }}
            >
                <Text align="center" weight={700} size="lg">
                    Pozisyonlar
                </Text>
                <Button type="submit" onClick={handleClick} >
                    Pozisyon Oluştur
                </Button>
            </div>

            <Table striped highlightOnHover>
                <thead>
                <tr>
                    <th>Pozisyon Adı</th>
                    <th>Pozisyon Durumu</th>
                </tr>
                </thead>
                <tbody>
                {serviceData?.map((item) => (
                    <tr key={item.id}>
                        <td onClick={() => positionDetails(item.id)}>{item.title}</td>
                        <td><Switch checked={switchState} onChange={handleSwitchChange} /> {/* add a switch component */}</td>
                    </tr>
                ))}
                </tbody>
            </Table>
            <Modal title="Başvuran Listesi" visible={isModalVisible} onOk={handleHide} onCancel={handleHide}>
                <thead>
                <tr>
                    <td>
                        <form
                            onSubmit={handleSubmit}
                            style={{display: "flex", flexDirection: "column", maxWidth: "300px"}}
                        >
                            <div style={{display:"flex"}}>
                                <TextInput
                                    label="Name"
                                    value={name}
                                    onChange={(e) => setName(e.currentTarget.value)}
                                    required
                                    style={{marginBottom: "8px",marginRight: "5px"}}
                                />
                                <TextInput
                                    label="Surname"
                                    value={surname}
                                    onChange={(e) => setSurname(e.currentTarget.value)}
                                    required
                                    style={{marginBottom: "8px"}}
                                />
                            </div>
                            <TextInput
                                label="Position Description"
                                value={description}
                                onChange={(e) => setDescription(e.currentTarget.value)}
                                required
                                style={{marginBottom: "8px",marginRight: "5px"}}
                            />
                            <TextInput
                                label="Address"
                                value={address}
                                onChange={(e) => handleChangeAddress(e.currentTarget.value)}
                                required
                                style={{marginBottom: "8px",marginRight: "5px"}}
                            />
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
                    </td>
                </tr>
                </thead>

            </Modal>

        </div>

    );

};


export default Position;