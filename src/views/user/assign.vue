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
      <el-table-column prop="timestamp" :label="$t('user.ts')" sortable width="180" />
      <el-table-column prop="username" :label="$t('user.username')" width="180" />
      <el-table-column prop="fullName" :label="$t('user.name')" width="180" />
      <el-table-column prop="shopRoles" sortable :label="$t('user.role')" />
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
        <el-form-item :label="$t('user.role')" prop="shopRole">
          <el-select v-model="temp.shopRole">
            <el-option v-for="r in roles" :key="r.text" :label="r.text" :value="r.value" />
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogUserForm = false">{{ $t('common.cancel') }}</el-button>
        <el-button
          type="primary"
          @click="dialogStatus==='assign'?assignUserRole('dataForm'):updateUserRole()"
        >{{ $t('common.confirm') }}</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import permission from '@/directive/permission/index.js' // 权限判断指令
import checkPermission from '@/utils/permission' // 权限判断函数
import ShowRoles from './components/ShowRoles'
import { assignPermission, checkUsername } from '@/api/user'
import { SHOP_ROLES, SHOP_TYPE } from '@/utils/constants'
import { mapGetters } from 'vuex'

const TEMP = {
  timestamp: new Date(),
  shopRole: null,
  username: null
}
export default {
  name: 'AssignPermission',
  components: { ShowRoles },
  directives: { permission },
  data() {
    const checkUser = (rule, value, callback) => {
      console.log('checking username to assign role', rule, value)
      checkUsername(value).then(data => {
        if (data) {
          callback()
        } else {
          callback(
            new Error(`Username ${value} can not be found, please verify!`)
          )
        }
      })
    }
    return {
      key: 1, // 为了能每次切换权限的时候重新初始化指令
      search: '',
      dialogUserForm: false,
      roles: SHOP_ROLES,
      temp: Object.assign({}, TEMP),
      rules: {
        username: [
          { required: true, message: 'need a valid username', trigger: 'blur' },
          { required: true, validator: checkUser, trigger: 'blur' }
        ],
        shopRole: [
          { required: true, message: 'role is required', trigger: 'blur' }
        ]
      }
    }
  },
  computed: {
    // userData() {
    //   // const curMenu = this.$store.getters.currentMenu

    //   console.log('display current users', this.$store.getters['storeDetails/currentStoreUsers'])
    //   // if (curMenu) {
    //   //   return curMenu.items
    //   // }
    //   return []
    // },
    ...mapGetters({
      userData: 'storeDetails/currentStoreUsers'
    })
  },
  methods: {
    checkPermission,
    resetTemp() {
      this.temp = Object.assign({}, TEMP)
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
    assignUserRole(formName) {
      this.$refs[formName].validate(valid => {
        console.log('assign user role', this.temp)
        console.log(
          'assign user role, current store',
          this.$store.state.storeDetails.currentStore.id
        )
        if (valid) {
          return new Promise((resolve, reject) => {
            return assignPermission({
              username: this.temp.username,
              data: {
                shopType: SHOP_TYPE.RESTAURANT,
                shopId: this.$store.state.storeDetails.currentStore.id,
                shopRoles: [this.temp.shopRole]
              }
            })
              .then(response => {
                console.log('assign user role, ', response)
                this.dialogUserForm = false
                resolve()
              })
              .catch(err => reject(err))
          })
        } else {
          console.log('error submit!!')
          return false
        }
      })
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

