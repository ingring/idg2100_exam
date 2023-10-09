import Landingdisplay from "./Landingdisplay";

export default {
    title: "Landingdisplay",
    component: Landingdisplay
}

const Template = args => <Landingdisplay {...args}/>

export const few = Template.bind({});

export const many = Template.bind({});


few.args = {
    playerCount:7,
    matchCount:4

}

many.args = {
    playerCount:304,
    matchCount:1289

}