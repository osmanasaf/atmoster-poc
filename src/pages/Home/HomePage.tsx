import {Table, Text} from '@mantine/core';
import {useEffect, useState} from "react";
import {getRequest} from "../../service/auth.service";
import {AxiosResponse} from "axios";

type HomePageProps = {
    onLogout: () => void;
};

interface serviceDto {
    body: string
    id: number
    title: string
    userId: number
}

const HomePage = ({onLogout}: HomePageProps) => {

    const [serviceData, setServiceData] = useState<serviceDto[]>([]);
    const [postdata, setPostData] = useState<AxiosResponse | null | void>(null)

    const params = new URLSearchParams([['answer', '42']]);

    useEffect(() => {
        getRequest('').then((res) => setServiceData(res));
    }, [])

    const postparams = new URLSearchParams([]);

    // useEffect(() => {
    //     postRequest('https://httpbin.org/post', null, {
    //         firstName: 'Fred',
    //         lastName: 'Flintstone',
    //         orders: [1, 2, 3]
    //     }).then((res) => setPostData(res))
    // })

    const data = [
        {id: 1, name: 'John Doe', email: 'johndoe@example.com'},
        {id: 2, name: 'Jane Doe', email: 'janedoe@example.com'},
        {id: 3, name: 'Bob Smith', email: 'bobsmith@example.com'},
    ];

    return (
        <div>
            <Text align="center" weight={700} size="lg">
                User List
            </Text>
            <Table striped highlightOnHover>
                <thead>
                <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Email</th>
                </tr>
                </thead>
                <tbody>
                {serviceData.map((item) => (
                    <tr key={item.id}>
                        <td>{item.id}</td>
                        <td>{item.userId}</td>
                        <td>{item.title}</td>
                    </tr>
                ))}
                </tbody>
            </Table>
        </div>
    );
};

export default HomePage;
