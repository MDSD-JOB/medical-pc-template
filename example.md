# 临床信息系统

麦迪斯顿医疗科技有限公司临床信息系统，基于ant Design Vue + vue + axios + vuex + vue-router进行开发，如有高频问题可以反馈，会逐步改进二开组件库 medical-ui。

****

## 目录
- [临床信息系统](#临床信息系统)
  - [目录](#目录)
    - [组件文档](#组件文档)
    - [代码提交](#代码提交)


### 组件文档

|#|类型|地址|
|---|----|-----|
|0|`[预先参考][vue] `|[vue文档](https://cn.vuejs.org/) |
|1|`[二开文档]](https://medical-ui.pages.dev)`|[二开文档](http://192.168.0.128)|
|2|`[结合参考][ant design vue] `|[antdv文档](https://www.antdv.com/docs/vue/introduce-cn) |
|3|`[结合参考][ant design vue pro] `|[antdv-pro文档](https://pro.antdv.com/) |

- 安装&更新 medical-ui
```
yarn  add medical-ui

or

npm install medical-ui
```
- 开发模式运行
```
yarn  dev

or

npm run dev
```

- 路由添加
```
路径： src/config/router.config.js
例：
{
  name: 'PreExam',
  path: '/preExam', // url路由
  component: () => import('@/views/preExam/selfReg/index'), // 路径
  meta: {
    title: '预检分诊', // 展示在菜单里的名字
    keepAlive: true, // 是否缓存
    icon: 'icon_yujianfenzhen', // 图标（iconfont）
    permission: ['preExam'] // 权限（暂时用不到）
  },
}
```
- 接口添加
```
路径： src/api/
例：
import request from '@/utils/request'

const api = {
  regDetails: '/piat/RegistrationInfoController/v1/regDetails',
  regSaveOrUpdate: '/piat/RegistrationInfoController/v1/regSaveOrUpdate'
}

export default api

// get（参数key为params）
export function regDetails(id, parameter) {
  return request({
    url: api.regDetails + '/' + id,
    method: 'get',
    params: parameter
  })
}

// post（参数key为data）
export function regSaveOrUpdate(params) {
  return request({
    url: api.regSaveOrUpdate,
    method: 'post',
    data: params
  })
}
```
- 接口引入
```
建议自己模块添加一个js文件导出接口，避免提交代码冲突
import { regDetails, regSaveOrUpdate } from '@/api/preExam/basic' // 引入接口

例：
async getGenderList() {
  const list = await getGenderList()
  console.log(list)
}
```
- 接口请求
```
开发环境配置反代如下，生产环境需配置allow-access-origin-header白名单
路径： 根/vue.config.js
/api保留词，最好避开，可自定
例：
devServer: {
  port: 8008,
  proxy: {
    '/api': {
      target: 'http://192.168.0.129:49153',
      ws: false,
      changeOrigin: true,
      pathRewrite: {
        '^/api': ''
      }
    }
  }
}

```

### 代码提交
> git提交建议使用 git cz 代替 git commit -m msg
```
yarn global add commitizen

or

npm install commitizen -g
```

> 建立自己的开发分支，后merge提交合入代码;

```
git status

git add .

git cz

git push

```