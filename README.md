# vue-toolset-template

### Based on @vue/cli 4.4.4 with:

- babel
- router (history mode)
- vuex
- eslint + standard (lint on save, lint and fix on commit)
- scss (dart-sass)

### Project setup
```
yarn install
```

### Compiles and hot-reloads for development
```
yarn serve
```

### Compiles and minifies for production
```
yarn build
```

### Lints and fixes files
```
yarn lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).

### SVG
Install ```svg-sprite-loader```
```
yarn add svg-sprite-loader -D
```

Config ```vue.config.js```
```
const path = require('path')

function resolve (dir) {
  return path.join(__dirname, dir)
}

module.exports = {
  chainWebpack (config) {
    // set svg-sprite-loader
    config.module
      .rule('svg')
      .exclude.add(resolve('src/icons'))
      .end()
    config.module
      .rule('icons')
      .test(/\.svg$/)
      .include.add(resolve('src/icons'))
      .end()
      .use('svg-sprite-loader')
      .loader('svg-sprite-loader')
      .options({
        symbolId: 'icon-[name]'
      })
      .end()
  }
}
```

Add ```SvgIcon``` component and register globally
```
// src/components/SvgIcon/index.vue

<template>
  <div
    v-if="isExternal"
    :style="styleExternalIcon"
    class="svg-external-icon svg-icon"
    v-on="$listeners"
  />
  <svg v-else :class="svgClass" aria-hidden="true" v-on="$listeners">
    <use :xlink:href="iconName" />
  </svg>
</template>

<script>
import { isExternal } from '@/utils/validate'
export default {
  name: 'SvgIcon',
  props: {
    iconClass: {
      type: String,
      required: true
    },
    className: {
      type: String,
      default: ''
    }
  },
  computed: {
    isExternal () {
      return isExternal(this.iconClass)
    },
    iconName () {
      return `#icon-${this.iconClass}`
    },
    svgClass () {
      if (this.className) {
        return 'svg-icon ' + this.className
      } else {
        return 'svg-icon'
      }
    },
    styleExternalIcon () {
      return {
        mask: `url(${this.iconClass}) no-repeat 50% 50%`,
        '-webkit-mask': `url(${this.iconClass}) no-repeat 50% 50%`
      }
    }
  }
}
</script>

<style scoped>
.svg-icon {
  width: 1em;
  height: 1em;
  vertical-align: -0.15em;
  fill: currentColor;
  overflow: hidden;
}
.svg-external-icon {
  background-color: currentColor;
  mask-size: cover !important;
  display: inline-block;
}
</style>
```

```
// src/utils/validate.js

/**
 * @param {string} path
 * @returns {Boolean}
 */
export function isExternal (path) {
  return /^(https?:|mailto:|tel:)/.test(path)
}
```

```
// src/icons/index.js

import Vue from 'vue'
import SvgIcon from '@/components/SvgIcon' // svg component

// register globally
Vue.component('svg-icon', SvgIcon)

const req = require.context('./svg', false, /\.svg$/)
const requireAll = requireContext => requireContext.keys().map(requireContext)
requireAll(req)
```

```
// src/main.js

import router from './router'
import store from './store'

import './icons'

Vue.config.productionTip = false

new Vue({
...
```

Use SVG files in ```src/icons/svg```
```
<svg-icon icon-class="svg-file-name"/>
```

### Proxy
```
// vue.config.js

devServer: {
  proxy: {
    // change `xxx-api/login` to `domain/login`
    [process.env.VUE_APP_BASE_API]: {
      target: 'https://www.easy-mock.com/mock/5f48c7e49279d93141e87028',
      changeOrigin: true,
      pathRewrite: {
        ['^' + process.env.VUE_APP_BASE_API]: ''
      }
    }
  }
}
```

### Axios
Install ```axios```
```
yarn add axios
```

Create request instance with interceptors
```
// src/utils/request.js

import axios from 'axios'

const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API,
  timeout: 10000,
  withCredentials: false
})

const requestHandler = config => {
  // do something before request is sent

  return config
}

const responseHandler = response => {
  const res = response.data

  // do something with response data
  if (res.code === 20000) {
    return res
  } else {
    return Promise.reject(new Error(res.message))
  }
}

const errorHandler = error => {
  // do something with response error

  return Promise.reject(error)
}

service.interceptors.request.use(
  requestHandler,
  errorHandler
)
service.interceptors.response.use(
  responseHandler,
  errorHandler
)

export default service
```

Usage
```
import request from '@/utils/request'

export function getTodoList () {
  return request({
    url: '/todo/list',
    method: 'get'
  })
}
```
