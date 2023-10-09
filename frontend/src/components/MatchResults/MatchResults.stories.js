import MatchResults from "./MatchResults";

export default {
  title: "Match result",
  component: MatchResults,
};

const Template = (args) => <MatchResults {...args} />;

export const SetOf3 = Template.bind({});

export const SetOf5 = Template.bind({});

SetOf3.args = {
   match:{
    _id: '645e3b2591ed939603d908c5',
    player1: { username: 'lisamyrene', _id: '645e3b2591ed939603d908c6' },
    player2: { username: 'trymnene', _id: '645e3b2591ed939603d908c7' },
    scorePlayer1: 3,
    scorePlayer2: 0,
    winner: 'lisamyrene',
    result: '(11 - 0)(11 - 0)(11 - 0)',
    date: new Date('2023-05-12T13:12:05.000Z'),
    matchId: 46,
    __v: 0
},
date: "12.04.2023",
result: [ '14-12', '11-13', '12-10', '4-11', '7-11' ]
};

SetOf5.args = {
  match: {
    _id: "645e3b2591ed939603d908c5",
    player1: {
      username: "lisamyrene",
      _id: "645e3b2591ed939603d908c6",
    },
    player2: {
      username: "trymnene",
      _id: "645e3b2591ed939603d908c7",
    },
    scorePlayer1: 2,
    scorePlayer2: 3,
    winner: "trymnene",
    result: "(11 - 0)(11 - 0)(11 - 0)",
    date: "2023-05-12T13:12:05.986Z",
    matchId: 1,
    __v: 0,
  },
  date: "12.04.2023",
  result: ["14-12", "11-13", "12-10", "4-11", "7-11"],
};
