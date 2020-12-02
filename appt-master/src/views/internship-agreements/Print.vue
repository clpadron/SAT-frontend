<template>
  <div id="invoice-page">
    <div class="flex flex-wrap items-center justify-between">
      <vx-input-group class="">
        <vs-button
          class="mb-base mr-3"
          icon-pack="feather"
          icon="icon icon-file"
          @click="backToView"
          >{{ $t('GLOBALS.BACK_TO_VIEW') }}</vs-button
        >
      </vx-input-group>
      <div class="flex items-center">
        <vs-button
          class="mb-base mr-3"
          icon-pack="feather"
          icon="icon icon-file"
          @click="printInvoice"
          >{{ $t('GLOBALS.PRINT') }}</vs-button
        >
      </div>
    </div>

    <vx-card id="invoice-container">
      <div class="vx-row">
        <div class="vx-col w-full">
          <p>{{ school.name }}</p>
          <p>{{ school.streetname }}</p>
          <p>{{ school.cityzipcode }} {{ school.cityname }}</p>

          <h5 class="text-center mt-10">{{ $t('PRINT.TITLE') }}</h5>
          <p v-if="internshipAgreementObject.student" class="mt-10">
            {{ getNiceName(internshipAgreementObject.student) }},
            {{ internshipAgreementObject.student.streetname }},
            {{ internshipAgreementObject.student.cityzipcode }}
            {{ internshipAgreementObject.student.cityname }},
            {{ internshipAgreementObject.student.username }}
          </p>
          <p class="mt-10">
            {{ $t('PRINT.HAS_FROM') }}
            {{ internshipAgreementObject.periodBegin | moment('DD.MM.YYYY') }}
            {{ $t('PRINT.TO') }}
            {{ internshipAgreementObject.periodEnd | moment('DD.MM.YYYY') }}
            {{ $t('PRINT.WORKED') }}
          </p>
          <div v-if="internshipAgreementObject.organization">
            <p class="mt-5">
              {{ internshipAgreementObject.organization.name }}
            </p>
            <p>{{ internshipAgreementObject.organization.streetname }}</p>
            <p>
              {{ internshipAgreementObject.organization.cityzipcode }}
              {{ internshipAgreementObject.organization.cityname }}
            </p>
          </div>

          <p class="mt-10">
            {{ $t('PRINT.AGREEMENT_ABOUT') }}
            {{ internshipAgreementObject.document_number }}
          </p>

          <p class="mt-10">{{ $t('PRINT.SUPERVISED_BY') }}</p>
          <div v-if="internshipAgreementObject.mentor">
            <p class="mt-5">
              {{ getNiceName(internshipAgreementObject.mentor) }}
            </p>
            <p>{{ internshipAgreementObject.mentor.streetname }}</p>
            {{ internshipAgreementObject.mentor.cityzipcode }}
            <p>{{ internshipAgreementObject.mentor.cityname }}</p>
            <p>{{ internshipAgreementObject.mentor.username }}</p>
          </div>

          <p class="mt-10 mb-5">
            {{ $t('PRINT.STUDENT_COMPLETED') }}
            {{ internshipAgreementObject.sum_of_hours }}
            {{ $t('PRINT.HOURS_OF') }}
          </p>
          <p
            v-for="competence in internshipAgreementObject.competences"
            :key="competence.id"
            class="ml-5"
          >
            - {{ competence.name }}
          </p>

          <p v-if="internshipAgreementObject.organization" class="mt-20">
            {{ internshipAgreementObject.organization.cityname }},
            {{ internshipAgreementObject.periodEnd | moment('DD.MM.YYYY') }}
          </p>
          <p class="mt-10 text-right">{{ $t('PRINT.SCHOOL_ORGANIZER') }}</p>
          <p class="text-right">
            {{ getNiceName(internshipAgreementObject.school_organizer) }}
          </p>

          <p class="mt-20 text-justify">
            <i>{{ $t('PRINT.DISCLOSURE') }}</i>
          </p>
        </div>
      </div>
    </vx-card>
  </div>
</template>

<script>
import {
  InternshipAgreement,
  InternshipAgreementCollection
} from '../../models/InternshipAgreement'

import { School } from '../../models/School'
import axios from 'axios'

export default {
  props: {
    internshipAgreement: {
      type: Object,
      default: () => new InternshipAgreement()
    },
    id: {
      type: [Number, String],
      required: true
    }
  },
  data() {
    return {
      school: new School(),
      user: this.$store.state.AppActiveUser,
      internshipAgreementObject: this.internshipAgreement
    }
  },

  async mounted() {
    await this.init()
  },
  methods: {
    async init() {
      const domain = process.env.VUE_APP_JAGER_API
      let axios1 = axios.create({
        baseURL: domain
      })
      axios1
        .get('get-school-keys-for-login')
        .then(response => {
          this.school = response.data.find(
            item => item.school_id === this.user.school
          )
        })
        .catch(error => {
          console.log(error)
        })

      if (!this.internshipAgreementObject.id) {
        let internshipAgreements = new InternshipAgreementCollection()
        if (this.isAdmin) {
          await internshipAgreements.fetch()
        } else if (this.isOrganizationUser) {
          await internshipAgreements.fetchOrganization()
        } else if (this.isStudent) {
          await internshipAgreements.fetchStudent()
        } else {
          await internshipAgreements.fetch()
        }
        let $this = this
        this.internshipAgreementObject = internshipAgreements.find(
          internshipAgreement => internshipAgreement.id === parseInt($this.id)
        )
      }
    },

    getNiceName(user) {
      if (!user) {
        return 'no user'
      }
      if (user.first_name) {
        return [user.first_name, user.last_name].join(' ')
      }
      return user.username
    },
    printInvoice() {
      window.print()
    },
    backToView() {
      this.$router.push({
        name: 'internship-agreements-view',
        params: {
          id: this.internshipAgreementObject.id,
          internshipAgreement: this.internshipAgreementObject
        }
      })
    }
  }
}
</script>

<style lang="scss">
@media print {
  * {
    visibility: hidden;
  }

  #content-area {
    margin: 0 !important;
  }

  .vs-con-table {
    .vs-con-tbody {
      overflow: hidden !important;
    }
  }

  #invoice-container,
  #invoice-container * {
    visibility: visible;
  }
  #invoice-container {
    position: absolute;
    left: 0;
    top: 0;
    box-shadow: none;
  }
}

@page {
  size: auto;
}
</style>
