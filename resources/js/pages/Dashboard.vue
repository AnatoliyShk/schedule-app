<script setup lang="ts">
import AppLayout from '@/layouts/AppLayout.vue';
import { dashboard } from '@/routes';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/vue3';
import PlaceholderPattern from '../components/PlaceholderPattern.vue';
import LineChart from '../components/statistic/LineChart.vue';
import CreateForm from '../components/task/CreateForm.vue';

import Button from 'primevue/button';


const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: dashboard().url,
    },
];

// Sample data for the chart
const chartData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    data: [65, 59, 80, 81, 56, 55]
};

const handleSubmit = () => {
  console.log('Button clicked!');
};

</script>

<template>
    <Head title="Dashboard" />

    <AppLayout :breadcrumbs="breadcrumbs">
        <div
            class="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4"
        >
            <div class="grid auto-rows-min gap-4 md:grid-cols-3">
                <div
                    class="relative overflow-hidden rounded-xl border border-sidebar-border/70 p-4 dark:border-sidebar-border"
                >
                    <h4 class="mb-2 text-sm font-medium">Revenue Trend 1</h4>
                    <LineChart 
                        :labels="['Week 1', 'Week 2', 'Week 3', 'Week 4']"
                        :data="[120, 190, 300, 500]"
                        label="Revenue"
                        border-color="#10b981"
                        background-color="rgba(16,185,129,0.12)"
                        :height="140"
                    />
                </div>
                <div
                    class="relative aspect-video overflow-hidden rounded-xl border border-sidebar-border/70 dark:border-sidebar-border"
                >
                
                    <CreateForm />
                </div>
                <div
                    class="relative aspect-video overflow-hidden rounded-xl border border-sidebar-border/70 dark:border-sidebar-border"
                >
                    <PlaceholderPattern />
                </div>
            </div>
            <div
                class="relative min-h-[400px] flex-1 rounded-xl border border-sidebar-border/70 p-6 md:min-h-min dark:border-sidebar-border"
            >
                <h3 class="mb-4 text-lg font-semibold">Analytics Overview</h3>
                <LineChart 
                    :labels="chartData.labels"
                    :data="chartData.data"
                    label="Monthly Data"
                    border-color="#3b82f6"
                    background-color="rgba(59,130,246,0.12)"
                    :height="320"
                />
            </div>
        </div>
    </AppLayout>
</template>
