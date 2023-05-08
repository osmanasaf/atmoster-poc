import {Table, Text} from "@mantine/core";
import React, {useEffect, useState} from "react";
import {registerUser, userUpdateRole} from "../service/auth.service";
import {RoleEnum} from "../dto/role.enum";
import UserDto from "../dto/UserDto";

const BayiCalisanlari = () => {
    const [bayiCalisanlari, setBayiCalisanlari] = useState<UserDto[]>([]);
    let roles: string;
    useEffect(() => {
        getUser();
    }, []);

    const roleChange = (mail: string, event: any) => {
        bayiCalisanlari.map(user => {
            if (user.mail === mail) {
                user.ou = event
                userUpdateRole(mail, event).then((res: any) => {
                    getUser();
                })
            }
        })
    };
    const getUser = () => {
        registerUser().then((res: any) => {
            setBayiCalisanlari(res);
        });
    }

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
                    <tr key={item.mail}>
                        <td>{item.mail}</td>
                        <td>
                            <select value={roles} onChange={(e) => roleChange(item.ou, e.target.value)}>
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
