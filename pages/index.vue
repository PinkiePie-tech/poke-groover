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
    <footer>
      <b-button
        type="is-primary"
        expanded
        @click="showMore"
      >
        Voir plus
      </b-button>
    </footer>
  </section>
</template>

<script>
import { mapGetters } from 'vuex'
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
    const getType = axios.get('/type?limit=200').then((res) => {
      return res.data.results.map((value) => {
        return {
          name: value.name
        }
      })
    })
    const getAbility = axios.get('/ability?limit=200').then((res) => {
      return res.data.results.map((value) => {
        return {
          name: value.name
        }
      })
    })
    return Promise.all([
      getType,
      getAbility
    ]).then((response) => {
      return {
        pokeType: response[0],
        pokeAbility: response[1]
      }
    }).catch((error) => {
      context.error(new Error(error))
      Promise.reject(error)
    })
  },
  computed: {
    ...mapGetters({
      pokeAll: 'getList'
    })
  },
  methods: {
    showMore () {
      this.$store.commit('showMore')
    }
  }
}
</script>
