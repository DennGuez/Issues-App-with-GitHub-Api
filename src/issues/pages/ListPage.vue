<template>
    <div class="row q-mb-md">
        <div class="col-12">
            <span class="text-h4">GitHub Issues</span>
        </div>
    </div>

    <div class="row">
        <div class="col-xs-12 col-md-4">
        <!-- Filtros -->
            <FilterSelector />
        </div>

        <div class="col-xs-12 col-md-8">
        <!-- Loader -->
        <LoaderSpinner v-if="issuesQuery.isLoading.value" color="white" :show-text="false"/>
        <!-- IssueList - Array de IssueCard -->
        <IssueList :issues="issuesQuery.data?.value || []" v-else />
        </div>
    </div>

</template>

<script setup lang="ts">
import LoaderSpinner from 'src/shared/components/LoaderSpinner.vue'
import FilterSelector from 'src/issues/components/filter-selector/FilterSelector.vue'
import IssueList from 'src/issues/components/issue-list/IssueList.vue'
import useIssues from 'src/issues/composables/useIssues';

const { issuesQuery } = useIssues();

</script>

<style scoped>

</style>

