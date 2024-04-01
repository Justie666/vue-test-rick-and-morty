<script setup lang="ts">
import { onMounted, ref, watch } from 'vue'
import { Characters } from './@types/api'
import CharactersItem from './components/CharactersItem.vue'

const characters = ref<Characters | null>(null)
const page = ref<number>(1)
const name = ref<string>('')
const status = ref<string>('')

const applyFilters = () => {
	page.value = 1
	fetchCharacters()
}

const optionsForStatus = [
	{ title: 'Status', value: '' },
	{ title: 'Alive', value: 'alive' },
	{ title: 'Dead ', value: 'dead ' },
	{ title: 'Unknown ', value: 'unknown ' }
]

const fetchCharacters = async () => {
	const response = await fetch(
		`https://rickandmortyapi.com/api/character/?page=${page.value}&name=${name.value}&status=${status.value}`
	)
	console.log(`https://rickandmortyapi.com/api/character/?page=${page.value}`)
	const data = await response.json()
	characters.value = data as Characters
}

watch(page, fetchCharacters)
onMounted(fetchCharacters)
</script>

<template>
	<div class="filter">
		<input type="text" v-model="name" placeholder="Search" />
		<select v-model="status">
			<option v-for="option in optionsForStatus" :value="option.value">
				{{ option.title }}
			</option>
		</select>
		<button @click="applyFilters">Apply</button>
		<div>
			<button :disabled="page < 2" @click="page--">prev</button>
			{{ page }}
			<button :disabled="characters?.info.next == null" @click="page++">
				next
			</button>
		</div>
	</div>
	<div class="characters__list" v-if="characters?.results">
		<CharactersItem
			v-for="character in characters.results"
			:character="character" />
	</div>
</template>

<style scoped>
.filter {
	margin-bottom: 40px;
}
.characters__list {
	display: grid;
	grid-template-columns: repeat(2, 1fr);
	grid-column-gap: 40px;
	grid-row-gap: 20px;
}
</style>
