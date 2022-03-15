<template>
  <div class="labels">
    <el-tag
      v-for="label in toy.labels"
      :key="label + toy._id"
      class="ml-2"
      type="info"
      >{{ label }}</el-tag
    >
  </div>
</template>

<script>
export default {
  props: {
    toy: Object,
  },
  created() {
    console.log('this.toy', this.toy)
  },
}
</script>

<style></style>
