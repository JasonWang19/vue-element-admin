<template>
  <div class="storeDetail-container">
    <el-form
      ref="storedetailForm"
      :model="storedetailForm"
      class="storeDetail-form"
      auto-complete="on"
      label-position="left"
    >
      <div>
        <el-form-item :label="$t('storedetail.name')">
          <el-input v-if="mode==='create' || mode==='edit'" v-model="storedetailForm.name" />
          <div v-else>{{ detail.name }}</div>
        </el-form-item>
        <el-form-item :label="$t('storedetail.displayName')">
          <el-input v-if="mode==='create' || mode==='edit'" v-model="storedetailForm.displayName" />
          <div v-else>{{ detail.displayName }}</div>
        </el-form-item>
        <el-form-item :label="$t('storedetail.storeType')">
          <el-select v-if="mode==='create' || mode==='edit'" v-model="storedetailForm.storeType">
            <el-option label="Zone one" value="shanghai" />
            <el-option label="Zone two" value="beijing" />
          </el-select>
          <div v-else>{{ detail.storeType }}</div>
        </el-form-item>

        <el-form-item :label="$t('storedetail.description')">
          <el-input
            v-if="mode==='create' || mode==='edit'"
            v-model="storedetailForm.description"
            type="textarea"
          />
          <div v-else>{{ detail.description }}</div>
        </el-form-item>
        <el-container>
          <el-container>
            <el-aside width="100px">{{ $t('storedetail.address') }}</el-aside>
            <el-main>
              <el-form-item :label="$t('storedetail.address1')">
                <el-input
                  v-if="mode==='create' || mode==='edit'"
                  v-model="storedetailForm.address.address1"
                />
                <div v-else>{{ detail.address.address1 }}</div>
              </el-form-item>
              <el-form-item :label="$t('storedetail.district')">
                <el-input
                  v-if="mode==='create' || mode==='edit'"
                  v-model="storedetailForm.address.district"
                />
                <div v-else>{{ detail.address.district }}</div>
              </el-form-item>
              <el-form-item :label="$t('storedetail.city')">
                <el-input v-if="mode==='create' || mode==='edit'" v-model="storedetailForm.address.city" />
                <div v-else>{{ detail.address.city }}</div>
              </el-form-item>
              <el-form-item :label="$t('storedetail.state')">
                <el-input v-if="mode==='create' || mode==='edit'" v-model="storedetailForm.address.state" />
                <div v-else>{{ detail.address.state }}</div>
              </el-form-item>
              <el-form-item :label="$t('storedetail.country')">
                <el-input
                  v-if="mode==='create' || mode==='edit'"
                  v-model="storedetailForm.address.country"
                />
                <div v-else>{{ detail.address.country }}</div>
              </el-form-item>
            </el-main>
          </el-container>
          <el-container>
            <el-aside width="100px">{{ $t('storedetail.contact') }}</el-aside>
            <el-main>
              <el-form-item :label="$t('storedetail.phoneNumber')">
                <el-input
                  v-if="mode==='create' || mode==='edit'"
                  v-model="storedetailForm.contact.phoneNumber"
                />
                <div v-else>{{ detail.contact.phoneNumber }}</div>
              </el-form-item>
              <el-form-item :label="$t('storedetail.email')">
                <el-input
                  v-if="mode==='create' || mode==='edit'"
                  v-model="storedetailForm.contact.email"
                />
                <div v-else>{{ detail.contact.email }}</div>
              </el-form-item>
              <el-form-item :label="$t('storedetail.web')">
                <el-input v-if="mode==='create' || mode==='edit'" v-model="storedetailForm.contact.web" />
                <div v-else>{{ detail.contact.web }}</div>
              </el-form-item>
              <el-form-item :label="$t('storedetail.facebook')">
                <el-input v-if="mode==='create' || mode==='edit'" v-model="storedetailForm.contact.facebook" />
                <div v-else>{{ detail.contact.facebook }}</div>
              </el-form-item>
              <el-form-item :label="$t('storedetail.yelp')">
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
              @click.native.prevent="handleConfirm"
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
              @click.native.prevent="handleDraft"
            >{{ $t('common.saveDraft') }}</el-button>
            <el-button
              :loading="loading"
              type="primary"
              style="width:80%;margin-bottom:30px;"
              @click.native.prevent="handleConfirm"
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
              type="danger"
              style="width:80%;margin-bottom:30px;"
              @click.native.prevent="handleDelete"
            >{{ $t('common.delete') }}</el-button>
          </el-container>
        </el-container>
      </div>
    </el-form>
  </div>
</template>

<script>
export default {
  name: 'StoreDetail',
  components: { },
  props: ['storeid', 'mode'],
  data() {
    return {
      storedetailForm: {
      },
      loading: false
    }
  },
  computed: {
    detail() {
      const val = this.$store.getters['storeDetails/details'].filter(s => s.id === this.storeid)[0]
      console.log(this.storeid, val)
      return val
    }
  },
  created() {
    // window.addEventListener('storage', this.afterQRScan)
  },
  destroyed() {
    // window.removeEventListener('storage', this.afterQRScan)
  },
  methods: {
    handleEdit() {
      this.mode = 'edit'
      this.storedetailForm = { ... this.$store.getters['storeDetails/details'].filter(s => s.id === this.storeid)[0] }
    },
    handleConfirm() {
      this.mode = 'display'
      this.$store.dispatch('storeDetails/updateStore', this.storedetailForm)
    },
    handleCancel() {
      this.mode = 'display'
    },
    handleDelete() {
      this.mode = 'display'
    }
  }
}
</script>
