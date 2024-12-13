---
title: MC（fabric）端开服教程
cover: /images/MC/logo.jpg
date: 2024-11-28 23:00:00
tag:
  - 开源
  - 开服
  - 开源
---

# MC开服教程

图片若看不清晰请点击放大查看.

## 准备工作

准备一台`Linux`服务器/家里云都行，系统版本任意，这里展示的是`Debian12`系统，我的世界版本是1.20.1

**配置要求：**

CPU：2个核心

内存：20-40人2GB，30-60人3GB，60+人8GB

## 安装Java

这里直接使用apt安装即可

```bash
sudo apt-get install openjdk-17-jdk -y
```

## 安装服务端软件

[戳我去官网下载](https://papermc.io/downloads/paper)

![](/images/MC/进入选择版本下载.png)

选择对应版本，我这里选的1.20.1

![](/images/MC/选择第一个.png)

## 安装MCSManager管理面板

MCSManager管理非常方便快捷，非常适合Linux小白和~~没🧠的我~~

脚本来源于官网[MCSManager](https://docs.mcsmanager.com/zh_cn/)

```bash
sudo su -c "wget -qO- https://script.mcsmanager.com/setup_cn.sh | bash"
```

安装成功长这样：

![安装mcsmanager](/images/MC/安装mcsmanager.png)

随后你可以前往`http://<YOUR IP>:23333`来进入你的管理后台

访问不了的记得要放开防火墙！你是哪家云就上哪家云的控制台放通端口，对于家里云可以直接关闭防火墙即可

第一次进入会设置管理员账号，随便设置即可，自己要记得账密

进去长这样：

![](/images/MC/进去长这样.png)

随后点击上边的`应用实例/新建实例/Minecraft Java版服务器`

选择`上传服务端软件`

![](/images/MC/上传服务端软件.png)

进到创建实例窗口，随便填一个实例名称

![](/images/MC/创建实例.png)

进入命令助手

输入根据服务端jar名填写，比如下载的是`paper-1.20.1-196.jar`

![](/images/MC/保存命令.png)

单击保存命令即可

静等文件上传完毕后进入控制台即可

![](/images/MC/进入控制台.png)

单击`开始`按钮初始化实例

之后必定会`终止实例`，需要你去填写`同意协议`

![](/images/MC/填写eula.png)

来到下边的`服务端配置文件`，点进去

![](/images/MC/进入服务端配置文件.png)

改是即可，然后保存

![](/images/MC/改是即可.png)

回到控制台，等它构建完世界

![](/images/MC/启动成功.png)

出现`Done`这个字眼代表世界初始化成功了，接下来你可以选择对应版本打开联机

输入IP：`<YOUR IP>:25565`进入世界开始游玩吧~（访问不了还是要记得方通对应端口哦！）

## 常见问题？

### 1.我需要管理员权限怎么办

输入`/op 在线的用户名`即可获得超级管理权限（这里输入的/op可不是在聊天框哦，可是在控制台的模拟终端输入~）

### 2.怎么更改服务器图标

将一个正方形图片命名为`server-icon.png`，注意要`64*64`分辨率的图片

随后重启服务器就能看到啦

这里我准备了一张样例图片，要的自取.

👉<a href="/images/MC/server-icon.png" download="server-icon.png">点我下载文件</a>

![](/images/MC/server-icon.png)

### 3.怎么更改最大在线人数？离线玩家无法进来？游戏难度？

均能在`终端/服务端配置文件/编辑配置文件中找到`

![](/images/MC/改服务端配置文件.png)