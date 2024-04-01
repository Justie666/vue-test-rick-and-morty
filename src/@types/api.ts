export interface Characters {
	info: Info
	results: Character[]
}

export interface ManyCharacter {
	data: Character[]
}

export interface Character {
	id: number
	name: string
	status: string
	species: string
	type: string
	gender: string
	origin: Origin
	location: Origin
	image: string
	episode: string[]
	url: string
	created: string
}

interface Origin {
	name: string
	url: string
}

interface Info {
	count: number
	pages: number
	next: null | string
	prev: null | string
}

export interface Episodes {
	info: Info
	results: Episode[]
}

export interface Episode {
	id: number
	name: string
	air_date: string
	episode: string
	characters: string[]
	url: string
	created: string
}
