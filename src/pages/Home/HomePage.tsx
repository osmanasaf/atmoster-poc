import {useState} from "react";
import {AppShell, Burger, Header, MediaQuery, Navbar, useMantineTheme} from '@mantine/core';
import React from "react";
import {NavbarLinks} from "../navbar/NavbarLinks";
import {User} from "../navbar/User";
import HrUser from "./hr-user";
import AdminUser from "./admin-user";
import TechnicalUser from "./technical-user";
import UcretlendirmePersonelUser from "./ucretlendirme-personel-user";


const HomePage = () => {

    const theme = useMantineTheme();
    const [opened, setOpened] = useState(false);

    let userRole = localStorage.getItem('role')
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
                <Navbar p="md" hiddenBreakpoint="sm" hidden={!opened} width={{sm: 200, lg: 300}}>
                    <Navbar.Section>
                        <NavbarLinks/>
                    </Navbar.Section>
                    <Navbar.Section style={{marginTop: 'auto'}}>
                        <User/>
                    </Navbar.Section>
                </Navbar>
            }
            asideOffsetBreakpoint={0}
            header={
                <Header height={{base: 50, md: 70}} p="md">
                    <div style={{display: 'flex', alignItems: 'center', height: '100%'}}>
                        <MediaQuery largerThan="sm" styles={{display: 'none'}}>
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
                {userRole === 'ADMIN' ? <AdminUser></AdminUser> : false}
                {userRole === 'HR' ? <HrUser></HrUser> : false}
                {userRole === 'PRICING' ? <UcretlendirmePersonelUser></UcretlendirmePersonelUser> : false}
                {userRole === 'TECHNICAL' ? <TechnicalUser></TechnicalUser> : false}
            </div>
        </AppShell>
    );
};

export default HomePage;
