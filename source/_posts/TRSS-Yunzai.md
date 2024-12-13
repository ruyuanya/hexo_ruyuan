---
title: TRSS-Yunzai的搭建
date: 2024-11-03
tag:
  - 机器人
  - 开源
---

# TRSS-Yunzai部署教程

TRSS-Yunzai是面向多登录协议的机器人，同Miao-Yunzai差别不大，可以做到多平台登录（如QQ、微信、kook等）

至于基础环境准备那些可以从头看到[pnpm包管理工具](/2024/12/09/Miao-Yunzai/)就可以回来了

## 1.开始部署

自行根据网络状况选择合适的克隆地址
```bash
#使用github
git clone --depth 1 https://github.com/TimeRainStarSky/Yunzai
#使用gitee
git clone --depth 1 https://gitee.com/TimeRainStarSky/Yunzai
```

## 2.安装依赖

```bash
# 进到这个目录
cd Yunzai
# 安装依赖
pnpm install
```

## 3. 选择适配器

因为配置了[标准输入](https://blog.csdn.net/sinat_17700695/article/details/91491472)所有操作都可在`终端操作`

```bash
# 启动，注意前台启动才能有标准输入，后台启动像pnpm run start是没有标准输入的！！
node app
```

选择自己的适配器（这里举例两个）

### 1.ICQQ（QQ登录）

```bash
#安装ICQQ-Plugin
```

然后它会自己安装依赖重启

![安装ICQQ-Plugin](/images/TRSS-Yunzai/安装ICQQ-Plugin.png)

之后敲动键盘上的Ctrl+C退出标准输入

执行脚本修改签名
```bash
bash <(curl -sSLk Gitee.com/haanxuan/QSign/raw/main/X)
```

然后添加账号

```bash
#QQ设置QQ号:密码:登录设备
```

格式样例

密码登录：QQ号 `114514` 密码 `1919810` 登录设备 `安卓手机(1)/平板(2)`

```bash
#QQ设置114514:1919810:2
```

扫码登录：QQ号 `114514` 登录设备 `安卓手表(3)`

会弹出二维码。如果终端扫不了就去`根目录/data/icqq/你的qq号`下有个`qrcode.png`去扫

```bash
#QQ设置114514::3
```

具体你可以去看文档[ICQQ-plugin](https://gitee.com/TimeRainStarSky/Yunzai-ICQQ-Plugin)

然后按照他的提示做出Bot验证就行了

### WeChat

```bash
#安装WeChat-Plugin
```

确保自己的微信小号要实名

微信 → 我 → 服务 → 钱包 → 身份信息 → 实名认证

```bash
#微信登录
```

然后会弹出微信登录的`二维码地址`登录即可

具体可看[WeChat-Plugin](https://github.com/TimeRainStarSky/Yunzai-WeChat-Plugin)

## 常见问题

### 2536端口给占用？（我找不到图了）

`pm2`特性

解决：

```bash
pnpm pm2 kill
# 后node app即可
```

### 发#重启 不能转后台？

因为有标准输入，前台不会杀掉

那就自己转后台启动呗

```bash
# 后台启动
pnpm run start
# 看后台日志
pnpm run log
# 后台停止
pnpm run stop
```