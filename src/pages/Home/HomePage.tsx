import {AppShell, Aside, Burger, Footer, Header, MediaQuery, Navbar, useMantineTheme} from '@mantine/core';
import { Table, Text } from '@mantine/core';
import React, {useState} from "react";
import {NavbarLinks} from "../navbar/NavbarLinks";
import {User} from "../navbar/User";

type HomePageProps = {
    onLogout: () => void;
};

const HomePage = ({ onLogout }: HomePageProps) => {
    const theme = useMantineTheme();
    const [opened, setOpened] = useState(false);
    const data = [
        { id: 1, name: 'John Doe', email: 'johndoe@example.com' },
        { id: 2, name: 'Jane Doe', email: 'janedoe@example.com' },
        { id: 3, name: 'Bob Smith', email: 'bobsmith@example.com' },
    ];


    return (
            <AppShell
                styles={{
                    main: {
                        background: theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.colors.gray[0],
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        bottom: 0,
                        right: 0,
                    },
                }}
                navbarOffsetBreakpoint="sm"
                navbar={
                    <Navbar p="md" hiddenBreakpoint="sm" hidden={!opened} width={{ sm: 200, lg: 300 }}>
                        <Navbar.Section>
                            <NavbarLinks/>
                        </Navbar.Section>
                        <Navbar.Section style={{ marginTop: 'auto' }}>
                            <User />
                        </Navbar.Section>
                    </Navbar>
                }
                asideOffsetBreakpoint={0}
                header={
                    <Header height={{ base: 50, md: 70 }} p="md">
                        <div style={{ display: 'flex', alignItems: 'center', height: '100%' }}>
                            <MediaQuery largerThan="sm" styles={{ display: 'none' }}>
                                <Burger
                                    opened={opened}
                                    onClick={() => setOpened((o) => !o)}
                                    size="sm"
                                    color={theme.colors.gray[6]}
                                    mr="xl"
                                />
                            </MediaQuery>

                            <p>Application header</p>
                        </div>
                    </Header>
                }
            >
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
            </AppShell>
        );
};

export default HomePage;
