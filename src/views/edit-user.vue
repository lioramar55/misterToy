<template>
  <div class="login-page main-layout">
    <h1>Log in</h1>
    <el-form @submit.prevent="onSubmit">
      <el-form-item>
        Username:
        <el-input
          type="text"
          v-model="user.username"
          required
        />
      </el-form-item>
      <el-form-item>
        Full name:
        <el-input
          type="text"
          v-model="user.fullname"
          required
        />
      </el-form-item>
      <el-form-item>
        <el-radio-group v-model="user.isAdmin" size="large">
          <el-radio-button label="User" />
          <el-divider direction="vertical" />
          <el-radio-button label="Admin" />
        </el-radio-group>
      </el-form-item>
      <button>Submit</button>
    </el-form>
    >
  </div>
</template>
<script>
export default {
  name: 'edit-user',
  data() {
    return {
      userToEdit: null,
      user: {
        fullname: '',
        username: '',
        isAdmin: '',
      },
    }
  },
  created() {
    const user = this.$store.getters.user
    this.userToEdit = user ? user : null
  },
  methods: {
    async onSubmit() {
      const user = this.userToEdit
        ? { ...this.user, _id: this.userToEdit._id }
        : { ...this.user }

      await this.$store.dispatch({
        type: 'saveUser',
        user,
      })
      this.$router.push('/admin')
    },
  },
}
</script>

<style></style>
