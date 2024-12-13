---
title: Miao-Yunzai搭建
date: 2024-11-07 21:00
comments: true
layout: post
toc: true
tag:
  - 机器人
  - 开源
description: 玩云崽这辈子有了👍
---

# Miao-Yunzai部署教程

## **回忆一下**

真痛恨自己会在某个op群看到了op机器人，然后闲着没事去b站搜了下还找到了教程，这辈子已经被云崽毁了.

这是一款基于`原神QQ机器人`但不仅限于原神的机器人部署教程，以下教程说的环境均为`linux`环境

想看`windows教程`了话[点击这里吧](https://mexy.love/archives/Yunzai)

## **准备工作**

准备一台`Ubuntu2204`或者`Debian12`的`服务器/家里云`<span class="red-text">**（不要使用centos！！别问为什么）**</span>

确保自己的机子有<span class="red-text">**root**</span>用户去执行防止出现`权限`不够等问题

那么就开始咯！（注意本教程说的根目录均为<span class="red-text">**Miao-Yunzai**</span>目录下！！）

## **1.更新系统软件包及所需依赖**

由于`Ubuntu/Debian`自带<span class="red-text">**Git**</span>，只需要<span class="red-text">**更新软件包**</span>即可

```bash
# 一般的服务器(像腾讯云/阿里云那种)基础软件完整，只需要以下指令即可
sudo apt update && apt list --upgradable && apt upgrade -y && apt autoremove -y
# 如果你是本地vmware虚拟机非gui界面，需要使用以下指令安装基础软件包再更新
sudo apt update && apt list --upgradable && apt upgrade -y && apt
autoremove -y && apt install git vim sudo curl ffmpeg screen unzip zip g+
+ libsqlite3-dev python-is-python3 -y
```

## **2.安装linux的node.js**

不会装？简单，`两行`解决

```bash
sudo curl -sL https://deb.nodesource.com/setup_20.x | sudo -E bash -
# 执行完后安装
sudo apt install nodejs -y
```

![安装node](/images/Miao-Yunzai/安装node.png)

出现<span class="red-text">**successfully**</span>则为获取安装包成功，可执行下一步~

![安装node过程](/images/Miao-Yunzai/安装node过程.png)

检查是否安装成功（可选）

版本不符合图片是没有关系的，只要你有`大于20`的`node`环境即可

```bash
node -v
npm
```

## **3.安装所需软件包**

### 1.安装ffmpeg转码工具（解决部分插件的转码失败问题）

```bash
sudo apt install ffmpeg -y
```

### 2.为系统安装chromium浏览器

这样装是为了跳过pnpm自动安装浏览器

```bash
sudo apt install chromium -y
```

### 3.安装redis-server（机器人所需要的数据库）

```bash
sudo apt install redis-server -y
```

当然也可以选择[1panel](https://1panel.cn/)安装容器化数据库，备份啥的也方便（记得开启<span class="red-text">**容器外部访问**</span>）

![容器redis](/images/Miao-Yunzai/容器redis.png)

由于默认国外源的原因安装失败记得去配置镜像源

[https://docker.1panel.live](https://docker.1panel.live)

![配置容器](/images/Miao-Yunzai/配置容器.png)

### 4.安装文泉驿正黑体

解决[土块插件(earth-k-plugin)](https://gitee.com/SmallK111407/earth-k-plugin)及[绘图插件(ap-plugin)](https://gitee.com/yhArcadia/ap-plugin)乱码问题

```bash
sudo apt install ttf-wqy-zenhei -y
# 当然也可以装文泉驿正微米黑体，二选一即可
sudo apt install fonts-wqy-microhei -y
# 刷新字体缓存
sudo fc-cache -fv
```

当然如果你有其他好看的字体也可以不用参考这个教程的字体~

![安装字体](/images/Miao-Yunzai/安装字体.png)

出现<span class="red-text">**succeeded**</span>即安装成功

### 5.安装pnpm包管理工具

```bash
npm install pnpm -g
# 若安装pnpm缓慢推荐指定国内阿里云镜像源安装，海外服务器则不需要换源安装
npm --registry=https://registry.npmmirror.com install pnpm -g
```

![安装pnpm](/images/Miao-Yunzai/安装pnpm.png)

## 3.安装喵崽

根据服务器所在地

选择[Gitee](https://gitee.com)源（国内）和[GitHub](https://github.com)源（国外）

```bash
# 使用 Github 
git clone --depth=1 https://github.com/yoimiya-kokomi/Miao-Yunzai.git
# 进入喵崽目录
cd Miao-Yunzai 
git clone --depth=1 https://github.com/yoimiya-kokomi/miao-plugin.git ./plugins/miao-plugin/
 
# 使用Gitee
git clone --depth=1 https://gitee.com/yoimiya-kokomi/Miao-Yunzai.git
# 进入喵目录
cd Miao-Yunzai 
git clone --depth=1 https://gitee.com/yoimiya-kokomi/miao-plugin.git ./plugins/miao-plugin/
```

![安装yunzai](/images/Miao-Yunzai/安装yunzai.png)

### 随后安装依赖

```bash
# pnpm config的意思是，将获取依赖源转为淘宝源，加快依赖安装速度
pnpm config set registry https://registry.npmmirror.com && pnpm install -P
```

![安装依赖](/images/Miao-Yunzai/安装依赖.png)

全程无报错算安装成功

## 4.启动

```bash
node app
# 然后根据它的提示进行设置账号
```

后续可通过`CTRL+C`直接退出终端进程

![启动](/images/Miao-Yunzai/启动.png)

如果你是使用的`1panel`安装的`redis-server`记得去根目录`/config/config/redis.yaml`填写你的密码

为什么要这么晚说呢，因为`redis.yaml`是在你第一次启动后才创建后的文件，你也可以去根目录`/config/default_config`下的`redis.yaml`复制一份到根目录`/config/config`下并进行填写

![数据库密码](/images/Miao-Yunzai/数据库密码.png)

## 常见问题？(建议看看~)

![喜报](/images/Miao-Yunzai/喜报.gif)

### 1.签名怎么填？报错45无法登录？

可以选择蹭别人的签名或者~~自建~~

自建项目地址（不推荐自建！！）：~~[油腻的霸哥与企鹅的爱情故事](https://github.com/ProtocolScience/Astral-QSignigngnn)~~

为了保证作者的`人身氨醛`由于故意留了些`检测`，使用该签名将会被腾讯精准检测，具体表现是：首次使用`4小时内出现冻结，每15天扫脸解封一次`

ICQQ0.6.10目前仅支持最高`9.0.17`的QQ版本，需要通过脚本添加协议版本（来源于[qsign.icu](https://qsign.icu/)）

```bash
# 请在根目录执行！！
bash <(curl -sSLk Gitee.com/haanxuan/QSign/raw/main/X)
```

**以上提供的签名脚本等禁止任何以任何视频平台（如bilibili）以及评论等形式外传！！！**

### 2.关终端了无法让他在后台运行，怎么让它运行保持在后台？

对机器人发个<span class="red-text">**#重启**</span>即可

```bash
# 进入根目录
cd Miao-Yunzai
# 后台查看日志
npm run log
# 后台启动
npm run start
# 后台停止
npm run stop
```

![npm指令](/images/Miao-Yunzai/npm指令.png)

### 3.如何去安装插件？

去[索引库](https://gitee.com/yhArcadia/Yunzai-Bot-plugins-index)寻找插件自行安装或是~~自己写~~

一般来说，大插件作者会给安装指令和依赖指令，`根目录`安装后启动即可

小插件js需要你手动下载源码到`根目录/plugins/example`下，记得`重启`.

我也提供了一些插件也可以来[瞅瞅](/docs/js.html)

国内仓库

[Yunzai-Bot-plugins-index: Yunzai-Bot相关内容收集库 (gitee.com)](https://gitee.com/yhArcadia/Yunzai-Bot-plugins-index)

国外仓库

[https://github.com/yhArcadia/Yunzai-Bot-plugins-index](https://github.com/yhArcadia/Yunzai-Bot-plugins-index)

### 4.服务器要转移了，如何备份文件？

linux使用apt安装redis-server后，会在`/var/lib/redis/`这个目录下生成一个`dump.rdb`文件，下载下来即可(1panel用户看前面)，还有就是喵崽的`根目录config`文件夹，`data文件夹`，`resource文件夹`，装了[逍遥(xiaoyao-cvs-plugin)](https://gitee.com/Ctrlcvs/xiaoyao-cvs-plugin)的`data文件夹`，`根目录/plugin/example`文件夹或者按需备份你的各种`大插件的config文件夹`.

Q：那个`dump.rdb`文件有什么用呢？

A：喵喵的排行，包括群员列表那些

### 5.安装了锅巴（Guoba-Plugin）无法访问？

检查服务器防火墙`放开端口50831（即锅巴默认启动端口`），你是哪家云就上哪家云的`管理后台`。部分云可能存在50831端口放开也无法访问的情况（比如华为云）

改锅巴配置文件下的`config/application.yaml`为`80`端口

箭头下一行有一个`“是否需要拼接端口号”`记得要改`false`为`true`

![锅巴问题](/images/Miao-Yunzai/锅巴问题.png)

### 6.图床链接无法访问问题

由于新NT图床链接问题，加上ICQQ`已不再更新`，需要去改新图链，`记得重启！！！`

```bash
curl -# https://img.kookapp.cn/attachments/2024-09/11/66e0f2f7c93f4 -o node_modules/icqq/lib/message/parser.js
# 备用链接
curl -# https://h.winterqkl.cn/ICQQ/parser.js -o node_modules/icqq/lib/message/parser.js
```

或者是本站下载

<a href="/images/js/parser.js" download="parser.js">点我下载文件</a>

还是有问题？真拿你没办法呢，主页有我的QQ，也可以[进群找我](http://qm.qq.com/cgi-bin/qm/qr?_wv=1027&k=-Gn9UsYoNE2WZgFV_N3ywFznDBnj3bYE&authKey=1Ue6TbbbwsG%2F0mzn%2FJeAk8cE83Zl8Ejd2tRYuY%2B92FpkDdDF00%2FmtzN9u%2F0YQkaF&noverify=0&group_code=229223800)

![截图](/images/Miao-Yunzai/截图.gif)

<script>
  new Vue({
    data: function () {
        this.$notify({
            title: "提醒！",
            message: "本页面搭建仅供参考，请勿发布在各大流量平台以及评论留言！😜",
            position: 'top-left',
            offset: 50,
            showClose: true,
            type: "warning",
            duration: 5000
        });
    }
})
</script>