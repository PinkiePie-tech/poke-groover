<template>
  <section class="section">
    <header>
      <filter-poke
        :poke-type="pokeType"
        :poke-ability="pokeAbility"
      />
    </header>
    <div
      v-for="pokemonLine in pokeAll"
      :key="pokemonLine.key"
      class="columns is-mobile"
    >
      <card
        v-for="pokemon in pokemonLine.value"
        :key="pokemon.id"
        :title="pokemon.name"
        :icon="pokemon.sprites.front_default"
      >
        <poke-ability
          v-for="ability in pokemon.abilities"
          :key="ability.ability.name"
          :comp-slot="ability.slot"
          :comp-name="ability.ability.name"
        />
      </card>
    </div>
  </section>
</template>

<script>
import axios from '~/plugins/axios'
import Card from '~/components/Card'
import PokeAbility from '~/components/PokeAbility'
import FilterPoke from '~/components/FilterPoke'

export default {
  name: 'HomePage',
  components: {
    Card,
    FilterPoke,
    PokeAbility
  },
  asyncData (context) {
    const getType = axios.get('/type').then((res) => {
      return res.data.results.map((value) => {
        return {
          name: value.name
        }
      })
    })
    const getAbility = axios.get('/ability').then((res) => {
      return res.data.results.map((value) => {
        return {
          name: value.name
        }
      })
    })
    const getAll = axios.get('/pokemon?limit=150&offset=0').then((res) => {
      const getDetails = res.data.results.map((value) => {
        return axios.get(value.url).then((pokeDetail) => {
          return pokeDetail.data
        })
      })
      return Promise.all(getDetails).then((result) => {
        return result
      })
    })
    return Promise.all([
      getType,
      getAbility,
      getAll
    ]).then((response) => {
      const pokeAll = response[2].slice(0, 25)
      const chunk = []
      while (pokeAll.length > 0) {
        chunk.push({
          key: chunk.length,
          value: pokeAll.splice(0, 5)
        })
      }
      return {
        pokeType: response[0],
        pokeAbility: response[1],
        pokeAll: chunk
      }
    }).catch((error) => {
      context.error(new Error(error))
      Promise.reject(error)
    })
  }
}
</script>
