<template>
    <div>
        <LoaderSpinner v-if="labelsQuery.isLoading.value" size="50px" :thickness="2" :show-text="false"/>

        <q-chip
          :key="label.id"
          :style="{ color: `#${label.color}`}"
          @click="toggleLabel( label.name )"
          clickable
          :outline="!selectedlabels.includes(label.name)"
          v-for="label of labelsQuery.data.value"
        >
          {{  label.name }}
        </q-chip>
    </div>
</template>

<script setup lang="ts">
import useLabels from 'src/issues/composables/useLabels'
import LoaderSpinner from 'src/shared/components/LoaderSpinner.vue'


const { labelsQuery, toggleLabel, selectedlabels } = useLabels()

console.log( labelsQuery.data.value )






</script>

<style scoped>

</style>