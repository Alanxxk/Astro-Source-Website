---
title: VScode编程配置                #标题
description: Windows新电脑必装软件介绍  #描述
draft: false                        #草稿未发布
published: 2026-08-26               #发布时间
updated: 2026-08-26                 #更新时间
pinned: false                       #置顶
tags: [Windows, VScode, Work, Crack]    #标签
category: "推荐软件"                 #类别（使用文件夹名称）
slug: VScode编程配置                 #自定义链接（使用标题名称）

# sourceLink: ""    #原链接
author: Alan_xxk                    #作者
licenseName: "CC BY-NC-SA 4.0"      #许可证名称
image: "api"                        #随机封面 “image: ./cover.jpg”
# date: 2025-12-05                  #创建时间(无显示)
---

# 1.编程环境知识
整个流程：编辑器-构建工具-编译器-二进制文件-链接-可执行文件
# 2.虚拟环境配置
## 2.1.Miniforge
和conda的关系和商业许可（视频）
安装时候勾选两个创建快捷方式和清除安装的包
可能可以配置c++虚拟环境
命令
## 2.2.Vcpkg
C++包管理器，但是一般需要virtual studio code tools或软件来安装mvsc
## 2.3.UV
纯python的虚拟环境隔离，指令简单而且速度超快
## 2.4.Venu
python自带虚拟环境隔离
# 3.VScode软件配置
## 3.1.软件介绍
同类软件clion
## 3.2.软件设置
左下角配置（单独扩展和设置）
功能设置
## 3.3.Json配置
## 3.4.辅助插件
# 4.Cmake构建工具
## 4.1.工具介绍
## 4.2.语法知识
## 4.3.使用方法
# 5.Git版本管理
## 5.1.Git
命令
## 5.2.Gitkraken
# 6.单片机配置（STM32CubeMX）
## 6.1.STM32CubeMX软件
注意输入芯片型号切换英文输入法即可避免双重字母
设置包路径
关闭自动更新
## 6.2.STM32CubeMXIDE软件
## 6.3.STM32CubeMXIDE for vscode
无需C/C++环境
安装插件（自带编译工具）
右下角确定安装包
打开文件夹，右下角选择cmake项目配置为cube项目，右下角的消息都选是
# 7.深度学习配置（Pytorch）