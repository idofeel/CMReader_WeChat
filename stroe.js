import { data as home, mapMutations } from './model/home'
import { data as menus, mapMenusMutations } from './model/Menus'

export default {
	data: {
		home,
		menus,
	},
	home: {
		...mapMutations
	},
	menus: {
		...mapMenusMutations
	}
}