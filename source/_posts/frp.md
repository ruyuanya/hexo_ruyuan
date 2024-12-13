---
title: frp搭建
date: 2024-11-08 11:00:00
tag:
  - 开源
  - IT
cover: /images/nxd2.jpg
---

# frp部署教程

## 什么是frp（内网穿透）？

FRP（Fast Reverse Proxy）是一个`高性能`的`反向代理`应用，它主要用于`内网穿透`，允许您在不暴露您的内网服务的情况下将内网服务映射到公网上，从而能够被外部访问。常用于物联网设备、内网服务器或任何您希望从外部网络访问的服务。

图解是这样：
![frp图解](/images/frp/frp图解.png)

## 准备工作

1.准备一台`公网服务器`（阿里云、腾讯云等等），没有？白嫖！[白嫖FRP](https://freefrp.net/)（这里的frp版本都是0.56+）

2.一台内网主机

4.[下载frp](https://github.com/fatedier/frp/releases)，这里使用的0.36.2版本，因为0.50开始frp的配置文件开始和老的配置会有所差别，个人喜欢老的配置QAQ

解压出来如下：

![解压frp](/images/frp/frp解压.png)

其中，`frps.ini`是服务端配置文件，`frpc.ini`是客户端的配置文件.

## 配置frp服务端

```bash
[common]
bind_port = 7000 # 这里是通讯端口，需要你去某个服务器的管理后台放开它
token = 123456 # 这里是连接校验的token，随便填写即可，最终需要和frpc.ini的token一致
dashboard_port = 7500 # 这里是frp的监控访问端口，可选
vhost_http_port = 23333 # http的穿透端口，用于穿透内网的web页面，可选项
ashboard_user = admin # 这个是frp监控面板的用户名
dashboard_pwd = 123456 # 这个是frp监控面板的密码
```

其中`dashboard_port`，`vhost_http_port`，`ashboard_user`，`dashboard_pwd`这些如果你不需要监控面板，你可以`删掉`或者`注释`掉

随后启动frp服务端

```bash
# 前台启动
./frps -c ./frps.ini
# 后台启动
nohup ./frps -c ./frps.ini &
#然后回车两下，没有显示exit就是启动成功
```

## 配置frp客户端

```bash
[common]
server_addr = # 填写你的公网服务器ip
server_port = 7000 # 给内网服务器放开端口或者直接防火墙关了也可
token = 123456 # 这里是连接校验的token，随便填写即可，最终需要和frps.ini的token一致
tls_enable = true # 这个，emmm忘了，反正是必须填上去

# 事例
[ssh]
type = tcp # tcp协议
local_ip = 127.0.0.1 # 本地ip
local_port = 22 # ssh端口
remote_port = 6000 # 映射到的端口

[ssh_2] # 这里变成了ssh_2是不能和ssh同名
type = tcp # tcp协议
local_ip = 127.0.0.1 # 本地ip
local_port = 23 # ssh端口
remote_port = 6001 # 映射到的端口

[web01]
type = http # http协议
local_ip = 127.0.0.1 # 本地ip
local_port = 23333 # 本地端口
remote_port = 23333 # 映射出来的端口
custom_domains = # 填写你的公网服务器ip
```

然后就是启动服务端

```bash
# 前台启动
./frpc -c ./frpc.ini
# 后台启动
nohup ./frpc -c ./frpc.ini &
#然后回车两下，没有显示exit就是启动成功
```

随后可以看看检查有没有连接成功

```bash
# 服务端和客户端查看日志都是一样的
tail -f nohup.out
```

服务端日志长这样：

![服务端日志](/images/frp/服务端日志.png)

客户端日志长这样：

![客户端日志](/images/frp/客户端日志.png)

尝试下是否能够使用：

![试试](/images/frp/试试.png)

## 新frp教程

### 编辑新服务端frps.toml

```bash
# frp服务的特定端口，防火墙也需放开该端口
bindPort = 7000
# 自定义的监听的端口，所有对服务器该端口访问将被转发到本地内网，做了反向代理可不处理防火墙放行
vhostHTTPPort = 23333
```

### 编辑新客户端frpc.toml

```bash
# 服务器的公网ip
serverAddr = "xxx.xxx.xxx.xxx"
# 7000端口 与frps.toml一致
serverPort = 7000

[[proxies]]
name = "自定义名字，建议英文"
type = "tcp"
localPort = 22 # 看你需求，这里举例ssh端口
remotePort = 6000 # 穿出来的端口

# 按照同样的格式自行添加
[[proxies]]
name = "web"
type = "http"
localPort = 8080 # 看你需求
remotePort = 8080 # 穿出来的端口
```

### 启动服务端

```bash
# 自行确保是否在frp目录下
nohup ./frps -c ./frps.toml &
```

### 启动客户端

```bash
nohup ./frpc -c ./frpc.toml &
```