<template>
  <div>
    <vs-button
      v-if="!alreadyApplied(object) && can('apply', 'Internship')"
      class="inline-block mr-2"
      size="small"
      type="border"
      @click="showTermsPopup(object)"
      >Apply</vs-button
    >
    <feather-icon
      v-if="can('view', 'Internship')"
      icon="Edit3Icon"
      svg-classes="h-5 w-5 mr-4 hover:text-primary cursor-pointer"
      @click="edit(object)"
    />

    <feather-icon
      v-if="can('update', 'Internship')"
      icon="EyeIcon"
      svg-classes="h-5 w-5 mr-4  hover:text-primary cursor-pointer"
      @click="view(object)"
    />

    <feather-icon
      v-if="can('delete', 'Internship')"
      icon="Trash2Icon"
      svg-classes="h-5 w-5 hover:text-danger cursor-pointer"
      @click="deleteInternship(object)"
    />
    <vs-popup
      :active.sync="activeTermsPopup"
      :title="$t('GLOBALS.TERMS_AND_CONDITIONS')"
    >
      <div class="inner-popup ml-3 ml-r">
        <template v-for="(article, key) in internshipTermsObject.articles">
          <div :key="key" class="mb-5">
            <p v-html="article.content" />
            <vs-divider />
          </div>
        </template>
        <vs-button class="mt-5 float-left" @click="activeTermsPopup = false"
          >{{ $t('GLOBALS.CANCEL') }}
        </vs-button>
        <vs-button
          class="mt-5 float-right"
          @click="apply(internshipTermsObject)"
          >{{ $t('GLOBALS.AGREE_AND_APPLY') }}
        </vs-button>
      </div>
    </vs-popup>
  </div>
</template>

<script>
import Vue from 'vue'
import { Internship } from '../../models/Internship'
import { InternshipAgreementCollection } from '../../models/InternshipAgreement'
import { Notification } from '../../models/Notification'

export default Vue.extend({
  data() {
    return {
      internshipAgreements: new InternshipAgreementCollection(),
      activeConfirm: false,
      activeTermsPopup: false,
      internshipTermsObject: new Internship()
    }
  },
  computed: {
    object() {
      return this.params.data
    }
  },
  mounted() {
    if (this.can('apply', 'Internship')) {
      this.internshipAgreements.fetchStudent()
    }
  },
  methods: {
    deleteInternship(internship) {
      internship
        .delete()
        .then(() => {
          this.$vs.notify({
            color: 'success',
            title: this.$t('GLOBALS.DELETE_SUCCESSFUL'),
            text: this.$t('GLOBALS.DELETE_SUCCESSFUL_CONTENT')
          })
          this.params.context.componentParent.loadData()
        })
        .catch(error => {
          this.$vs.notify({
            color: 'danger',
            title: this.$t('GLOBALS.SOMETHING_WENT_WRONG'),
            text: error.message
          })
        })
    },
    showTermsPopup(internship) {
      this.internshipTermsObject = internship
      this.activeTermsPopup = true
    },
    edit(internship) {
      this.$router.push({
        name: 'internships-edit',
        params: {
          id: internship.id,
          internship: internship
        }
      })
    },
    view(internship) {
      this.$router.push({
        name: 'internships-view',
        params: {
          id: internship.id,
          internship: internship
        }
      })
    },
    alreadyApplied(internship) {
      let filterAgreements = this.internshipAgreements.filter(
        agreement => agreement.organization
      )
      let foundedInternshipAgreement = filterAgreements.find(
        internshipAgreement =>
          internshipAgreement.organization.id === internship.organization.id
      )
      return !!foundedInternshipAgreement
    },
    apply(internship) {
      internship
        .apply()
        .then(() => {
          this.activeTermsPopup = false
          this.$vs.notify({
            color: 'success',
            title: this.$t('GLOBALS.APPLY_SUCCESSFUL'),
            text: this.$t('GLOBALS.APPLY_SUCCESSFUL_CONTENT')
          })
          let content =
            'Application to the apprenticeship ' +
            internship.id +
            ' was created by ' +
            this.activeUser.username

          if (this.object.school_organizer) {
            this.sendNotification(
              [this.object.school_organizer.username],
              content
            )
          }
        })
        .catch(error => {
          this.$vs.notify({
            color: 'danger',
            title: this.$t('GLOBALS.SOMETHING_WENT_WRONG'),
            text: error.message
          })
        })
    },
    sendNotification(usernames, content) {
      let notification = new Notification()
      notification.usernames = usernames
      notification.info = content
      notification.save()
    }
  }
})
</script>
