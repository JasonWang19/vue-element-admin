<template>
  <div class="tab-container">
    <el-button
      type="primary"
      style="width:80%;margin-bottom:30px;"
      @click.native.prevent="handleAdd"
    >{{ $t('storedetail.add') }}</el-button>
    <el-tabs
      v-if="details && details.length > 0"
      v-model="activeName"
      style="margin-top:15px;"
      type="border-card"
    >
      <el-tab-pane v-for="st in details" :key="st.id" :label="st.name" :name="st.id">
        <!-- <keep-alive> -->
        <store-detail :storeid="st.id" mode="" />
        <!-- </keep-alive> -->
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import StoreDetail from './components/StoreDetail'
import { mapGetters } from 'vuex'

export default {
  name: 'Store',
  components: { StoreDetail },
  data() {
    return {
    }
  },
  computed: {
    ...mapGetters({
      details: 'storeDetails/details'
    })
  },
  methods: {
    handleAdd() {
      this.$store.dispatch('storeDetails/addNewStore')
    }
  }
}
</script>

<style scoped>
.tab-container {
  margin: 30px;
}
</style>
