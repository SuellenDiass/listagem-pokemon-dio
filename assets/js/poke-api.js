/***funçõe de manipulação do poke api */

const pokeApi = {}

function convertPokeApiDetailToPokemon(pokeDetail) {
    const pokemon = new Pokemon()
    pokemon.number = pokeDetail.id
    pokemon.name = pokeDetail.name

    const types = pokeDetail.types.map((typeSlot) => typeSlot.type.name)
    
    const [type] = types;
    pokemon.types = types;
    pokemon.type = type;
    pokemon.photo = pokeDetail.sprites.other.dream_world.front_default;

    return pokemon
}

/**requisiçao detalhes pokemons */
pokeApi.getPokemonDetail = (pokemon) => {
    return fetch(pokemon.url)
        .then((response) => response.json())
        .then(convertPokeApiDetailToPokemon)
}
/**limita a paginação, quantidade pokemons limit=5 */
pokeApi.getPokemons = (offset = 0, limit = 5) => {
    const url = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`

    return fetch(url) /***solicitando a lista pokemon */
        .then((response) => response.json())/**devolve htp response para json */
        .then((jsonBody) => jsonBody.results)/**devolve lisa pokemon */
        .then((pokemons) => pokemons.map(pokeApi.getPokemonDetail))/**converteu lista pokemon em uma nova lista requisições de detalhes  */
        .then((detailRequests) => Promise.all(detailRequests))/**lista de json de detalhes */
        .then((pokemonsDetails) => pokemonsDetails)
}
