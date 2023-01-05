import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useIssuesStore = defineStore('issues', () => {

    // TODO crear un enum tipo de dato
    const state = ref('')
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