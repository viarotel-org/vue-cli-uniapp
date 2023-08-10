> 后续更新已迁移至 [vite-uniapp-template](https://github.com/viarotel/vite-uniapp-template) 基于 vitejs 驱动的 uniapp 最佳实践集成模板 此项目库停止更新 仅作学习和提供有限的技术支持

# vue-cli-uniapp

基于uniapp cli模式集成最佳实践脚手架, ui库使用 [uview](https://v1.uviewui.com/)(已配置全自动按需导入), css 框架使用 [windicss](https://windicss.org/)(下一代css框架), 请求使用[axios](http://www.axios-js.com/)的方式(添加了uniapp适配器支持) 路由使用 [uni-simple-router](https://hhyang.cn/v2/)(同vue-router的api无须重新阅读文档,配置了路由自动生成) 

<!-- PROJECT SHIELDS -->

[![Contributors][contributors-shield]][contributors-url]
[![Forks][forks-shield]][forks-url]
[![Stargazers][stars-shield]][stars-url]
[![Issues][issues-shield]][issues-url]
[![MIT License][license-shield]][license-url]
<!-- [![LinkedIn][linkedin-shield]][linkedin-url] -->

<!-- PROJECT LOGO -->
<br />

<p align="center">
  <a href="https://github.com/viarotel/vue-cli-uniapp">
    <img src="src/static/images/logo.png" alt="viarotel" height="80">
  </a>
  <h3 align="center">vue-cli-uniapp</h3>
  <p align="center">
    基于VueCli模式的uniapp脚手架集成模板
    <br />
    <a href="https://github.com/viarotel/vue-cli-uniapp"><strong>探索本项目的文档 »</strong></a>
    <br />
    <br />
    <a href="https://github.com/viarotel/vue-cli-uniapp">查看Demo</a>
    ·
    <a href="https://github.com/viarotel/vue-cli-uniapp/issues">报告Bug</a>
    ·
    <a href="https://github.com/viarotel/vue-cli-uniapp/issues">提出新特性</a>
  </p>



## 目录

- [上手指南](#上手指南)
  - [获取本项目](#获取本项目)
  - [运行本项目](#运行项目)
    - [任意编辑器直接运行本项目](#任意编辑器直接运行本项目)
    - [在HBuilder中运行本项目](#在HBuilder中运行本项目)
  - [打包发行](#打包发行)
    - [任意编辑器发行本项目](#任意编辑器发行本项目)
    - [在HBuilder中发行本项目](#在HBuilder中发行本项目)
- [文件目录说明](#文件目录说明)
- [使用到的框架和库](#使用到的框架和库)
- [版本控制](#版本控制)
- [作者](#作者)
- [鸣谢](#鸣谢)

### 上手指南

#### 获取本项目

1. clone 本项目 或 直接下载main包

```sh
git clone https://github.com/viarotel/vue-cli-uniapp.git
```

#### 运行项目

##### 任意编辑器直接运行本项目

1. 安装依赖
2. 运行项目

```sh
npm install //or yarn
npm run serve //or yarn serve
```

##### 在HBuilder中运行本项目

1. 将项目拖动到HBuilder中
2. 点击项目src目录中的任意文件
3. 点击编辑器上方点击运行选择需要运行的环境

#### 打包发行

##### 任意编辑器发行本项目

1. 安装依赖
2. 打包项目

```sh
npm install //or yarn
npm run build //or yarn build 默认为H5环境 更多环境命令请参考 package.json 中的 scripts字段
```

##### 在HBuilder中发行本项目

1. 将项目拖动到HBuilder中
2. 点击项目src目录中的任意文件
3. 点击编辑器上方点击发行选择需要打包的环境

### 文件目录说明

```
filetree
├── /dist //打包生成的静态资源文件，用于生产部署。
├── /node_modules //存放npm命令下载的开发环境和生产环境的依赖包。
├── /public/ //存放在该文件夹的东西不会被打包影响，而是会原封不动的输出到dist文件夹中
│  ├── /index.html // 入口模板文件
├── /src/ // 存放项目源码及需要引用的资源文件。
│  ├── /assets/ //存放项目中需要用到的资源文件，css、js、images等。
│  ├── /components/ //存放vue开发中一些公共组件：header.vue、footer.vue等。
│  ├── /configs/ //全局配置文件
│  ├── /directives/ //全局指令注册
│  ├── /icons/ //存放图标的地方
│  ├── /pages/ //存在vue页面组件的文件夹。
│  ├── /plugins/ //项目常用的插件集合
│  ├── /requests/ //接口配置
│  ├── /router/ //路由配置
│  ├── /static/ //存放应用引用静态资源（如图片、视频等）的目录，注意：静态资源只能存放于此
│  ├── /store/ //存放 vuex 为vue专门开发的状态管理器。
│  ├── /styles/ //存放全局样式
│  ├── /utils/ //存放vue开发过程中一些公共的.js方法。
├── App.vue //项目入口文件
├── ext.json // 小程序作为第三方开发需要用到的配置文件 动态切换appid等功能
├── main.js //入口文件
├── manifest.json //uniapp 管理各个环境下的的配置
├── pages.json //页面和路由配置文件
├── uni.scss //uni.scss是一个特殊文件，在代码中无需 import 这个文件即可在scss代码中使用这里的样式变量
├── .gitignore //git忽略文件配置
├── babel.config.js //对js文件进行编译转换增强的配置文件
├── LICENSE //MIT许可证
├── package.json //包管理配置文件
├── postcss.config.js //对css文件进行编译转换增强的配置文件
├── README.md
├── tailwind.config.js //windicss的配置文件
├── jsconfig.json //JavaScript语言服务的配置文件 代码提示 文件索引等问题
├── vue.config.js //vuecli配置文件
└── yarn.lock //yarn锁定依赖版本
```

### 使用到的框架和库

- [uniapp](https://uniapp.dcloud.io/)
- [Vue-CLI](https://cli.vuejs.org)
- [uview](https://www.uviewui.com/)
- [windicss](https://windicss.org/)
- [axios](http://www.axios-js.com/)
- [vuex](https://vuex.vuejs.org/zh/)
- [uni-simple-router](https://hhyang.cn/v2/)

### 关键字

- vue
- uview
- windicss
- axios
- vuex
- uni-simple-router

### 版本控制

该项目使用Git进行版本管理。

### 作者

viarotel@qq.com

qq:523469508 wx: viarotel

 *您也可以在贡献者名单中参看所有参与该项目的开发者。*

### 版权说明

该项目签署了MIT 授权许可，详情请参阅 [LICENSE](LICENSE)

### 鸣谢


- 感谢[axios-adapter-uniapp](https://github.com/lcysgsg/axios-adapter-uniapp)提供的axios适配器

<!-- links -->

[your-project-path]:viarotel/vue-cli-uniapp
[contributors-shield]: https://img.shields.io/github/contributors/viarotel/vue-cli-uniapp.svg?style=flat-square
[contributors-url]: https://github.com/viarotel/vue-cli-uniapp/graphs/contributors
[forks-shield]: https://img.shields.io/github/forks/viarotel/vue-cli-uniapp.svg?style=flat-square
[forks-url]: https://github.com/viarotel/vue-cli-uniapp/network/members
[stars-shield]: https://img.shields.io/github/stars/viarotel/vue-cli-uniapp.svg?style=flat-square
[stars-url]: https://github.com/viarotel/vue-cli-uniapp/stargazers
[issues-shield]: https://img.shields.io/github/issues/viarotel/vue-cli-uniapp.svg?style=flat-square
[issues-url]: https://img.shields.io/github/issues/viarotel/vue-cli-uniapp.svg
[license-shield]: https://img.shields.io/github/license/viarotel/vue-cli-uniapp.svg?style=flat-square
[license-url]: https://github.com/viarotel/vue-cli-uniapp/blob/main/LICENSE
[linkedin-shield]: https://img.shields.io/badge/-LinkedIn-black.svg?style=flat-square&logo=linkedin&colorB=555
[linkedin-url]: https://linkedin.com/in/viarotel
