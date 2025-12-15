<template>
    <div class="line-chart" :style="{ height: height + 'px' }">
        <canvas ref="canvas" :height="height"></canvas>
    </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount, watch } from 'vue'
import Chart from 'chart.js/auto'

const props = defineProps({
    // labels for the X axis
    labels: {
        type: Array,
        default: () => ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun']
    },
    // single-series data (ignored if `datasets` passed)
    data: {
        type: Array,
        default: () => [65, 59, 80, 81, 56, 55]
    },
    // optional multi-series: array of Chart.js dataset objects
    datasets: {
        type: Array,
        default: null
    },
    label: {
        type: String,
        default: 'Series'
    },
    borderColor: {
        type: String,
        default: '#3b82f6' // blue-500
    },
    backgroundColor: {
        type: String,
        default: 'rgba(59,130,246,0.12)'
    },
    // chart height in px
    height: {
        type: Number,
        default: 240
    },
    // extra Chart.js options to merge with defaults
    options: {
        type: Object,
        default: null
    }
})

const canvas = ref(null)
let chart = null

function createGradient(ctx, colour) {
    if (!ctx || !canvas.value) return colour
    const g = ctx.createLinearGradient(0, 0, 0, canvas.value.height || 200)
    // use provided colour at top and transparent at bottom
    g.addColorStop(0, colour)
    g.addColorStop(1, 'rgba(255,255,255,0)')
    return g
}

function buildDatasets() {
    if (props.datasets && props.datasets.length) {
        // shallow clone to allow mutation (e.g., replace backgroundColor with gradient)
        return props.datasets.map(ds => ({ ...ds }))
    }
    return [
        {
            label: props.label,
            data: props.data,
            borderColor: props.borderColor,
            backgroundColor: props.backgroundColor,
            fill: true,
            tension: 0.35,
            pointRadius: 3,
            pointHoverRadius: 5
        }
    ]
}

function buildOptions() {
    const base = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                display: true,
                position: 'top'
            },
            tooltip: {
                mode: 'index',
                intersect: false
            }
        },
        interaction: {
            mode: 'nearest',
            intersect: false
        },
        scales: {
            x: {
                display: true,
                grid: {
                    color: 'rgba(0,0,0,0.04)'
                }
            },
            y: {
                display: true,
                beginAtZero: true,
                grid: {
                    color: 'rgba(0,0,0,0.04)'
                }
            }
        }
    }
    if (props.options && typeof props.options === 'object') {
        // shallow merge: user options override base
        return Object.assign({}, base, props.options)
    }
    return base
}

function createChart() {
    if (!canvas.value) return
    const ctx = canvas.value.getContext('2d')
    const datasets = buildDatasets()

    // apply gradients where appropriate
    datasets.forEach(ds => {
        if (ds.backgroundColor && typeof ds.backgroundColor === 'string') {
            ds.backgroundColor = createGradient(ctx, ds.backgroundColor)
        }
        // ensure borderColor is set
        if (!ds.borderColor) ds.borderColor = props.borderColor
    })

    const config = {
        type: 'line',
        data: {
            labels: props.labels,
            datasets
        },
        options: buildOptions()
    }

    if (chart) chart.destroy()
    chart = new Chart(ctx, config)
}

onMounted(() => {
    createChart()
})

// update chart when observed props change
watch(
    () => [props.labels, props.data, props.datasets, props.options],
    () => {
        if (!chart) return
        // update labels
        chart.data.labels = props.labels
        // update datasets
        const newDatasets = buildDatasets()
        // apply gradients using the chart canvas context
        const ctx = canvas.value ? canvas.value.getContext('2d') : null
        newDatasets.forEach(ds => {
            if (ds.backgroundColor && typeof ds.backgroundColor === 'string') {
                ds.backgroundColor = createGradient(ctx, ds.backgroundColor)
            }
            if (!ds.borderColor) ds.borderColor = props.borderColor
        })
        chart.data.datasets = newDatasets
        // update options (shallow replace)
        chart.options = buildOptions()
        chart.update()
    },
    { deep: true }
)

onBeforeUnmount(() => {
    if (chart) {
        chart.destroy()
        chart = null
    }
})
</script>

<style scoped>
.line-chart {
    width: 100%;
    position: relative;
}
canvas {
    display: block;
    width: 100%;
}
</style>