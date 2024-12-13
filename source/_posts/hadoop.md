---
title: Hadoop的搭建
cover: /images/hadoop/Hadoop.png
date: 2024-11-04 11:00:00
tag:
  - 大数据
  - bigdata
---

# Hadoop的部署

## Hadoop简介

`Hadoop` 是一个开源软件框架，用于在分布式计算环境中存储和处理大量数据。它由Apache软件基金会开发，旨在处理大数据，并基于`MapReduce`编程模型，允许对大型数据集进行并行处理。

**Hadoop主要组件如下**

1.`HDFS`（Hadoop分布式文件系统）：这是Hadoop的存储组件，允许在多台机器上存储大量数据。它设计用于与廉价硬件一起工作，从而具有成本效益。

2.`YARN`（Yet Another Resource Negotiator）：这是Hadoop的资源管理组件，管理处理HDFS中存储的数据所需的资源（如CPU和内存）。

3.`MapReduce`：这是一个基于YARN的系统，用于对大型数据集进行并行处理。

**Hadoop的特点**

1.分布式存储：Hadoop将大数据集存储在多台机器上，允许存储和处理极`大量`的数据。

2.可扩展性：Hadoop可以从单台服务器扩展到数千台机器，使其易于根据需要增加容量。

3.容错性：Hadoop设计为高度容错，即使在硬件故障的情况下也能继续运行。

4.数据本地化：Hadoop提供数据本地化功能，数据存储在将要处理的节点上，有助于减少网络流量并提高性能。

5.高可用性：Hadoop提供高可用性功能，确保数据始终可用且不会丢失。

6.灵活的数据处理：Hadoop的MapReduce编程模型允许以分布式方式处理数据，使其易于实现各种数据处理任务。

## 开始部署

准备三台 `虚拟机/物理机/服务器` 来构建分布式集群

建议使用`root`用户来执行，否则会出现权限不够等问题！

### 1.更改主机名

注意这里`三台`机器都要操作

```bash
# nmtui修改主机名方便
nmtui
```

![](/images/hadoop/nmtui1.png)

随后修改第一台名为`node1`，第二台`node2`，第三台`node3`（当然改其他名都行，看你自己~）

![](/images/hadoop/nmtui2.png)

### 2.主机映射

```bash
# vim进去编辑
vim /etc/hosts
# 进去后长这样
127.0.0.1   localhost localhost.localdomain localhost4 localhost4.localdomain4
::1         localhost localhost.localdomain localhost6 localhost6.localdomain6

#你只需要编辑下面的格式，ip自行更改
192.168.88.151 node1 node1
192.168.88.152 node2 node2
192.168.88.153 node3 node3
```

### 3.部署jdk

自行上传jdk压缩包，建议用1.8不要用`高于`1.8否则会出现奇怪的问题！

```bash
# 这里举例/export/server/下，
mkdir -p /export/server
cd /export/server/
# 注意你的jdk包如果名字不一样自行改名
tar zxvf jdk-8u241-linux-x64.tar.gz
```

随后编辑环境变量

```bash
vim /etc/profile

export JAVA_HOME=/export/server/jdk1.8.0_241
export PATH=$PATH:$JAVA_HOME/bin
export CLASSPATH=.:$JAVA_HOME/lib/dt.jar:$JAVA_HOME/lib/tools.jar
```

刷新环境变量

```bash
source /etc/profile
# 随后敲java-version就出来了
java -version
```

### 集群时间同步

```bash
# 先下载包，centos用yum，debian/ubuntu用apt-get
yum install ntpdate -y
apt install ntpdate -y
# 同步阿里云时间
ntpdate ntp5.aliyun.com
```

### 关闭防火墙（重要！）

```bash
firewall-cmd --state	#查看防火墙状态
systemctl stop firewalld.service  #停止firewalld服务
systemctl disable firewalld.service  #开机禁用firewalld服务
```

### 做免密登录

```bash
# 一路回车即可，三台机器一起执行
ssh-keygen
```

然后配置免密登录到node1、node2、node3
```bash
# 同样是三台一起做
ssh-copy-id node1
ssh-copy-id node2
ssh-copy-id node3
```

到这里基础环境基本完成~

### 配置Hadoop

先上传Hadoop安装包，这里教程说的都是3.0的hadoop

这里要注意的是配置只在`主节点`配置就行了（即node1），配置完后分发给其他节点即可

```bash
# 解压
tar zxvf hadoop-3.3.0-src.tar.gz
# 放到/export/server下
mv hadoop-3.3.0 /export/server
```

编辑`hadoop-env.sh`

```bash
# 文件最后添加
export JAVA_HOME=/export/server/jdk1.8.0_381

export HDFS_NAMENODE_USER=root
export HDFS_DATANODE_USER=root
export HDFS_SECONDARYNAMENODE_USER=root
export YARN_RESOURCEMANAGER_USER=root
export YARN_NODEMANAGER_USER=root 
```

