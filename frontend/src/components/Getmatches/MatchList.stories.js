import MatchList from "./MatchList";
export default {
    title: "MatchList",
    component: MatchList
}

const Template = args => <MatchList {...args}/>

export const matches = Template.bind({});



matches.args ={ 
matchData: [
        {
          _id: '64788f098e6cbcd84c61c85f',
          player1: { username: 'admin', _id: '64788f098e6cbcd84c61c860' },
          player2: { username: 'ingrid', _id: '64788f098e6cbcd84c61c861' },
          scorePlayer1: 3,
          scorePlayer2: 0,
          winner: 'admin',
          result: '(11 - 0)(11 - 0)(11 - 0)',
          date: '2023-06-01T12:28:57.875Z',
          matchId: 22,
          __v: 0
        }, {
          _id: '64788efc8e6cbcd84c61c856',
          player1: { username: 'havala', _id: '64788efc8e6cbcd84c61c857' },
          player2: { username: 'ingrid', _id: '64788efc8e6cbcd84c61c858' },
          scorePlayer1: 3,
          scorePlayer2: 0,
          winner: 'havala',
          result: '(11 - 0)(11 - 0)(11 - 0)',
          date: '2023-06-01T12:28:44.035Z',
          matchId: 21,
          __v: 0
        },
        {
          _id: '64788edd5cd758ff9ec03961',
          player1: { username: 'havala', _id: '64788edd5cd758ff9ec03962' },
          player2: { username: 'ingrid', _id: '64788edd5cd758ff9ec03963' },
          scorePlayer1: 3,
          scorePlayer2: 0,
          winner: 'havala',
          result: '(11 - 0)(11 - 0)(11 - 0)',
          date: '2023-06-01T12:28:13.614Z',
          matchId: 20,
          __v: 0
        },
        {
          _id: '64786dd20e8d43e6734bff87',
          player1: { username: 'trymnene', _id: '64786dd20e8d43e6734bff88' },
          player2: { username: 'havala', _id: '64786dd20e8d43e6734bff89' },
          scorePlayer1: 3,
          scorePlayer2: 2,
          winner: 'trymnene',
          result: '(8 - 11)(7 - 11)(11 - 6)(11 - 8)(11 - 9)',
          date: '2023-06-01T10:07:14.866Z',
          matchId: 19,
          __v: 0
        },
        {
          _id: '6475cb9c568e1ed51f35206a',
          player1: { username: 'trymnene', _id: '6475cb9c568e1ed51f35206b' },
          player2: { username: 'carlos', _id: '6475cb9c568e1ed51f35206c' },
          scorePlayer1: 3,
          scorePlayer2: 0,
          winner: 'trymnene',
          result: '(11 - 7)(11 - 5)(11 - 6)',
          date: '2023-05-30T10:10:36.202Z',
          matchId: 18,
          __v: 0
        },
        {
          _id: '6475becb227100f5299cdf05',
          player1: { username: 'ingrid', _id: '6475becb227100f5299cdf06' },
          player2: { username: 'admin', _id: '6475becb227100f5299cdf07' },
          scorePlayer1: 3,
          scorePlayer2: 0,
          winner: 'ingrid',
          result: '(11 - 7)(11 - 9)(13 - 11)',
          date: '2023-05-30T09:15:55.554Z',
          matchId: 17,
          __v: 0
        },
        {
          _id: '6475bdcc227100f5299cdef1',
          player1: { username: 'havala', _id: '6475bdcc227100f5299cdef2' },
          player2: { username: 'trymnene', _id: '6475bdcc227100f5299cdef3' },
          scorePlayer1: 1,
          scorePlayer2: 3,
          winner: 'trymnene',
          result: '(11 - 13)(11 - 8)(11 - 13)(8 - 11)',
          date: '2023-05-30T09:11:40.251Z',
          matchId: 16,
          __v: 0
        },
        {
          _id: '6475bccf227100f5299cdedd',
          player1: { username: 'havala', _id: '6475bccf227100f5299cdede' },
          player2: { username: 'trymnene', _id: '6475bccf227100f5299cdedf' },
          scorePlayer1: 3,
          scorePlayer2: 0,
          winner: 'havala',
          result: '(11 - 8)(11 - 8)(11 - 9)',
          date: '2023-05-30T09:07:27.963Z',
          matchId: 15,
          __v: 0
        },
        {
          _id: '6475b8e9227100f5299cdeb4',
          player1: { username: 'trymnene', _id: '6475b8e9227100f5299cdeb5' },
          player2: { username: 'ingrid', _id: '6475b8e9227100f5299cdeb6' },
          scorePlayer1: 3,
          scorePlayer2: 2,
          winner: 'trymnene',
          result: '(6 - 11)(8 - 11)(11 - 8)(11 - 4)(11 - 6)',
          date: '2023-05-30T08:50:49.052Z',
          matchId: 14,
          __v: 0
        },
        {
          _id: '6475b866e70f8ff644c8e7fb',
          player1: { username: 'simen', _id: '6475b866e70f8ff644c8e7fc' },
          player2: { username: 'trymnene', _id: '6475b866e70f8ff644c8e7fd' },
          scorePlayer1: 2,
          scorePlayer2: 3,
          winner: 'trymnene',
          result: '(8 - 11)(13 - 11)(11 - 8)(4 - 11)(6 - 11)',
          date: '2023-05-30T08:48:38.532Z',
          matchId: 13,
          __v: 0
        },
        {
          _id: '6475b82fe70f8ff644c8e7ed',
          player1: { username: 'simen', _id: '6475b82fe70f8ff644c8e7ee' },
          player2: { username: 'ingrid', _id: '6475b82fe70f8ff644c8e7ef' },
          scorePlayer1: 3,
          scorePlayer2: 2,
          winner: 'simen',
          result: '(11 - 0)(1 - 11)(11 - 5)(5 - 11)(16 - 14)',
          date: '2023-05-30T08:47:43.336Z',
          matchId: 12,
          __v: 0
        },
        {
          _id: '6475b56ce70f8ff644c8e7cf',
          player1: { username: 'simen', _id: '6475b56ce70f8ff644c8e7d0' },
          player2: { username: 'havala', _id: '6475b56ce70f8ff644c8e7d1' },
          scorePlayer1: 1,
          scorePlayer2: 3,
          winner: 'havala',
          result: '(11 - 0)(0 - 11)(0 - 11)(0 - 11)',
          date: '2023-05-30T08:35:56.281Z',
          matchId: 11,
          __v: 0
        },
        {
          _id: '6475b55ce70f8ff644c8e7c3',
          player1: { username: 'simen', _id: '6475b55ce70f8ff644c8e7c4' },
          player2: { username: 'trymnene', _id: '6475b55ce70f8ff644c8e7c5' },
          scorePlayer1: 1,
          scorePlayer2: 3,
          winner: 'trymnene',
          result: '(11 - 0)(0 - 11)(0 - 11)(0 - 11)',
          date: '2023-05-30T08:35:40.676Z',
          matchId: 10,
          __v: 0
        },
        {
          _id: '6475b54ce70f8ff644c8e7b5',
          player1: { username: 'simen', _id: '6475b54ce70f8ff644c8e7b6' },
          player2: { username: 'ingrid', _id: '6475b54ce70f8ff644c8e7b7' },
          scorePlayer1: 1,
          scorePlayer2: 3,
          winner: 'ingrid',
          result: '(4 - 11)(11 - 2)(1 - 11)(0 - 11)',
          date: '2023-05-30T08:35:24.547Z',
          matchId: 9,
          __v: 0
        },
        {
          _id: '6475b53ae70f8ff644c8e7a9',
          player1: { username: 'simen', _id: '6475b53ae70f8ff644c8e7aa' },
          player2: { username: 'havala', _id: '6475b53ae70f8ff644c8e7ab' },
          scorePlayer1: 3,
          scorePlayer2: 0,
          winner: 'simen',
          result: '(11 - 7)(11 - 6)(11 - 5)',
          date: '2023-05-30T08:35:06.385Z',
          matchId: 8,
          __v: 0
        },
        {
          _id: '6475b521e70f8ff644c8e78e',
          player1: { username: 'ingrid', _id: '6475b521e70f8ff644c8e78f' },
          player2: { username: 'trymnene', _id: '6475b521e70f8ff644c8e790' },
          scorePlayer1: 3,
          scorePlayer2: 0,
          winner: 'ingrid',
          result: '(11 - 0)(11 - 0)(11 - 0)',
          date: '2023-05-30T08:34:41.010Z',
          matchId: 7,
          __v: 0
        },
        {
          _id: '6475b512e70f8ff644c8e782',
          player1: { username: 'ingrid', _id: '6475b512e70f8ff644c8e783' },
          player2: { username: 'simen', _id: '6475b512e70f8ff644c8e784' },
          scorePlayer1: 1,
          scorePlayer2: 3,
          winner: 'simen',
          result: '(11 - 7)(2 - 11)(0 - 11)(0 - 11)',
          date: '2023-05-30T08:34:26.996Z',
          matchId: 6,
          __v: 0
        },
        {
          _id: '6475b501e70f8ff644c8e776',
          player1: { username: 'ingrid', _id: '6475b501e70f8ff644c8e777' },
          player2: { username: 'havala', _id: '6475b501e70f8ff644c8e778' },
          scorePlayer1: 3,
          scorePlayer2: 1,
          winner: 'ingrid',
          result: '(11 - 0)(11 - 6)(4 - 11)(11 - 3)',
          date: '2023-05-30T08:34:09.074Z',
          matchId: 5,
          __v: 0
        },
        {
          _id: '6475b4dee70f8ff644c8e74c',
          player1: { username: 'havala', _id: '6475b4dee70f8ff644c8e74d' },
          player2: { username: 'ingrid', _id: '6475b4dee70f8ff644c8e74e' },
          scorePlayer1: 1,
          scorePlayer2: 3,
          winner: 'ingrid',
          result: '(4 - 11)(11 - 0)(1 - 11)(10 - 12)',
          date: '2023-05-30T08:33:34.754Z',
          matchId: 4,
          __v: 0
        },
        {
          _id: '6475b4cbe70f8ff644c8e740',
          player1: { username: 'havala', _id: '6475b4cbe70f8ff644c8e741' },
          player2: { username: 'ingrid', _id: '6475b4cbe70f8ff644c8e742' },
          scorePlayer1: 2,
          scorePlayer2: 3,
          winner: 'ingrid',
          result: '(11 - 9)(11 - 6)(3 - 11)(1 - 11)(0 - 11)',
          date: '2023-05-30T08:33:15.571Z',
          matchId: 3,
          __v: 0
        },
        {
          _id: '6475b4b7e70f8ff644c8e734',
          player1: { username: 'havala', _id: '6475b4b7e70f8ff644c8e735' },
          player2: { username: 'trymnene', _id: '6475b4b7e70f8ff644c8e736' },
          scorePlayer1: 3,
          scorePlayer2: 1,
          winner: 'havala',
          result: '(11 - 4)(2 - 11)(11 - 1)(11 - 0)',
          date: '2023-05-30T08:32:55.238Z',
          matchId: 2,
          __v: 0
        },
        {
          _id: '6475b4a3e70f8ff644c8e728',
          player1: { username: 'havala', _id: '6475b4a3e70f8ff644c8e729' },
          player2: { username: 'trymnene', _id: '6475b4a3e70f8ff644c8e72a' },
          scorePlayer1: 2,
          scorePlayer2: 3,
          winner: 'trymnene',
          result: '(11 - 6)(2 - 11)(11 - 5)(0 - 11)(0 - 11)',
          date: '2023-05-30T08:32:35.160Z',
          matchId: 1,
          __v: 0
        },
    ],
    auth: {
        role:'User'
    }
}
        


