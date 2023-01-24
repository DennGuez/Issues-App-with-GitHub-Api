import { ref } from 'vue'
import { defineStore } from 'pinia'
import { State } from 'src/issues/interfaces/Issues'

export const useIssuesStore = defineStore('issues', () => {

    const state = ref<State>(State.All)
    const labels = ref<string[]>([])

    return {
     // State
        state,
        labels,
     // Getters
     // Actions
        toggleLabel: ( labelName: string ) => {
            //TODO implementar

            if( labels.value.includes( labelName ) ) {
                labels.value = labels.value.filter( label => label !== labelName )
                return
            }

            labels.value.push( labelName )
        }
    }
})