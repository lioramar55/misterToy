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
    <form @submit.prevent="sendMsg">
      <input
        v-model="msgToSend.txt"
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
    }
  },
  methods: {
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
    socketService.emit('toy-chat', this.toy._id)
    socketService.emit('toy-watch', this.toy._id)
    socketService.on('addMsg', this.addMsg)

    await this.loadMsgs()
  },
  unmounted() {
    socketService.off('addMsg', this.loadMsgs)
  },
}
</script>
