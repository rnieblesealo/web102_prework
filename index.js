/*****************************************************************************
 * Challenge 2: Review the provided code. The provided code includes:
 * -> Statements that import data from games.js
 * -> A function that deletes all child elements from a parent element in the DOM
*/

import GAMES_DATA from './games.js';

const GAMES_JSON = JSON.parse(GAMES_DATA)

function deleteChildElements(parent) {
  while (parent.firstChild) {
    parent.removeChild(parent.firstChild);
  }
}

/*****************************************************************************
 * Challenge 3: Add data about each game as a card to the games-container
 * Skills used: DOM manipulation, for loops, template literals, functions
*/

const gamesContainer = document.getElementById("games-container");

function addGamesToPage(games) {
  for (var i = 0; i < games.length; ++i) {
    const game = games[i]

    const newDiv = document.createElement("div")
    newDiv.classList.add("game-card")

    const img = document.createElement("img")
    img.src = `${game.img}`
    img.classList.add("game-img")
    newDiv.appendChild(img)

    const desc = document.createElement("p")
    desc.innerHTML = `${game.description}`
    newDiv.appendChild(desc)

    const backers = document.createElement("p")
    backers.innerHTML = `<b>${game.backers} backers</b>`
    newDiv.appendChild(backers)

    const goal = document.createElement("p")
    goal.innerHTML = `$${game.pledged.toLocaleString("en-US")} pledged out of $${game.goal.toLocaleString("en-US")} goal`
    goal.classList.add(`${game.pledged >= game.goal ? "funded" : "unfunded"}`)
    newDiv.appendChild(goal)

    gamesContainer.appendChild(newDiv)
  }
}

addGamesToPage(GAMES_JSON)

/*************************************************************************************
 * Challenge 4: Create the summary statistics at the top of the page displaying the
 * total number of contributions, amount donated, and number of games on the site.
 * Skills used: arrow functions, reduce, template literals
*/

// Contribution card
const contributionsCard = document.getElementById("num-contributions");

const totalContributions = GAMES_JSON.reduce((acc, game) => {
  return acc + game.backers
}, 0)

contributionsCard.innerHTML = `${totalContributions.toLocaleString("en-US")}`

// Raised card
const raisedCard = document.getElementById("total-raised");

const totalRaised = GAMES_JSON.reduce((acc, game) => {
  return acc + game.pledged
}, 0)

raisedCard.innerHTML = `${totalRaised.toLocaleString("en-US")}`

// Games card
const gamesCard = document.getElementById("num-games");

gamesCard.innerHTML = `${GAMES_JSON.length}`

/*************************************************************************************
 * Challenge 5: Add functions to filter the funded and unfunded games
 * total number of contributions, amount donated, and number of games on the site.
 * Skills used: functions, filter
*/

function filterUnfundedOnly() {
  deleteChildElements(gamesContainer);

  const unfunded = GAMES_JSON.filter((game) => {
    return game.pledged < game.goal
  })


  addGamesToPage(unfunded)
}

function filterFundedOnly() {
  deleteChildElements(gamesContainer);

  const funded = GAMES_JSON.filter((game) => {
    return game.pledged >= game.goal
  })


  addGamesToPage(funded)
}

function showAllGames() {
  deleteChildElements(gamesContainer);

  addGamesToPage(GAMES_JSON)
}

const unfundedBtn = document.getElementById("unfunded-btn");
unfundedBtn.addEventListener("click", filterUnfundedOnly)

const fundedBtn = document.getElementById("funded-btn");
fundedBtn.addEventListener("click", filterFundedOnly)

const allBtn = document.getElementById("all-btn");
allBtn.addEventListener("click", showAllGames)

/*************************************************************************************
 * Challenge 6: Add more information at the top of the page about the company.
 * Skills used: template literals, ternary operator
*/

const totalAmount = GAMES_JSON.reduce((acc, game) => {
  return acc + game.pledged
}, 0).toLocaleString("en-US");

const totalGames = GAMES_JSON.length

const unfundedAmt = GAMES_JSON.filter((game) => {
  return game.pledged < game.goal
}).length

const displayStr = `
A total of <b>$${totalAmount}</b> has been raised for <b>${totalGames} ${totalGames > 1 ? "games" : "game"}</b>. 
Currently, <b>${unfundedAmt} ${unfundedAmt > 1 ? "games remain" : "game remains"} unfunded</b>. 
We need your help to fund these amazing games!`

const displayP = document.createElement("p")

displayP.innerHTML = displayStr

const descriptionContainer = document.getElementById("description-container");

descriptionContainer.appendChild(displayP)

/************************************************************************************
 * Challenge 7: Select & display the top 2 games
 * Skills used: spread operator, destructuring, template literals, sort 
 */

const firstGameContainer = document.getElementById("first-game");
const secondGameContainer = document.getElementById("second-game");

const sortedGames = GAMES_JSON.sort((item1, item2) => {
  return item2.pledged - item1.pledged;
});

const [firstGame, secondGame, ...rest] = sortedGames

const { name: firstGameName } = firstGame
const { name: secondGameName } = secondGame

const pFirstGame = document.createElement("p")

pFirstGame.innerHTML = `${firstGameName}`

firstGameContainer.appendChild(pFirstGame)

const pSecondGame = document.createElement("p")

pSecondGame.innerHTML = `${secondGameName}`

secondGameContainer.appendChild(pSecondGame)

// Extra: Search

const searchElement = document.getElementById("search-game")

function showSearchResults() {
  deleteChildElements(gamesContainer);

  const inputContent = searchElement.value.toLowerCase()

  // Search matches if game name contains search term, case-insensitive
  const searchMatches = GAMES_JSON.filter((game) => {
    return game.name.toLowerCase().includes(inputContent)
  })

  addGamesToPage(searchMatches)
}

searchElement.addEventListener("input", showSearchResults)
