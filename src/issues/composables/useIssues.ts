import { storeToRefs } from 'pinia'
import { useQuery } from '@tanstack/vue-query'
import { useIssuesStore } from './../../stores/issues-store'
import { githubApi } from 'src/api/githubApi'
import { Issue, State } from 'src/issues/interfaces/Issues'


const getIssues = async(labels: string[], state: State):Promise<Issue[]> => {

    const params = new URLSearchParams()
    
    if ( state ) params.append('state', state) 
    if ( labels.length > 0 ) {
        const labelsString = labels.join(',')
        params.append('labels', labelsString)
    }
    
    params.append('per_page', '10')

    const { data } = await githubApi.get<Issue[]>('/issues', {
        params
    })

    return data
}

const useIssues = () => {

    const issuesStore = useIssuesStore()
    const { labels, state } = storeToRefs(issuesStore)

    const issuesQuery = useQuery(
        ['issues', { labels, state }],
        () => getIssues(labels.value, state.value),
    )
 
   return{
        issuesQuery
   }
}

export default useIssues
