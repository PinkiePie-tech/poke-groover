export const state = () => ({
  pokeTypeSelected: [],
  pokeAbilitySelected: [],
  pokeNameSelected: ''
})

export const mutations = {
  filterTypePokemon (state, type) {
    state.pokeTypeSelected = [...type]
  },
  filterAbilityPokemon (state, ability) {
    state.pokeAbilitySelected = [...ability]
  },
  filterNamePokemon (state, name) {
    state.pokeNameSelected = name
  }
}
