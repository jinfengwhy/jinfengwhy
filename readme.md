# 说明文档
## `jinfengwhy`

如何安装？

```shell
npm install jinfengwhy -g
```

## 创建项目

目前仅支持Vue

创建项目
```shell
jinfengwhy create your_project_name
```

自动拉取项目模板、安装项目依赖、打开浏览器 `http://127.0.0.1:5173/`、自动启动项目


## 项目开发

项目开发目前提供一个功能：

* 创建Vue组件

### 创建Vue组件：

````shell
jinfengwhy addcomponent YourComponentName # 例如jinfengwhy add NavBar，默认会存放到src/components文件夹中
jinfengwhy addcpn YourComponentName -d src/pages/home # 也可以指定存放的具体文件夹
````
