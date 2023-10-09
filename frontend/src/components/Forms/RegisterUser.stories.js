import RegisterForm from "./RegisterForm";
export default {
    title: "RegisterForm",
    component: RegisterForm
}

const Template = args => <RegisterForm {...args}/>

export const user = Template.bind({});

export const empty = Template.bind({});


user.args = {
    password:'verySecure123',
    username: 'johndoe84',
    firstname: 'John',
    surname: 'Doe',
    email: 'john_doe_84@fakemail.com',
    department: 'Design',
    confirmPassword: 'verySecure123'
}

empty.args = {
    password:'',
    username: ''
}
