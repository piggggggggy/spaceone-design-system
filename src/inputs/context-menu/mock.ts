import { faker } from '@faker-js/faker';

import type { MenuItem } from '@/inputs/context-menu/type';

export const menuItems: MenuItem[] = [
    { type: 'header', label: 'Actions', name: 'actions' },
    {
        label: 'Add', name: 'add', type: 'button', icon: 'ic_plus_bold',
    },
    {
        label: 'Remove', name: 'remove', type: 'button', disabled: true,
    },
    {
        label: 'Create', name: 'create',
    },
    {
        label: 'Update', name: 'update',
    },
    {
        label: 'Delete', name: 'delete', disabled: true,
    },
    { type: 'divider', name: 'collect-divider' },
    {
        label: 'Collect', name: 'collect',
    },
    { type: 'divider' },
    { type: 'header', label: 'Others', name: 'others' },
    {
        label: 'Go to Google', name: 'google', link: 'https://www.google.com', target: '_blank',
    },
    { type: 'divider' },
    {
        label: 'Hello', name: 'hello',
    },
];
export const longMenuItems: MenuItem[] = [
    {
        label: faker.lorem.sentence(30), name: 'create',
    },
    {
        label: faker.lorem.sentence(30), name: 'update',
    },
    {
        label: faker.lorem.sentence(30), name: 'delete', disabled: true,
    },
    { type: 'divider', name: 'collect-divider' },
    {
        label: faker.lorem.sentence(30), name: 'collect',
    },
    { type: 'divider' },
    { type: 'header', label: 'Others', name: 'others' },
    {
        label: faker.lorem.sentence(30), name: 'google', link: 'https://www.google.com', target: '_blank',
    },
];
