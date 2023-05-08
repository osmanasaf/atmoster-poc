import {useEffect, useState} from "react";
import {Table, Text} from '@mantine/core';
import React from "react";
import {useHistory} from "react-router-dom";
import {PositionDto} from "../../dto/PositionDto";
import {getAllPosition} from "../../service/position.service";

const AdminUser = () => {
    const history = useHistory();
    const [position, setPosition] = useState<PositionDto[]>([]);
    useEffect(() => {
        getAllPosition().then((res: any) => {
            setPosition(res.data)
        });
    }, [])

    const positionDetails = (id: string) => {
        history.push(`/position/detail/${id}`)
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
                    Pozisyonlar Admin Panel
                </Text>
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
                        <td onClick={() => positionDetails(item.id)}>{item.name}</td>
                        <td>{item.applicantCount}</td>
                    </tr>
                ))}
                </tbody>
            </Table>
        </div>
    );
};


export default AdminUser;
