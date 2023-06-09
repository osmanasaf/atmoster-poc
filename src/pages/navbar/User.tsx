import React from 'react';
import { IconChevronRight, IconChevronLeft } from '@tabler/icons-react';
import { UnstyledButton, Group, Avatar, Text, Box, useMantineTheme, rem } from '@mantine/core';
import * as Icon from "@tabler/icons-react";

export function User() {
    const theme = useMantineTheme();

    function logout() {
        localStorage.removeItem('token');
        window.location.href = '/auth/login';
    }

    return (
        <Box
            sx={{
                paddingTop: theme.spacing.sm,
                borderTop: `${rem(1)} solid ${
                    theme.colorScheme === 'dark' ? theme.colors.dark[4] : theme.colors.gray[2]
                }`,
            }}
        >
            <UnstyledButton
                sx={{
                    display: 'block',
                    width: '100%',
                    padding: theme.spacing.xs,
                    borderRadius: theme.radius.sm,
                    color: theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.black,

                    '&:hover': {
                        backgroundColor:
                            theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[0],
                    },
                }}
            >
                <Group>
                    <Text size="sm" weight={500} onClick={logout}>
                        <Icon.IconLogout size="1rem" /> Logout
                    </Text>
                </Group>
            </UnstyledButton>
        </Box>
    );
}