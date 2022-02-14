import Vue from 'vue'

Vue.mixin({
	methods: {
		hasAuth(perm: string) {
			var authority = this.$store.state.permList

			return authority.indexOf(perm) > -1
		}
	}
})