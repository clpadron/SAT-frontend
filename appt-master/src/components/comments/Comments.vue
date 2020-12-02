<template>
  <div>
    <vs-list>
      <vs-list-header :title="$t('COMMENTS.TITLE')"></vs-list-header>
      <vs-list-item
        v-for="comment in comments.models"
        :key="comment.id"
        :title="comment.guest_name"
        :subtitle="comment.comment"
      >
        <vx-tooltip
          v-if="can('delete', 'InternshipAgreement')"
          :title="$t('GLOBALS.ARE_YOU_SURE')"
          class="inline-block mr-2"
          color="danger"
        >
          <small>{{ comment.created_at }}</small>
          <br />
          <vs-button
            class="float-right mt-2"
            size="small"
            color="danger"
            type="border"
            icon="delete"
            @click="deleteComment(comment)"
          />
        </vx-tooltip>
      </vs-list-item>
    </vs-list>
    <div v-if="isOwner">
      <h4 class="mt-5">{{ $t('COMMENTS.WRITE_YOUR_COMMENT') }}</h4>
      <vs-textarea v-model="comment.comment"> </vs-textarea>
      <vs-button class="mt-3 float-right" @click="addComment()">
        {{ $t('COMMENTS.ADD') }}
      </vs-button>
    </div>
  </div>
</template>

<script>
import { Comment, CommentCollection } from '../../models/Comment'
import { InternshipAgreement } from '../../models/InternshipAgreement'
import { Notification } from '../../models/Notification'

export default {
  name: 'Comments',
  props: {
    objectId: {
      type: [Number, String],
      required: true
    },
    object: {
      type: Object,
      required: true
    },
    isOwner: {
      type: Boolean,
      required: false,
      default() {
        return false
      }
    }
  },
  data() {
    return {
      comments: new CommentCollection(),
      comment: new Comment({
        commentable_id: this.objectId,
        commentable_type: this.commentableType
      }),
      commentableType: 'internship_agreements'
    }
  },
  mounted() {
    this.comments.fetch1(this.commentableType, this.objectId)
    this.comment.username = this.activeUser.username
  },
  methods: {
    async addComment() {
      await this.comment.save()
      if (this.object instanceof InternshipAgreement) {
        let content =
          'Comment was added to the apprenticeship agreement ' +
          this.object.id +
          ' by ' +
          this.activeUser.first_name +
          ' ' +
          this.activeUser.last_name

        let usernames = []

        if (
          this.object.school_organizer &&
          this.activeUser.username !== this.object.school_organizer.username
        ) {
          usernames.push(this.object.school_organizer.username)
        }
        if (
          this.object.mentor &&
          this.activeUser.username !== this.object.mentor.username
        ) {
          usernames.push(this.object.mentor.username)
        }
        if (
          this.object.student &&
          this.activeUser.username !== this.object.student.username
        ) {
          usernames.push(this.object.student.username)
        }
        this.sendNotification(usernames, content)
      }

      await this.comments.fetch1(this.commentableType, this.objectId)
      this.comment = new Comment({
        commentable_id: this.objectId,
        commentable_type: this.commentableType
      })
    },
    async deleteComment(comment) {
      await comment.delete()
      await this.comments.fetch1(this.commentableType, this.objectId)
    },
    sendNotification(usernames, content) {
      let notification = new Notification()
      notification.usernames = usernames
      notification.info = content
      notification.save()
    }
  }
}
</script>

<style scoped></style>
