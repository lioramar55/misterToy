<template>
  <section class="toy-chat">
    <ul v-if="msgs">
      <li
        v-for="(msg, idx) in msgs"
        :class="msg.from === user ? 'sender' : 'recieved'"
        :key="idx"
      >
        <span>{{ msg.from }}</span
        >: {{ msg.txt }}
      </li>
    </ul>
    <p v-if="whoTypes">{{ whoTypes }} is typing...</p>
    <form @submit.prevent="sendMsg">
      <input
        v-model="msgToSend.txt"
        @input="userTyping"
        type="text"
        placeholder="You message..."
      />
      <button class="btn">Send</button>
    </form>
  </section>
</template>

<script>
import { socketService } from '../services/socket.service.js'
import toyService from '../services/toy-service.js'

export default {
  name: 'toy-chat',
  props: { toy: Object },
  data() {
    return {
      msgToSend: {
        txt: '',
        from: this.$store.getters.user?.fullname || 'Guest',
        aboutToyId: this.toy._id,
      },
      msgs: null,
      whoTypes: null,
      timeout: null,
    }
  },
  methods: {
    userTyping() {
      socketService.emit('userTyping', {
        toyId: this.toy._id,
        user: { ...this.$store.getters.user },
      })
    },
    userTypes(username) {
      this.whoTypes = username
      setTimeout(() => {
        this.whoTypes = null
      }, 1500)
    },
    sendMsg() {
      socketService.emit('newMsg', this.msgToSend)
      this.msgToSend = {
        txt: '',
        from: '',
        to: '',
      }
      this.loadMsgs()
    },
    async loadMsgs() {
      try {
        const msgs = await toyService.getChatMsgs(
          this.toy._id
        )
        this.msgs = msgs
      } catch (err) {
        console.log('Problem with loading msgs')
      }
    },
    addMsg(msg) {
      this.msgs.push(msg)
    },
  },
  computed: {
    user() {
      return this.$store.getters.user?.fullname
    },
  },
  async created() {
    socketService.emit('toy-chat', {
      toyId: this.toy._id,
      userId: this.$store.getters.user._id,
    })
    socketService.emit('toy-watch', this.toy._id)
    socketService.on('addMsg', this.addMsg)
    socketService.on('userTypes', this.userTypes)

    await this.loadMsgs()
  },
  unmounted() {
    socketService.off('addMsg', this.loadMsgs)
  },
}
</script>
