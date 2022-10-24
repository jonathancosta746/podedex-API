//requisição da API

const pokeApi = {}

function convertPokeApiDetailToPokemon(pokeDetail) {
    const pokemon = new Pokemon()
    pokemon.name = pokeDetail.name
    pokemon.number = pokeDetail.order

    const types = pokeDetail.types.map((typeSlot) => typeSlot.type.name)
    const [type] = types

    pokemon.types = types
    pokemon.type = type

    pokemon.photo = pokeDetail.sprites.other.dream_world.front_default 

    return pokemon
}

// Buscando o detalhe de cada pokemon, fazendo um fetch na url do pokemon especifico que é recebido na lista, e convertendo essa resposta em json
pokeApi.getPokemonDetail = (pokemon) => {
    return fetch(pokemon.url)
        .then((response) => response.json())
        .then(convertPokeApiDetailToPokemon)
}

pokeApi.getPokemons = (offset = 0, limit = 12) => {
    const url = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`

    return fetch(url) //requisicao de url
        .then((response) => response.json()) //conversao da resposta em json
        .then((jsonBody) => jsonBody.results) //filtragem do json para obtermos apenas os resultados
        .then((pokemons) => pokemons.map(pokeApi.getPokemonDetail)) // mapeando a lista de pokemons em uma lista de requisição dos detalhes de cada pokemon
        .then((detailRequests) => Promise.all(detailRequests)) //aguardar todas as requisições terminarem
        .then((pokemonsDetails) => pokemonsDetails)
}