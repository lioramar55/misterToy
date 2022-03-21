<template>
  <section class="toy-chat">
    <ul v-if="msgs">
      <li v-for="(msg, idx) in msgs" :key="idx">
        <span>{{ msg.from }}</span
        >: {{ msg.txt }}
      </li>
    </ul>
    <form @submit.prevent="sendMsg">
      <input
        v-model="msg.txt"
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
      msg: {
        txt: '',
        from: this.$store.getters.user?.fullname || 'Guest',
        aboutToyId: this.toy._id,
      },
      msgs: null,
    }
  },

  async created() {
    socketService.emit('toy-chat', this.toy._id)
    socketService.on('addMsg', this.addMsg)

    await this.addMsgs()
  },
  unmounted() {
    socketService.off('addMsg', this.addMsg)
  },
  methods: {
    sendMsg() {
      socketService.emit('newMsg', this.msg)
      this.msg = {
        txt: '',
        from: '',
        to: '',
      }
      this.addMsgs()
    },
    async addMsgs() {
      try {
        const msgs = await toyService.getChatMsgs(
          this.toy._id
        )
        this.msgs = msgs
      } catch (err) {
        console.log('Problem with loading msgs')
      }
    },
  },
}
</script>
