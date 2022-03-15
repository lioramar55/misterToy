<template>
  <section v-if="toys" class="toy-list">
    <el-row>
      <el-col v-for="toy in toys" :key="toy._id" :span="8">
        <el-card :body-style="{ padding: '0px' }">
          <toy-preview :toy="toy"></toy-preview>
        </el-card>
      </el-col>
    </el-row>
  </section>
  <section v-else>Loading...</section>
</template>

<script>
import toyPreview from './toy-preview.vue'
export default {
  name: 'toy-list',
  props: {
    toys: Object,
  },
  data() {
    return {}
  },
  components: {
    toyPreview,
  },
}
</script>

<style></style>
