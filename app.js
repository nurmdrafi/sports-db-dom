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
        const {strPlayer, strNationality, strHeight} = player;
        console.log(strPlayer, strNationality, strHeight);
        
    }
}