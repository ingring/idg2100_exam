
export class Scoreboard extends HTMLElement{
    static get observedAttributes() {
        return ['settings', 'player1', 'player2'];
      }
    constructor(){
        super();
        this.shadow = this.attachShadow({ mode: "open"});
        
        this.exampleAttribute = this.getAttribute('settings');
        //keeps the official results of the game
        this.gameScore = {
            player1: [],
            player2: []
        };

        //match settings:
        this.serveRotation = 2; 
        this.matchSets = 5;

        //checks if it should be possible to add points
        this.gameActive = true;
        this.player1 = {
            set: 0,
            points: 0,
            name: 'Player1',
            scores: []
        }
        this.player2 = {
            set: 0,
            points: 0,
            name: 'Player2',
            scores: []
        }

        //if player one starts the first set
        this.p1ToStart = true;

        //gets html attributes
        this.getAttributes();
        
        //changes player names and hides settings + how to use
        this.implementAttributes();

        //sets fontsize according to window width
        this.fontSize = 1;
        this.fontSize = this.setFontSize();

        this.render();
        
        //declares html elements and eventlisteners
        this._declare();

        window.addEventListener('resize', this.setWidth.bind(this));
        document.addEventListener('testingEvent', this.readForm.bind(this));
    
    }

    attributeChangedCallback(name, oldValue, newValue) {
        if (name === 'settings') {
            this.hideSettings = true;
        }
        if (name === 'player1') {
            this.player1.name = newValue;
        }
        if (name === 'player2') {
            this.player2.name = newValue;
        }

        this.implementAttributes();
        
        this.render();
        this._declare();
    }
    

    getAttributes(){
        //get attributes from html and verify the value
       
    }

    //checks whitch player has serve (assign it to _getContent)
    whoToServe(htmlClass){
        if(htmlClass === "p1Serve") {
            if(this.p1ToStart) return htmlClass;
            else return "";
        }
        if(htmlClass === "p2Serve") {
            if(!this.p1ToStart) return htmlClass;
            else return "";
        }
        
    }

    implementAttributes(){
        //setting the names to empty strings
        if(this.hidePlayers) {
            this.player1.name = "";
            this.player2.name = "";
        }

        //hide settings if settings is disabled
        if(this.hideSettings) {
            this.settingClass ="hidden";
            this.resetBtnBorder = "1em 1em 0 0";
            this.resetBtnPadding = '0.5em 1.1em 0.2em';
        } else {
            this.resetBtnBorder = "";
            this.resetBtnPadding = "0.5em 0.6em 0.2em";
        }

    }

    setFontSize() {
        //sets fontsize based on window width
        this.windowWidth = window.innerWidth;
        let fontSize = 1;
        if (this.windowWidth < 460) {
            fontSize = 0.5;
          } else if (this.windowWidth < 500) {
            fontSize = 0.6;
          }else if (this.windowWidth < 600) {
            fontSize = 0.7;
          }
            else if (this.windowWidth < 700) {
                fontSize = 0.75;
          } else if (this.windowWidth < 800) {
            fontSize = 0.8;
          } else if (this.windowWidth < 900) {
            fontSize = 0.9;
          }

          return fontSize;
    }

    //resets match from the from, so this method also closes the form
    resetFromForm(){
        this.resetMatch();
        this.toggleSettings();
    }

    resetMatch(){
        //Setting scores to 0 and adding it to the HTML
        this.htmlUpdate(this.player1.pointsHTML, 0); 
        this.player1.points = 0;
        this.htmlUpdate(this.player2.pointsHTML,  0);  
        this.player2.points = 0;
        
        //if sets visibility is not turned off(show sets)
        if(!this.hideSets) {
            this.htmlUpdate(this.player1.setHTML,  0);
            this.htmlUpdate(this.player2.setHTML,  0);
        }
        this.player1.set = 0;
        this.player2.set = 0;
        this.gameActive = true;
        this.p1ToStart = true;

        this.gameScore = {
            player1: [],
            player2: []
        };

        this.player1.scores = [];
        this.player2.scores = [];

        //removing the results of the game from the html
        while (this.player1.results.children.length > 1) {
            this.player1.results.removeChild(this.player1.results.lastChild); // remove the last child element until only the first child remains
        }
        while (this.player2.results.children.length > 1) {
        this.player2.results.removeChild(this.player2.results.lastChild); // remove the last child element until only the first child remains
        }
        this.player1.nameHTML.innerHTML = this.player1.name;
        this.player2.nameHTML.innerHTML = this.player2.name;
    }

