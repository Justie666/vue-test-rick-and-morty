<script setup lang="ts">
import { Character, Episode } from '../@types/api'
import { onMounted, ref } from 'vue'

const { character } = defineProps<{ character: Character }>()
const episode = ref<Episode | null>(null)

const fetchEpisode = async (url: string) => {
	const id = url.split('/').pop()
	const response = await fetch(`https://rickandmortyapi.com/api/episode/${id}`)
	const data = await response.json()
	episode.value = data as Episode
}

onMounted(() => fetchEpisode(character.episode[0]))
</script>

<template>
	<div class="character__container">
		<img :src="character.image" :alt="character.name" />
		<div>
			<h2>{{ character.name }}</h2>
			<p>Alive - {{ character.status }}</p>
			<div>
				<p>Last known location:</p>
				<p>{{ character.location.name }}</p>
			</div>
			<div v-if="episode">
				<p>First seen in:</p>
				<p>{{ episode.name }}</p>
			</div>
		</div>
	</div>
</template>

<style scoped>
.character__container {
	display: flex;
	gap: 10px;
	border-radius: 20px;
	overflow: hidden;
	background: #3c3e44;
}
</style>
