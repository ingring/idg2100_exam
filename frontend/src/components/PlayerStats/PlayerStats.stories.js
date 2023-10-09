import PlayerStats from "./PlayerStats";

export default {
    title: "PlayerStats",
    component: PlayerStats
}

const Template = args => <PlayerStats {...args}/>

export const few = Template.bind({});

export const many = Template.bind({});


few.args = {
    wins:4,
    points:13,
    rank:89,
    losses:5

}

many.args = {
    wins:32,
    points:113,
    rank:2,
    losses:17

}