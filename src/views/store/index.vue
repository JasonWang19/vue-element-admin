<template>
  <div class="app-container">
    <div class="filter-container">
      <el-input v-model="search" :placeholder="$t('storedetail.search')" style="width: 200px;" />

      <el-button
        class="filter-item"
        style="margin-left: 10px;"
        type="primary"
        icon="el-icon-edit"
        @click="handleAddStore"
      >{{ $t('storedetail.add') }}</el-button>
      <el-button
        class="filter-item"
        style="margin-left: 10px;"
        type="primary"
        icon="el-icon-delete"
        @click="handleDeleteStores"
      >{{ $t('storedetail.delete') }}</el-button>
    </div>
    <el-table
      :data="details.filter(data => !search || data.name.toLowerCase().includes(search.toLowerCase()) || data.displayName.toLowerCase().includes(search.toLowerCase()))"
      :default-sort="{prop: 'date', order: 'descending'}"
      border
      style="width: 100%"
    >
      <el-table-column type="selection" width="55" />
      <el-table-column prop="name" :label="$t('storedetail.name')" width="180" />
      <el-table-column prop="displayName" :label="$t('storedetail.displayName')" width="180" />
      <el-table-column prop="license" :label="$t('storedetail.license')" width="180" />
      <el-table-column
        :label="$t('common.actions')"
        align="center"
        width="230"
        class-name="small-padding fixed-width"
      >
        <template slot-scope="scope">
          <el-button
            type="primary"
            size="mini"
            @click="handleCheckStore(scope.row)"
          >{{ $t('storedetail.check') }}</el-button>
          <el-button
            v-if="scope.row.status!='deleted'"
            size="mini"
            type="danger"
            @click="handleDeleteStores(scope.row,'deleted')"
          >{{ $t('common.delete') }}</el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-dialog :visible.sync="dialogStoreFormVisible" :title="$t('storedetail.title')">
      <store-detail :mode="dialogStatus" :storeid="temp.id" />
    </el-dialog>
  </div>
</template>

<script>
import StoreDetail from './components/StoreDetail'
import { mapGetters } from 'vuex'

export default {
  name: 'StoreManagement',
  components: { StoreDetail },
  directives: { },
  data() {
    return {
      key: 1, // 为了能每次切换权限的时候重新初始化指令
      search: '',
      dialogStoreFormVisible: false,
      dialogStatus: '',
      temp: {
        id: undefined,
        importance: 1,
        remark: '',
        timestamp: new Date(),
        title: '',
        type: '',
        status: 'published'
      },
      rules: {
        type: [
          { required: true, message: 'type is required', trigger: 'change' }
        ],
        timestamp: [
          {
            type: 'date',
            required: true,
            message: 'timestamp is required',
            trigger: 'change'
          }
        ],
        title: [
          { required: true, message: 'title is required', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    handleAddStore() {
      console.log('handle add store')
      this.dialogStatus = 'create'
      this.dialogStoreFormVisible = true
      this.$store.dispatch('storeDetails/addNewStore')
      this.$nextTick(() => {
        this.$refs['storedetailForm'].clearValidate()
      })
    },
    handleCheckStore(row) {
      console.log('handle check store: ', row)
      this.temp = Object.assign({}, row) // copy obj
      this.dialogStatus = ''
      this.dialogStoreFormVisible = true
    },
    handleDeleteStores() {
      this.dialogStatus = 'delete'
      this.dialogStoreFormVisible = true
      this.$nextTick(() => {
        this.$refs['storedetailForm'].clearValidate()
      })
    }
  },
  computed: {
    ...mapGetters({
      details: 'storeDetails/details'
    })
  }
}
</script>

<style lang="scss" scoped>
.app-container {
  /deep/ .permission-alert {
    width: 320px;
    margin-top: 15px;
    background-color: #f0f9eb;
    color: #67c23a;
    padding: 8px 16px;
    border-radius: 4px;
    display: inline-block;
  }
  /deep/ .permission-sourceCode {
    margin-left: 15px;
  }
  /deep/ .permission-tag {
    background-color: #ecf5ff;
  }
}
</style>

