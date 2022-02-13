import Vue from 'vue'

Vue.mixin({
	methods: {
		hasAuth(perm: any) {
			var authority = this.$store.state.permList

			return authority.indexOf(perm) > -1
		}
	}
})