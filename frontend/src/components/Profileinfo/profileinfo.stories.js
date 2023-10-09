import Profileinfo from "./Profileinfo";
export default {
  title: "Profileinfo",
  component: Profileinfo,
};

const Template = (args) => <Profileinfo {...args} />;

export const all = Template.bind({});

export const some = Template.bind({});

all.args = {
  username: "johndoe24",
  surname: "Doe",
  firstName: "John",
  email: "john_doe@testmail.com",
  department: "Design",
};

some.args = {
  username: "janedoe19",
  surname: "Doe",
  email: "janedoe@testmail.com",
};
