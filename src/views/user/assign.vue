<template>
  <div class="app-container">
    <show-roles />

    <div class="filter-container">
      <el-input v-model="search" :placeholder="$t('user.search')" style="width: 200px;" />

      <el-button
        class="filter-item"
        style="margin-left: 10px;"
        type="primary"
        icon="el-icon-edit"
        @click="handleAddUser"
      >{{ $t('user.addUser') }}</el-button>
      <el-button
        class="filter-item"
        style="margin-left: 10px;"
        type="primary"
        icon="el-icon-delete"
        @click="handleDeleteUsers"
      >{{ $t('user.deleteUsers') }}</el-button>
    </div>
    <el-table
      :data="userData.filter(data => !search || data.name.toLowerCase().includes(search.toLowerCase()) || data.username.toLowerCase().includes(search.toLowerCase()))"
      :default-sort="{prop: 'date', order: 'descending'}"
      border
      style="width: 100%"
    >
      <el-table-column type="selection" width="55" />
      <el-table-column prop="date" :label="$t('user.ts')" sortable width="180" />
      <el-table-column prop="username" :label="$t('user.username')" width="180" />
      <el-table-column prop="name" :label="$t('user.name')" width="180" />
      <el-table-column prop="role" sortable :label="$t('user.role')" />
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
            @click="handleUpdateUser(scope.row)"
          >{{ $t('common.edit') }}</el-button>
          <el-button
            v-if="scope.row.status!='deleted'"
            size="mini"
            type="danger"
            @click="handleDeleteUsers(scope.row,'deleted')"
          >{{ $t('common.delete') }}</el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-dialog :visible.sync="dialogUserForm" title="User">
      <el-form
        ref="dataForm"
        :rules="rules"
        :model="temp"
        label-position="left"
        label-width="90px"
        style="width: 400px; margin-left:50px;"
      >
        <el-form-item :label="$t('user.username')" prop="username">
          <el-input v-model="temp.username" />
        </el-form-item>
        <el-form-item :label="$t('user.role')" prop="role">
          <el-input v-model="temp.role" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogUserForm = false">{{ $t('common.cancel') }}</el-button>
        <el-button
          type="primary"
          @click="dialogStatus==='addUser'?assignUserRole():updateUserRole()"
        >{{ $t('common.confirm') }}</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import permission from '@/directive/permission/index.js' // 权限判断指令
import checkPermission from '@/utils/permission' // 权限判断函数
import ShowRoles from './components/ShowRoles'

export default {
  name: 'AssignPermission',
  components: { ShowRoles },
  directives: { permission },
  data() {
    return {
      key: 1, // 为了能每次切换权限的时候重新初始化指令
      search: '',
      dialogUserForm: false,
      temp: {
        id: undefined,
        importance: 1,
        remark: '',
        timestamp: new Date(),
        title: '',
        type: '',
        status: 'published'
      },
      userData: [
        {
          date: '2016-05-03',
          name: 'Tom',
          username: 'tom',
          role: 'admin'
        },
        {
          date: '2016-05-02',
          name: 'John',
          username: 'jo123',
          role: 'editor'
        },
        {
          date: '2016-05-04',
          name: 'Morgan',
          username: 'mg333',
          role: 'editor'
        },
        {
          date: '2016-05-01',
          name: 'Jessy',
          username: 'jy990',
          role: 'visitor'
        }
      ],
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
    checkPermission,
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
    handleAddUser() {
      console.log('handle add user')
      this.resetTemp()
      this.dialogStatus = 'assign'
      this.dialogUserForm = true
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
      })
    },
    handleUpdateUser(row) {
      console.log('handle update user: ', row)
      this.temp = Object.assign({}, row) // copy obj
      this.temp.timestamp = new Date(this.temp.timestamp)
      this.dialogStatus = 'update'
      this.dialogUserForm = true
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
      })
    },
    handleDeleteUsers() {
      this.resetTemp()
      this.dialogStatus = 'createCategory'
      this.dialogUserForm = true
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
      })
    },
    assignUserRole() {
      console.log('assign user role')
    },
    updateUserRole() {
      console.log('update user role')
    }
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