    readForm(){
        //get values from the form, and parsing the numbers to int
        const p1form = this.shadow.getElementById("p1form").value;
        const p2form = this.shadow.getElementById("p2form").value;
        const sets = this.shadow.getElementById("setsform").value;
        const intSets = parseInt(sets);
        const serve = this.shadow.getElementById("serveform").value;
        const intServe = parseInt(serve);

        //If the name exists and is shorter than 13ch
        if((p1form) && (p1form.length < 13)) {
            this.player1.name = p1form;
            this.htmlUpdate(this.player1.nameHTML, p1form);
        }
        if((p2form) && (p2form.length < 13)) {
            this.player2.name = p2form;
            this.htmlUpdate(this.player2.nameHTML, p2form);
        }

        //if chosen sets is any of these values and not the same as old value
        if(this.validateBestOf(intSets)) {
            this.matchSets = intSets;
        }

        if(this.validateServeRot(intServe)) {
            this.serveRotation = intServe;
        }

        //close form
        this.toggleSettings();
    }

    htmlUpdate(html, newValue){
        html.innerHTML = newValue;
    }

    viewResults(player, id){
        
        let template = `
        <div class="${id}Results results">
            <p id="${id}name">${player.name}</p>
        `
        if(player.scores.length > 0) {
            let scores ="";
            player.scores.forEach(element => {
                scores += `<p>${element}</p>`
            });
            template += scores;
        }
        template += '</div>';
        
        return template;
    }


    render(){
        this.shadow.innerHTML = this._getContent();
    }

    _p1Point(){
        if(!this.gameActive) return;
        this.player1.points += 1;
        //update HTML if the 
        this.player1.pointsHTML.innerHTML = this.player1.points;
        if(this.player1.points > 10) this.checkWin();
        this.toServe();
    }

    
    p2Point(){
        if(!this.gameActive) return;
        this.player2.points += 1;
        this.player2.pointsHTML.innerHTML = this.player2.points; 
        if(this.player2.points > 10) this.checkWin();
        this.toServe();
    }



    checkWin(){
        //if the score is not equal
        if(this.player1.points !== this.player2.points){
            //send to verifySet to see is the set is over, sending it with the leaders as the first arguement, and other player as the 2nd
            if(this.player1.points > this.player2.points) this.verifySet(this.player1, this.player2); 
            else this.verifySet(this.player2, this.player1);
        }
        
    }

    validateBestOf(setNr){
        //check if the suggested best of sets is valid
        if(([1, 3, 5, 7, 9].includes(setNr)) && (setNr !== this.matchSets)){
            return true;
        } else return false;
    }

    validateServeRot(serveRot) {
        //check if the attempted erverotaion is valid
        if(([1, 2, 3, 4].includes(serveRot)) && (serveRot !== this.serveRotation))  {
            return true;
        } else return false;
    }

    //if showset = "false" the set will show "-" instead of nr of sets
    //It was a design choice to keep it as "-" rather than removing the element
    dispaySet(player) {
        if(this.hideSets) return "-";
        else return player;
    }

    verifySet(leader, behind){
        //check if the set is over
        if(leader.set === '-') leader.set = 0;
        if (leader.points >= behind.points +2) leader.set ++;
        else return;
        
        //update the set unless sets is disabled 
        if(!this.hideSets) leader.setHTML.innerHTML = leader.set;

        //show previous sets unless disabled
        if(!this.hidePreviousSets) {
            const p = document.createElement('p')
            p.innerHTML = `${leader.points} - ${behind.points}`;
            leader.results.append(p);
            //store the results if the page is re-rendered
            leader.scores.push(`${leader.points} - ${behind.points}`);
            
        }
        this.gameScore.player1.push(this.player1.points);
        this.gameScore.player2.push(this.player2.points);

        //checks who should have the serve, and assigns it to the HTML
        if(this.p1ToStart) {
            this.player1.toServe.classList.remove('p1Serve');
            this.player2.toServe.classList.add('p2Serve');
        } else {
            this.player1.toServe.classList.add('p1Serve');
            this.player2.toServe.classList.remove('p2Serve');
        }

        this.p1ToStart = !this.p1ToStart;

        //resetting the score counter
        leader.points = 0;  behind.points = 0;
        
        //updating the points score (html)
        leader.pointsHTML.innerHTML = leader.points; 
        behind.pointsHTML.innerHTML = behind.points;

        

         //check if the game is over - and if so - assigning medal
         if(leader.set > (this.matchSets / 2)) {
            let winnerSymbol = document.createElement('span');
            winnerSymbol.innerHTML = '&#x1F3C5;';
            //making the winners-medal bigger
            winnerSymbol.style.fontSize = '1.5em';
            leader.nameHTML.appendChild(winnerSymbol);

            //sending the game - and stopping the counters
            this.sendGame();
            this.gameActive = false;
            return;
        }
    }

