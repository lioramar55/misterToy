<template>
  <div class="main-layout">
    <h1>Admin Dashboard</h1>
    <table>
      <thead>
        <tr>
          <th>Full name</th>
          <th>Username</th>
          <th>Role</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="user in users" :key="user._id">
          <td>{{ user.fullname }}</td>
          <td>{{ user.username }}</td>
          <td>{{ user.isAdmin ? 'Admin' : 'User' }}</td>
          <td>
            <button @click="onRemoveUser(user._id)">
              Remove
            </button>
            <button @click="onUpdateUser(user._id)">
              Update
            </button>
          </td>
        </tr>
      </tbody>
    </table>
    <button @click="onAddUser()">Add user</button>
  </div>
</template>
<script>
export default {
  name: 'admin',
  created() {
    const user = this.$store.getters.user
    if (!user || !user.isAdmin)
      return this.$router.push('/')
  },
  methods: {
    onRemoveUser(id) {
      this.$store.dispatch({ type: 'removeUser', id })
    },
    onUpdateUser(id) {
      this.$router.push('/admin/edit/' + id)
    },
    onAddUser() {
      this.$router.push('/admin/edit/')
    },
  },
  computed: {
    users() {
      return this.$store.getters.users
    },
  },
}
</script>

<style></style>
