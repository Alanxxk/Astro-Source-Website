---
title: VScode编程配置                #标题
description: 编写代码或文本常使用的全能编辑器  #描述
draft: false                        #草稿未发布
published: 2026-08-26               #发布时间
updated: 2026-08-26                 #更新时间
pinned: false                       #置顶
tags: [Windows, VScode, Setting, Work]       #标签
category: "推荐软件"                 #类别（使用文件夹名称）
slug: VScode编程配置                 #自定义链接（使用标题名称）

# sourceLink: ""    #原链接
author: Alan_xxk                    #作者
licenseName: "CC BY-NC-SA 4.0"      #许可证名称
image: "api"                        #随机封面 “image: ./cover.jpg”
# date: 2025-12-05                  #创建时间(无显示)
---


# 1.简介
- 本文阐述全能编辑器VSCode的设置和配置，让轻量化VSCode拥有各种能力

# 2.编程环境
1. 编辑器：输入代码，语法高亮，自动补全，括号匹配，文件管理，集成终端，构建调试（VSCode能通过tasks编写构建命令(构建时执行的命令)launch编写调试配置文件(在调试时启动的程序,调试器和参数等等)）
2. (元)构建工具：决定代码文件编译事宜（需要编译文件，编译顺序，调用工具，管理配置和库）
3. 工具链：一整套编译工具（还包含标准库，运行时库，启动代码，调试器）
   - 预处理器：处理头文件和宏定义，输出.i文件（C类语言特有预处理器）
   - 编译器：预处理后的代码翻译成汇编代码，输出.s文件
   - 汇编器：汇编代码翻译成机器码，输出.o/.obj目标文件(二进制文件)
   - 链接器：找到变量和函数的定义，占位地址改成最终地址，链接静态(复制)动态(依赖)库，加入启动代码，合并代码段数据段，最终拼接起来，输出.exe可执行文件(二进制文件)（打开后先分配内存加载动态库再执行文件内容）
4. 调试器：断点，单步，变量监视，栈
5. 版本控制：Git面板

# 3.VScode软件配置
## 3.1.软件介绍
1. 名称：Visual Studio Code
2. 别名：微软大战代码
3. 特点：开源免费无广无账号轻量化，微软出品，完善的跨平台，功能=编辑器+丰富插件(支持所有语言)
4. 其他有编辑器功能软件：（集成开发环境Integrated Development Environment=编辑器+构建工具+工具链+调试器+版本控制）
   - Vim：编辑器，开源免费，终端窗口不需要鼠标操作，但需要学习成本
   - Notepad++：编辑器，开源免费，丰富插件，但缺乏很多功能≈高级记事本
   - Sublime_Text：编辑器，买断制，丰富插件
   - Eclipse：完整IDE，开源免费，软件界面传统窗口切换卡顿，核心语言是Java，适用Java开发
   - Dev：完整IDE，开源免费，核心语言是C类，适用新手入门
   - Visual_Studio：完整IDE，社区版免费，核心语言是C类，适用Windows开发
   - Rider：完整IDE，社区版免费，核心语言是C类，适用游戏开发
   - CLion：完整IDE，核心语言是C类，适用嵌入式开发
   - PyCharm：完整IDE，社区版免费，核心语言是Python，适用数据科学
   - WebStorm：完整IDE，核心语言是Java，适用Java前端
   - IDEA：完整IDE，社区版免费，核心语言是Java，适用Java后端
   - Android Studio：完整IDE，开源免费，核心语言是Java，适用安卓应用开发
