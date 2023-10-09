import InputButton from "./InputButton";
export default {
    title: "InputButton",
    component: InputButton
}

const Template = args => <InputButton {...args}/>

export const login = Template.bind({});

export const register = Template.bind({});


login.args = {
    value:'Login'

}

register.args = {
    value:'Register'
}