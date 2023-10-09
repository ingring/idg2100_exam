[![Open in Visual Studio Code](https://classroom.github.com/assets/open-in-vscode-c66648af7eb3fe8bc4f294546bfd86ef473780cde1dea487d3c4ff354943c9ae.svg)](https://classroom.github.com/online_ide?assignment_repo_id=10110157&assignment_repo_type=AssignmentRepo)

# IDG2100-2023-oblig1

This document contains the description and starter code for `oblig1: IDG2100 Spring 2023`.

You are free to modify the starter code to customise the layout and create a theme more suitable for your. Make sure all the functionalities are included in the new layout.

# Goal

- Prove your understanding about `Web components` and how to use them.
- Demostrate you can create and build resuable `Web components` that can be used in any project or static webpage.
- Show that you can pass data to a `Web components` from an ancestor and understand when to use `HTML attributes` or `properties`
- Show you can pass data from a `Web component` to an ancestor using `Custom events`
- Demostrate you can provide CSS style encapsulation with your components
- Prove you can expose a way to customise or theme the Web component via CSS Custom Properties

The project is evaluated based on the previous goals. Therefore, you must show you understand all the previous concepts to get a passing grade. You may want to add a `readme` file to clarify any decision taking during the design/implementation process.

# Context

In this "oblig" you will be presented with a brief description of the problem you have to solve using Web component(s).

This is an individual task, and you are required to build the component(s) from the ground up. Although, you may utilize snippets of code from tutorials or official documentation, you must clearly acknowledge the sources in the comments of your code. Plagiarism or cheating will be deemed to have taken place if the submitted code shows substantial similarities to other students' assignments or projects found online. In such cases, the matter will be reported to the NTNU appeals committee for further examination. If you have any doubts regarding the use of materials for your project, please reach out to the instructor for clarification.

If the assignment is graded as "not approved" you will have an additional opportunity based on the following conditions:

1. The first version of the project must have been delivered within the set deadline (never after);
1. The project must consist on a significant piece of work (i.e.: do not deliver an empty assignment);
1. The second version of the project will have to include an additional task (as described later - See [Optional task](#optional%20task)).

# Brief: Table tennis scoreboard counter

NTNU has several “ping pong” tables spread around the campus for the students. Learning table tennis can be a challenging experience, especially for those who are new to the game. One of the main challenges for beginners is to count points and keep track of serves.

Counting points in table tennis can be a challenge due to the fast pace of the game and the various rules involved. Here are some of the main challenges of counting points in table tennis:

1. Understanding the scoring system: Table tennis uses an odd-point scoring system, which means that a player must win by two clear points. This can be confusing, especially for those who are new to the game.

1. Keeping track of serves: In table tennis, the right to serve alternates between players every two points. It can be easy to lose track of whose turn it is to serve, especially when the game is fast-paced and intense.

In conclusion, counting points in table tennis requires a good understanding of the rules and a keen attention to detail. It can be a challenge, especially for those who are new to the game, but with practice and experience, it becomes easier to keep track of the score and make accurate points.

Your job is to create a Web component that allows players to keep track of both the score and the serves. Here you have some things you must take into account when designing and implementing your component.

- Before starting a new game, the players can write their names. By default, the Web component will show Player 1 and Player 2.
- In the first version of the component, it will be assumed that Player 1 has the first serve.
- Every time a player scores a point, the score counter must be incremented manually by the player.
- The scoreboard counter will show who has the serve during the whole game.
- A game is won by being the first player to win 11 points, and be at least 2 points ahead of his or her opponent.
- A match is the best of 5 games.
- The scoreboard counter will not only show the results of the current game but also the results of the match (remember, best of 5 games).
- When finishing a game, the scoreboard component will show the winner and inform its antecesors about the results of the match (including the names of the players, the results of each game, the time they started, the time they finished and the winner).
- It must be possible to reset a game at any time.

The main application (`index.html`) will capture all the results every time a match finishes and will add the results with all the info to the `results-container`.

In addition to the previous functionalities, the user will be able to config the component as follows:

| value              | url                                                                                                      | default |
| ------------------ | -------------------------------------------------------------------------------------------------------- | ------- |
| showplayers        | indicates if the scoreboard will display the names of the payers                                         | true    |
| showsets           | indicates if the scoreboard will show the sets won by each player during the match                       | true    |
| showprevioussets   | indicates if the scoreboard will show the results of each game (set) won by each player during the match | true    |
| (\*) winbestof     | indicates the number of games (sets) a player must win to win the match.                                 | 5       |
| (\*) serverotation | Indicates the serve frequency. i.e.: the serve alternates between players every X points.                | 2       |

(\*) This configurations are optional. If they are not implemented in your component, make sure you use the default value to be able to keep track of the serve and calculate who the winner is.

The component must be responsive. It is desired to use CSS to draw a "ping pong" table and render the results on each side of the table.

The [following website](https://scorecount.com/table-tennis-ping-pong/) may be used as inspiration to understand some of the functionalities requested.

## Task

- Create the component described in the previous section following all the best practices and using the different specifications for building native `custom elements`.

- Style the component and offer the user some customisation via CSS `custom properties` ([example here](https://css-tricks.com/styling-a-web-component/)).

- Read the `index.html`, understand the code and use your component in the area reserved for that.

- Add the results of each match to the `results-container` every time the user finishes a match.

## Optional task

Implement this task if your assignment is graded as "Not approved" and you are entitled to deliver a second iteration (See [Context](#context))

For the optional task, you want to persists (i.e.: store) the results of all the matches using the `localStorage`.

The application using your Web component will send to the component the name of the key you want to create/update ([check `Storage.setItem()`](https://developer.mozilla.org/en-US/docs/Web/API/Storage/setItem)).

Let's consider the following example:

```js
localStorage.setItem("RESULTS_LIST_STORE", resultsListAsString);
```

`resultsListAsString`, which must contain a string, will be stored in the local storage variable identified by the string `RESULTS_LIST_STORE`.

- Update the Web component to persist all the results from previous matches (this is, the same Web component will persist the new results every time a match finishes).

- Update the Web component to receive the `keyName` (i.e. `RESULTS_LIST_STORE` in the previous example) to know where to store all the results (notice your application must have more than one scoreboard component might be used in the same page and it is important to store the results accordingly).

- Create a new Web component (`match-results`) to visualise the results of all the matches.This new component will replace the `<ul class="results-container">` and it will render the persisted results of the matches from the localStorage (this is, it also needs to receive the `keyName`). The component will be updated every time a new match is played.

NOTE: to make sure this new functionality works as expected try the following test:

- Start a new game until one player wins.
- Check if the new match is added in the results section.
- Reload/refresh the page and check if the last game is still in the list of results.

# Delivery

This assignment must be delivered in two different places: GitHub classroom and Blackboard.

- To deliver the assignment in GitHub Classroom, you only need to make sure all your changes and commits are pushed to your Git repository.

- It is imperative that you work exclusively with this Git repository to ensure that all modifications are trackable and your code is backed up on a regular basis. Hence, you should commit your progress directly to this repository each time you make advancements.

- Before delivering the assignment in Blackbard, make sure your project has all the files it needs. Delete any file or info not needed (this is `.git/` folder, etc.). Zip the project and upload the file to Blackboard.

# DOCUMENTATION

-General information about the component.
My goal with this component was to create a score counter for table tennis that would be easy to use and customize for users of the webpage.

--- How does the component work ---

    -Serving. I have implemented a way to keep track of which player is serving. The player who has the serve has a table tennis racket on their clickable part of the container (bottom part of the table). The player who started serving in a set will not start serving the next set.

    -Counting points. To add points to the score, you must click on the bottom part of the table of whoever won the point on the real table tennis board. The component will keep track of when the set is over, and when the match is over, as well as update the scoreboard visually after each point. When the match is over, the winning player will be awarded with a medal, and the result will be shown underneath.

    -Resetting the game. I have implemented 2 different places the user can reset the game. One way is through the reset button inside the settings-form. The other way is through the reset button on the top of the component. Resetting the game will reset all results, but not the match settings or player names.

    -Settings. To make my component easy to use for anyone, I decided to add settings to the component. In the settings form it is possible to change the name of the player, decide how many sets should be played or set how many serves each player has in a row before the serve changes.

    -How to use. To make it easier to understand how to use the component I decided to add a button that will display some informational text on the clickable part of the table, and make it blink for 3 seconds.

--- Customize the component with HTML attributes ---

--"showplayers"--

    -Value to use: "false"
    -Setting showplayers to false will hide the players name from the component. Players can still change the name inside the settings, unless this is also disabled.
    -Default: players name are shown.

--"showsets"--

    -Value to use: "false"
    -Setting showsets to false will stop the sets from showing on the score-counter. The score counter will instead show "-".
    -Default: Sets are shown on the scoreboard.

--"showprevioussets"--

    -value to use: "false"
    -Setting showprevioussets will stop the scores of previos sets to be visible on the component during the game.
    -Default: Results of the previous set are shown on the component.

--"winbestof"--

    -Value to use: 1, 3, 5, 7, 9.
    -This decides how many sets will be played. If winbestof is set to 7, the winner will be the first to score 4 sets (more than half of the selected best of). This can also be changed through settings on the component (unless settings is disabled).
    -Default: 5 (first to 3 sets).

--"serverotation"--

    -Value to use: 1, 2, 3, 4
    -This decides how many serves in a row each player has before the serve is passed over to the opponent.
    -Default: 2.

--"to-serve"--

    -Value to use: "Player2"
    -This will assign the first serve in the game to player 2.
    -Default: Player 1 has the first serve in the game.

--"player1"--

    -This sets the name of player 1. Max characters allowed is 13.
    -Default: Player 1

--"player2"--

    -This sets the name of player 2. Max characters allowed is 13.
    -Default: Player 2

---Customize with colors---

-There is 16 different colors that can be customized to create a different colorscheme. these values are:

    --main-text-color:
    --table-color:
    --table-lines:
    --table-text-color:
    --settings-color:
    --settings-text-color:
    --form-text-color:
    --form-background-color:
    --background-color:
    --scoreboard-background:
    --points-color:
    --set-color:
    --reset-button-colo:
    --reset-button-hover:
    --reset-button-text:
    --color-blink:

-I have included a second color-scheme in the style.css file. If the body of the HTML file is given the class "tennis-green", the component will have another color-scheme.

-Sources:
