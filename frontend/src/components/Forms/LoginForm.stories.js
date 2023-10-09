import LoginForm from "./LoginForm";
export default {
    title: "LoginForm",
    component: LoginForm
}

const Template = args => <LoginForm {...args}/>

export const user = Template.bind({});

export const empty = Template.bind({});


user.args = {
    password:'verySecure123',
    username: 'johndoe84'
}

empty.args = {
    password:'',
    username: ''
}
