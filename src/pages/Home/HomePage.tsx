import { Table, Text } from '@mantine/core';

type HomePageProps = {
    onLogout: () => void;
};

const HomePage = ({ onLogout }: HomePageProps) => {
    const data = [
        { id: 1, name: 'John Doe', email: 'johndoe@example.com' },
        { id: 2, name: 'Jane Doe', email: 'janedoe@example.com' },
        { id: 3, name: 'Bob Smith', email: 'bobsmith@example.com' },
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
                {data.map((item) => (
                    <tr key={item.id}>
                        <td>{item.id}</td>
                        <td>{item.name}</td>
                        <td>{item.email}</td>
                    </tr>
                ))}
                </tbody>
            </Table>
        </div>
    );
};

export default HomePage;