    sendGame(){
    let winner;
    let result = "";
    this.gameScore.player1.forEach((score, i) => {
        result += `(${score} - ${this.gameScore.player2[i]})`;
    });
    
        //with this if statement I can write the results of the sets in the correct order and format.
    if (this.player1.set > this.player2.set) {
        //I had an inefficient way to check if player name was unset, then use "player 1";
            //I asked chatGPT how to optimize that solution and it suggested this.
        winner = this.player1.name.trim() || 'Player 1';
    } else {
        winner = this.player2.name.trim() || 'Player 2';
    }
    
    //send out a custom event with the details of a finished game
    this.dispatchEvent(new CustomEvent("game-finished", {
        detail: {
            winner: winner,
            result: result,
            player1: this.player1.name.trim() || 'Player 1',
            player2: this.player2.name.trim() || 'Player 2'
        },
        bubbles: true
       
    }));
        
    }

    //finds out which player is going to serve
    toServe(){
        const serveCount = this.player1.points + this.player2.points;
        //if the count can be divided by the serverotation > change serve
        if((serveCount % this.serveRotation === 0) && (serveCount !== 0)) {
            this.player1.toServe.classList.toggle('p1Serve');
            this.player2.toServe.classList.toggle('p2Serve');

        }
    }


    _getStyles(){

        if (this.windowWidth > 800){
            this.parentWidth = this.windowWidth * 0.8;
        }else if(this.windowWidth > 600){
            this.parentWidth = this.windowWidth * 0.9;

        }else{
            this.parentWidth = this.windowWidth;

        }
        return`

        :host {
            font-size: ${this.fontSize}rem;
        }
        .button{
            cursor: pointer;
            display: flex;
            border: 0;
            align-items: end;
            position: relative;
        }
        .howto-text {
            position: absolute;
            width: 100%;
            left: 0em;
            top: 0em;
            font-size: 1.3em;
            margin-top: 0.5em;
        }
        #p2btn {
            justify-content: end;
        }
        #p2btn > div {
            transform: rotateY(180deg);
        }
        p {
            color: var(--table-text-color, white);
        }
        #container > * {
            background: var(--table-color, #3E83C4);
        }
        .score > div > * {
            position: relative;
        }
        .score > div{
            display: flex;
        }
        .score > p {
            text-align: center;
            font-size: 2em;
            margin: 0;
            font-weight: bold;
        }
        .score {
            display: grid;
            grid-template-columns: 1fr max-content;
            width: 100%;
            justify-content: center;
        }
        .points, .set {
            margin: 0;
            display: grid;
            place-items: center;
            background: var(--scoreboard-background, black);
        }
        .points {
            height: 6em;
            width: 6em;
            color: var(--points-color, white);
        }
        .points > span {
            font-size: 3em;
            font-weight: 600;
        }
        .set {
            height: 3.4em;
            width: 3.4em;
            color: var(--set-color, red);
        }
        .set > span {
            font-size: 1.5em;
            font-weight: 500;
        }
        #p1score > p {
            border-radius: 0% 0% 0% 30%;
        }
        #p2score > p {
            border-radius: 0% 0% 30% 0%;
        }
        #container {
            display: grid;
            grid-template-columns: 1fr 1fr;
            grid-template-rows: 1fr 1fr;
            gap: 0.5em;
            background-color: var(--table-lines, black);
            height: 100%;
            width: ${this.parentWidth}px;
        }

        .button:hover, .button:focus-visible {
            opacity: 0.8;
        }
        .p1Serve {
            background-image: url("../img/Untitled-1.svg");
            background-repeat: no-repeat;
            margin: 0 0 1em 1em;
        }
        .p2Serve {
            background-image: url("../img/Untitled-1.svg");
            background-repeat: no-repeat;
            margin: 0 0 1em 1em;
        }
        .results {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: start;
        }
        .results > p:nth-of-type(1){
            margin: 0.4em;
            font-size: 2em;
        }
        .results > p{
            margin: 0;
        }
        .button > div {
            width: 30%;
            height: 40%;
        }
        .p2section {
            grid-template-columns:max-content 1fr;
        }
        .settings {
            color: var(--settings-text-color, white);
            background: var(--settings-color, black);
            margin: 0;
            font-size: 1.2em;
            border: 0;
        }

        #settings{
            border-radius: 1em 0 0 0;
            padding: 0.5em 0.6em 0.2em 1.1em ;

        }

        #reset-main {
            padding: ${this.resetBtnPadding};
            color: red; 
            border-radius: ${this.resetBtnBorder};
        }

        #reset-main:hover, #reset-main:focus-visible  {
            color: white;
        }

        #how-to {
            border-radius: 0 1em 0 0;
            padding: 0.5em 1.1em 0.2em 0.6em ;
        }
        #reset {
            display: inline;
            background: var(--reset-button-color, red);
            color: var(--reset-button-text, white);
        }
        #reset:hover, #reset:focus-visible  {
            cursor: pointer;
            background-color: #8F0000;
        }
        #send {
            display: inline;
        }
        #send:hover, #send:focus-visible  {
            cursor: pointer;
            background-color: grey;
        }
        .settings:hover, .settings:focus-visible {
            background: var(--settings-hover-color, #3E83C4);
            cursor: pointer;
        }
        .btn-parent {
            width: 100%;
            display: flex;
            justify-content: center;
            position: relative;
            background-color: var(--background-color, #9b2c29);
        }
        form {
            position: absolute;
            top: 2.1em;
            padding: 1em;
            z-index: 1;
            color: var(--form-text-color, white);
            background: var(--form-background-color, black);
            border-radius: 1em;
        }
        input {
            display: block;
            margin: 0.2em 0 0.7em;
        }
        label > span {
            font-size: 0.8em;
        }
        .hidden {
            display: none;
        }
        #container > .blink {
            background-color: black;
        }
        `
    }

