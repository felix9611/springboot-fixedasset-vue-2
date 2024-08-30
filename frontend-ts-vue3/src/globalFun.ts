import App from './App.vue'
import { createApp } from 'vue'

const app = createApp(App).mixin({
	methods: {
		hasAuth(perm: string) {
			var authority = this.$store.state.permList

			return authority.indexOf(perm) > -1
		}
	}
})