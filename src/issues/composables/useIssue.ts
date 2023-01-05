import { useQuery } from '@tanstack/vue-query';
import { githubApi } from 'src/api/githubApi'
import { Issue } from '../interfaces/Issues'

const getIssueByNumber = async( issueNumber: number  ):Promise<Issue> => {
   const { data } = await githubApi.get<Issue>(`/issues/${ issueNumber }`)
   return data
}

const getIssueComments = async( issueNumber: number ):Promise<Issue[]> => {
   const { data } = await githubApi.get<Issue[]>(`/issues/${ issueNumber }/comments`)
   return data
}

const useIssue = ( issueNumber: number ) => {

   const issueQuery = useQuery(
      ['issue', issueNumber],
      () => getIssueByNumber( issueNumber),
      {
         staleTime: 1000 * 60
      }
   )

   const issueCommentsQuery = useQuery(
      ['issue', issueNumber, 'comments'],
      () => getIssueComments( issueQuery.data.value?.number || 0 ),
      {
         staleTime: 1000 * 15,
         enabled: !!issueQuery.data.value
      }
   )

   return{
      issueQuery,
      issueCommentsQuery
   }
}

export default useIssue