    _getContent(){
        return `
        <style>
        ${this._getStyles()}
        </style>
        <div class="btn-parent">
            <button class="settings ${this.settingClass}" id="settings">Settings</button>
            <form class="hidden" onsubmit="sendForm();return false">
                <label for="player1">Name for player 1</label>
                <input id="p1form" name="player1" maxlength="12" value="${this.player1.name}">
                <label for="player2">Name for player 2</label>
                <input id="p2form" name="player2" maxlength="12" value="${this.player2.name}">
                <label for="best-of">Best of (sets)? <span>(1, 3, 5, 7, 9)</span></label>
                <input id="setsform" type="name" pattern="[1,3,5,7,9]" value="${this.matchSets}"name="best-of">
                <label for="serve">Serve-rotation</label>
                <input id="serveform" type="number" value="${this.serveRotation}" min="1" max="4" name="serve">
                <input id="send" type="submit">
                <button type="button" id="reset">Reset match</button>
            </form>
            <button class="settings" id="reset-main">Reset game</button>
            <button class="settings ${this.settingClass}" id="how-to">How to use</button>
        </div>
        <div id="container">
            <div class="p1section score">
                    ${this.viewResults(this.player1, 'p1')}
                <div id="p1score">
                    <p class="set"><span id="p1set">${this.dispaySet(this.player1.set)}</span></p>
                    <p class="points"><span id="p1Points">${this.player1.points}</span></p>
                </div>
            </div>
            <div class="p2section score">
                <div id="p2score">
                    <p class="points"><span id="p2Points">${this.player2.points}</span></p>
                    <p class="set"><span id="p2set">${this.dispaySet(this.player2.set)}</span></p>
                </div>
                ${this.viewResults(this.player2, 'p2')}
            </div>
            <button tabindex="0" id="p1btn" class="button">
            <p id="howto-p1" class="howto-text hidden">Click here to add points to ${this.player1.name}</p>
                <div id="p1Serve" class="${this.whoToServe("p1Serve")}"></div>
            </button>
            <button id="p2btn" class="button" tabindex="0">
            <p id="howto-p2" class="howto-text hidden">Click here to add points to ${this.player2.name}</p>
                <div id="p2Serve" class="${this.whoToServe("p2Serve")}"></div>
            </button>
        </div>
        `
    }

