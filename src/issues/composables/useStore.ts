import { storeToRefs } from 'pinia'
import { useIssuesStore } from 'src/stores/issues-store'


const useCounter = () => {

    const issuesStore = useIssuesStore()
    const { labels, state } = storeToRefs(issuesStore)

   return{
        /* Reactive Properties */
        labels,
        state
        /* Getters (Computed) */
        /* Actions Methods */
    }
}

export default useCounter