<template>
  <section class="toy-edit main-layout">
    <el-page-header :content="title" @back="goBack">
      Cancel
    </el-page-header>

    <h1>{{ title }}</h1>
    <el-form>
      <el-form-item
        >{{ nameLabel }}
        <el-input
          type="text"
          v-model="toyToSave.name"
          :placeholder="nameLabel"
          required
        />
      </el-form-item>
      <el-form-item>
        {{ priceLabel }}
        <el-input
          type="number"
          v-model="toyToSave.price"
          :placeholder="priceLabel"
          required
        />
      </el-form-item>
      <el-form-item
        >Labels:
        <el-select
          v-model="toyToSave.labels"
          multiple
          placeholder="Select"
          style="width: 240px"
        >
          <el-option
            v-for="label in labels"
            :key="label"
            :value="label"
          />
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-radio-group
          v-model="toyToSave.inStock"
          size="large"
          required
        >
          <el-radio-button label="In stock" />
          <el-divider direction="vertical" />
          <el-radio-button label="Out of stock" />
        </el-radio-group>
      </el-form-item>
      <!-- <el-form-item
        for="imgUploader"
        @drop.prevent="handleFile"
        @dragover.prevent="isDragOver = true"
        @dragleave="isDragOver = false"
        :class="{
          drag: isDragOver,
          'not-drag': !isDragOver,
        }"
      >
        <img
          :src="
            isDragOver
              ? 'src/assets/box.png'
              : 'src/assets/upload.png'
          "
          alt="Drop images here"
        />
        <h3>
          Choose an image
          <span class="light"> or drag it here</span>
        </h3>
      </el-form-item>

      <input
        type="file"
        name="img-uploader"
        @change="handleFile"
        id="imgUploader"
        hidden
      /> -->
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
        labels: [],
      },
      labels: [
        'On wheels',
        'Box game',
        'Art',
        'Baby',
        'Doll',
        'Puzzle',
        'Outdoor',
      ],
      isLoading: false,
      isDragOver: false,
    }
  },
  async created() {
    if (this.$route.params.id) {
      const { id } = this.$route.params
      const toy = await toyService.getById(id)
      if (toy) {
        this.toy = toy
        this.toyToSave.name = toy.name
        this.toyToSave.price = toy.price
        this.toyToSave.inStock = toy.inStock
        this.toyToSave.labels = toy.labels
      }
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
    handleFile(ev) {
      let file
      if (ev.type === 'change') file = ev.target.files[0]
      else if (ev.type === 'drop')
        file = ev.dataTransfer.files[0]
      this.onUploadImg(file)
    },
    async onUploadImg(file) {
      this.isLoading = true
      this.isDragOver = false
      const res = await uploadImg(file)
      console.log('res.url', res.url)
      // this.$store.dispatch('saveToyImg', {
      //   toyId: toy.id,
      //   url: res.url,
      // })
      this.isLoading = false
    },
    async onToySave() {
      if (this.toy) {
        this.toy.name = this.toyToSave.name
        this.toy.inStock = this.toyToSave.inStock
        this.toy.price = this.toyToSave.price
        this.toy.labels = this.toyToSave.labels
      }
      await this.$store.dispatch({
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
