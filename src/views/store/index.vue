<template>
  <div class="app-container">
    <div class="filter-container">
      <el-input
        v-model="search"
        :placeholder="$t('storedetail.search')"
        style="width: 200px;"
        clearable
      />

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
      <el-table-column prop="license" :label="$t('common.license')" width="180" />
      <el-table-column prop="status" :label="$t('storedetail.status')" width="180">
        <template slot-scope="scope">
          <el-tag type="primary" disable-transitions>{{ scope.row.restaurantStatus.toUpperCase() }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column
        :label="$t('common.actions')"
        align="center"
        width="230"
        class-name="small-padding fixed-width"
      >
        <template slot-scope="scope">
          <el-button
            v-if="scope.row.resaturantStatus !== 'draft'"
            type="primary"
            size="mini"
            @click="handleCheckStore(scope.row)"
          >{{ $t('storedetail.check') }}</el-button>
          <el-button
            v-else
            type="primary"
            size="mini"
            @click="handleCreateStore(scope.row)"
          >{{ $t('storedetail.create') }}</el-button>
          <el-button
            v-if="scope.row.resaturantStatus!='deleted'"
            size="mini"
            type="danger"
            @click="handleDeleteStores(scope.row,'deleted')"
          >{{ $t('common.delete') }}</el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-dialog :visible.sync="dialogStoreFormVisible" :title="$t('storedetail.title')">
      <div class="storeDetail-container">
        <el-form
          ref="storedetailForm"
          :model="storedetailForm"
          class="storeDetail-form"
          auto-complete="on"
          label-position="left"
          :rules="rules"
        >
          <div>
            <!-- name  -->
            <el-form-item :label="$t('storedetail.name')" prop="name">
              <el-input v-if="mode==='create' || mode==='edit'" v-model="storedetailForm.name" />
              <div v-else>{{ detail.name }}</div>
            </el-form-item>
            <!-- display name -->
            <el-form-item :label="$t('storedetail.displayName')" prop="displayname">
              <el-input
                v-if="mode==='create' || mode==='edit'"
                v-model="storedetailForm.displayName"
              />
              <div v-else>{{ detail.displayName }}</div>
            </el-form-item>
            <!-- restaurant type -->
            <el-form-item :label="$t('common.storeType')" prop="restaurantType">
              <el-select
                v-if="mode==='create' || mode==='edit'"
                v-model="storedetailForm.restaurantType"
                :placeholder="$t('storedetail.chooseStoreType')"
              >
                <el-option
                  v-for="st in storeType"
                  :key="st.key"
                  :label="$t(getStoreType(st.key))"
                  :value="st.value"
                />
              </el-select>
              <div v-else>{{ $t(getStoreType(detail.restaurantType)) }}</div>
            </el-form-item>
            <!-- branch name -->
            <el-form-item
              v-if="(mode==='create' || mode==='edit') && storedetailForm.restaurantType===storeType.chain.value"
              :label="$t('common.branchName')"
            >
              <el-input v-model="storedetailForm.branchName" />
            </el-form-item>
            <el-form-item
              v-if="(mode!=='create' && mode!=='edit') && detail.restaurantType===storeType.chain.value"
              :label="$t('common.branchName')"
            >
              <div>{{ detail.branchName }}</div>
            </el-form-item>
            <!-- description  -->
            <el-form-item :label="$t('common.description')">
              <el-input
                v-if="mode==='create' || mode==='edit'"
                v-model="storedetailForm.description"
                type="textarea"
              />
              <div v-else>{{ detail.description }}</div>
            </el-form-item>
            <!-- address -->
            <el-container>
              <el-container>
                <el-aside width="100px">{{ $t('common.address') }}</el-aside>
                <el-main>
                  <!-- address 1 -->
                  <el-form-item :label="$t('common.address1')" prop="address.address1">
                    <el-input
                      v-if="mode==='create' || mode==='edit'"
                      v-model="storedetailForm.address.address1"
                    />
                    <div v-else>{{ detail.address.address1 }}</div>
                  </el-form-item>
                  <el-form-item :label="$t('common.address2')" prop="address2">
                    <el-input
                      v-if="mode==='create' || mode==='edit'"
                      v-model="storedetailForm.address.address2"
                    />
                    <div v-else>{{ detail.address.address2 }}</div>
                  </el-form-item>
                  <!-- district -->
                  <el-form-item :label="$t('common.district')">
                    <el-input
                      v-if="mode==='create' || mode==='edit'"
                      v-model="storedetailForm.address.district"
                    />
                    <div v-else>{{ detail.address.district }}</div>
                  </el-form-item>
                  <!-- city -->
                  <el-form-item :label="$t('common.city')" prop="address.city">
                    <el-input
                      v-if="mode==='create' || mode==='edit'"
                      v-model="storedetailForm.address.city"
                    />
                    <div v-else>{{ detail.address.city }}</div>
                  </el-form-item>
                  <!-- state -->
                  <el-form-item :label="$t('common.state')">
                    <el-input
                      v-if="mode==='create' || mode==='edit'"
                      v-model="storedetailForm.address.state"
                    />
                    <div v-else>{{ detail.address.state }}</div>
                  </el-form-item>
                  <!-- country -->
                  <el-form-item :label="$t('common.country')" prop="address.country">
                    <el-select
                      v-if="mode==='create' || mode==='edit'"
                      v-model="storedetailForm.address.country"
                      filterable
                      placeholder="Select"
                    >
                      <el-option
                        v-for="item in supportCountries"
                        :key="item.key"
                        :label="$t(getCountry(item.key))"
                        :value="item.value"
                      />
                    </el-select>
                    <div
                      v-else
                    >{{ detail.address.country? $t(getCountry(detail.address.country)) : '' }}</div>
                  </el-form-item>
                </el-main>
              </el-container>

              <!-- contact -->
              <el-container>
                <el-aside width="100px">{{ $t('common.contact') }}</el-aside>
                <el-main>
                  <!-- phone number -->
                  <el-form-item :label="$t('common.phoneNumber')" prop="contact.phoneNumber">
                    <el-input
                      v-if="mode==='create' || mode==='edit'"
                      v-model="storedetailForm.contact.phoneNumber"
                    >
                      <template
                        slot="prepend"
                      >{{ storedetailForm.address.country ? "+" + supportCountries[storedetailForm.address.country].phoneCode : "" }}</template>
                    </el-input>
                    <div v-else>{{ detail.contact.phoneNumber }}</div>
                  </el-form-item>
                  <!-- email -->
                  <el-form-item :label="$t('common.email')">
                    <el-input
                      v-if="mode==='create' || mode==='edit'"
                      v-model="storedetailForm.contact.email"
                    />
                    <div v-else>{{ detail.contact.email }}</div>
                  </el-form-item>
                  <!-- web -->
                  <el-form-item :label="$t('common.web')">
                    <el-input
                      v-if="mode==='create' || mode==='edit'"
                      v-model="storedetailForm.contact.web"
                    />
                    <div v-else>{{ detail.contact.web }}</div>
                  </el-form-item>
                  <!-- facebook -->
                  <el-form-item :label="$t('common.facebook')">
                    <el-input
                      v-if="mode==='create' || mode==='edit'"
                      v-model="storedetailForm.contact.facebook"
                    />
                    <div v-else>{{ detail.contact.facebook }}</div>
                  </el-form-item>
                  <!-- yelp -->
                  <el-form-item :label="$t('common.yelp')">
                    <el-input
                      v-if="mode==='create' || mode==='edit'"
                      v-model="storedetailForm.contact.yelp"
                    />
                    <div v-else>{{ detail.contact.yelp }}</div>
                  </el-form-item>
                </el-main>
              </el-container>
            </el-container>
            <el-container>
              <!-- edit mode -->
              <el-container v-if="mode==='edit'">
                <el-button
                  :loading="loading"
                  type="primary"
                  style="width:80%;margin-bottom:30px;"
                  @click.native.prevent="handleConfirmUpdate('storedetailForm')"
                >{{ $t('common.confirm') }}</el-button>

                <el-button
                  :loading="loading"
                  type="primary"
                  style="width:80%;margin-bottom:30px;"
                  @click.native.prevent="handleCancel"
                >{{ $t('common.cancel') }}</el-button>
              </el-container>
              <!-- create mode -->
              <el-container v-else-if="mode==='create'">
                <el-button
                  :loading="loading"
                  type="primary"
                  style="width:80%;margin-bottom:30px;"
                  @click.native.prevent="handleDraft('storedetailForm')"
                >{{ $t('common.saveDraft') }}</el-button>
                <el-button
                  :loading="loading"
                  type="primary"
                  style="width:80%;margin-bottom:30px;"
                  :disabled="false"
                  @click.native.prevent="handleAdd('storedetailForm')"
                >{{ $t('common.confirm') }}</el-button>
                <el-button
                  :loading="loading"
                  type="primary"
                  style="width:80%;margin-bottom:30px;"
                  @click.native.prevent="handleCancel"
                >{{ $t('common.cancel') }}</el-button>
              </el-container>
              <!-- display mode -->
              <el-container v-else>
                <el-button
                  :loading="loading"
                  type="primary"
                  style="width:80%;margin-bottom:30px;"
                  @click.native.prevent="handleEdit"
                >{{ $t('common.edit') }}</el-button>
                <el-button
                  :loading="loading"
                  type="primary"
                  style="width:80%;margin-bottom:30px;"
                  @click.native.prevent="handleCancel"
                >{{ $t('common.cancel') }}</el-button>
                <el-button
                  :loading="loading"
                  type="danger"
                  style="width:80%;margin-bottom:30px;"
                  @click.native.prevent="handleDelete"
                >{{ $t('common.delete') }}</el-button>
              </el-container>
            </el-container>
          </div>
        </el-form>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { RESTAURANT_TYPE, SUPPORT_COUNTRIES } from '@/utils/constants'
export default {
  name: 'StoreManagement',
  components: {},
  directives: {},
  data() {
    const addressValidate = (rule, value, callback) => {
      console.log('save as draft: ', this.saveAsDraft)
      if (!this.saveAsDraft) {
        if (!value) {
          return callback(new Error('address field is mandatory!'))
        } else {
          callback()
        }
        // setTimeout(() => {
        //   if (!Number.isInteger(value)) {
        //     callback(new Error('Please input digits'));
        //   } else {
        //     if (value < 18) {
        //       callback(new Error('Age must be greater than 18'));
        //     } else {
        //       callback();
        //     }
        //   }
        // }, 1000);
      } else {
        callback()
      }
    }
    const contactValidate = (rule, value, callback) => {
      if (!this.saveAsDraft) {
        if (!value) {
          return callback(new Error('contact field is mandatory!'))
        } else {
          callback()
        }
      } else {
        callback()
      }
    }
    return {
      key: 1, // 为了能每次切换权限的时候重新初始化指令
      search: '',
      dialogStoreFormVisible: false,
      dialogStatus: '',
      loading: false,
      mode: '',
      storedetailForm: {},
      detail: { address: {}, contact: {}},
      storeType: RESTAURANT_TYPE,
      supportCountries: SUPPORT_COUNTRIES,
      saveAsDraft: false,
      rules: {
        name: [
          { required: true, message: 'name is required', trigger: 'blur' }
        ],
        restaurantType: [
          { required: true, message: 'restaurant type is required' }
        ],
        'address.address1': [
          { required: true, validator: addressValidate, trigger: 'blur' }
        ],
        'address.city': [
          { required: true, validator: addressValidate, trigger: 'blur' }
        ],
        'address.country': [
          { required: true, validator: addressValidate, trigger: 'blur' }
        ],
        'contact.phoneNumber': [
          { required: true, validator: contactValidate, trigger: 'blur' }
        ]
      }
    }
  },
  computed: {
    // detail() {
    //   const val = this.$store.getters['storeDetails/details'].filter(s => s.id === this.storeid)[0]
    //   console.log(this.storeid, val)
    //   return val
    // },

    newStore() {
      return {
        name: '',
        license: '',
        displayName: '',
        restaurantType: '',
        description: '',
        address: {
          address1: '',
          address2: '',
          district: '',
          city: '',
          state: '',
          country: '',
          zipcode: '',
          nickname: ''
        },
        contact: {
          phoneNumber: '',
          email: '',
          web: '',
          facebook: '',
          yelp: '',
          others: {}
        }
      }
    },
    ...mapGetters({
      details: 'storeDetails/details'
    })
  },
  methods: {
    getCountry(country) {
      console.log('get country: ', country)
      return `country.${country}`
    },
    getStoreType(type) {
      return `storeType.${type}`
    },
    clear() {
      this.detail = { address: {}, contact: {}}
      this.storedetailForm = { address: {}, contact: {}}
    },
    handleAddStore() {
      console.log('handle add store')
      this.mode = 'create'
      this.dialogStoreFormVisible = true
      this.storedetailForm = Object.assign({}, this.newStore)
      this.$nextTick(() => {
        this.$refs['storedetailForm'].clearValidate()
      })
    },
    handleCheckStore(row) {
      console.log('handle check store: ', row)
      this.detail = Object.assign({}, row) // copy obj
      this.mode = ''
      this.dialogStoreFormVisible = true
    },
    handleCreateStore(row) {
      console.log('handle keep creating store: ', row)
      this.storedetailForm = Object.assign({}, row) // copy obj
      this.mode = 'create'
      this.dialogStoreFormVisible = true
    },
    handleDeleteStores() {
      this.mode = 'delete'
      this.dialogStoreFormVisible = true
      this.$nextTick(() => {
        this.$refs['storedetailForm'].clearValidate()
      })
    },
    handleEdit() {
      this.storedetailForm = Object.assign({}, this.detail)
      this.mode = 'edit'
      console.log('editing, ', this.storedetailForm)
    },
    handleCancel() {
      this.mode = ''
      this.clear()
      this.dialogStoreFormVisible = false
    },
    handleAdd(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.storedetailForm['restaurantStatus'] = 'pending'
          this.createStore()
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    handleConfirmUpdate(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.updateStore()
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },

    handleDraft(formName) {
      this.saveAsDraft = true
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.storedetailForm['restaurantStatus'] = 'draft'
          this.createStore()
        } else {
          console.log('error submit!!')
          return false
        }
      })
      this.saveAsDraft = false
    },
    createStore() {
      this.$store.dispatch('storeDetails/createStore', {
        storeDetail: this.storedetailForm,
        mode: this.mode
      })
      this.dialogStoreFormVisible = false
      this.mode = ''
      this.clear()
    },
    updateStore() {
      this.$store.dispatch('storeDetails/updateStore', {
        storeDetail: this.storedetailForm,
        mode: this.mode
      })
      this.dialogStoreFormVisible = false
      this.mode = ''
      this.clear()
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

