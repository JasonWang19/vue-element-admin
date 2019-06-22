<template>
  <div class="app-container">
    <div class="filter-container">
      <el-input
        v-model="listQuery.title"
        :placeholder="$t('table.title')"
        style="width: 200px;"
        class="filter-item"
        @keyup.enter.native="handleFilter"
      />
      <el-date-picker
        v-model="listQuery.start"
        type="datetime"
        :placeholder="$t('order.queryStart')"
        class="filter-item"
      />
      <el-date-picker
        v-model="listQuery.end"
        type="datetime"
        :placeholder="$t('order.queryEnd')"
        class="filter-item"
      />
      <el-select
        v-model="listQuery.status"
        :placeholder="$t('order.status')"
        clearable
        style="width: 100px"
        class="filter-item"
      >
        <el-option
          v-for="item in allOrderStatus"
          :key="item.key"
          :label="item.value"
          :value="item.value"
        />
      </el-select>
      <!-- <el-select
        v-model="listQuery.sort"
        style="width: 140px"
        class="filter-item"
        @change="handleFilter"
      >
        <el-option
          v-for="item in sortOptions"
          :key="item.key"
          :label="item.label"
          :value="item.key"
        />
      </el-select>-->
      <el-button
        v-waves
        class="filter-item"
        type="primary"
        icon="el-icon-search"
        @click="handleFilter"
      >{{ $t('table.search') }}</el-button>
      <el-button
        v-waves
        :loading="downloadLoading"
        class="filter-item"
        type="primary"
        icon="el-icon-download"
        @click="handleDownload"
      >{{ $t('table.export') }}</el-button>
      <el-checkbox
        v-model="showReviewer"
        class="filter-item"
        style="margin-left:15px;"
        @change="tableKey=tableKey+1"
      >{{ $t('table.reviewer') }}</el-checkbox>
    </div>

    <el-table
      :key="list.id"
      v-loading="listLoading"
      :data="list"
      border
      fit
      highlight-current-row
      style="width: 100%;"
      @sort-change="sortChange"
    >
      <el-table-column :label="$t('order.id')" prop="id" align="center" width="80">
        <template slot-scope="scope">
          <span class="link-type" @click="handleOrderDetail(scope.row)">{{ scope.row.id }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('order.createDate')" width="150px" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.createDatetime | parseTime('{y}-{m}-{d} {h}:{i}') }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('order.updateDate')" width="150px" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.updateDatetime | parseTime('{y}-{m}-{d} {h}:{i}') }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('order.status')" min-width="150px">
        <template slot-scope="scope">
          <span class="link-type" @click="handleOrderDetail(scope.row)">{{ scope.row.orderStatus }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('order.userId')" width="110px" align="center">
        <template slot-scope="scope">
          <span class="link-type" @click="handleUserDetail(scope.row)">{{ scope.row.userId }}</span>
        </template>
      </el-table-column>
      <!-- <el-table-column v-if="showReviewer" :label="$t('table.reviewer')" width="110px" align="center">
        <template slot-scope="scope">
          <span style="color:red;">{{ scope.row.reviewer }}</span>
        </template>
      </el-table-column>-->
    </el-table>

    <pagination
      v-show="total>0"
      :total="total"
      :page.sync="listQuery.page"
      :limit.sync="listQuery.size"
      @pagination="getList"
    />

    <el-dialog title="Order Detail" :visible.sync="orderDetailFormVisible">
      <el-form
        :model="temp"
        label-position="left"
        label-width="70px"
        style="width: 400px; margin-left:50px;"
      >
        <el-form-item :label="$t('order.id')">
          <div>{{ temp.id }}</div>
        </el-form-item>
        <el-form-item :label="$t('order.createDate')">
          <div>{{ temp.createDatetime | parseTime('{y}-{m}-{d} {h}:{i}') }}</div>
        </el-form-item>
        <el-form-item :label="$t('order.updateDate')">
          <div>{{ temp.updateDatetime | parseTime('{y}-{m}-{d} {h}:{i}') }}</div>
        </el-form-item>
        <el-form-item :label="$t('order.status')">
          <div>{{ temp.orderStatus }}</div>
        </el-form-item>
        <el-form-item :label="$t('order.items')">
          <div>{{ getItemList(temp.items) }}</div>
        </el-form-item>
        <el-form-item :label="$t('order.subtotal')">
          <div>{{ temp.subtotal }}</div>
        </el-form-item>
        <el-form-item :label="$t('order.couponId')">
          <div>{{ temp.couponId }}</div>
        </el-form-item>
        <el-form-item :label="$t('order.save')">
          <div>{{ temp.save }}</div>
        </el-form-item>
        <el-form-item :label="$t('order.tax')">
          <div>{{ temp.tax }}</div>
        </el-form-item>
        <el-form-item :label="$t('order.tips')">
          <div>{{ temp.tips }}</div>
        </el-form-item>
        <el-form-item :label="$t('order.total')">
          <div>{{ temp.total }}</div>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="orderDetailFormVisible = false">{{ $t('common.close') }}</el-button>
      </div>
    </el-dialog>

    <el-dialog :visible.sync="userDetailFormVisible" title="User Detail">
      <el-form
        :model="tempUser"
        label-position="left"
        label-width="70px"
        style="width: 400px; margin-left:50px;"
      >
        <el-form-item :label="$t('order.userId')">
          <div>{{ tempUser.id }}</div>
        </el-form-item>
        <el-form-item :label="$t('user.username')">
          <div>{{ tempUser.username }}</div>
        </el-form-item>
        <el-form-item :label="$t('common.firstName')">
          <div>{{ tempUser.firstName }}</div>
        </el-form-item>
        <el-form-item :label="$t('common.lastName')">
          <div>{{ tempUser.lastName }}</div>
        </el-form-item>
        <el-form-item :label="$t('common.email')">
          <div>{{ tempUser.contact.email }}</div>
        </el-form-item>
        <el-form-item :label="$t('common.phoneNumber')">
          <div>{{ tempUser.contact.phoneNumber }}</div>
        </el-form-item>
        <el-form-item :label="$t('user.type')">
          <div>{{ tempUser.userType }}</div>
        </el-form-item>
        <el-form-item :label="$t('user.status')">
          <div>{{ tempUser.userStatus }}</div>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="userDetailFormVisible = false">{{ $t('common.close') }}</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { getRestaurantOrderFull } from '@/api/order'
import waves from '@/directive/waves' // Waves directive
import { parseTime } from '@/utils'
import Pagination from '@/components/Pagination' // Secondary package based on el-pagination
import { ORDER_STATUS } from '@/utils/constants'
import { getInfoById } from '@/api/user'

export default {
  name: 'ComplexTable',
  components: { Pagination },
  directives: { waves },
  filters: {
    statusFilter(status) {
      const statusMap = {
        published: 'success',
        draft: 'info',
        deleted: 'danger'
      }
      return statusMap[status]
    }
  },
  data() {
    return {
      tableKey: 0,
      list: [],
      total: 0,
      listLoading: false,
      listQuery: {
        page: 0,
        size: 20,
        start: undefined,
        end: undefined,
        status: undefined
      },
      allOrderStatus: ORDER_STATUS,
      sortOptions: [
        { label: 'ID Ascending', key: '+id' },
        { label: 'ID Descending', key: '-id' }
      ],
      statusOptions: ['published', 'draft', 'deleted'],
      showReviewer: false,
      temp: {
        id: undefined,
        importance: 1,
        remark: '',
        timestamp: new Date(),
        title: '',
        type: '',
        status: 'published'
      },
      tempUser: { contact: {}},
      orderDetailFormVisible: false,
      userDetailFormVisible: false,
      dialogPvVisible: false,
      pvData: [],
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
      },
      downloadLoading: false
    }
  },
  computed: {
    currentStore() {
      return this.$store.state.storeDetails.currentStore
    }
  },
  created() {
    // this.getList();
  },
  methods: {
    getList() {
      this.listLoading = true
      console.log(
        'order current state',
        this.$store.state,
        this.$store.state.storeDetails,
        this.currentStore
      )
      this.listQuery.restaurantId = this.currentStore.id
        ? this.currentStore.id
        : undefined
      if (this.listQuery.restaurantId) {
        const listQuery = Object.assign({}, this.listQuery)
        listQuery.start = listQuery.start
          ? listQuery.start.getTime()
          : listQuery.start
        listQuery.end = listQuery.end ? listQuery.end.getTime() : listQuery.end
        getRestaurantOrderFull(listQuery).then(response => {
          console.log('order query response: ', response)
          this.list = response.content
          this.totalPages = response.totalPages
          this.total = response.totalElements

          // this.listLoading = false;
          console.log(
            'order query response2: ',
            this.list,
            this.totalPages,
            this.total
          )
          // Just to simulate the time of the request
          setTimeout(() => {
            this.listLoading = false
          }, 0.5 * 1000)
        })
      }
    },
    getItemList(items) {
      let itemDetails = []
      if (items) {
        const menus = this.$store.state.product.menus.filter(
          m => m.restaurantId === this.currentStore.id
        )
        console.log('item list menus', menus)
        if (menus) {
          const menu = menus[0]
          itemDetails = menu.items.filter(
            i => items.filter(m => m.key === i.id).length > 0
          )
        }
        console.log('item list', items, itemDetails)
      }

      return itemDetails
    },
    handleFilter() {
      this.listQuery.page = 0
      this.getList()
    },
    handleModifyStatus(row, status) {
      this.$message({
        message: '操作成功',
        type: 'success'
      })
      row.status = status
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
      this.temp = {
        id: undefined,
        importance: 1,
        remark: '',
        timestamp: new Date(),
        title: '',
        status: 'published',
        type: ''
      }
    },
    createData() {
      // this.$refs['dataForm'].validate(valid => {
      //   if (valid) {
      //     this.temp.id = parseInt(Math.random() * 100) + 1024 // mock a id
      //     this.temp.author = 'vue-element-admin'
      //     createArticle(this.temp).then(() => {
      //       this.list.unshift(this.temp)
      //       this.orderDetailFormVisible = false
      //       this.$notify({
      //         title: '成功',
      //         message: '创建成功',
      //         type: 'success',
      //         duration: 2000
      //       })
      //     })
      //   }
      // })
    },
    handleOrderDetail(row) {
      this.temp = Object.assign({}, row) // copy obj
      this.temp.timestamp = new Date(this.temp.timestamp)
      this.orderDetailFormVisible = true
    },
    handleUserDetail(row) {
      this.userDetailFormVisible = true
      const userId = row.userId
      getInfoById(userId)
        .then(data => {
          console.log('-- get data of the user info:', data)
          this.tempUser = data
        })
    },

    updateData() {
      // this.$refs['dataForm'].validate(valid => {
      //   if (valid) {
      //     const tempData = Object.assign({}, this.temp)
      //     tempData.timestamp = +new Date(tempData.timestamp) // change Thu Nov 30 2017 16:41:05 GMT+0800 (CST) to 1512031311464
      //     updateArticle(tempData).then(() => {
      //       for (const v of this.list) {
      //         if (v.id === this.temp.id) {
      //           const index = this.list.indexOf(v)
      //           this.list.splice(index, 1, this.temp)
      //           break
      //         }
      //       }
      //       this.orderDetailFormVisible = false
      //       this.$notify({
      //         title: '成功',
      //         message: '更新成功',
      //         type: 'success',
      //         duration: 2000
      //       })
      //     })
      //   }
      // })
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
