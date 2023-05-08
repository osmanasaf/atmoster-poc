import {Table, Text} from "@mantine/core";
import React, {useEffect, useState} from "react";
import {getRequest} from "../service/auth.service";
import {RoleEnum} from "../util/role.enum";

interface bayiCalisanlariDto {
    id: number,
    name: string,
    title: string;
    role: RoleEnum;
}

const BayiCalisanlari = () => {
    const [bayiCalisanlari, setBayiCalisanlari] = useState<bayiCalisanlariDto[]>([]);
    let roles: string;
    const roleChange = (userId: number, event: any) => {
        console.log(bayiCalisanlari);
        bayiCalisanlari.map(user => {
                if (user.id === userId) {
                    user.role = event
                }
            }
        )

    };
    useEffect(() => {
        getRequest().then((res: any) => {
            setBayiCalisanlari(res);
        });
    }, [])
    return (
        <div>
            <Text align="center" weight={700} size="lg">
                Bayi Çalışanları
            </Text>
            <Table striped highlightOnHover>
                <thead>
                <tr>
                    <th>İsim Soyisim</th>
                    <th>Role</th>
                </tr>
                </thead>
                <tbody>
                {bayiCalisanlari.map((item) => (
                    <tr key={item.id}>
                        <td>{item.title}</td>
                        <td>
                            <select value={roles} onChange={(e) => roleChange(item.id, e.target.value)}>
                                {Object.keys(RoleEnum).map(key => (
                                    <option key={key} value={key}>
                                        {key}
                                    </option>
                                ))}
                            </select>
                        </td>
                    </tr>
                ))}
                </tbody>
            </Table>
        </div>
    );
}

export default BayiCalisanlari;
