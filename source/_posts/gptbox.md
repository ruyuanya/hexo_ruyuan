---
title: GPTBox的使用
date: 2024-11-04 21:00:00
tag:
  - APP
  - 开源
  - AI
cover: /images/gptbox/openai.png
---

# GPT Box的使用
<!-- more -->

## 简单讲讲openai是什么

OpenAI，是一家开放人工智能研究和部署公司，其使命是确保通用人工智能造福全人类。创立于2015年12月，总部位于美国旧金山。现由营利性公司OpenAI LP及非营利性母公司OpenAI Inc组成。

### 下载GPT Box

下载[安卓端](https://github.com/lollipopkit/flutter_gpt_box/tree/main)我们可以在手机上轻松使用OpenAI

GPT Box安装包下载：
[Github发行版](https://github.com/lollipopkit/flutter_gpt_box/releases) | [去我的资源分享站下载](https://pan.ruyuan.icu)

### 进入应用

进去长这酱紫
![首页](/images/gptbox/1.png)

### 之后来到应用项

点击左上角的齿轮图标，来到应用页面，先登个录~
![应用页](/images/gptbox/2.png)

### 最后来到配置项

这里有两个需要更改的地方一个是`密钥`，一个是`URL`，密钥首先要自己去获取
密钥可以直接去[Github](https://github.com/chatanywhere/GPT_API_free)白嫖即可，确保你有`github`账号能进行登录，获取到密钥之后就可以填上去啦！
最后就是更改接口，因为默认是openai官方接口，国内是无法访问的，所以要进行更改~

```bash
https://api.chatanywhere.tech/v1
```

![配置页](/images/gptbox/3.png)

这里记得要更改模型，因为`gpt-4o`给免费用户只能使用可怜的3次，一般情况下切换`gpt-4o-mini`就可以满足生活中的大部分需求了（每天0点刷新，每天可以对话200次）

![提示改模型页](/images/gptbox/4.png)