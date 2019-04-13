<template>
  <div :class="{'has-logo':showLogo}">
    <logo v-if="showLogo" :collapse="isCollapse" />
    <el-scrollbar wrap-class="scrollbar-wrapper">
      <el-menu
        :default-active="$route.path"
        :collapse="isCollapse"
        :background-color="variables.menuBg"
        :text-color="variables.menuText"
        :active-text-color="variables.menuActiveText"
        :collapse-transition="false"
        mode="vertical"
      >
        <el-dropdown split-button type="primary" @command="changeCurrentStore">
          {{ currentStore !== null ? currentStore.name : $t('common.noStore') }}
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item v-for="detail in details" :key="detail.id" :command="detail.id">{{ detail.name }}</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
        <sidebar-item
          v-for="route in permission_routes"
          :key="route.path"
          :item="route"
          :base-path="route.path"
        />
      </el-menu>
    </el-scrollbar>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Logo from './Logo'
import SidebarItem from './SidebarItem'
import variables from '@/styles/variables.scss'

export default {
  components: { SidebarItem, Logo },
  methods: {
    changeCurrentStore(command) {
      console.log('change current store: ', command)
      this.$store.dispatch('storeDetails/changeCurrentStore', command)
    }
  },
  computed: {
    ...mapGetters(['permission_routes', 'sidebar']),
    ...mapGetters({
      currentStore: 'storeDetails/currentStore',
      details: 'storeDetails/details'
    }),
    showLogo() {
      return this.$store.state.settings.sidebarLogo
    },
    variables() {
      return variables
    },
    isCollapse() {
      return !this.sidebar.opened
    }
  }
}
</script>
