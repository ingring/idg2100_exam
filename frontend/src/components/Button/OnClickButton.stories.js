import OnClickButton from "./OnClickButton";
export default {
    title: "OnClickButton",
    component: OnClickButton
}

const Template = args => <OnClickButton {...args}/>

export const addSets = Template.bind({});

export const update = Template.bind({});


addSets.args = {
    value:'Add sets',
    data: 'test'
}

update.args = {
    value:'Update'
}