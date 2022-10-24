const pokemonList = document.getElementById('pokemonList')
const loadMoreButton = document.getElementById('loadMoreButton')

function convertPokemonToLi(pokemon) {
    return `
        <li class="pokemon ${pokemon.type}">
            <span class="number">#${pokemon.number}</span>
            <span class="name">${pokemon.name}</span>
            <div class="detail">
                <ol class="types">
                    ${pokemon.types.map((type) => `<li class="type">${type}</li>`).join('')}
                </ol>
                <img src="${pokemon.photo}" alt="${pokemon.name}">
            </div>
        </li>
    `
}

pokeApi.getPokemons().then((pokemons = []) => {

    const newHtml = pokemons.map(convertPokemonToLi).join('')
    // fazer  map da lista de pokemons, onde cada item do map irá assionar o convertPokemonToLi, vazendo um join para que todos li sejam inseridos todos de uma unica vez no html melhorando a perfomace
    pokemonList.innerHTML = newHtml
})


