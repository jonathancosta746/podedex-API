//requisição da API

const pokeApi = {}


// Buscando o detalhe de cada pokemon, fazendo um fetch na url do pokemon especifico que é recebido na lista, e convertendo essa resposta em json
pokeApi.getPokemonDetail = (pokemon) => {
    return fetch(pokemon.url)
        .then((response) => response.json())
}

pokeApi.getPokemons = (offset = 0, limit = 10) => {
    const url = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`


    
    return fetch(url) //requisicao de url
        .then((response) => response.json()) //conversao da resposta em json
        .then((jsonBody) => jsonBody.results) //filtragem do json para obtermos apenas os resultados
        .then((pokemons) => pokemons.map(pokeApi.getPokemonDetail)) // mapeando a lista de pokemons em uma lista de requisição dos detalhes de cada pokemon
        .then((detailRequests) => Promise.all(detailRequests)) //aguardar todas as requisições terminarem
        .then((pokemonsDetails) => pokemonsDetails)
}