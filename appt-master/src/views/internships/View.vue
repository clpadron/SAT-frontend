<template>
  <div class="vx-row">
    <div class="vx-col md:w-1/3 w-full mb-base">
      <vx-card :title="$t('ENTERPRISES.TITLE')">
        <div>
          <h6>{{ $t('GLOBALS.NAME') }}:</h6>
          <p>{{ internshipObject.organization.name }}</p>
        </div>
        <div>
          <h6>{{ $t('GLOBALS.ADDRESS') }}:</h6>
          <p>{{ internshipObject.organization.streetname }}</p>
        </div>
        <div>
          <h6>{{ $t('GLOBALS.CITY') }}:</h6>
          <p>{{ internshipObject.organization.cityname }}</p>
        </div>
        <div>
          <h6>{{ $t('GLOBALS.ZIP') }}:</h6>
          <p>{{ internshipObject.organization.cityzipcode }}</p>
        </div>
        <div>
          <h6>{{ $t('GLOBALS.CONTACT') }}:</h6>
          <p>{{ internshipObject.organization.contact_username }}</p>
        </div>
      </vx-card>
    </div>
    <div class="vx-col md:w-1/3 w-full mb-base">
      <vx-card :title="$t('STUDY_PROGRAMS.TITLE')">
        <div>
          <h6>{{ $t('GLOBALS.NAME') }}:</h6>
          <p>{{ internshipObject.studyProgram.name }}</p>
        </div>
        <div>
          <h6>{{ $t('GLOBALS.DESCRIPTION') }}:</h6>
          <p>{{ internshipObject.studyProgram.description }}</p>
        </div>
      </vx-card>
    </div>
    <div class="vx-col md:w-1/3 w-full mb-base">
      <vx-card :title="$t('COMPETENCES.TITLE')">
        <template v-for="(competence, key) in internshipObject.studyCompetence">
          <div :key="key" class="mb-5">
            <h6>{{ competence.name }}:</h6>
            <p v-html="competence.description" />
            <vs-divider />
          </div>
        </template>
        <h6 v-if="!internshipObject.studyCompetence.length">
          {{ $t('GLOBALS.NO_ITEMS') }}
        </h6>
      </vx-card>
    </div>
    <div v-if="can('update', 'Internship')" class="vx-col text-right w-full">
      <vs-button @click="edit()">{{ $t('GLOBALS.EDIT') }} </vs-button>
    </div>
  </div>
</template>

<script>
import { Internship, InternshipCollection } from '../../models/Internship'
import VTextBox from '../../components/form/VTextBox'
import VSelectBox from '../../components/form/VSelectBox'

export default {
  components: {
    VTextBox,
    VSelectBox
  },

  props: {
    internship: {
      type: Object,
      default: () => new Internship()
    },
    id: {
      type: [Number, String],
      required: true
    }
  },
  data() {
    return {
      internshipObject: this.internship
    }
  },

  async mounted() {
    if (!this.internshipObject.id) {
      let internships = new InternshipCollection()
      await internships.fetch()
      this.internshipObject = internships.find(
        internship => internship.id === parseInt(this.id)
      )
    }
  },
  methods: {
    edit() {
      this.$router.push({
        name: 'internships-edit',
        params: {
          id: this.internshipObject.id,
          studyProgram: this.internshipObject
        }
      })
    }
  }
}
</script>