    howToUse(){
        let count = 0;
        this.howToP1 = this.shadow.querySelector("#howto-p1");
        this.howToP1.classList.remove('hidden'); 
        this.howToP2 = this.shadow.querySelector("#howto-p2")
        this.howToP2.classList.remove('hidden'); 
        
        const interval = setInterval(() => {
            this.player1.section.style.backgroundColor = (this.player1.section.style.backgroundColor === 'var(--color-blink, black') ? '' : 'var(--color-blink, black';
            this.player2.section.style.backgroundColor = (this.player2.section.style.backgroundColor === 'var(--color-blink, black') ? '' : 'var(--color-blink, black';
            count++;
            if (count === 6) { 
                clearInterval(interval);
                this.player1.section.style.backgroundColor = '';
                this.player2.section.style.backgroundColor = ''; 
                this.howToP1.classList.add('hidden'); 
                this.howToP2.classList.add('hidden'); 
            }
    }, 500);

    }


    _declare(){
        //declare elements and listeners
        this.player1.section = this.shadow.querySelector('#p1btn');
        this.player1.section.addEventListener('click', this._p1Point.bind(this));
        this.player1.toServe = this.shadow.querySelector('#p1Serve');
        this.player1.results = this.shadow.querySelector('.p1Results');
        this.player1.pointsHTML = this.shadow.querySelector('#p1Points');
        this.player1.setHTML = this.shadow.querySelector('#p1set');
        this.player1.nameHTML = this.shadow.querySelector('#p1name');

        this.player2.section = this.shadow.querySelector('#p2btn');
        this.player2.section.addEventListener('click', this.p2Point.bind(this));
        this.player2.toServe = this.shadow.querySelector('#p2Serve');
        this.player2.results = this.shadow.querySelector('.p2Results');
        this.player2.pointsHTML = this.shadow.querySelector('#p2Points');
        this.player2.setHTML = this.shadow.querySelector('#p2set');
        this.player2.nameHTML = this.shadow.querySelector('#p2name');
        
        this.settings = this.shadow.querySelector('#settings');
        this.settings.addEventListener('click', this.toggleSettings.bind(this));
        this.form = this.shadow.querySelector("form");

        this.resetBtn = this.shadow.querySelector('#reset');
        this.resetMain = this.shadow.querySelector('#reset-main');
        this.howTo = this.shadow.querySelector('#how-to');

        this.resetBtn.addEventListener('click', this.resetFromForm.bind(this));
        this.resetMain.addEventListener('click', this.resetMatch.bind(this));
        this.howTo.addEventListener('click', this.howToUse.bind(this));
        
        

        // Get the parent element
        this.parent = document.querySelector('scoreboard-counter');
        this.container = this.shadow.querySelector('#container');
        this.btnparent = this.shadow.querySelector('.btn-parent')
        this.setWidth();
    }

    //Show/hide the setting-form
    toggleSettings(){
        this.form.classList.toggle('hidden');
    }

    

    // suggested solution to always have the componente in a 2:1 format by ChatGPT
    setWidth(){
        // Get the parent's dimensions
        let parentWidth
        if (this.windowWidth > 800){
            parentWidth = this.windowWidth * 0.8;
        }else if(this.windowWidth > 600){
            parentWidth = this.windowWidth * 0.9;

        }else{
            parentWidth = this.windowWidth;

        }
        let parentHeight = window.innerHeight *0.7
        //set width of container
        this.btnparent.style.width = `${parentWidth}px`
        this.container.style.width = `${parentWidth}px`;
        this.container.style.height = `${parentHeight}px`;

        //with this code I make sure I only re-render the page if i need
        const a = this.setFontSize();
        if(a !== this.fontSize) {
            this.fontSize = a;
            this.render();
            this._declare();
        }

    }
}

customElements.define("scoreboard-counter", Scoreboard);
