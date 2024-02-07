const pokemonList = document.getElementById('pokemonList')
const pokemonDetail = document.getElementById('pokemon-details-modal')
const loadMoreButton = document.getElementById('loadMoreButton')

const maxRecords = 151
const limit = 10
let offset = 0;

function openDetail() {
    pokemonDetail.style.display = "flex";
}

function closeDetail() {
    pokemonDetail.style.display = "none";
}


function pokemonDetailCard(pokemon) {
    return `
        <div class="pokemon-details-container ${pokemon.types[0].type.name}">
            
            <div class="pokemon-info">                
                <div class="pokemon-details__image">
                    <img id="pokemonImage" src="${pokemon.sprites.other.dream_world.front_default}" alt="Pokemon Image">
                </div>
                <div class="pokemon-details__info">
                    <h2 id="pokemonName">${pokemon.name.toUpperCase()}</h2>
                    <p id="pokemonDescription">Pokemon Abilities</p>
                    <ul id="pokemonAbilities" class="pokemon-details__abilities">
                        <li>${pokemon.abilities[0].ability.name}</li>
                        <li>${pokemon.abilities[1].ability.name}</li>
                        
                    </ul>
                </div>
            </div>    
            <button id="closeButton" type="button" onclick="closeDetail()">
                Close X
            </button>    
        </div>
    `
}

function getDetail(pokemonName) {
    console.log(pokemonName);
    return fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`)
        .then((response) => response.json())
        .then((pokeDetail) => {
            console.log(pokeDetail);
            loadDetails(pokeDetail);
        })
}




function convertPokemonToLi(pokemon) {
    return `
        <li class="pokemon ${pokemon.type}" onclick="getDetail('${pokemon.name}')">
            <span class="number">#${pokemon.number}</span>
            <span class="name">${pokemon.name}</span>

            <div class="detail">
                <ol class="types">
                    ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
                </ol>

                <img src="${pokemon.photo}"
                     alt="${pokemon.name}">
            </div>
        </li>
    `
}

function loadDetails (pokemon) {
    pokemonDetail.innerHTML = pokemonDetailCard(pokemon);
    openDetail()
}

function loadPokemonItens(offset, limit) {
    pokeApi.getPokemons(offset, limit).then((pokemons = []) => {
        const newHtml = pokemons.map(convertPokemonToLi).join('')
        pokemonList.innerHTML += newHtml
    })
}

loadPokemonItens(offset, limit)

loadMoreButton.addEventListener('click', () => {
    offset += limit
    const qtdRecordsWithNexPage = offset + limit

    if (qtdRecordsWithNexPage >= maxRecords) {
        const newLimit = maxRecords - offset
        loadPokemonItens(offset, newLimit)

        loadMoreButton.parentElement.removeChild(loadMoreButton)
    } else {
        loadPokemonItens(offset, limit)
    }
})