::: tip 提醒

编辑前请仔细阅读配置文件，且以下配置文件都要在`configuration`里面来进行编辑~

:::

编辑`core-site.xml`

```bash
<!-- 设置默认使用的文件系统 Hadoop支持file、HDFS、GFS、ali|Amazon云等文件系统 -->
<property>
    <name>fs.defaultFS</name>
    <!-- 如果你的主机名和我不一样请仔细观察再更改！ -->
    <value>hdfs://node1:8020</value>
</property>

<!-- 设置Hadoop本地保存数据路径 -->
<property>
    <name>hadoop.tmp.dir</name>
    <value>/export/data/hadoop-3.3.0</value>
</property>

<!-- 设置HDFS web UI用户身份 -->
<property>
    <name>hadoop.http.staticuser.user</name>
    <value>root</value>
</property>

<!-- 整合hive 用户代理设置 -->
<property>
    <name>hadoop.proxyuser.root.hosts</name>
    <value>*</value>
</property>

<property>
    <name>hadoop.proxyuser.root.groups</name>
    <value>*</value>
</property>

<!-- 文件系统垃圾桶保存时间 -->
<property>
    <name>fs.trash.interval</name>
    <value>1440</value>
</property>
```

编辑`hdfs-site.xml`

```bash
<!-- 设置SNN进程运行机器位置信息 -->
<property>
    <name>dfs.namenode.secondary.http-address</name>
    <value>node2:9868</value>
</property>
```

编辑`mapred-site.xml`

```bash
<!-- 设置MR程序默认运行模式： yarn集群模式 local本地模式 -->
<property>
  <name>mapreduce.framework.name</name>
  <value>yarn</value>
</property>

<!-- MR程序历史服务地址 -->
<property>
  <name>mapreduce.jobhistory.address</name>
  <value>node1:10020</value>
</property>
 
<!-- MR程序历史服务器web端地址 -->
<property>
  <name>mapreduce.jobhistory.webapp.address</name>
  <value>node1:19888</value>
</property>

<property>
  <name>yarn.app.mapreduce.am.env</name>
  <value>HADOOP_MAPRED_HOME=${HADOOP_HOME}</value>
</property>

<property>
  <name>mapreduce.map.env</name>
  <value>HADOOP_MAPRED_HOME=${HADOOP_HOME}</value>
</property>

<property>
  <name>mapreduce.reduce.env</name>
  <value>HADOOP_MAPRED_HOME=${HADOOP_HOME}</value>
</property>
```

编辑`yarn-site.xml`

```bash
<!-- 设置YARN集群主角色运行机器位置 -->
<property>
	<name>yarn.resourcemanager.hostname</name>
	<value>node1</value>
</property>

<property>
    <name>yarn.nodemanager.aux-services</name>
    <value>mapreduce_shuffle</value>
</property>

<!-- 是否将对容器实施物理内存限制 -->
<property>
    <name>yarn.nodemanager.pmem-check-enabled</name>
    <value>false</value>
</property>

<!-- 是否将对容器实施虚拟内存限制。 -->
<property>
    <name>yarn.nodemanager.vmem-check-enabled</name>
    <value>false</value>
</property>

<!-- 开启日志聚集 -->
<property>
  <name>yarn.log-aggregation-enable</name>
  <value>true</value>
</property>

<!-- 设置yarn历史服务器地址 -->
<property>
    <name>yarn.log.server.url</name>
    <value>http://node1:19888/jobhistory/logs</value>
</property>

<!-- 历史日志保存的时间 7天 -->
<property>
  <name>yarn.log-aggregation.retain-seconds</name>
  <value>604800</value>
</property>
```

最后编辑`workers`

里面会有一个`localhost`，把它删了即可

```bash
node1
node2
node3
```

分发同步hadoop安装包

```bash
# 仅在主节点敲
cd /export/server

scp -r hadoop-3.3.0 root@node2:$PWD
scp -r hadoop-3.3.0 root@node3:$PWD
```

添加`环境变量`

```bash
vim /etc/profile

export HADOOP_HOME=/export/server/hadoop-3.3.0
export PATH=$PATH:$HADOOP_HOME/bin:$HADOOP_HOME/sbin

# 最后刷新
source /etc/profile
```

检查环境是否生效

```bash
hadoop version
```

![查看环境](/images/hadoop/检查hadoop环境.png)

格式化`namenode`

```bash
# 会出现一长串
hdfs namenode -format
```

### 集群启动！

```bash
start-all.sh
```

无报错基本就是成功了，随后你可以去`http://你的ip:9870`来看看网站是否能访问

![查看web](/images/hadoop/web页面.png)