## 3.2.下载安装
1. 下载：[VSCode下载官网](https://code.visualstudio.com/)
2. 安装：基本上是同意和下一步和避免中文路径和创建桌面图标
3. 网页：[VSCode网页版](https://code.visualstudio.com/docs/remote/vscode-web)
## 3.3.软件设置
1. 基本设置
   - 自动保存：“软件左下角齿轮-设置-Files:AutoSave选择afterDelay”
   - 自动猜测文件编码类型：“软件左下角齿轮-设置-勾选Files:AutoGuessEncoding”
   - 丝滑光标移动和闪烁：“软件左下角齿轮-设置-Editor:CursorBlinking选择smooth”
   - 按住Ctrl缩放字体大小：“软件左下角齿轮-设置-勾选Editor:MouseWheelZoom”
   - 自动折行：“软件左下角齿轮-设置-Editor:WordWrap选择on”
   - 括号对高亮：“软件左下角齿轮-设置-勾选Editor:BracketPairColorization”
   - 获取代码补全建议：“软件左下角齿轮-设置-取消勾选Editor:Suggest:SnippetsPreventQuickSuggestions+Editor:AcceptSuggestionOnEnter选择smart+Editor:SuggestSelection选择recentlyUsed”
   - 窗口样式：“软件左下角齿轮-设置-Window:DialogStyle选择custom”
   - 右侧显示红色断点位置：“软件左下角齿轮-设置-勾选Debug:ShowBreakpointsInOverviewRuler”
   - 文件缩进：“软件左下角齿轮-设置-workbench:tree.indent输入15”
   - 缩进辅助线：“软件左下角齿轮-设置-workbench:tree.renderIndentGuides选择always+workbench:colorCustomizations选择颜色”
   - 代码格式化：“软件左下角齿轮-设置-勾选Editor:FormatOnSave”
2. 配置文件
   - 作用：不同开发场景下可以切换配置实现不同的设置+扩展插件+快捷键+UI布局+任务+快捷代码片段
   - 准备：软件设置完成，扩展插件安装完成，设置快捷键，tasks.json配置完成，设置快捷代码片段
   - 位置：“软件左下角齿轮-配置文件-配置文件-新建配置文件”
## 3.4.扩展插件
1. 必装插件：Chinese简体中文
2. 语法辅助：
   - C类：C/C++-Extension-Pack语法辅助
   - Python：Python语法辅助，Pylance代码python补全，autopep8格式化python代码
   - Java：
   - Vim：Vim模拟器，Learn-Vim帮助熟悉vim命令
   - Cmake：Cmake-Tools跨平台编译工具
   - Markdown：Markdown-All-in-One语法辅助，Markdown Preview Enhanced语法格式预览，Auto-Open-Markdown-Preview自动打开markdown预览
   - STM32：STM32CubeIDE单片机芯片（官方），stm32-for-vscode单片机芯片（社区）
   - 单片机：PlatformlIO简单单片机芯片集合插件
   - ROS：ROS机器人操作系统辅助，ROS2机器人操作系统辅助，Msg-Language-Support消息ROS文件辅助，URDF机器人描述格式辅助
   - 配置文件：YAML语法辅助，XML语法辅助
3. 功能增强：
   - WakaTime记录统计使用时间
   - Remote-SSH本地操作远程连接
   - Jupyter分块运行代码
   - Prettier-Code-formatter统一代码格式
   - Error-Lens行侧显示错误
   - Path-Intellisense路径补全
   - Image-preview悬浮预览路径图像
   - CodeSnap/Polacode代码截图工具
   - Code-Runner一键运行代码
   - Bracket-Pair-Colorizer配对括号不同颜色
   - indent-rainbow缩进彩虹显示
   - Color-Highlight显示十六进制颜色
   - Paste-Image在markdown粘贴图片
   - Comment-Anchors注释锚点
   - Bookmarks书签
4. 界面美化：
   - Material-Icon-Theme/vscode-icon文件图标
   - One-Dark-Pro/GitHub-Theme/Dracula-Official软件主题
5. Git版本：
   - Git-Graph分支图形可视化
   - GitLens代码行显示Git信息
   - Git-History图形化显示提交历史
6. 中英拼写：
   - Code-Spell-Checker英词拼写错误检查
   - var-translate-en中文翻译成英文（在线）
   - “翻译(英汉词典)”（离线）
   - “会了吧”分析工程中的单词
   - Code-translate英词翻译
7. 安装扩展：TODO-Highlight高亮注释的TODO，GBK-to-UTF8-for-vscode文件编码转换，Hex-Editor查看文件十六编码，Doxygen-Documentation-Generator生成和查看函数注释格式，Competitive-Programming-Helper便捷输入测试代码输出，Project-Manager工程打开对应扩展，，Rainbow-CSV数据文件不同颜色区分行列，Live-Server临时前端浏览器，IntelliCode自动代码补全，Docker管理本地Docker，Jest测试框架，Simple-React-Snippets生成代码片段，WSL连接到win的linux子系统，Postman发送请求测试，Thunder-Client发送请求测试，REST-Client发送请求测试，MySQL管理数据库工具，SQLite管理数据库工具，SQL-Formatter格式化SQL代码，Redis管理数据库工具，VUE语法辅助，ES7+React语法辅助，Auto-Rename-Tag前后标签同步修改，JavaScript-Debugger代码Java调试，CSS-Peek查看CSS样式，ESLint代码Java检查，Console-Ninja输出显示在代码行，Quokka-js实时Java沙盒，Angular-Snippets生成代码片段，，any-rule提供常用正则表达式，Import-Cost导入头文件容量，C/C++-Compile-Run，better-C++-syntax，python-snippets
8. AI扩展：BaiDu-Comate，Lingma，Trae-AI，CodeGeeX，Github-Copilot，Tabnine，Blackbox-AI，AWS-Toolkit
9.  娱乐扩展：vscode-pets小宠物，VSC-Netease-Music网易云音乐，游戏300之坦克大战，Thief-Book，Rainbow-Fart，韭菜盒子，Qwerty-Learner打字练习器
10. 字体扩展：FiraCode

## 3.5.Json配置
- 构建命令tasks.json

- 调试配置launch.json



# 4.Git版本管理
## 4.1.Git
命令
## 4.2.Gitkraken

# 5.Cmake构建工具
## 5.1.学习资料
- 语法：https://www.bilibili.com/video/BV14s4y1g7Zj/?spm_id_from=333.337.search-card.all.click
## 5.1.工具介绍
## 5.2.语法知识
## 5.3.使用方法

# 6.单片机配置（STM32CubeMX）
1. 操作：安装STM32CubelDE_for_Visual_Studio_Code扩展插件，右下角确定安装包
2. 特点：无需其他准备操作（包括C/C++环境,工具链/编译工具,Json配置等等），下载STM32官方扩展插件后就可化身单片机IDE
   
3. STM32CubeMXIDE插件
https://www.bilibili.com/video/BV1QfbpzGENy?
https://www.bilibili.com/video/BV1q5mvB2Ear/?（cmakelists）
https://www.bilibili.com/video/BV1QMZ3BfEJy/?（调试问题）




打开文件夹，右下角选择cmake项目配置为cube项目，右下角的消息都选是




1. CubeMX后：点击左下角的Debug/<kbd>CTRL</kbd>+<kbd>Shift</kbd>+<kbd>P</kbd>选择Cmake，选择Debug，按下F7按键编译
2. VScode插件：cmake，ninja，gcc/g++，openocd
3. 配置文件：.vscode，.clang-format，.gitignore，openocd.cfg
4. 存储文件：在CmakeLists.txt同级新建文件夹，放入自己写的代码文件
5. 代码文件：引用头文件(一般main.h)，函数前添加C++转换成C类型编译(externC变量+函数)，函数内部调用HAL库函数
6. 主函引码：在main.c文件中的main函数外externC函数声明，在main函数中的User_Code注释夹层中调用函数(否则在重新生成时会被覆盖)
7. Cmake配置：在CmakeLists.txt中，在sources添加代码文件夹名/文件名的路径（编译成可执行文件），include_directories添加代码文件夹名称
8. 文件编译：<kbd>F7</kbd>
9. 文件烧录：<kbd>CTRL</kbd>+<kbd>Shift</kbd>+<kbd>B</kbd>
10. 代码调试：<kbd>F5</kbd>，在CORTEX-LIVE-WATCH添加需要观察的变量（可以切换变量进制），还可以使用断点查看代码运行情况，这个过程不可以烧录
11. 使用侧边栏的git功能管理代码，在VScode下方终端输入代码创建用户和连接仓库
- 文件夹：
   1. vscode的.json：vscode的配置文件
   2. build：编译后的文件（每次编译会重新刷新文件夹内的文件）（生成的.obj文件时object目标文件,连起来就可以变成二进制代码）
   3. cmake：cmake的编译工具
   4. core：inc是include代码头文件，src是source代码源文件
   5. drivers：驱动
   6. .clang-format：C++语言风格
   7. .gitignore：在git保存版本时，要忽略的文件
   8. openocd.cfg：openocd调试插件的设置文件

# 7.Python虚拟环境
## 7.1.Miniforge
https://www.bilibili.com/video/BV1Fm4ZzDEeY/?
https://www.bilibili.com/video/BV1hQotB6EK9/?
https://www.bilibili.com/video/BV1xc7a6CEbD/?

安装时候勾选两个创建快捷方式和清除安装的包
可能可以配置c++虚拟环境
命令
## 7.2.Vcpkg
C++包管理器，但是一般需要virtual studio code tools或软件来安装mvsc
## 7.3.UV
纯python的虚拟环境隔离，指令简单而且速度超快
## 7.4.Venu
python自带虚拟环境隔离

# 8.深度学习配置（Pytorch）







