<template>
    <div class="row">
        <IssueCard
          v-for="issue of props.issues"
          :key="issue.id" 
          :issue="issue"
          />
    </div>
</template>

<script setup lang="ts">
import { Issue } from 'src/issues/interfaces/Issues'
import IssueCard from './IssueCard.vue'

interface Props {
    issues: Issue[]
}

const props = defineProps<Props>()


</script>

<style scoped>

</style>