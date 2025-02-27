<template>
    <div>
        <Plotly :data="plotyData" :layout="plotyLayout" :display-mode-bar="false"></Plotly>
    </div>
</template>
</template>
<script lang="ts">
import { Plotly } from 'vue-plotly'
import { Component, Mixins, Prop, Watch, Vue } from 'vue-property-decorator'


@Component({
    components: {
        Plotly
    }
})
export default class PlotlyChart extends Vue {
    @Prop({ type: Array, default: () => [] })
    plotyData: any

    @Prop({ type: Object })
    plotyLayout: any
}
</script>