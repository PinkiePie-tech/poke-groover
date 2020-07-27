export const state = () => ({
  filter: {
    pokeTypeSelected: [],
    pokeTypeAbility: [],
    namePokeSelected: ''
  }
})

export const mutations = {
  filterPokemon (type, ability, name) {
    state.filter = {
      pokeTypeSelected: type,
      pokeTypeAbility: ability,
      namePokeSelected: name
    }
  }
}
