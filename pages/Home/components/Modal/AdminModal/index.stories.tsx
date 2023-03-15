import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { AdminModal } from '.';

export default {
  title: 'Component/Modal/AdminModal',
  component: AdminModal,
} as ComponentMeta<typeof AdminModal>;

const Template: ComponentStory<typeof AdminModal> = (args) => <AdminModal {...args} />;

export const AdminModalComponent = Template.bind({});
AdminModalComponent.args = {
  isOpen: true,
  setIsOpen: () => undefined,
};