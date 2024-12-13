---
title: 本地Memes的搭建
date: 2024-12-11 15:00:00
tag:
  - 开源
  - 表情包
---

# 本地Memes的搭建

一个制作表情包的接口搭建，可以为`云崽`/`NoneBot2`等机器人实现表情包制作服务

我准备了Meme表情包服务接口，放心调用（不要d窝QAQ）

[https://www.ruyuan.icu/memes](https://www.ruyuan.icu/memes)

## 准备工作

一台Linux🐔，CPU一核心就行，内存可以尽量高点（一般占用到200MB~300MB不等）

### 方法一：docker部署（推荐）

`docker`的好处就是隔离主机环境

首先确认你是否有具有`docker`环境

```bash
docker version
```

![检查docker环境](/images/Memes/检查docker.png)

若有请跳过

```bash
sudo apt install docker-ce docker-ce-cli containerd.i -y
```

安装Memes表情包

```bash
docker run -d --name=meme-generator -p 2233:2233 --restart always -v 这里换你额外表情要放的位置:/data/memes -e MEME_DIRS='["/data/memes"]' meetwq/meme-generator:main
```

简单解释下每一行的含义：

`这里换你额外表情要放的位置:/data/memes`：这里将路径填写成你要存储额外表情的路径，比如我放在了`/root/meme-generator`目录下

`2233:2233`：是`主机映射端口`:容器映射端口，你只需要注意主机映射端口即可，若访问不了请放开对应`防火墙`

`--restart always`：一直重启，开机自启

`meetwq/meme-generator:main`：使用main分支

`meetwq/meme-generator:latest`：使用latest分支（`main`和`latest`的区别是：latest是最近稳定分支，main是git的一个分支，两者也就表情包数量上的区别其他差别不大）

然后是检查访问：`http://<YOUR IP>:2233`

```JSON
{
    "detail": "Not Found"
}
```

出现这种即访问成功

### 方法二：本地安装（不推荐，问就是容器一键不香吗）

1. 使用 `pip` 安装

```bash
pip install -U meme_generator
```

安装后可以使用 `meme` 命令，可以通过命令行制作表情等，具体用法可以运行 `meme -h` 查看

2. 直接克隆源码运行

```bash
git clone --depth 1 https://github.com/MeetWq/meme-generator
```

若你的网络状况不好，那就使用代理代理

```bash
git clone --depth 1 https://ghp.ci/https://github.com/MeetWq/meme-generator
```

通过 `python -m meme_generator.app` 运行 web 服务器

通过 `python -m meme_generator.cli meme` 运行命令行程序

## 安装字体

不安装字体会出现乱码问题

若你是使用的本地安装，则需要安装字体（docker则不需要，因为容器里面自带）

```bash
sudo apt install ttf-wqy-zenhei -y
# 刷新字体缓存
sudo fc-cache -fv
```

## 添加额外表情（可选）

```bash
git clone --depth 1 https://github.com/MeetWq/meme-generator-contrib
# 网络不好就加代理
git clone --depth 1 https://ghp.ci/https://github.com/MeetWq/meme-generator-contrib
```

克隆出来的目录下有一个`memes`的文件夹，将里面的文件夹放在`你配置的额外表情包路径`（全要或者都不要看你自己），比如我的是`/root/meme-generator`

内容如下：

![大致目录](/images/Memes/目录.png)

之后需要`重启容器/本地服务`