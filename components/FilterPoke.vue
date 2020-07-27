<template>
  <div class="filter">
    <b-field class="filter-input">
      <b-input v-model="namePokeSelected" placeholder="Renseignez le nom de votre pokémon" />
    </b-field>
    <b-dropdown
      v-model="pokeTypeSelected"
      class="filter-button"
      multiple
    >
      <button
        slot="trigger"
        class="button is-primary filter-input-button"
        type="button"
      >
        <span class="filter-input-button-text">{{ pokeTypeSelected.length > 0 ? pokeTypeSelected.join(", ") : "Type" }}</span>
        <b-icon icon="menu-down" />
      </button>
      <b-dropdown-item
        v-for="option in pokeType"
        :key="option.name"
        :value="option.name.charAt(0).toUpperCase() + option.name.slice(1)"
        aria-role="listitem"
      >
        {{ option.name.charAt(0).toUpperCase() + option.name.slice(1) }}
      </b-dropdown-item>
    </b-dropdown>
    <b-dropdown
      v-model="pokeTypeAbility"
      class="filter-button"
      multiple
    >
      <button
        slot="trigger"
        class="button is-primary filter-input-button"
        type="button"
      >
        <span class="filter-input-button-text">{{ pokeTypeAbility.length > 0 ? pokeTypeAbility.join(", ") : "Type" }}</span>
        <b-icon icon="menu-down" />
      </button>
      <b-dropdown-item
        v-for="option in pokeAbility"
        :key="option.name"
        :value="option.name.charAt(0).toUpperCase() + option.name.slice(1)"
        aria-role="listitem"
      >
        {{ option.name.charAt(0).toUpperCase() + option.name.slice(1) }}
      </b-dropdown-item>
    </b-dropdown>
  </div>
</template>

<style>
  .filter {
    display: flex;
  }

  .filter-input {
    flex: 2;
    margin-right: 10px;
    display: block;
  }

  .filter-button {
    flex: 1;
    max-width: 25%;
    display: block;
  }

  .filter-input-button {
    width: 100%;
    margin-right: 10px;
  }

  .filter-input-button-text {
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
</style>

<script>
export default {
  props: ['pokeType', 'pokeAbility'],
  data () {
    return {
      pokeTypeSelected: [],
      pokeTypeAbility: [],
      namePokeSelected: ''
    }
  }
}
</script>
