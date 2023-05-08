import {useEffect, useState} from "react";
import {getRequest} from "../../service/auth.service";
import {Table, Text} from '@mantine/core';
import React from "react";
import {useHistory} from "react-router-dom";

interface positionDto {
    id: number
    positionName: string
    numberOfRecourse: number
    title: string
}

const AdminUser = () => {
    const history = useHistory();
    const [position, setPosition] = useState<positionDto[]>([]);


    useEffect(() => {
        getRequest().then((res: any) => setPosition(res));
    }, [])

    const positionDetails = (id: number) => {
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
                        <td onClick={() => positionDetails(item.id)}>{item.title}</td>
                        <td>{item.positionName}</td>
                        <td>{item.numberOfRecourse}</td>
                    </tr>
                ))}
                </tbody>
            </Table>
        </div>

    );
};


export default AdminUser;
