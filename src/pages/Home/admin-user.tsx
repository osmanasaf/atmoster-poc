import {useEffect, useState} from "react";
import {openPositions} from "../../service/auth.service";
import {Table, Text} from '@mantine/core';
import React from "react";
import {useHistory} from "react-router-dom";
import {PositionDto} from "../../dto/PositionDto";

const AdminUser = () => {
    const history = useHistory();
    const [position, setPosition] = useState<PositionDto[]>([]);


    useEffect(() => {
        openPositions().then((res: any) => setPosition(res));
    }, [])

    const positionDetails = (id: string) => {
        history.push(`/position/detail/${id}`)
    }
    return (
        <div>
            <Text align="center" weight={700} size="lg">
                Açık Pozisyonlar
            </Text>
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
