<template>
  <div v-if="isExternal" :style="styleExternalIcon" class="svg-external-icon svg-icon" v-on="$listeners" />
  <svg v-else :class="svgClass" aria-hidden="true" v-on="$listeners">
    <use :href="iconName" />
  </svg>
</template>

<script lang="ts">
import { isExternal } from '@/utils/validate'

export default {
  name: 'SvgIcon',
  props: {
    iconClass: {
      type: String,
      required: true
    },
    className: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      svgClass: '',
      styleExternalIcon: {},
      iconName: '',
      isExternal: ''
    }
  },
  created() {
    this.isExternal = this.getIsExternal()
    this.iconName = this.getIconName()
    this.svgClass = this.getSvgClass()
    this.styleExternalIcon = this.getStyleExternalIcon()
  },
  methods: {
    getIsExternal() {
      isExternal(this.iconClass)
    },
    getIconName() {
      return `#icon-${this.iconClass}`
    },
    getSvgClass() {
        if (this.className) {
          return 'svg-icon ' + this.className
        } else {
          return 'svg-icon'
        }
    },

    getStyleExternalIcon() {
        return {
          mask: `url(${this.iconClass}) no-repeat 50% 50%`,
          '-webkit-mask': `url(${this.iconClass}) no-repeat 50% 50%`
        }
    }
  }
}
</script>

<style scoped>
.svg-icon {
  width: 1em;
  height: 1em;
  vertical-align: -0.15em;
  fill: currentColor;
  overflow: hidden;
}

.svg-external-icon {
  background-color: currentColor;
  mask-size: cover!important;
  display: inline-block;
}
</style>
