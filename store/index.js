import axios from '~/plugins/axios'

export const state = () => ({
  pokeTypeSelected: [],
  pokeAbilitySelected: [],
  pokeNameSelected: ''
})

export const mutations = {
  filterTypePokemon (state, type) {
    state.pokemon.page = 1
    state.pokeTypeSelected = [...type]
  },
  filterAbilityPokemon (state, ability) {
    state.pokemon.page = 1
    state.pokeAbilitySelected = [...ability]
  },
  filterNamePokemon (state, name) {
    state.pokemon.page = 1
    state.pokeNameSelected = name
  },
  setListPokemon: (state, data) => {
    state.pokemon.list = [...data]
  },
  setDetailListPokemon: (state, data) => {
    state.pokemon.list = [...data]
  },
  showMore: (state) => {
    state.pokemon.page++
  }
}

export const modules = {
  pokemon: {
    state: () => ({
      list: [],
      page: 1
    })
  }
}

export const getters = {
  getList: (state) => {
    const show = state.pokemon.list
      .filter((pokemon) => {
        return state.pokeNameSelected.length === 0 ? true : pokemon.name.includes(state.pokeNameSelected)
      })
      .filter((pokemon) => {
        return state.pokeTypeSelected.length === 0 ? true : pokemon.types.find((types) => {
          return state.pokeTypeSelected.map(value => value.toLowerCase()).includes(types.type.name)
        })
      })
      .filter((pokemon) => {
        return state.pokeAbilitySelected.length === 0 ? true : pokemon.abilities.find((abilities) => {
          return state.pokeAbilitySelected.map(value => value.toLowerCase()).includes(abilities.ability.name)
        })
      })
      .slice(0, state.pokemon.page * 25)
    const chunk = []
    while (show.length > 0) {
      chunk.push({
        key: chunk.length,
        value: show.splice(0, 5)
      })
    }
    return chunk
  }
}

export const actions = {
  nuxtServerInit ({ commit }) {
    return axios.get('/pokemon?limit=250&offset=0').then((res) => {
      const getDetails = res.data.results.map((value) => {
        return axios.get(value.url).then((pokeDetail) => {
          return pokeDetail.data
        })
      })
      return Promise.all(getDetails).then((result) => {
        commit('setDetailListPokemon', result.map((value) => {
          return {
            id: value.id,
            name: value.name,
            sprites: value.sprites,
            abilities: value.abilities,
            types: value.types
          }
        }))
      })
    })
  }
}
