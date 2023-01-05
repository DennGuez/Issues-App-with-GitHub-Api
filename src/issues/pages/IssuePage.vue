<template>
    <router-link class="text-white" to="/">Go Back</router-link>
    
    <!-- Header -->
    <LoaderSpinner
        :show-text="false" 
        :thickness="1"
        color="white"
        size="1.5rem"
        v-if="issueQuery.isLoading.value"
    />

    <IssueCard v-else-if="issueQuery.data.value" :issue="issueQuery.data.value"/>
    <p v-else>Issue with ID {{ id }} not found</p>

    <!-- Comentarios -->
    <LoaderSpinner
      :show-text="false" 
      :thickness="1"
      size="1.5rem"
      v-if="issueCommentsQuery.isLoading.value"
    />

    <div v-else-if="issueCommentsQuery.data.value" class="column">
        <span class="text-h3 q-mb-md">Comments ({{ issueCommentsQuery.data.value.length || 0 }})</span>
        <issueCard
            v-for="comment of issueCommentsQuery.data.value"
            :key="comment.id"
            :issue="comment"
        />
    </div>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router'
import LoaderSpinner from 'src/shared/components/LoaderSpinner.vue'
import IssueCard from 'src/issues/components/issue-list/IssueCard.vue'
import useIssue from '../composables/useIssue'

const route = useRoute()
const { id } = route.params


const { issueQuery, issueCommentsQuery } = useIssue( +id )
</script>

<style scoped>

</style> 