import { storeToRefs } from 'pinia'
import { useQuery } from '@tanstack/vue-query'
import { useIssuesStore } from './../../stores/issues-store'
import { Label } from 'src/issues/interfaces/labels'
import { githubApi } from 'src/api/githubApi'
// import { computed } from 'vue'

const getLabels = async():Promise<Label[]> => {

    const { data } = await githubApi<Label[]>('/labels?per_page=100')
    return data
}

const useLabels = () => {

    const issuesStore = useIssuesStore()
    const { labels } = storeToRefs( issuesStore )

    const labelsQuery = useQuery(
        ['labels'],
        getLabels,
        {
            staleTime: 1000 * 60 * 60 // 1hr
        }
    )

    return {
        labelsQuery,

        // Getters
        // selectedlabels: computed( () => issuesStore.labels) ,
        selectedlabels: labels,

        // Methods
        toggleLabel: issuesStore.toggleLabel
    }
}
export default useLabels