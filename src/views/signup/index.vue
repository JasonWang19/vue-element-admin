<template>
  <div class="signup-container">
    <el-form
      ref="signupForm"
      :model="signupForm"
      :rules="loginRules"
      class="signup-form"
      auto-complete="on"
      label-position="left"
    >
      <div class="title-container">
        <h3 class="title">{{ $t('signup.title') }}</h3>
        <lang-select class="set-language" />
      </div>
      <el-row>
        <el-col :span="12">
          <el-form-item :label="$t('signup.name')">
            <el-input v-model="signupForm.name" />
          </el-form-item>
          <el-form-item :label="$t('signup.displayName')">
            <el-input v-model="signupForm.displayName" />
          </el-form-item>
          <el-form-item :label="$t('signup.storeType')">
            <el-select v-model="signupForm.storeType">
              <el-option label="Zone one" value="shanghai" />
              <el-option label="Zone two" value="beijing" />
            </el-select>
          </el-form-item>

          <el-form-item :label="$t('signup.description')">
            <el-input v-model="signupForm.description" type="textarea" />
          </el-form-item>
          <el-container>
            <el-container>
              <el-aside width="100px">{{ $t('signup.address') }}</el-aside>
              <el-main>
                <el-form-item :label="$t('signup.address1')">
                  <el-input v-model="signupForm.address1" />
                </el-form-item>
                <el-form-item :label="$t('signup.district')">
                  <el-input v-model="signupForm.district" />
                </el-form-item>
                <el-form-item :label="$t('signup.city')">
                  <el-input v-model="signupForm.city" />
                </el-form-item>
                <el-form-item :label="$t('signup.state')">
                  <el-input v-model="signupForm.state" />
                </el-form-item>
                <el-form-item :label="$t('signup.country')">
                  <el-input v-model="signupForm.country" />
                </el-form-item>
              </el-main>
            </el-container>
          </el-container>
        </el-col>
        <el-col :span="12">
          <el-form-item prop="username">
            <span class="svg-container">
              <svg-icon icon-class="user" />
            </span>
            <el-input
              v-model="signupForm.username"
              :placeholder="$t('signup.username')"
              name="username"
              type="text"
              auto-complete="on"
            />
          </el-form-item>

          <el-form-item prop="password">
            <span class="svg-container">
              <svg-icon icon-class="password" />
            </span>
            <el-input
              :key="passwordType"
              v-model="signupForm.password"
              :type="passwordType"
              :placeholder="$t('signup.password')"
              name="password"
              auto-complete="on"
              @keyup.enter.native="handleLogin"
            />
            <span class="show-pwd" @click="showPwd">
              <svg-icon :icon-class="passwordType === 'password' ? 'eye' : 'eye-open'" />
            </span>
          </el-form-item>
          <div style="position:relative">
            <el-row>
              <el-col :span="12">
                <div>
                  <el-button
                    :loading="loading"
                    type="primary"
                    style="width:80%;margin-bottom:30px;"
                    @click.native.prevent="handleSignup"
                  >{{ $t('signup.signup') }}</el-button>
                </div>
              </el-col>
              <el-col :span="12">
                <div>
                  <el-button
                    :loading="loading"
                    type="primary"
                    style="width:80%;margin-bottom:30px;"
                    @click.native.prevent="handleCancel"
                  >{{ $t('signup.cancel') }}</el-button>
                </div>
              </el-col>
            </el-row>
          </div>
        </el-col>
      </el-row>
    </el-form>
  </div>
</template>

<script>
import { validUsername } from '@/utils/validate'
import LangSelect from '@/components/LangSelect'

export default {
  name: 'Signup',
  components: { LangSelect },
  data() {
    const validateUsername = (rule, value, callback) => {
      if (!validUsername(value)) {
        callback(new Error('Please enter the correct user name'))
      } else {
        callback()
      }
    }
    const validatePassword = (rule, value, callback) => {
      if (value.length < 6) {
        callback(new Error('The password can not be less than 6 digits'))
      } else {
        callback()
      }
    }
    return {
      signupForm: {
        username: 'admin',
        password: '1111111'
      },
      loginRules: {
        username: [
          { required: true, trigger: 'blur', validator: validateUsername }
        ],
        password: [
          { required: true, trigger: 'blur', validator: validatePassword }
        ]
      },
      passwordType: 'password',
      loading: false,
      showDialog: false,
      redirect: undefined
    }
  },
  watch: {
    $route: {
      handler: function(route) {
        this.redirect = route.query && route.query.redirect
      },
      immediate: true
    }
  },
  created() {
    // window.addEventListener('storage', this.afterQRScan)
  },
  destroyed() {
    // window.removeEventListener('storage', this.afterQRScan)
  },
  methods: {
    showPwd() {
      if (this.passwordType === 'password') {
        this.passwordType = ''
      } else {
        this.passwordType = 'password'
      }
    },
    handleSignup() {
      this.$router.push({ path: '/signup' })
    },
    handleCancel() {
      this.$router.push({ path: '/' })
    }
  }
}
</script>

<style lang="scss">
/* 修复input 背景不协调 和光标变色 */
/* Detail see https://github.com/PanJiaChen/vue-element-admin/pull/927 */

$bg: #283443;
$light_gray: #fff;
$cursor: #fff;

@supports (-webkit-mask: none) and (not (cater-color: $cursor)) {
  .signup-container .el-input input {
    color: $cursor;
  }
}

/* reset element-ui css */
.signup-container {
  .el-input {
    display: inline-block;
    height: 47px;
    width: 85%;

    input {
      background: transparent;
      border: 0px;
      -webkit-appearance: none;
      border-radius: 0px;
      padding: 12px 5px 12px 15px;
      color: $light_gray;
      height: 47px;
      caret-color: $cursor;

      &:-webkit-autofill {
        box-shadow: 0 0 0px 1000px $bg inset !important;
        -webkit-text-fill-color: $cursor !important;
      }
    }
  }

  .el-form-item {
    border: 1px solid rgba(255, 255, 255, 0.1);
    background: rgba(0, 0, 0, 0.1);
    border-radius: 5px;
    color: #454545;
  }
}
</style>

<style lang="scss" scoped>
$bg: #2d3a4b;
$dark_gray: #889aa4;
$light_gray: #eee;

.signup-container {
  min-height: 100%;
  width: 100%;
  background-color: $bg;
  overflow: hidden;

  .signup-form {
    position: relative;
    width: 80%;
    max-width: 100%;
    padding: 160px 35px 0;
    margin: 0 auto;
    overflow: hidden;
  }

  .tips {
    font-size: 14px;
    color: #fff;
    margin-bottom: 10px;

    span {
      &:first-of-type {
        margin-right: 16px;
      }
    }
  }

  .svg-container {
    padding: 6px 5px 6px 15px;
    color: $dark_gray;
    vertical-align: middle;
    width: 30px;
    display: inline-block;
  }

  .title-container {
    position: relative;

    .title {
      font-size: 26px;
      color: $light_gray;
      margin: 0px auto 40px auto;
      text-align: center;
      font-weight: bold;
    }

    .set-language {
      color: #fff;
      position: absolute;
      top: 3px;
      font-size: 18px;
      right: 0px;
      cursor: pointer;
    }
  }

  .show-pwd {
    position: absolute;
    right: 10px;
    top: 7px;
    font-size: 16px;
    color: $dark_gray;
    cursor: pointer;
    user-select: none;
  }

  .thirdparty-button {
    position: absolute;
    right: 0;
    bottom: 6px;
  }

  @media only screen and (max-width: 470px) {
    .thirdparty-button {
      display: none;
    }
  }
}
</style>
