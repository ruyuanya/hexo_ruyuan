---
title: 安装fail2ban
date: 2024-12-11 23:00:00
tag:
  - 开源
  - IT
cover: https://s21.ax1x.com/2024/12/11/pAbPzTO.jpg
---

缘起：总是有很多奇奇怪怪的IP进行`ssh登录`

![](https://s21.ax1x.com/2024/12/11/pAbiF1A.png)

所以就有`fail2ban`这么一个东西可以限制别人的`ssh`重试次数搬掉`IP`

# 安装fail2ban

```bash
sudo apt-get install fail2ban
```

若你是`Debian12`及以上版本则需要手动安装`rsyslog`，因为`Debian12`弃用了`rsyslog`.

```bash
sudo apt-get install rsyslog
```

启动服务

```bash
sudo systemctl start fail2ban
```

设置开机自启动

```bash
sudo systemctl enable fail2ban
```

查看状态

```bash
sudo systemctl status fail2ban
```

之后你就可以去`1panel`查看配置文件和拉黑的IP黑名单了（1panel拥有图形化，比直接改配置文件方便）

想要永久搬或者重试次数自行改

![查看配置](https://s21.ax1x.com/2024/12/11/pAbinAS.png)