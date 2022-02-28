/* 
// Important
1. For checking purpose use html value="something" attribute ✔
2. Clear input value >>> input.value = ""; ✔
3. Clear previous HTML content >>> parentElement.textContent = ""; ✔
4. Get id of each result from fetch data and pass to new fetch url where get data by id 
    >>> <button onclick="function('${id}')"></button> [id must be string][follow quotation syntax] ✔
5. img.src == "null" replaced ❌
6. full length data not showing on display [working...][✔ text-ellipsis][❌ slice()]
*/

// Load Players API

  const loadPlayers = () => {
    const searchField = document.getElementById("search-box");
    const searchText = searchField.value;
    searchField.value = ""; // clear search input
    const url = `https://www.thesportsdb.com/api/v1/json/2/searchplayers.php?p=${searchText}`;

    /* const res = await fetch(url);
    const data = await res.json();
    displayPlayers(data.player); */
    
      // Normal Fetch (without Async Await)
          fetch(url)
          .then(res => res.json())
          .then(data => displayPlayers(data.player))
          .catch(error => console.log(error))
  };

// Display Players Card
const displayPlayers = (players) => {
  const playersContainer = document.getElementById("players-container");
  playersContainer.textContent = ""; // clear previous result
  console.log(players, players.length);
  for (const player of players) {
    const {
      idPlayer,
      strPlayer,
      strGender,
      strNationality,
      strThumb,
      strDescriptionEN,
    } = player;
    console.log(strThumb);

    // Create New Element Based on Search Result
    const div = document.createElement("div");
    div.innerHTML = `
        <div class="col">
                    <div class="card h-100">
                        <img src="${strThumb}" class="card-img-top w-50 mx-auto" alt="...">
                        <div class="card-body text-center">
                            <h3 class="card-title">Name: ${strPlayer}</h3>
                            <h4>Country: ${strNationality}</h4>
                            <h5>${strGender}</h5>
                            <p class="card-text text-ellipsis">${strDescriptionEN}</p>
                            <a href="#" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#player-details"  onclick="loadPlayerDetails('${idPlayer}')">Details</a>
                        </div>       
                    </div>
                </div>
        `;
    // Replace images if null
    const images = document.getElementsByTagName("img");
    for (const img of images) {
      const src = img.getAttribute("src");
      if (src === "null" && strGender === "Male") {
        img.src = "img/placeholder-male.jpg";
      } else if (src === "null" && strGender === "Female") {
        img.src = "img/placeholder-female.jpg";
      }
    }

    playersContainer.appendChild(div);
  }
};

// Load Player Details
const loadPlayerDetails = (idPlayer) => {
  // "idPlayer" parameter received from Details button
  const playerDetailsUrl = `https://www.thesportsdb.com/api/v1/json/2/lookupplayer.php?id=${idPlayer}`;
  fetch(playerDetailsUrl)
    .then((res) => res.json())
    // .then((data) => console.log(data));
    .then((data) => showPlayerDetails(data.players[0]));
};

// Show Player Details
const showPlayerDetails = (info) => {
  const details = document.getElementById("details");
  const playerDetails = document.createElement("div");
  playerDetails.innerHTML = `
    <h1>${info.strPlayer}</h1>
    <h2>${info.strNationality}</h2>
`;
  details.appendChild(playerDetails);
};

// Clear Player Details
const clearPlayerDetails = () => {
  const details = document.getElementById("details");
  details.textContent = "";
};
