const loadData = () =>{
    const searchField = document.getElementById('search-box');
    const searchText = searchField.value;
    const url = `https://www.thesportsdb.com/api/v1/json/2/searchplayers.php?p=${searchText}`
    fetch(url)
    .then(res => res.json())
    .then(data => displayData(data.player))
}

const displayData = (players) =>{
    for(const player of players){
        // console.log(player);
        const {strPlayer, strNationality, strHeight, strThumb, strDescriptionEN} = player;
        console.log(strPlayer, strNationality, strHeight);

        // players container
        const playersContainer = document.getElementById('players-container');
        const div = document.createElement("div");
        div.innerHTML = `
        <div class="col">
                    <div class="card">
                        <img src="${strThumb}" class="card-img-top" alt="..." style="height: 300px;>
                        <div class="card-body">
                            <h3 class="card-title">${strPlayer}</h3>
                            <h4>${strNationality}</h4>
                            <h5>${strHeight}</h5>
                            <p class="card-text">${strDescriptionEN.slice(1, 200)}</p>
                            <a href="#" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">Details</a>
                        </div>       
                    </div>
                </div>
        `
        playersContainer.appendChild(div);
    }
}