<template>
  <q-card @mouseenter="preFetchIssue(issue.number)" class="text-black col-12 q-mb-md" flat bordered>
    <q-item>
      <q-item-section avatar>
        <q-avatar>
          <img :src="issue.user.avatar_url" alt="User Avatar">
        </q-avatar>
      </q-item-section>

      <q-item-section>
        <q-item-label>
          <router-link :to="`/issue/${ issue.number }`">{{ issue.title }}</router-link>
        </q-item-label>
        <q-item-label caption>
         {{ timeSince(issue.created_at) }} ago
        </q-item-label>
      </q-item-section>

      <q-item-section>
        <q-item-label class="row items-center justify-end">
          <q-item-label class="q-mr-md">
            <q-icon name="question_answer" />
            {{ issue.comments }}
          </q-item-label>
          <q-chip v-if="issue.state === State.Closed" color="positive" text-color="white" icon="check"> Closed </q-chip>
          <q-chip v-else color="negative" text-color="white" icon="bug_report"> Open </q-chip>
        </q-item-label>

      </q-item-section>
    </q-item>

    <q-separator />

    <q-item-section class="q-pa-md markdown-css">
        <vue-mark-down :source="issue.body" />
    </q-item-section>

    <q-separator />

    <q-item-section class="q-pa-xs q-gutter-xs">
      <div>
        <q-chip
          :key="label.id"
          :style="{ color: `#${label.color}`}"
          clickable
          outline
          v-for="label of issue.labels"
        >
          {{  label.name }}
        </q-chip>
      </div>
    </q-item-section>

  </q-card>
</template>

<script setup lang="ts">
import { toRef } from 'vue';
import VueMarkDown from 'vue-markdown-render'
import { timeSince } from 'src/shared/helpers/time-since'
import { Issue, State } from 'src/issues/interfaces/Issues'
import useIssue from '../../composables/useIssue'


interface Props {
  issue: Issue
}

const props = defineProps<Props>() 
const issue = toRef(props, 'issue')

const { preFetchIssue } = useIssue( issue.value.number, { autoload: false } )

</script>

<style scoped>
.markdown-css img {
  width: 250px !important;
}
</style>