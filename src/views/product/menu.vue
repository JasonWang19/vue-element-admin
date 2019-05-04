<template>
  <div class="app-container">
    <!-- <el-tabs v-model="activeName" style="margin-top:15px;" type="border-card">
    <el-tab-pane label="All">-->
    <el-container>
      <el-header>{{ $t('menu.category') }}</el-header>
      <el-main>
        <el-tag
          v-for="category in categories"
          :key="category"
          style="margin:10px"
        >{{ category }}</el-tag>
        <!-- @click="handleUpdateCategory(category)" -->
      </el-main>
    </el-container>

    <div class="filter-container">
      <el-input
        v-model="listQuery.title"
        :placeholder="$t('menu.name')"
        style="width: 200px;"
        class="filter-item"
        @keyup.enter.native="handleFilter"
      />

      <el-button
        class="filter-item"
        style="margin-left: 10px;"
        type="primary"
        icon="el-icon-edit"
        @click="handleCreateCategory"
      >{{ $t('menu.addCategory') }}</el-button>
      <el-button
        class="filter-item"
        style="margin-left: 10px;"
        type="primary"
        icon="el-icon-edit"
        @click="handleCreate"
      >{{ $t('menu.add') }}</el-button>
      <el-button
        v-waves
        :loading="downloadLoading"
        class="filter-item"
        type="primary"
        icon="el-icon-download"
        @click="handleDownload"
      >{{ $t('menu.export') }}</el-button>
      <!-- <el-checkbox v-model="showReviewer" class="filter-item" style="margin-left:15px;" @change="tableKey=tableKey+1">
        {{ $t('menu.reviewer') }}
      </el-checkbox>-->
    </div>

    <el-table
      :key="tableKey"
      v-loading="listLoading"
      :data="list"
      border
      fit
      highlight-current-row
      style="width: 100%;"
      @sort-change="sortChange"
    >
      <!-- <el-table-column :label="$t('menu.date')" width="150px" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.timestamp | parseTime('{y}-{m}-{d} {h}:{i}') }}</span>
        </template>
      </el-table-column>-->
      <el-table-column :label="$t('menu.name')" min-width="150px">
        <template slot-scope="scope">
          <span class="link-type" @click="handleUpdate(scope.row)">{{ scope.row.name }}</span>
        </template>
      </el-table-column>
      <el-table-column
        :label="$t('menu.category')"
        prop="id"
        sortable="custom"
        align="center"
        width="80"
      >
        <template slot-scope="scope">
          <span>{{ scope.row.categories }}</span>
        </template>
      </el-table-column>

      <!-- <el-table-column :label="$t('menu.author')" width="110px" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.author }}</span>
        </template>
      </el-table-column>
      <el-table-column
        v-if="showReviewer"
        :label="$t('menu.reviewer')"
        width="110px"
        align="center"
      >
        <template slot-scope="scope">
          <span style="color:red;">{{ scope.row.reviewer }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('menu.rating')" width="80px">
        <template slot-scope="scope">
          <svg-icon
            v-for="n in +scope.row.importance"
            :key="n"
            icon-class="star"
            class="meta-item__icon"
          />
        </template>
      </el-table-column>
      <el-table-column :label="$t('menu.orders')" align="center" width="95">
        <template slot-scope="scope">
          <span
            v-if="scope.row.pageviews"
            class="link-type"
            @click="handleFetchPv(scope.row.pageviews)"
          >{{ scope.row.pageviews }}</span>
          <span v-else>0</span>
        </template>
      </el-table-column>-->
      <el-table-column :label="$t('menu.status')" class-name="status-col" width="100">
        <template slot-scope="scope">
          <el-tag :type="scope.row.status | statusFilter">{{ scope.row.status }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column
        :label="$t('menu.actions')"
        align="center"
        width="230"
        class-name="small-padding fixed-width"
      >
        <template slot-scope="scope">
          <el-button
            type="primary"
            size="mini"
            @click="handleUpdate(scope.row)"
          >{{ $t('menu.edit') }}</el-button>
          <el-button
            v-if="scope.row.status!='published'"
            size="mini"
            type="success"
            @click="handleModifyStatus(scope.row,'published')"
          >{{ $t('menu.publish') }}</el-button>
          <el-button
            v-if="scope.row.status!='draft'"
            size="mini"
            @click="handleModifyStatus(scope.row,'draft')"
          >{{ $t('menu.draft') }}</el-button>
          <el-button
            v-if="scope.row.status!='deleted'"
            size="mini"
            type="danger"
            @click="handleModifyStatus(scope.row,'deleted')"
          >{{ $t('menu.delete') }}</el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- create/update new dish -->
    <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible">
      <el-form
        ref="dataForm"
        :rules="rules"
        :model="temp"
        label-position="left"
        label-width="90px"
        style="width: 400px; margin-left:50px;"
      >
        <!-- <el-form-item :label="$t('menu.category')" prop="category">
          <el-select v-model="temp.type" class="filter-item" placeholder="Please select">
            <el-option v-for="item in calendarTypeOptions" :key="item.key" :label="item.display_name" :value="item.key" />
          </el-select>
        </el-form-item>-->
        <el-form-item :label="$t('menu.category')" prop="category">
          <el-drag-select v-model="temp.categories" style="width:500px;" multiple placeholder="请选择">
            <el-option v-for="item in categories" :key="item" :label="item" :value="item" />
          </el-drag-select>

          <div style="margin-top:30px;">
            <el-tag
              v-for="item of temp.categories"
              :key="item"
              style="margin-right:15px;"
            >{{ item }}</el-tag>
          </div>
        </el-form-item>
        <el-form-item :label="$t('menu.name')" prop="name">
          <el-input v-model="temp.name" />
        </el-form-item>
        <el-form-item :label="$t('menu.status')">
          <el-select v-model="temp.status" class="filter-item" placeholder="Please select">
            <el-option v-for="item in statusOptions" :key="item" :label="item" :value="item" />
          </el-select>
        </el-form-item>
        <el-form-item :label="$t('menu.description')">
          <el-input
            v-model="temp.description"
            :autosize="{ minRows: 2, maxRows: 4}"
            type="textarea"
            placeholder="Please input"
          />
        </el-form-item>
        <el-form-item :label="$t('menu.price')">
          <el-input v-model="temp.price" />
        </el-form-item>
        <el-form-item :label="$t('menu.listPrice')">
          <el-input v-model="temp.listPrice" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">{{ $t('menu.cancel') }}</el-button>
        <el-button
          type="primary"
          @click="dialogStatus==='create'?createDish():updateDish()"
        >{{ $t('menu.confirm') }}</el-button>
      </div>
    </el-dialog>

    <el-dialog :visible.sync="dialogPvVisible" title="Reading statistics">
      <el-table :data="pvData" border fit highlight-current-row style="width: 100%">
        <el-table-column prop="key" label="Channel" />
        <el-table-column prop="pv" label="Pv" />
      </el-table>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="dialogPvVisible = false">{{ $t('menu.confirm') }}</el-button>
      </span>
    </el-dialog>

    <!-- create/update category -->
    <el-dialog :visible.sync="dialogCategoryVisible" title="Create Category">
      <el-form
        ref="dataForm"
        :model="categoryTemp"
        label-position="left"
        label-width="90px"
        style="width: 400px; margin-left:50px;"
      >
        <el-form-item :label="$t('menu.category')" prop="category">
          <el-input v-model="categoryTemp.category" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogCategoryVisible = false">{{ $t('menu.cancel') }}</el-button>
        <el-button
          type="primary"
          @click="dialogStatus==='createCategory'?createCategoryData():updateCategoryData()"
        >{{ $t('menu.confirm') }}</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import {
  fetchPv
} from '@/api/article'
import waves from '@/directive/waves' // Waves directive
import { parseTime } from '@/utils'
import ElDragSelect from '@/components/DragSelect' // base on element-ui
// import { mapGetters } from 'vuex'

const calendarTypeOptions = [
  { key: 'CN', display_name: 'China' },
  { key: 'US', display_name: 'USA' },
  { key: 'JP', display_name: 'Japan' },
  { key: 'EU', display_name: 'Eurozone' }
]

// arr to obj ,such as { CN : "China", US : "USA" }
const calendarTypeKeyValue = calendarTypeOptions.reduce((acc, cur) => {
  acc[cur.key] = cur.display_name
  return acc
}, {})

const TEMP = {
  timestamp: new Date(),
  name: '',
  type: '',
  status: '',
  description: '',
  categories: []
}
export default {
  name: 'ComplexTable',
  components: { ElDragSelect },
  directives: { waves },
  filters: {
    statusFilter(status) {
      const statusMap = {
        published: 'success',
        draft: 'info',
        deleted: 'danger'
      }
      return statusMap[status]
    },
    typeFilter(type) {
      return calendarTypeKeyValue[type]
    }
  },
  data() {
    return {
      existingData: undefined,
      tableKey: 0,
      total: 0,
      listLoading: false,
      listQuery: {
        page: 1,
        limit: 20,
        importance: undefined,
        title: undefined,
        type: undefined,
        sort: '+id'
      },
      importanceOptions: [1, 2, 3],
      calendarTypeOptions,
      sortOptions: [
        { label: 'ID Ascending', key: '+id' },
        { label: 'ID Descending', key: '-id' }
      ],
      statusOptions: ['published', 'draft', 'deleted'],
      showReviewer: false,
      temp: Object.assign({}, TEMP),
      categoryTemp: {},
      dialogFormVisible: false,
      dialogStatus: '',
      textMap: {
        update: 'Edit',
        create: 'Create',
        createCategory: 'Create Category'
      },
      dialogPvVisible: false,
      dialogCategoryVisible: false,
      pvData: [],
      rules: {
        categories: [
          { required: true, message: 'category is required', trigger: 'change' }
        ],

        name: [{ required: true, message: 'name is required', trigger: 'blur' }]
      },
      downloadLoading: false
    }
  },
  computed: {
    list() {
      const curMenu = this.$store.getters.currentMenu

      console.log('display current menu', curMenu)
      if (curMenu) {
        return curMenu.items
      }
      return []
    },
    categories() {
      const curMenu = this.$store.getters.currentMenu

      console.log('display current menu', curMenu)
      if (curMenu) {
        return curMenu.categories
      }
      return []
    }
    // ...mapGetters({
    //   list: "currentMenu"
    // })
  },
  created() {
    // this.getList();
  },
  methods: {
    getList() {
      this.listLoading = true
    },
    handleFilter() {
      this.listQuery.page = 1
      this.getList()
    },
    handleModifyStatus(row, status) {
      this.existingData = Object.assign({}, row)
      this.$message({
        message: '操作成功',
        type: 'success'
      })
      row.status = status
      const tempData = Object.assign({}, row)
      this.$store.dispatch('product/updateDishCategory', {
        category: undefined,
        dish: tempData,
        exist: this.existingData
      })
    },
    sortChange(data) {
      const { prop, order } = data
      if (prop === 'id') {
        this.sortByID(order)
      }
    },
    sortByID(order) {
      if (order === 'ascending') {
        this.listQuery.sort = '+id'
      } else {
        this.listQuery.sort = '-id'
      }
      this.handleFilter()
    },
    resetTemp() {
      this.temp = Object.assign({}, TEMP)
    },
    resetCategoryTemp() {
      this.categoryTemp = {}
    },
    handleCreate() {
      this.resetTemp()
      this.dialogStatus = 'create'
      this.dialogFormVisible = true
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
      })
    },
    handleCreateCategory() {
      this.resetCategoryTemp()
      this.dialogStatus = 'createCategory'
      // this.dialogFormVisible = true
      this.dialogCategoryVisible = true
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
      })
    },
    handleUpdateCategory(category) {
      this.existingData = category
      this.dialogStatus = 'updateCategory'
      this.categoryTemp.category = category
      // this.dialogFormVisible = true
      this.dialogCategoryVisible = true
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
      })
    },

    createDish() {
      this.$refs['dataForm'].validate(valid => {
        if (valid) {
          // this.temp.id = parseInt(Math.random() * 100) + 1024; // mock a id
          // this.temp.author = "admin";
          this.$store.dispatch('product/createDishCategory', {
            category: null,
            dish: this.temp
          })
          this.dialogFormVisible = false
        }
      })
    },
    createCategoryData() {
      this.$refs['dataForm'].validate(valid => {
        if (valid) {
          this.$store.dispatch('product/createDishCategory', {
            category: this.categoryTemp.category,
            dish: null
          })
          this.dialogCategoryVisible = false
          this.$notify({
            title: '成功',
            message: '创建成功',
            type: 'success',
            duration: 2000
          })
        }
      })
    },
    updateCategoryData() {
      this.$refs['dataForm'].validate(valid => {
        if (valid) {
          this.$store.dispatch('product/updateDishCategory', {
            category: this.categoryTemp.category,
            dish: null,
            existing: this.existingData
          })
          this.dialogCategoryVisible = false
          this.$notify({
            title: '成功',
            message: '更新成功',
            type: 'success',
            duration: 2000
          })
        }
      })
    },
    handleUpdate(row) {
      this.temp = Object.assign({}, row) // copy obj
      this.existingData = Object.assign({}, row)
      this.dialogStatus = 'update'
      this.dialogFormVisible = true
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
      })
    },
    updateDish() {
      this.$refs['dataForm'].validate(valid => {
        if (valid) {
          const tempData = Object.assign({}, this.temp)
          this.$store.dispatch('product/updateDishCategory', {
            category: undefined,
            dish: tempData,
            exist: this.existingData
          })
          // updateArticle(tempData).then(() => {
          //   for (const v of this.list) {
          //     if (v.id === this.temp.id) {
          //       const index = this.list.indexOf(v);
          //       this.list.splice(index, 1, this.temp);
          //       break;
          //     }
          //   }
          //   this.dialogFormVisible = false;
          //   this.$notify({
          //     title: "成功",
          //     message: "更新成功",
          //     type: "success",
          //     duration: 2000
          //   });
          // });
          this.dialogFormVisible = false
        }
      })
    },
    handleDelete(row) {
      this.$notify({
        title: '成功',
        message: '删除成功',
        type: 'success',
        duration: 2000
      })
      const index = this.list.indexOf(row)
      this.list.splice(index, 1)
    },
    handleFetchPv(pv) {
      fetchPv(pv).then(response => {
        this.pvData = response.data.pvData
        this.dialogPvVisible = true
      })
    },
    handleDownload() {
      this.downloadLoading = true
      import('@/vendor/Export2Excel').then(excel => {
        const tHeader = ['timestamp', 'title', 'type', 'importance', 'status']
        const filterVal = [
          'timestamp',
          'title',
          'type',
          'importance',
          'status'
        ]
        const data = this.formatJson(filterVal, this.list)
        excel.export_json_to_excel({
          header: tHeader,
          data,
          filename: 'table-list'
        })
        this.downloadLoading = false
      })
    },
    formatJson(filterVal, jsonData) {
      return jsonData.map(v =>
        filterVal.map(j => {
          if (j === 'timestamp') {
            return parseTime(v[j])
          } else {
            return v[j]
          }
        })
      )
    }
  }
}
</script>

<style lang="css" scoped>
.el-header {
  background-color: white;
  color: black;
  text-align: left;
  line-height: 60px;
}
</style>
