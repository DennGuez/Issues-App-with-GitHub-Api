<template>
    <q-btn-toggle
        v-model="issuesStore.state"
        toggle-color="primary"
        :options="[
          {label: 'All', value: ''},
          {label: 'Open', value: 'open'},
          {label: 'Closed', value: 'closed'}
        ]"
    />
</template>

<script setup lang="ts">
import { useIssuesStore } from 'src/stores/issues-store'

const issuesStore = useIssuesStore()
</script>

<style scoped>

</style>