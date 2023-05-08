import {useEffect, useState} from "react";
import {AppShell, Burger, Header, MediaQuery, Navbar, useMantineTheme} from '@mantine/core';
import React from "react";
import {NavbarLinks} from "../navbar/NavbarLinks";
import {User} from "../navbar/User";
import HrUser from "./hr-user";
import AdminUser from "./admin-user";
import TechnicalUser from "./technical-user";
import UcretlendirmePersonelUser from "./ucretlendirme-personel-user";
import {useLocation} from 'react-router-dom';
import BayiCalisanlari from "../bayi-calisanlari";
import PositionDetails from "../Position/position-details";
import Position from "../Position/positions";


const HomePage = () => {

    const theme = useMantineTheme();
    const [opened, setOpened] = useState(false);
    let userRole = localStorage.getItem('role')
    const getUrl = () => {
        const location = useLocation();
        return location.pathname;
    }

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
                    <MediaQuery largerThan="sm" styles={{display: userRole === 'ADMIN' ? '' : 'none'}}>
                        <Navbar.Section>
                            <NavbarLinks/>
                        </Navbar.Section>
                    </MediaQuery>
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
                {getUrl() === '/admin' ? <AdminUser></AdminUser> : false}
                {getUrl() === '/hr-user' ? <HrUser></HrUser> : false}
                {getUrl() === '/technical-user' ? <TechnicalUser></TechnicalUser> : false}
                {getUrl() === '/ucretlendirme-personel-user' ? <UcretlendirmePersonelUser></UcretlendirmePersonelUser> : false}
                {getUrl() === '/bayi-calisanlari' ? <BayiCalisanlari></BayiCalisanlari> : false}
                {getUrl().includes('detail') ? <PositionDetails></PositionDetails> : false}
                {getUrl() === '/position' ? <Position></Position> : false}
            </div>
        </AppShell>
    );
};

export default HomePage;
