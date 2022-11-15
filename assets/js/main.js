/**div class types cor de fundo pokemon */

const pokemonList = document.getElementById('pokemonList')
const loadMoreButton = document.getElementById('loadMoreButton')
/**quantidade maxima */
const maxRecords = 151
/**limite pokemon por pagina */
const limit = 50
/***busca começa do zero */
let offset = 0;


function convertPokemonToLi(pokemon) {
    return `
        <li class="pokemon ${pokemon.type}">
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
/*** */
/** fuction pega a lista de pokemons (nome e url) e getPokemons percorre a lista e retorna outra convertida para html e  transforma o array em uma só váriavel com o join para concatenar o html e renderizar de uma vez no DOM*/

function loadPokemonItens(offset, limit) {
    pokeApi.getPokemons(offset, limit).then((pokemons = []) => {
        const newHtml = pokemons.map(convertPokemonToLi).join('')
        pokemonList.innerHTML += newHtml
    })
}

loadPokemonItens(offset, limit)
/****quando clicar no botao loadmore */
loadMoreButton.addEventListener('click', () => {
    offset += limit
    const qtdRecordsWithNexPage = offset + limit

    if (qtdRecordsWithNexPage >= maxRecords) {
        const newLimit = maxRecords - offset
        loadPokemonItens(offset, newLimit)
/**botao loadmore some quando chega no limite de visualização da página */
        loadMoreButton.parentElement.removeChild(loadMoreButton)
    } else {
        loadPokemonItens(offset, limit)
    }
})

