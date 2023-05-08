import {Button, Table, Text, TextInput} from "@mantine/core";
import React, {useEffect, useState} from "react";
import {createPosition, getAllPosition, updatePositionStatus} from "../../service/position.service";
import {useHistory} from "react-router-dom";
import {PositionDto, PositionStatusEnum, WorkTypeEnum} from "../../dto/PositionDto";
import {Modal} from "antd";

const Position = () => {
    const history = useHistory();
    const [position, setPosition] = useState<PositionDto[]>([]);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [name, setName] = useState('');
    const [surname, setSurname] = useState('');
    const [address, setAddress] = useState('');
    const [description, setDescription] = useState('');
    const [workType, setWorkType] = useState<WorkTypeEnum>();
    const positionID = window.location.pathname.split('/')[3];
    useEffect(() => {

        getAllPosition().then((res: any) => {
            setPosition(res.data)
        });
    }, [])

    function getPositions() {
        getAllPosition().then((res: any) => {
            setPosition(res.data)
        });
    }

    const positionDetails = () => {
        history.push(`/position/detail`)
    }

    function handleClick(e: any) {
        setIsModalVisible(true)
    }

    const handleChangeAddress = (event: string) => {
        setAddress(event);
    };

    function handleHide() {
        setIsModalVisible(false)
    }

    function handleSubmit() {
        let positionDto: PositionDto;
        if (workType) {
            positionDto = {
                name: name,
                detail: description,
                status: PositionStatusEnum.OPEN,
                city: address,
                workType: workType,
                applicantCount: 0,
                id: ''
            }
            createPosition(positionDto).then((res: any) => {
                getPositions()
                setIsModalVisible(false)
            })
        }
    }

    function roleChange(event: any) {
        setWorkType(event)
    }

    function changePositionStatus(positionId: string, positionStatus: string) {
        updatePositionStatus(positionId, positionStatus).then((res: any) => getPositions())

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
                <Button type="submit" onClick={handleClick}>
                    Pozisyon Oluştur
                </Button>
            </div>
            <Table striped highlightOnHover>
                <thead>
                <tr>
                    <th>Pozisyon Adı</th>
                    <th>Başvuru Sayısı</th>
                </tr>
                </thead>
                <tbody>
                {position?.map((item) => (
                    <tr key={item.id}>
                        <td>{item.name}</td>
                        <td>{item.applicantCount}</td>
                        <Button type="submit" style={{backgroundColor: item.status === 'OPEN' ? "red" : "green"}}
                                onClick={() => changePositionStatus(item.id, item.status === 'OPEN' ? 'CLOSED' : 'OPEN')}
                        >
                            {item.status === 'OPEN' ? "Pozisyonu Kapat" : "Pozisyonu Aç"}
                        </Button>
                    </tr>
                ))}
                </tbody>
            </Table>

            <Modal title="Başvuran Listesi" visible={isModalVisible} onOk={handleSubmit} onCancel={handleHide}>
                <thead>
                <tr>
                    <td>
                        <form
                            onSubmit={handleSubmit}
                            style={{display: "flex", flexDirection: "column", maxWidth: "300px"}}
                        >
                            <div style={{display: "flex"}}>
                                <TextInput
                                    label="Name"
                                    value={name}
                                    onChange={(e) => setName(e.currentTarget.value)}
                                    required
                                    style={{marginBottom: "8px", marginRight: "5px"}}
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
                                style={{marginBottom: "8px", marginRight: "5px"}}
                            />
                            <TextInput
                                label="Address"
                                value={address}
                                onChange={(e) => handleChangeAddress(e.currentTarget.value)}
                                required
                                style={{marginBottom: "8px", marginRight: "5px"}}
                            />
                            <select value={workType} onChange={(e) => roleChange(e.target.value)}>
                                {Object.keys(WorkTypeEnum).map(key => (
                                    <option key={key} value={key}>
                                        {key}
                                    </option>
                                ))}
                            </select>
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
}
export default Position;

