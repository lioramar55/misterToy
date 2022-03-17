<template>
  <section class="toy-edit main-layout">
    <el-page-header :content="title" @back="goBack">
      Cancel
    </el-page-header>

    <el-descriptions v-if="toy" direction="vertical" border>
      <el-descriptions-item label="Toy name">{{
        toy.name
      }}</el-descriptions-item>
      <el-descriptions-item label="Toy price">{{
        toy.price
      }}</el-descriptions-item>
      <el-descriptions-item label="Toy stock">{{
        toy.inStock
      }}</el-descriptions-item>
    </el-descriptions>

    <h1>{{ title }}</h1>
    <el-form>
      <el-form-item
        >{{ nameLabel }}
        <el-input
          type="text"
          v-model="toyToSave.name"
          :placeholder="nameLabel"
        />
      </el-form-item>
      <el-form-item>
        {{ priceLabel }}
        <el-input
          type="number"
          v-model="toyToSave.price"
          :placeholder="priceLabel"
        />
      </el-form-item>
      <el-form-item>
        <el-radio-group
          v-model="toyToSave.inStock"
          size="large"
        >
          <el-radio-button label="In stock" />
          <el-divider direction="vertical" />
          <el-radio-button label="Out of stock" />
        </el-radio-group>
      </el-form-item>
      <el-form-item>
        <el-button @click="onToySave" type="primary"
          >Save</el-button
        >
      </el-form-item>
    </el-form>
  </section>
</template>

<script>
import toyService from '../services/toy-service'
export default {
  data() {
    return {
      toy: null,
      toyToSave: {
        name: '',
        price: '',
        inStock: '',
      },
    }
  },
  created() {
    if (this.$route.params.id) {
      const { id } = this.$route.params
      toyService.getById(id).then((toy) => {
        this.toy = toy
      })
    }
  },
  computed: {
    nameLabel() {
      return this.toy ? 'New name' : 'Enter name'
    },
    priceLabel() {
      return this.toy ? 'New price' : 'Enter price'
    },
    title() {
      return this.toy ? 'Update toy' : 'Create new toy'
    },
  },
  methods: {
    goBack() {
      this.toy
        ? this.$router.push('/toy/' + this.toy._id)
        : this.$router.push('/toy/')
    },
    onToySave() {
      if (this.toy) {
        this.toy.name = this.toyToSave.name
        this.toy.inStock = this.toyToSave.inStock
        this.toy.price = this.toyToSave.price
      }
      this.$store.dispatch({
        type: 'saveToy',
        toy: this.toy
          ? { ...this.toy }
          : { ...this.toyToSave },
      })
      this.goBack()
    },
  },
}
</script>

<style>
.toy-edit {
  text-align: center;
}
.toy-edit form {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
</style>
