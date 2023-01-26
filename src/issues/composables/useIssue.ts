import { useQuery, useQueryClient } from '@tanstack/vue-query';
import { githubApi } from 'src/api/githubApi'
import { computed } from 'vue';
import { Issue } from '../interfaces/Issues'


/* Tarda 2 sec to call another function */
const sleep = ():Promise<boolean> => {
   return new Promise( resolve => {
      setTimeout(() => {
         resolve(true)
      }, 2000)
   })
}

const getIssueByNumber = async( issueNumber: number  ):Promise<Issue> => {

   await sleep()

   const { data } = await githubApi.get<Issue>(`/issues/${ issueNumber }`)
   return data
}

const getIssueComments = async( issueNumber: number ):Promise<Issue[]> => {

   await sleep()

   const { data } = await githubApi.get<Issue[]>(`/issues/${ issueNumber }/comments`)
   return data
}

interface Options {
   /* Autoload issue and comments */
   autoload?: boolean
}

const useIssue = ( issueNumber: number, options?: Options) => {

   const { autoload = true } = options || {}

   /* Tenemos acceso a todas las partes del query (cache) */
   const queryClient = useQueryClient()

   const issueQuery = useQuery(
      ['issue', issueNumber],
      () => getIssueByNumber( issueNumber),
      {
         staleTime: 1000 * 60,
         enabled: autoload
      }
   )

   const issueCommentsQuery = useQuery(
      ['issue', issueNumber, 'comments'],
      // () => getIssueComments( issueNumber ),
      () => getIssueComments( issueQuery.data.value?.number || 0 ),
      {
         staleTime: 1000 * 15,
         enabled: autoload
      // enabled: computed( () => !!issueQuery.data.value ) 
      }
   )

   const preFetchIssue = (issueNumber: number) => {
      queryClient.prefetchQuery(
         ['issue', issueNumber],
         () => getIssueByNumber( issueNumber),
         {
            staleTime: 1000 * 60
         }
      )

      queryClient.prefetchQuery(
         ['issue', issueNumber, 'comments'],
         () => getIssueComments( issueQuery.data.value?.number || 0 ),
         {
            staleTime: 1000 * 15,
         }
      )
   }

   return{
      issueQuery,
      issueCommentsQuery,
      /* Methods */
      preFetchIssue
   }
}

export default useIssue