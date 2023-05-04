
import React from 'react';
import * as Icon from '@tabler/icons-react';
import { ThemeIcon, UnstyledButton, Group, Text } from '@mantine/core';

interface NavbarLinksProps {
    icon: React.ReactNode;
    color: string;
    label: string;
}

function NavbarMainLinks({ icon, color, label }: NavbarLinksProps) {
    return (
        <UnstyledButton
            sx={(theme) => ({
        display: 'block',
        width: '100%',
        padding: theme.spacing.xs,
        borderRadius: theme.radius.sm,
        color: theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.black,

        '&:hover': {
            backgroundColor:
                theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[0],
        },
    })}
>
    <Group>
        <ThemeIcon color={color} variant="light">
        {icon}
        </ThemeIcon>

        <Text size="sm">{label}</Text>
        </Group>
        </UnstyledButton>
);
}

const data = [
    { icon: <Icon.IconHome size="1rem" />, color: 'blue', label: 'Home Page' },
    { icon: <Icon.IconBuildingCommunity size="1rem" />, color: 'teal', label: 'Employees' },
    { icon: <Icon.IconBrowserCheck size="1rem" />, color: 'violet', label: 'Positions' },
];

export function NavbarLinks() {
    const links = data.map((link) => <NavbarMainLinks {...link} key={link.label} />);
    return <div>{links}</div>;
}