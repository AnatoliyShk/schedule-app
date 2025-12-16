<script setup lang="ts">
    import AppLayout from '@/layouts/AppLayout.vue';
    import { dashboard } from '@/routes';
    import { type BreadcrumbItem } from '@/types';
    import { Head } from '@inertiajs/vue3';

    import Button from 'primevue/button';
    import { route } from 'ziggy-js';

    import CreateForm from '../../components/task/CreateForm.vue';

    const breadcrumbs: BreadcrumbItem[] = [
        {
            title: 'Task',
            href: route('task'),
        },
    ];
</script>

<template>
    <Head title="Task" />
    <AppLayout :breadcrumbs="breadcrumbs">
          <CreateForm />
    </AppLayout>
</template>