<template>
  <div>
    <div style="margin-bottom:15px;">
      {{ $t('user.roles') }}： {{ roles }}
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    roles() {
      return this.$store.getters.roles
    }
  }
}
</script>
