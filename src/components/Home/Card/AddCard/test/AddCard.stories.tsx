import { ComponentStory, ComponentMeta } from '@storybook/react';
import { AddCard } from '..';

export default {
  title: 'Component/Card/AddCard',
  component: AddCard,
} as ComponentMeta<typeof AddCard>;

const Template: ComponentStory<typeof AddCard> = (arg) => <AddCard {...arg} />;

export const AddCardComponent = Template.bind({});

AddCardComponent.args = {};
