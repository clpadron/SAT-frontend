<template>
  <div class="vx-row">
    <div class="vx-col md:w-1/3 w-full">
      <vx-card :title="$t('USERS.PERSONAL_DATA')">
        <div>
          <h6>{{ $t('USERS.USERNAME') }}:</h6>
          <p>{{ activeUser.username }}</p>
        </div>
        <div class="mt-5">
          <h6>{{ $t('USERS.EMAIL') }}:</h6>
          <p>{{ activeUser.email }}</p>
        </div>
        <div class="mt-5">
          <h6>{{ $t('USERS.FIRST_NAME') }}:</h6>
          <p>{{ activeUser.first_name }}</p>
        </div>
        <div class="mt-5">
          <h6>{{ $t('USERS.LAST_NAME') }}:</h6>
          <p>{{ activeUser.last_name }}</p>
        </div>
        <div class="mt-5">
          <h6>{{ $t('USERS.PHONE') }}:</h6>
          <p>{{ activeUser.phone }}</p>
        </div>
        <div class="mt-5">
          <h6>{{ $t('USERS.ADDRESS') }}:</h6>
          <p>{{ activeUser.streetname }}</p>
        </div>
        <div class="mt-5">
          <h6>{{ $t('USERS.CITY') }}:</h6>
          <p>{{ activeUser.cityname }}</p>
        </div>
        <div class="mt-5">
          <h6>{{ $t('USERS.ZIP') }}:</h6>
          <p>{{ activeUser.cityzipcode }}</p>
        </div>
      </vx-card>
    </div>
    <div class="vx-col md:w-1/3 w-full">
      <vx-card :title="$t('USERS.ORGANIZATION_DATA')">
        <div>
          <h6>{{ $t('ORGANIZATIONS.TITLE_SINGLE') }}:</h6>
          <p>{{ activeUser.organization }}</p>
        </div>
        <div class="mt-5">
          <h6>{{ $t('SCHOOLS.TITLE_SINGLE') }}:</h6>
          <p>{{ activeUser.school }}</p>
        </div>
        <div class="mt-5">
          <h6>{{ $t('STUDY_PROGRAMS.TITLE_SINGLE') }}:</h6>
          <p>{{ activeUser.studyProgram }}</p>
        </div>
      </vx-card>
    </div>

    <div class="vx-col md:w-1/3 w-full">
      <vx-card :title="$t('USERS.FILE_UPLOADS')">
        <h6 class="mb-2">{{ $t('USERS.UPLOAD_CV') }}:</h6>
        <p>
          <vue-dropzone
            id="dropzone"
            ref="myDropzoneInstance"
            :options="dropzoneOptions"
            @vdropzone-success="sent"
            @vdropzone-error="error"
          />
        </p>

        <div class="mt-5">
          <h6>{{ $t('USERS.YOUR_UPLOADS') }}:</h6>

          <div v-for="file in files.models" :key="file.id" class="mt-2">
            {{ file.filename }}

            <vs-button
              class="inline-block mr-2 float-right"
              size="small"
              type="border"
              icon="delete"
              @click="remove(file)"
            />
            <a
              :href="downloadLink + file.id"
              class="inline-block mr-2 float-right"
              target="_blank"
            >
              <vs-button size="small" type="border" icon="cloud_download" />
            </a>
          </div>
        </div>
      </vx-card>
    </div>

    <div
      v-if="canEdit()"
      class="vx-col sm:w-3/3 w-full ml-auto mt-5 text-right"
    >
      <vs-button class="mr-3 mb-2" @click="editProfile">{{
        $t('USERS.EDIT_PROFILE')
      }}</vs-button>
      <vs-button class="mr-3 mb-2" @click="changePassword">{{
        $t('USERS.CHANGE_PASSWORD')
      }}</vs-button>
    </div>
  </div>
</template>

<script>
import vue2Dropzone from 'vue2-dropzone'
import 'vue2-dropzone/dist/vue2Dropzone.min.css'
import { FileCollection } from '../../models/File'
import { Notification } from '../../models/Notification'

export default {
  components: {
    vueDropzone: vue2Dropzone
  },

  props: {
    roles: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      files: new FileCollection(),
      downloadLink: process.env.VUE_APP_API_URL + 'download/',
      dropzoneOptions: {
        url: process.env.VUE_APP_API_URL + 'uploadFile/USERS/1', // works despite 1 at the end
        thumbnailWidth: 150,
        maxFiles: 4,
        withCredentials: true
      }
    }
  },
  computed: {},

  async mounted() {
    await this.files.fetchUser()
    this.$refs.myDropzoneInstance.setOption(
      'maxFiles',
      (this.dropzoneOptions.maxFiles -= this.files.models.length)
    )
  },
  methods: {
    remove(file) {
      file.delete().then(() => {
        this.$vs.notify({
          color: 'success',
          title: this.$t('GLOBALS.FILE_DELETED'),
          text: this.$t('GLOBALS.FILE_SUCCESSFULLY_DELETED')
        })
        this.files.fetchUser()
      })
    },
    editProfile() {
      this.$router.push({ name: 'users-edit-profile' })
    },
    changePassword() {
      this.$router.push({ name: 'users-change-password' })
    },
    canEdit() {
      return !this.activeUser.jwt
    },

    sent() {
      this.files.fetchUser()
      this.$vs.notify({
        color: 'success',
        title: this.$t('GLOBALS.FILE_UPLOADED'),
        text: this.$t('GLOBALS.FILE_SUCCESSFULLY_UPLOADED')
      })
    },
    error() {
      this.$vs.notify({
        color: 'danger',
        title: this.$t('GLOBALS.ERROR_ON_UPLOAD')
      })
    }
  }
}
</script>
