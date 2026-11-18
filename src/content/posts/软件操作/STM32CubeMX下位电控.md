---
title: STM32CubeMX下位电控           #标题
description: STM32主控芯片快速配置软件介绍  #描述
draft: false                        #草稿未发布
published: 2026-08-26               #发布时间
updated: 2026-08-26                 #更新时间
pinned: false                       #置顶
tags: [Windows, Microcontrollers, Work]        #标签
category: "推荐软件"                 #类别（使用文件夹名称）
slug: STM32CubeMX下位电控            #自定义链接（使用标题名称）

# sourceLink: ""    #原链接
author: Alan_xxk                    #作者
licenseName: "CC BY-NC-SA 4.0"      #许可证名称
image: "api"                        #随机封面 “image: ./cover.jpg”
# date: 2025-12-05                  #创建时间(无显示)
---


# 1.简介
- 使用STM32CubeMX快速配置STM32主控芯片功能，生成大部分库代码，从而避免自己手动编写代码配置主控芯片功能

# 2.STM32三类代码
1. 基于寄存器：程序直接配置寄存器，最大化性能
2. 基于标准库：ST官方封装函数（现已被官方逐渐淘汰）（推荐学习底层逻辑）
   - htmresc文件夹：图标图片
   - Libraries文件夹：库函数文件
   - Project文件夹：工程示例和模板
   - Utilities文件夹：ST官方设计评估板的示例程序
   - Release_Notes：库函数发布文档版本说明
   - stm32_stdperiph_lib_um：使用手册
3. 基于HAL库：封装寄存器操作而使用简单（配置功能生成的代码）（推荐快速上手）
4. 基于LL库：轻量级寄存器操作（推荐高手提高性能）

# 3.代码生成编辑
1. STM32CubeMX
   - STM32CubeMX图形化配置主控芯片生成初始化配置LL库或HAL库(推荐)代码，无需深入底层寄存器完成复杂配置，兼容多种开发工具
2. STM32CubeMXIDE
   - 软件 = ST官方代码编辑器+内置STM32CubeMX
   - 特点：在一个软件中，完成芯片配置+代码生成+代码编辑+下载调试（需要勾选生成.hex文件）
   - 缺点：可能一部分芯片无法支持
3. STM32CubeMX+VSCode（推荐）
   - 组合 = STM32CubeMX代码生成+VSCode代码编辑下载调试
   - 具体设置请移步VSCode文章
4. STM32CubeMX+Keil5(Crack)
   - 组合 = STM32CubeMX代码生成+Keil5代码编辑下载调试
   - 特点：可以模拟仿真。但软件界面传统，插件生态薄弱
   - Keil5设置：
      1. 编译器等级：最低优化等级
      2. 软件下载：https://www.keil.com/
      3. 支持包下载：https://www.keil.arm.com/
      4. 软件安装：Keil5基本上是同意和下一步和避免中文路径
      5. 软件破解：Keil5管理员运行-菜单栏File-许可证License Management-复制CID-关闭系统音量和杀毒软件-打开注册机软件-粘贴CID和选择ARM和选择professional-点击Generate生成序列注册码-复制序列注册码-回到Keil5软件在New License ID Code位置粘贴-点击Add LIC添加注册码到软件中
      6. 器件支持包：（Keil5将核心和芯片软件包分开了）
         - 软件外文件：在Keil网站下载器件支持包，双击安装Keil5对应的STM32_DFP.pack
         - 软件内在线：工具栏的Pack Installer-左上角循环图标获取更新列表（左下角是正在获取的内容,右下角是进度）-左侧选择对应的STM32型号系列-右侧选择安装/卸载STM32_DFP文件
         - 检验安装成功：工具栏选择Options for Target-选择Device查看可以选择的设备
      7. 导入编译器：安装编译器-工具栏选择File Extensions-Group-选择Folders/Extensions-在Use ARM Compiler后面的三点-选择Add another ARM Compiler Version to List-选择安装编译器的文件夹
      8. 新建工程：菜单栏的Project-New uVision Project-命名-选择STM32型号-关掉新建工程小助手-工程目录新建文件夹Start-复制粘贴外围寄存器描述头文件和配置时钟文件（位置在Libraries-CMSIS-CM3-DeviceSupport-ST-STM32型号系列）-复制粘贴启动文件（位置在Libraries-CMSIS-CM3-DeviceSupport-ST-STM32型号系列-startup-arm）-复制粘贴内核寄存器描述文件（位置在Libraries-CMSIS-CM3-CoreSupport）-左侧栏右键Target-选择Add Existing Files to Group-推荐命名与文件夹同名易辨认-添加Start文件夹的.c.h文件和一个启动文件（根据FLASH容量选择）-左侧栏文件小钥匙图标表示只读文件-工具栏选择Options for Target-选择Target的ARM Compiler选择合适编译器-选择Output选择Create Executable并勾选Debug信息和生成文件和浏览信息选项-选择C/C++在Include Paths添加头文件路径Start文件夹-选择Debug在Use选择调试器(DAP选择CMSIS-DAP,Stlink选择ST-Link)和选择Setting查看连接调试器主控芯片-选择下载方式-选择Flash Download勾选三个-工程目录新建文件夹User-左侧栏右键Target-选择Add Group-右键新建文件夹-选择Add New Item to Group-选择C文件-输入main名称-main.c文件空白处右键-选择Insert #include file-选择Start文件夹的stm32.h-编写main函数int main(void){while(1){}}-文件最后一行是空行（防止报警告）
      9. 编程方式：（开启外设时钟+初始化配置外设参数+设置输入输出数据）
         - 寄存器：查阅数据手册了解每个32位寄存器，设定2进制32位寄存器的16进制数值（4数=1数）
         - 标准库（函数内部包装了外设的寄存器使用方法）：工程目录新建文件夹Library-复制粘贴标准库的文件（位置在Libraries-STM32_StdPeriph_Driver-Inc和src）-左侧栏右键Target-选择Add Group-左侧栏右键Target-选择Add Existing Files to Group-添加Library文件夹的所有文件-工程目录打开User文件夹-复制粘贴标准库的包含所有头文件关系的头文件和中断函数文件（位置在Project-STM32_StdPeriph_Template-stm32_conf和stm32_it）-左侧栏同理添加到main文件位置-打开stm32.h头文件-复制条件宏命令的USE_STDPERIPH_DRIVER（定义宏字符串才能引用stm32_conf.h）-工具栏选择Options for Target-选择C/C++-粘贴在Define-Include Paths添加头文件路径User和Library文件夹-工具栏选择File Extensions-Group里下调包含main.c的文件夹（方便查看左侧栏）（此处也可以创建左侧栏文件夹和添加文件）
         - HAL库：暂无
      10. 添加文件：工具栏的Manage Project Item-创建文件夹Groups-选中文件夹Add Files添加文件
      11. 基础设置：工具栏的Options for Target-选择Target-在ARM Compiler设置编译器版本-选择Output-选择Select Folder for Objects-选择输出文件夹-勾选Create HEX File设置输出文件类型-选择C/C++-在Define输入编译器宏而使用HAL库和启动模式-勾选C99 Mode-在Optimization选择Level 0-在Include Paths添加CMSIS的两个Include和HAL_Driver的Inc和USER文件夹-选择Debug-在Use选择仿真器下载接口-选择Setting查看仿真器-选择Flash Download-勾选Reset and Run无需复位直接运行
      12. 代码提示：<kbd>CTRL</kbd>+<kbd>Alt</kbd>+<kbd>Space</kbd>（需要设置电脑系统输入法按键配置取消勾选<kbd>CTRL</kbd>+<kbd>Space</kbd>中英切换）
      13. 代码框选：<kbd>Alt</kbd>+鼠标左键
      14. 辅助书签：工具栏的Bookmarks-工具栏功能分别是添加书签、跳转到上一个书签位置、跳转到下一个、清除所有书签
      15. 移除文件：左侧栏-选中文件-右键-选中Remove File
      16. 编译工程：工具栏的Build(F7)
      17. 代码调试：工具栏的Options for Target-选择Debug-选择Setting-选择Trace-在Core Clock输入芯片频率-工具栏的Configuration-选择Debug-Use Simulator仿真调试/Use STLink硬件实时调试-工具栏的Start/Stop Debug Session-左侧栏Registers是寄存器和标志位而上侧栏Disassembly是汇编语言-黄色光标(只能在灰色区域移动)表示程序运行位置和蓝色光标表示鼠标光标位置-工具栏功能分别是当前行设置断点(可以点击行号旁灰色区域设置断点)(断点行不会运行)、使/失能当前行断点、使/失能所有断点、删除所有断点-工具栏功能分别是复位、运行、停止、进入函数内部单步运行、不进入函数内部单步运行、跳出当前函数单步运行、跳到蓝色光标行运行、回到显示当前运行的位置、各种窗口显示-右下角Watch是查看窗口-在代码行中右键选择Add"begin"to可以添加变量到查看窗口或者在Watch窗口直接输入变量名称-右键Value可以取消十六进制显示Hexadecimal Display-右下角t1或者左侧栏内部Sec显示程序运行时间-菜单栏Peripherals可以在右侧栏查看寄存器数值-修改代码要退出调试模式（调试过程：https://www.bilibili.com/video/BV1Qb421H7dL?）
      18. 下载工程：工具栏的Download(F8)
      19. 软件设置：工具栏的Configuration
         - 编码：选择Editor-Encoding-选择UTF-8（防止中文乱码）
         - 缩进：选择Editor-Tab size输入4
         - 字体：选择Colors&Fonts-选择C/C++ Edotpr files-选择Font Courier New，同理调整Asm Editor files
         - 空间：工具栏的Options for Target-选择Target-左边IROM1（右边是设置RAM）-Start可以设置程序代码的起始地址-Size可以设置程序代码的占用空间（过小导致无法写入程序代码会报错）（在程序代码编译后的提示Program Size,前三个数的和=程序代码占用闪存容量,后两个数的和=占用SRAM容量,也可以双击左侧栏的Target后查看编译信息的最后面得知RW是SRAM占用和ROM是闪存占用）
         - 擦除：工具栏的Options for Target-选择Debug-Use选择ST-Link Debugger-选择Settings-选择Flash Download-选择Erase Sectors（根据需求擦除对应页）
         - 移植：工具栏选择Options for Target-选择Target-勾选Use MicroLIB-代码添加C语言库和编写重定向函数就可以使用printf输出数据到串口，或者直接使用spritf，或者编写封装函数使用vspritf
         - 中文GBK：工具栏的Configuration-选择Editor-Encoding-选择GB2312-删除中文-重新打开文件
         - 中文UTF8：工具栏选择Options for Target-选择C/C++-在Misc Controls处输入--no-multibyte-chars
         - 串口下载写入程序：工具栏选择Options for Target-选择Output-勾选Create HEX File-FlyMcu软件选择串口号、波特率、生成的.HEX文件、下载电平（上位机是232逻辑电平标准和硬件TTL逻辑电平标准相反）-硬件跳线帽换成串口下载Boot模式和按下复位按键生效Boot模式（勾选编程后执行和取消勾选编程到FLASH时写选项字节则无需复位即可显示一次性程序而复位后会回到BootLoad模式）-FlyMcu软件选择开始编程而下载程序-更换回跳线帽和同理按下复位按键（可以设计下载电路设置CH340串口芯片的DTR和RTS引脚实现不用更换跳线帽,推荐DTR的低电平复位RTS高电平进BooLoader）
         - 串口下载写出程序：FlyMcu软件选择读FLASH可以读出芯片程序
         - 串口下载清除芯片：FlyMcu软件选择清除芯片擦除芯片内容
         - 串口下载芯片信息：FlyMcu软件选择读器件信息可以读取芯片的参数
         - 串口下载选项字节：FlyMcu软件选择勾选编程到FLASH时写选项字节和设定选项字节等可以设置读保护保证程序安全（取消时会清空芯片程序）和写保护保护部分区域不被擦除等等不随程序变化的设置参数，但是需要和下载程序同步更改
      20. STLink相关
         - 驱动：“Keil文件夹-ARM-STLINK-USBDriver-dpinst_amd64.exe（64位电脑）/x86（32位电脑）”
         - 调试：工具栏的Configuration-选择Debug-Use选择ST-Link Debugger-选择Settings-选择Flash Download-勾选Reset and Run（下载程序后立即复位和运行,否则要手动按下复位按键）
         - STLink Utility：
            1. 基本功能：
               - 工具栏的Connect to the target-连接读取显示芯片信息/直接更改芯片闪存内容
               - 工具栏的Disconnect from the target-断开连接
               - 工具栏的Full chip erase-擦除芯片
               - 工具栏的Save-保存程序
               - 工具栏的Open File-选择编译后.hex/.bin文件-工具栏的Program verify-选择Start开始下载
            2. 选项字节：菜单栏的Target-Option Bytes-选择Read Out  Protection可以设置读保护和Flash sectors protection写保护，可以直接更改选项字节而无需和下载程序同步更改
            3. 更新固件：菜单栏的STLink-选择Firmware update-选择Device Connect-重新拔插STLink-选择Yes升级固件
            4. 代码优化：工具栏选择Options for Target-选择C/C++-优化等级Optimization-选择00不优化则适合调试而01基础优化和02中等优化则速度体积最佳平衡和03最高级优化则存储空间换执行时间和0s体积优化则执行时间换存储空间
      21. 安装JLink驱动：“Keil文件夹-ARM-Segger-USBDriver”

# 4.STM32CubeMX软件
1. 下载：[STM32CubeMX下载官网](https://www.st.com.cn/zh/development-tools/stm32cubemx.html)（不能运行则要安装JAVA:https://www.java.com/zh-CN/download/）
2. 安装：基本上是同意和下一步和避免中文路径和创建桌面图标
3. 设置：设置包路径，关闭自动更新，检查连接ST官方服务器，登录ST账号(用于在线安装软件包)
4. 编程
   - C语言
   - C++
5. 学习：
   - [STM32江协标准库-基础功能](https://www.bilibili.com/video/BV1th411z7sn/?)
   - [难点1-CAN总线协议-工科男孙老师-用于入门学习1](https://www.bilibili.com/video/BV14F5s6nEgv/?spm_id_from=333.337.search-card.all.click)
   - [难点1-CAN总线协议-蓝指针科普-用于入门学习2](https://www.bilibili.com/video/BV1BtovBgEZG/?spm_id_from=333.337.search-card.all.click)
   - [难点1-CAN总线协议-爱上半导体-用于入门学习3](https://www.bilibili.com/video/BV14k4y187e6/?spm_id_from=333.337.search-card.all.click)
   - [STM32江协标准库-CAN通信（未学习）](https://www.bilibili.com/video/BV1vu4m1F7Gt/?)
   - [难点2-以太网协议EtherCAT（暂无）]()
   - [STM32江协内容转HAL库-部分内容有错而仅用于快速熟悉配置和HAL函数（还有红外蓝牙WiFi）](https://www.bilibili.com/video/BV1pAojYNEhx?)
   - [STM32铁头山羊动画讲解HAL库-用于入门学习](https://www.bilibili.com/video/BV16J4m1w7HB?)
   - [STM32野火小智全面讲解HAL库-用于进阶学习（未学习CAN）](https://www.bilibili.com/video/BV1ZmGQzsE4N/?)
   - [STM32中科大RM电控讲解HAL库-CAN通信（未学习）](https://www.bilibili.com/video/BV1HY411D7Ar/?)
6. 常识：
   - 电源引脚（来源是MOS管的电流是漏极D到源极S）
      1. 正极：Vdd（相比其他是Vcc）
      2. 负极：Vss（相比其他是GND）
   - 缩写：
      1. 兆M：100万=1000千
      2. 千K：1千
   - 单位：
      1. 时间：1s=1×1000ms=1000×1000us
   - 代码位置：用户代码要写在Begin和End之间，否则更新配置会被抹除
   - 原子操作：中断不能打断的操作
7. 首页：
   - 从MCU创建工程
   - 从ST官方板卡创建工程
   - 从ST官方板卡的示例启动
8. 选芯：
   - 直接搜索芯片名称（在输入芯片型号时,切换英文输入法可以避免双重字母）
   - 筛选条件
   - 星星收藏
   - 查原理图/用户手册：查阅开发板的引脚作用，有无外部时钟源（一般是OSC），定时器输出通道引脚，串口TxRx引脚，CANTxRx引脚……
9. 文件分配
   - Doc文件夹：存放项目说明文档
   - Libraries文件夹：子文件夹分别存放HAL驱动库和CMSIS核心库
      1. CMSIS文件夹：ARM官方的Cortex-M核心支持文件（只需要Device(只需Include+Source)+Include文件夹）（system系统初始化）
         - DSP库(只需要DSP(只需Include+Source)+ARM的math.lib(源码文件和库文件二选一))：数字信号处理库函数，主要提供大量高性能的数学函数
      2. STM32_HAL_Driver文件夹：STM32官方的HAL库驱动源代码（只需要Inc+Src文件夹）
   - Project文件夹：存放工程文件和链接脚本等构建内容
      1. DebugConfig文件夹：存放调试配置信息文件
      2. Listings文件夹：存放编译过程中的链接列表文件（中间产物可删除）
      3. Objects文件夹：存放编译过程中的目标文件
   - User文件夹：存放用户编写主函数代码（main主函数）和HAL库配置文件（hal_conf外设开关,it中断）
   - APP文件夹：存放用户编写功能函数代码

# 5.功能配置HAL库函数
1. 基本配置：
   - 调试类型：在系统核心System Core的SYS选择SerialWire串行调试接口（ST-Link,J-Link,DAP-Link）
   - 时钟类型：在系统核心System Core的RCC(Reset&Clock Controller)
      1. 旁路时钟源BYPASS Clock Source：外部有源晶振，直接使用已经生成的时钟信号
      2. 晶体陶瓷振荡器Crystal/Ceramic Resonator：外部无源晶振，外接电路产生时钟信号
   - 配时钟树：在时钟配置Clock Configuration页面
      1. 一般是HCLK填写最大值后按下回车，自动配置时钟树，改写晶振值和选用外部晶振
      2. 选择时钟源和更改乘除倍数
   - 保存项目：在工程管理Project Manager页面
      1. 输入工程名称Project Name和选择工程路径Project Location，避免中文
      2. 选择文件结构Application Structure选择先进Advanced而文件夹分类清晰，不要勾选不创建main函数
      3. 选择工具链集成开发环境Toolchain/IDE：
         - EWARM：IAR软件
         - MDK-ARM：Keil软件
         - STM32CubeIDE：STM32CubeIDE软件
         - Makefile：通用Makefile脚本，适合Linux环境开发
         - Cmake：VSCode、Clion等现代编辑器
      4. 默认最大的软件最低版本要求Min Version
      5. 默认堆栈最小的大小Linker Settings
      6. 默认线程安全设置：
         - RTOS多线程：勾选
         - 裸机系统：不勾选
      7. 默认芯片固件包，取消勾选使用最新可用版本Use latest available version即可调整版本
      8. 固件库拷贝方式：在Code Generator页面
         - 工程拷贝所有库：Copy all used libraries into the project folder
         - 工程拷贝所需库：Copy only the necessary library files（推荐）
         - 工程使用引用路径方式添加库：Add necessary library files as reference in the toolchain project configuration file
      9. 生成文件设置：在Code Generator页面
         - .h.c代码放在不同文件夹中：Generate peripheral initialization as a pair of'.c/.h' files per peripheral（推荐）
         - 重新生成时备份旧文件：Backup previously generated files when re-generating（不推荐）
         - 重新生成时保留用户代码：Keep User Code when re-generating（推荐）
         - 重新生成时不使用的旧文件直接删除：Delete previously generated files when not re-generated（推荐）
      10. 右上角生成初始化代码
   - 重复配置：在生成的工程项目中，打开.ioc文件可以重复配置工程项目
   - 文件作用：
      1. .s是启动文件，启动时执行的第一个代码文件
      2. system是系统配置
2. 头文件固定代码：避免头文件重复命名导致重复编译而失败
   - #ifndef：如果宏没有定义
   - #define：定义宏
   - #endif：结束判断
3. 头文件
   - 标准函数：stdio.h
   - 字符处理：string.h
   - 通用工具：stdlib.h
   - 数据类型：stdint.h
   - 数学函数：math.h
   - GPIO口：GPIO.h
4. Main主函数解析
   - 注释：在重新生成代码时，只会保留在注释之间的代码
   - HAL_Init()：初始化HAL库
   - SystemClock_Config()：初始化配置的时钟树
   - MX_GPIO_Init()：初始化配置的引脚
   - while(1)：循环做的任务
5. 非HAL函数：
   - 占用字节数：sizeof(数据类型或变量名称)
6. 基础函数：
   - 阻塞延时：HAL_Delay(时间值)（时间单位ms）
   - 运行时间：HAL_GetTick()（时间单位ms）
7. 常用数据类型
   - 枚举类型：GPIO_PinState
8. 常用宏定义
   - 无限等待时间：HAL_MAX_DELAY
   - 函数执行成功：HAL_OK
   - 外设正在繁忙：HAL_BUSY
   - 函数执行超时：HAL_TIMEOUT
   - 发现执行错误：HAL_ERROR
9. 时钟函数：
   - 系统频率：HAL_RCC_GetSysClockFreq()
10. GPIO引脚：
   - 配置：按住Ctrl选择引脚功能可以查看可替换引脚位置
      1. 在系统核心System Core的GPIO选择引脚，每个引脚可以选择功能配置，右下角可以搜索
         - 初始电平：默认低电平
            1. 低电平：Low
            2. 高电平：High
         - 模式：默认推挽输出（一个引脚可以同时输入输出）
            1. 浮空输入No pull-up and pull-down：引脚悬空则输入不确定
            2. 上拉输入Pull-up：内部连接上拉电阻则悬空默认高电平
            3. 下拉输入Pull-down：内部连接下拉电阻则悬空默认低电平
            4. 模拟输入：GPIO无效而接入内部ADC
            5. 开漏输出Output Open Drain：输出高电平为高阻态
            6. 推挽输出Output Push Pull：高则高，低则低
            7. 复用开漏输出：芯片内部外设控制的开漏输出
            8. 复用推挽输出：芯片内部外设控制的推挽输出
         - 上下拉阻：默认无上下拉电阻
            1. 无上下拉：No pull-up and no pull-down
            2. 上拉：Pull-up
            3. 下拉：Pull-down
         - 输出速度：默认低速
            1. 低速(≈2MHz)：Low
            2. 中速(≈10MHz)：Medium
            3. 高速(≈50MHz)：High
            4. 超高速(≈100MHz)：Very High
         - 用户标签：默认无宏定义
   - 宏定义：
      1. 低电平0：GPIO_PIN_RESET
      2. 高电平1：GPIO_PIN_SET
   - 代码：
      1. 自动生成初始化配置：MX_GPIO_Init()
      2. 翻转输出：HAL_GPIO_TogglePin(GPIO引脚分组,GPIO_PIN引脚)
      3. 电平输出：HAL_GPIO_WritePin(GPIO引脚分组,GPIO_PIN引脚,GPIO_PIN高/低电平)
      4. 读取电平：HAL_GPIO_ReadPin(GPIO引脚分组,GPIO_PIN引脚)
11. NVIC嵌套向量中断管理器
   - 配置：在系统核心System Core的NVIC
      1. 位数分组Priority Group：优先级寄存器是4位16级(越小等级越高)，高几位抢占优先级Pre-emption Priority(优先级更高则打断嵌套)，低几位响应优先级Subpriority(优先级越高越先排队插队,优先级相同则先来后到)
      2. 显示Show：可用中断，所有中断
      3. 使能Enabled：勾选开启外设中断
   - 中断产生：芯片内的各种外设
12. EXIT外部中断
   - 配置：
      1. 设置：在右侧图形化中，每个引脚可以选择外部中断（同数字互斥），或者选择功能配置（部分引脚功能是PVD输出(芯片供电电压超出电压范围则输出),RTC闹钟,USB唤醒,以太网唤醒）
      2. 模式Mode：在系统核心System Core的GPIO（中断进入CPU,事件不影响CPU）
         - 中断：上升沿，下降沿，双边沿
         - 事件：上升沿，下降沿，双边沿
      3. 中断：在系统核心System Core的NVIC，勾选启用外部中断控制
      4. 优先级：系统核心System Core的NVIC，分组是抢占和响应的位数，数值越小则优先级越高
         - 抢占优先级：中断嵌套
         - 响应优先级：优先排队（子优先级）
      5. 响应方式：中断响应（进入软件函数），事件响应（触发硬件模块）
   - 代码：
      1. 初始化：
         - 读取标志位：__HAL_GPIO_EXTI_GET_FLAG(GPIO_PIN引脚)（轮询），__HAL_GPIO_EXTI_GET_IT(GPIO_PIN引脚)（中断）
         - 清除标志位：__HAL_GPIO_EXTI_CLEAR_FLAG(GPIO_PIN引脚)（轮询），__HAL_GPIO_EXTI_CLEAR_IT(GPIO_PIN引脚)（中断）
         - 服务函数（硬件调用）：EXTIx_IRQHandler()
         - 处理函数（判中断类）：HAL_GPIO_EXTI_IRQHandler(GPIO_PIN引脚)
      2. 使用：
         - 回调函数（中断内容）：void HAL_GPIO_EXTI_Callback(uint16_t GPIO_Pin)（用户定义弱函数weak）
13. TIM定时器：
   - 功能：计数计时，输入捕获IC，输出比较OC，PWM，编码器
   - 配置：在系统核心System Core的RCC选择外部时钟源的晶振来源。在定时器选择通道输出和引脚，输入PSC分频倍数(寄存器内部实际分频倍数数值=填写数值=分频倍数目标数值-1)和CM计数方向和ARR计数总数(寄存器内部实际计数总数数值=填写数值=计数总数目标数值-1)和上电默认CCR捕获比较的Pulse值(上电默认输出一定占空比的PWM)。在时钟树中输入外部晶振频率，选择时钟源和倍分频
      1. 从模式Slave Mode：作为从定时器响应外部触发信号
         - 复位模式：触发信号边沿则清零计数器CNT和产生更新事件
         - 门控模式：高低电平控制计数器CNT开关
         - 触发模式：触发信号边沿启动计数器CNT
         - 外部时钟模式：外部输入时钟信号
      2. 触发源Trigger Source：从模式的触发信号来源
         - 外部引脚
         - 其他定时器
         - 本定时器的输入捕获
      3. 时钟源Clock Source：
         - InternalClock内部时钟
         - TRIG从模式控制器输入触发信号：其他定时器ITR，输入捕获，编码器
         - ETR外部触发输入
      4. 通道Channel：Disable是默认作为计数计时
      5. 组合通道Combined Channel：
         - 编码器模式Encoder Mode：输入捕获正交编码器接口AB相转换成时钟信号控制计数器增减
         - PWM输入模式：
         - 异或/霍尔传感器模式：
      6. 中断：在NVIC Setting或在系统核心System Core的NVIC勾选TIM所需中断
         - 更新溢出update(global)：计数器计满溢出或软件置位或从模式输入则触发更新事件
         - 捕获比较capture/compare(global)：输入捕获检测到边沿则触发，输出比较计数器=寄存器CCR值则触发
         - 触发换向trigger/commtation：内/外部触发信号或电机换相事件则触发
         - 刹车break(高级定时器特有)：BKIN引脚接收到有效电平或时钟故障
      7. 寄存器：
         - PSC预分频器Prescaler：对时钟频率倍数分频÷0~65535（寄存器从0开始计数故-1）（≈计数一次的时间）
         - 计数模式Counter Mode：向上Up，向下Down，中央对齐是先向上再向下Center Aligned
         - CNT计数器：计满0~65535溢出
         - ARR自动重装载值Counter Period：计数溢出后重新装载计数器0~65535（从0开始计数故-1）（≈目标次数）
         - RCR重复计数(高级定时器特有)：重复计数的次数0~65535（从0开始计数故-1），计数溢出则减少一次重复计数，重复计数结束才会产生更新事件事件
         - 自动重装预装载使能ARP：使能(产生中断或事件表示周期结束后寄存器值修改才生效,ARR需要手动开启)，不使能
         - 捕获比较CCR：计数器和寄存器值的比较而实现控制输出（≈比较次数）
      8. 其他设置：
         - 时钟分频Internal Clock Division：不分频，二分频，四分频（影响输入捕获的采样速度和死区时间）
         - 自动预装载使能Auto-Reload Preload：Disable修改ARR值立即生效，Enable修改ARR值等待下个更新事件生效
         - 触发输出的主从模式Master/Slave Mode：Disbale主定时器不等待从外设一起开始，Enable主定时器等待从外设一起开始
         - 触发输出的信号Trigger Event Selection：
            1. Reset：代码置标志位或从模式的复位模式，输出一个脉冲
            2. Enable：计数器在运行状态则输出高电平
            3. Update Event：计数器溢出的周期性输出脉冲
            4. Compare Pulse：计数器的值=比较值时，发送一个脉冲
            5. Output Compare：捕获比较通道信号
      9. 输出模式：
         - 冻结：输出不变
         - 翻转：相等则翻转
         - 相等有效：相等则输出高电平，不相等则低
         - 相等无效：相等则输出低电平，不相等则高
         - 强制无效：强制低电平
         - 强制有效：强制高电平
         - PWM1：CNT计数器<CCR寄存器值则输出高电平，>则低电平
         - PWM2：CNT计数器<CCR寄存器值则输出低电平，>则高电平
      10. 输出通道：
         - 正常输出CH：经过极性选择(正极性High(原样输出)/负极性Low(取反输出))
         - 互补输出CHN(高级定时器特有)：经过反相器+极性选择(正极性High(原样输出)/负极性Low(取反输出))
      11. PWM：
         - 脉冲值Pulse：捕获比较CCR初始值（占空比=Pulse/(ARR+1)）
         - 输出比较预装载使能Output Compare Preload：Disable修改CCR值立即生效，Enable修改CCR值等待下个更新事件生效
         - 快速模式Fast Mode：降低电平翻转的响应延迟(标准模式是下一时钟周期才改变电平)和抖动
         - 通道极性CH Polarity：经过极性选择(正极性High(原样输出)/负极性Low(取反输出))
         - 互补通道极性(高级定时器特有)：经过极性选择(正极性High(原样输出)/负极性Low(取反输出))
         - 通道空闲状态：低电平Reset，高电平Set
         - 互补通道空闲状态(高级定时器特有)：低电平Reset，高电平Set
      12. IC：
         - 极性选择Polarity Selection：
            1. Rising：上升沿
            2. Falling：下降沿
            3. 上下沿都捕获
         - 捕获选择IC Selection：
            1. Direct：直接模式（捕获本通道信号）
            2. Indirect：间接模式（捕获对侧通道信号）
            3. TRC：从模式控制信号
         - 倍数分频Prescaler Division Ratio：计数多次才算一次
            1. No Division：不分频
            2. Division by 2：二分频
            3. Division by 4：四分频
            4. Division by 8：八分频
         - 输入滤波Input Filter：增大值可以使用硬件滤波器滤除高频噪声
      13. OC：
      14. Encoder：（增量式编码器是两个AB相位差90°的方波，绝对值编码器是位置码盘保持断电不丢位置）
         - 模式Encoder Mode：
            1. TI1：A相边沿计数B相电平判向
            2. TI2：B相边沿计数A相电平判向
            3. TI1和2：AB边沿计数和电平判向
         - 极性Polarity：
            1. Rising Edge：上升沿则正常输入信号
            2. Falling Edge：下降沿则输入信号取反
         - 捕获选择IC Selection：只能配置为直接Direct
         - 倍数分频Prescaler Division Ratio：（编码器模式不经过分频器所以无用）
         - 输入滤波Input Filter：增大值可以使用硬件滤波器滤除高频噪声
      15. 组合通道模式：测量PWM周期和占空比，霍尔传感器模式，异或霍尔模式
      16. 从模式TRGO：
         - 触发事件：更新事件
      17. NVIC Setting：勾选启用中断控制
      18. DMA Setting：在DMA Setting添加通道，选择方向Direction，选择DMA优先级Priority，选择模式Mode单次Normal或循环Circular，按需勾选源端地址自增、目标地址自增和选择自增地址间隔（根据ADC位数选择）
   - 代码：
      1. 系统滴答定时器：
         - 1ms中断函数：void SysTick_Handler(void)（需要使用static在函数消失时保存变量）
      2. 初始化：
         - 自动生成初始化配置：MX_TIM_Init()
         - 开启定时器计数：HAL_Base_Start(&htim定时器号)
         - 关闭定时器计数：HAL_Base_Stop(&htim定时器号)
         - 开启定时器计数中断：HAL_Base_Start_IT(&htim定时器号)
         - 关闭定时器计数中断：HAL_Base_Stop_IT(&htim定时器号)
         - 开启定时器PWM通道：HAL_TIM_PWM_Start(&htim定时器号,TIME_CHANNEL定时器通道)
         - 开启定时器PWM互补通道(高级定时器特有)：HAL_TIMEx_PWMN_Start(&htim定时器号,TIME_CHANNEL定时器通道)
         - 关闭定时器PWM通道：HAL_TIM_PWM_Stop(&htim定时器号,TIME_CHANNEL定时器通道)
         - 关闭定时器PWM互补通道(高级定时器特有)：HAL_TIMEx_PWMN_Stop(&htim定时器号,TIME_CHANNEL定时器通道)
         - 开启定时器PWM的DMA通道：HAL_TIM_PWM_Start_DMA(&htim定时器号,TIME_CHANNEL定时器通道,要发送比较值数据的地址,发送数据字节数)（比较值数据依次放到CCR寄存器）
         - 关闭定时器PWM的DMA通道：HAL_TIM_PWM_Stop_DMA(&htim定时器号,TIME_CHANNEL定时器通道)
         - 开启定时器IC通道：HAL_TIM_IC_Start(&htim定时器号,TIME_CHANNEL定时器通道)
         - 关闭定时器IC通道：HAL_TIM_IC_Stop(&htim定时器号,TIME_CHANNEL定时器通道)
         - 开启定时器Encoder模式：HAL_TIM_Encoder_Start(&htim定时器号,TIME_CHANNEL_ALL)（也可以分别开启通道）
         - 关闭定时器Encoder模式：HAL_TIM_Encoder_Stop(&htim定时器号,TIME_CHANNEL_ALL)（也可以分别关闭通道）
      3. 使用：
         - 定时器句柄：htim->Instance定时器，htim->Channel通道
         - 定时器宏定义：
            1. HAL_TIM_ACTIVE_CHANNEL：判断触发中断或事件的通道
         - 定时器标志位：（双下划线开头表示对寄存器操作）
            1. 读取标志位：__HAL_TIM_GET_FLAG(&htim1,TIM_FLAG标志位)
            2. 清除标志位：__HAL_TIM_CLEAR_FLAG(&htim1,TIM_FLAG标志位)
            3. 计数器溢出：
            4. 捕获信号变化：
         - 定时器基本函数：（双下划线开头表示对寄存器操作）
            1. 读取预分频：__HAL_TIM_GET_PRESCALER(&htim定时器号)
            2. 设置预分频：__HAL_TIM_SET_PRESCALER(&htim定时器号,PSC预分频值)（有影子寄存器）
            3. 读取计数值：__HAL_TIM_GET_COUNTER(&htim定时器号)
            4. 设置计数值：__HAL_TIM_SET_COUNTER(&htim定时器号,CNT计数值)
            5. 读取重装载：__HAL_TIM_GET_AUTORELOAD(&htim定时器号)
            6. 设置重装载：__HAL_TIM_SET_AUTORELOAD(&htim定时器号,ARR自动重装载值)（有影子寄存器）
            7. 读取比较值：__HAL_TIM_GET_COMPARE(&htim定时器号,TIME_CHANNEL定时器通道)
            8. 设置比较值：__HAL_TIM_SET_COMPARE(&htim定时器号,TIME_CHANNEL定时器通道,CCR捕获比较的值)（有影子寄存器）
            9. 读取计数方向：__HAL_TIM_IS_TIM_COUNTING_DOWN(&htim定时器号)
            10. 设置计数方向：__HAL_TIM_SET_COUNTERMODE(&htim定时器号,TIM_COUNTERMODE计数方向)
         - 计数/中断：
            1. 中断回调函数：void HAL_TIM_PeriodElapsedCallback(TIM_HandleTypeDef *htim)（用户定义弱函数weak）
         - IC：
            1. 中断回调函数：void HAL_TIM_IC_CaptureCallback(TIM_HandleTypeDef *htim)（用户定义弱函数weak）
            2. IC读取捕获比较寄存器CCR值函数：HAL_TIM_ReadCapturedValue(&htim定时器号,TIME_CHANNEL定时器通道)
         - PWM：
            1. 中断回调函数：HAL_TIM_PWM_PulseFinishedCallback(TIM_HandleTypeDef *htim)（用户定义弱函数weak）
14. ADC模数转换器：
   - 配置：
      1. 开启通道：在模拟的ADC勾选通道或内部温度计或内部参考电压
      2. 时钟配置：要勾选启用ADC通道才能配置ADC时钟树的时钟频率
      3. 功能设置ADC_Setting：
         - 模式Mode：
            1. 独立模式：多个ADC独立工作互不干扰
            2. 同步模式：多个ADC同时采样提升速度
         - 对齐Data Alignment：寄存器是16位但ADC是12位
            1. 左对齐Left：读取数据变大，因为低位补0
            2. 右对齐Right：读取数据正常（常用）
         - 扫描Scan Conversion Mode：（多通道自动启用）
            1. 禁用Disabled：每次触发只转换Rank1通道（转换一个通道则进入一次回调函数）
            2. 启用Enabled：可以依次转换多个通道（转换所有通道则进入一次回调函数）
         - 连续Continuous Conversion Mode：
            1. 禁用Disabled：触发一次则扫描一次规则序列转换
            2. 启用Enabled：触发一次则连续扫描规则序列转换
         - 间断Discontinuous Conversion Mode：
            1. 禁用Disabled：触发一次则转换整个序列（按序列顺序）
            2. 启用Enabled：触发一次则只转换序列的前N个
      4. 规则转换ADC_Regular_ConversionMode：（正常工作通道）
         - 使能Enable Regular Conversions：开关使能规则(常规)序列
         - 数量Number Of Conversion：规则转换通道数量（注意数据寄存器只有一个所以数据不及时读取会被覆盖）
         - 触发External Trigger Conversion Source：选择定时器或外部中断或软件启动等外部触发信号处理规则通道的模数转换
         - 序列Rank：填写ADC通道和采样时间周期
            1. RANK通道：更改每个RANK的ADC通道
            2. 采样周期：时间短则采样电容未充满电导致读数不准，时间长则能适应高阻抗充满电。总时间=采样时间+逐次逼近时间(12位是12.5周期) 
      5. 注入转换ADC_Injected_ConversionMode：（快速插队通道）
         - 使能Enable Injected Conversions：开关使能注入序列
         - 数量Number Of Conversion：注入转换通道数量
         - 触发External Trigger Conversion Source：选择定时器或外部中断或软件启动等外部触发信号处理注入通道的模数转换
         - 模式Injected Conversion Mode：注入转换模式
            1. None：触发一次则转换整个注入序列
            2. 间断Discontinuous Mode：触发一次则只转换注入序列的前N个
            3. 自动注入Auto Injected Mode：高级模式，注入序列转换完成后自动切换回规则序列继续转换
         - 序列Rank：填写ADC通道和采样时间周期
            1. RANK通道：更改每个RANK的ADC通道
            2. 采样周期：时间短则采样电容未充满电导致读数不准，时间长则能适应高阻抗充满电。总时间=采样时间+逐次逼近时间(12位是12.5周期) 
      6. 模拟看门狗WatchDog：
         - 使能Enable Analog WatchDog Mode：开关使能模拟看门狗中断，监测测量值在自定义范围之内
      7. 开关中断：在NVIC Setting或在系统核心System Core的NVIC勾选ADC的中断，选择DMA优先级Priority
      8. DMA中断：在DMA Setting添加ADC，选择DMA优先级Priority，选择模式Mode单次Normal或循环Circular，按需勾选源端地址自增、目标地址自增和选择自增地址间隔（根据ADC位数选择）
   - 代码：
      1. 初始化：
         - 自动生成配置：MX_ADC_Init()
         - 初始化开启ADC校准提升采样精度：HAL_ADCEx_Calibration_Start(&hadc模数转换器号)
      2. 阻塞使用：（一般不使用轮询阻塞）
         - 标志位：
            1. AWD：模拟看门狗
            2. EOC：规则组转换结束
            3. JEOC：注入组转换结束
         - 规则组：
            1. 开启一次轮询阻塞ADC规则转换：HAL_ADC_Start(&hadc模数转换器号)
            2. 阻塞等待ADC规则转换完成：HAL_ADC_PollForConversion(&hadc模数转换器号,等待时间)
            3. 读取ADC规则转换结果：HAL_ADC_GetValue(&hadc模数转换器号)
         - 注入组：
            1. 开启一次轮询阻塞ADC注入转换：HAL_ADCEx_InjectedStart(&hadc模数转换器号)
            2. 阻塞等待ADC注入转换完成：HAL_ADCEx_InjectedPollForConversion(&hadc模数转换器号,等待时间)
            3. 读取ADC注入转换结果：HAL_ADCEx_InjectedGetValue(&hadc模数转换器号,注入通道序列号)
      3. 中断使用：
         - 规则组：
            1. 开启一次ADC转换中断：HAL_ADC_Start_IT(&hadc模数转换器号)
            2. 转换完成中断回调函数：void HAL_ADC_ConvCpltCallback(ADC_HandleTypeDef* hadc)（用户定义弱函数weak）
            3. 读取转换结果：HAL_ADC_GetValue(&hadc模数转换器号)
         - 注入组：
            1. 开启一次ADC转换中断：HAL_ADCEx_InjectedStart_IT(&hadc模数转换器号)
            2. 转换完成中断回调函数：void HAL_ADCEx_InjectedConvCpltCallback(ADC_HandleTypeDef* hadc)（用户定义弱函数weak）
            3. 读取转换结果：HAL_ADCEx_InjectedGetValue(&hadc模数转换器号,注入通道序列号)
      4. DMA中断：
         - 规则组：
            1. 开启ADC转换DMA中断：HAL_ADC_Start_DMA(&hadc模数转换器号,目标地址,搬运数据数量)
            2. 转换搬运完成中断回调函数：void HAL_ADC_ConvCpltCallback(ADC_HandleTypeDef* hadc)（用户定义弱函数weak）
         - 注入组：
            1. 开启ADC转换DMA中断：HAL_ADCEx_InjectedStart_DMA(&hadc模数转换器号,目标地址,搬运数据数量)
            2. 转换搬运完成中断回调函数：void HAL_ADCEx_InjectedConvCpltCallback(ADC_HandleTypeDef* hadc)（用户定义弱函数weak）
15. DMA直接存储器访问：
   - 配置：在系统核心System Core的DMA，添加DMA
      1. DMA请求：
         - 存储器到存储器：软件直接触发
         - ADC：需要先配置ADC，ADC触发
      2. 传输方向：数据从源端地址搬运到目标地址
      3. 传输模式：
         - 正常：调用一次函数搬运一次指定数据量
         - 循环：调用一次函数循环搬运
      4. 源端地址自增
      5. 目标地址自增
      6. 自增地址间隔：
         - Byte：一个字节=8位
         - Half Word：半字=16位
         - Word：字=32位（注意和Windows系统不一样）
      7. 优先级：相同优先级则根据硬件通道编号决定，优先级只会插队不会打断
         - Low：低
         - Medium：中
         - High：高
         - Very High：非常高
   - 代码：
      1. 初始化：
         - 自动生成配置：MX_DMA_Init()
         - 更改参数：hdma通道号.=
         - 在代码更改参数时使用：HAL_DMA_Init(&hdma通道号)
      2. 使用：
         - 启动搬运：HAL_DMA_Start(&hdma通道号,(uintx_t*)&DataA源端地址,(uintx_t*)&DataB目标地址,搬运数据数量)
         - 等待完成：HAL_DMA_PollForTransfer(&hdma通道号,HAL_DMA_FULL_TRANSFER,等待时间)
      3. 宏定义：
         - 搬运全部：HAL_DMA_FULL_TRANSFER
         - 搬运一半：HAL_DMA_HALF_TRANSFER
16. USART串口：
   - 配置：在通信外设的USART
      1. 模式：
         - 异步Asynchronous：约定通信速率，无需时钟线
         - 同步Synchronous：增加时钟线，无需双方同设波特率（接收引脚最好配置上拉模式）
         - 半双工Single Wire：
         - 多处理器通信Multiprocessor Communication：
         - IrDA：
         - LIN：
         - 智能卡：
      2. 基参：
         - 波特率Baud Rate：每秒传输码元个数（在串口通信,码元=二进制位）
         - 数据位Word Length：每次传输数据量位数
         - 校验位Parity：校验传输过程的数据无错
         - 停止位Stop Bits：停止位的持续位时间
      3. 高参：
         - 数据方向Data Direction：只发收或发收双向
      4. 开关中断：在NVIC Setting或在系统核心System Core的NVIC勾选USART的中断
      5. DMA中断：在DMA Setting添加串口的发送接收，选择模式Mode单次Normal或循环Circular，按需勾选源端地址自增、目标地址自增和选择自增地址间隔（根据数据位的位数选择）
   - 代码：
      1. 初始化：
         - 自动生成配置：MX_USART_UART_Init()
         - Keil5打印重定向：int fputc(int ch, FILE *f){HAL_UART_Transmit(&huart串口号,(uint8_t *)&ch,1,HAL_MAX_DELAY);return ch;}（还需进入Keil5-Options for target-Target-勾选Use MicroLIB-直接使用printf函数(循环调用fputc直至发送完毕)）
      2. 阻塞使用：（一般不使用轮询阻塞）
         - 开启一次轮询阻塞发送定长数据：HAL_UART_Transmit(&huart串口号,要发送数据的地址,发送数据字节数,等待时间)
         - 开启一次轮询阻塞接收定长数据：HAL_UART_Receive(&huart串口号,接收数据缓冲区的地址,接收数据字节数,等待时间)
         - 开启一次轮询阻塞接收不定长数据：HAL_UART_ReceiveToIdle(&huart串口号,接收数据缓冲区的地址,接收数据最大字节数,实际接收数据字节数,等待时间)（空闲或缓冲区满则退出）
         - 发收错误回调函数：void HAL_UART_ErrorCallback(UART_HandleTypeDef *huart)
         - 清除错误标志位：__HAL_UART_CLEAR_FEFLAG(&huart串口号)
         - 检查标志位：__HAL_UART_GET_FLAG(&huart串口号,标志位)
            1. 发送完毕标志位：UART_FLAG_TC（使用函数只保证填充寄存器,所以要检查标志位）
      3. 中断使用：
         - 中断模式：
            1. 开启一次非阻塞发送定长数据中断：HAL_UART_Transmit_IT(&huart串口号,要发送数据的地址,发送数据字节数)
            2. 开启一次非阻塞接收定长数据中断：HAL_UART_Receive_IT(&huart串口号,接收数据缓冲区的地址,接收数据字节数)
            3. 开启一次非阻塞接收不定长数据中断：HAL_UARTEx_ReceiveToIdle_IT(&huart串口号,接收数据缓冲区的地址,接收数据缓冲区最大字节数)（空闲或缓冲区满则触发回调函数）
         - 服务函数（硬件调用）：USART_IRQHandler(void)
         - 处理函数（判中断类）：HAL_UART_IRQHandler(&huart串口号)
         - 回调函数（中断内容）：
            1. 非阻塞发送定长数据中断的回调函数：void HAL_UART_TxCpltCallback(UART_HandleTypeDef *huart)（用户定义弱函数weak）
            2. 非阻塞接收定长数据中断的回调函数：void HAL_UART_RxCpltCallback(UART_HandleTypeDef *huart)（用户定义弱函数weak）
            3. 非阻塞接收不定长数据中断的回调函数：void HAL_UARTEx_RxEventCallback(UART_HandleTypeDef *huart,uint16_t Size)（用户定义弱函数weak）
      4. DMA中断：
         - 中断模式：
            1. 开启非阻塞发送定长数据DMA中断：HAL_UART_Transmit_DMA(&huart串口号,要发送数据的地址,发送数据字节数)
            2. 开启非阻塞接收不定长数据DMA中断：HAL_UARTEx_ReceiveToIdle_DMA(&huart串口号,接收数据缓冲区的地址,接收数据缓冲区最大字节数)（空闲或缓冲区满则触发回调函数）
         - 回调函数：
            1. 中断接收：void HAL_UARTEx_RxEventCallback(UART_HandleTypeDef *huart, uint16_t Size)
   - - - - （前文-待处理融合）USART串口：
   - 配置：在的选择异步，输入波特率和数据帧的数据位+校验位的位数和停止位位数。在的DMA选择添加发送接收和勾选开启全局中断和自主选择开启循环模式
   - 代码：
      1. 数据帧：变量（整数，带小数）
         - 1字节(8位)：char(int8_t)，uchar(uint8_t)
         - 2字节(16位)：short(int16_t)，ushort(uint16_t)
         - 4字节(32位)：int(int32_t)，uint(uint32_t)，long，ulong，float(fp32,带小数)
         - 8字节(64位)：longlong(int64_t)，ulonglong(uint64_t)，double(fp64,带小数)
      2. CPU收发数据帧：
         - 接收：HAL_UART_Receive(&串口号,&数据帧变量,字节数,超时时间)
         - 发送：HAL_UART_Transmit(&串口号,&数据帧变量,字节数,超时时间)
      3. 中断收发数据帧：
         - 接收：HAL_UART_Receive_IT(&串口号,&数据帧变量,字节数)
         - 发送：HAL_UART_Transmit_IT(&串口号,&数据帧变量,字节数)
      4. DMA收发数据帧：
         - 接收：HAL_UART_Receive_DMA(&串口号,&数据帧变量,字节数)
         - 发送：HAL_UART_Transmit_DMA(&串口号,&数据帧变量,字节数)
      5. 串口接收中断函数：
         - 接函：HAL_UART_RxCpltCallback()
         - 接收中断函数：HAL_UARTEx_RxEventCallback(UART_HandleTypeDef *串口号)
         - 中断错误函数：HAL_UART_ErrorCallback(UART_HandleTypeDef *串口号)
17. I2C集成电路总线：（两线,多主(对比总线信号仲裁)多从(设备地址)）
   - 软件I2C：（占用MCU）
      1. 硬件：串行时钟线SCL和串行数据线SDA都分别连接4.7K的上拉电阻
      2. 配置：两个开漏输出和上拉(外部上拉则无拉)的GPIO口分别作为时钟线SCL和数据线SDA
      3. 代码：
         - 通信单元：（总结:在时钟SCL=1时数据SDA才有效）
            1. 初始化（空闲）：SCL=1，SDA=1
            2. 起始条件（SCL=1时SDA下降沿）：SDA=1，SCL=1，SDA=0，SCL=0
            3. 发送字节（高位先发,SCL=1时发送）：SDA(循环发送一字节数据变量的每一位)，SCL=1，SCL=0
            4. 接收应答（主发从答,需要提前释放SDA,0=应答=从机收到,1=非应答=发址填错/从机繁忙/从机故障）（每次发送1字节就要接收1次应答）：SDA=1，SCL=1，SDA=接收应答位，SCL=0
            5. 接收字节（高位先收,SCL=1时接收）：SDA(循环接收一字节数据变量的每一位)，SCL=1，SCL=0
            6. 发送应答（主收主答,0=应答=继续读,1=非应答=不读了）（每次接收1字节就要发送1次应答）：SDA=发送应答位，SCL=1，SCL=0
            7. 终止条件（SCL=1时SDA上升沿）：SCL=0，SDA=0，SCL=1，SDA=1
         - 发送接收：
            1. 发送数据：起始条件，发送字节(7位从机设备地址+1位读写(10)操作(少有2字节表示=5位固定+2位从机设备地址高二位+1位读写操作+8位从机设备地址低八位))，接收应答，发送字节，接收应答，终止条件
            2. 发送数据到寄存器：起始条件，发送字节(7位从机设备地址+1位读写(10)操作(少有2字节表示=5位固定+2位从机设备地址高二位+1位读写操作+8位从机设备地址低八位))，接收应答，起始条件(其实是省略终止条件)，发送字节(寄存器地址字节)，接收应答，发送字节(具体数据字节)，接收应答，终止条件
            3. 接收数据在寄存器：起始条件，发送字节(7位从机设备地址+1位读写(10)操作(少有2字节表示=5位固定+2位从机设备地址高二位+1位读写操作+8位从机设备地址低八位))，接收应答，起始条件(其实是省略终止条件)，发送字节(寄存器地址字节)，接收应答，接收字节(具体数据字节)，发送应答，终止条件
         - 功能封装：
            1. OLED屏幕：设置光标位置，清屏，初始化设置，显示字符，显示字符串，显示有无符号的数字，显示十六进制数字，高级封装成U8G2图形库
   - 硬件I2C：（传输快抗干扰强）
      1. 配置：在通信外设的I2C
         - 模式：
            1. I2C：
            2. SMBus：系统管理总线报警的拓展功能
         - 作为主机参数：
            1. 速度等级：（需要考虑从机速度波特率）
               - 标准模式Standard Mode：最大传输速度100kbps
               - 快速模式Fast Mode：最大传输速度400kbps
               - 快速增强模式Fast Mode Plus：最大传输速度1Mbps
               - 高速模式High Speed Mode：最大传输速度3.4Mbps（大部分不支持）
               - 超快模式Ultra Fast Mode：最大传输速度5Mbps（大部分不支持）
            2. 时钟速度：设置传输速度的波特率值
            3. 时钟占空比：
               - 2：1低1高，占空比50%
               - 16/9：16低9高，外部电阻上拉高电平导致上升沿变缓，所以拉长低电平保证被读取
         - 作为从机参数：
      2. 代码：
         - 阻塞使用：（一般不使用阻塞）
            1. 阻塞检测就绪：HAL_I2C_IsDeviceReady(&hi2c通信号,从机设备地址与读写操作的字节,发送数据字节数,等待时间)
            2. 阻塞发送字节：HAL_I2C_Master_Transmit(&hi2c通信号,从机设备地址与读写操作的字节,要发送数据的地址,发送数据字节数,等待时间)（发送0字节则只是发送从机设备地址与读写操作的字节）（一般是从机读写+控制+数据×n各字节）
            3. 阻塞接收字节：HAL_I2C_Master_Receive(&hi2c通信号,从机设备地址与读写操作的字节,接收数据缓冲区的地址,接收数据字节数,等待时间)
            4. 阻塞发送到从机寄存器(≈阻塞发送2字节)：HAL_I2C_Mem_Write(&hi2c通信号,从机设备地址与读写操作的字节,从机设备寄存器字节地址,寄存器地址字节数,发送数据字节地址,发送数据字节数,等待时间)
            5. 阻塞读取从机寄存器(≈阻塞接收2字节)：HAL_I2C_Mem_Read(&hi2c通信号,从机设备地址与读写操作的字节,从机设备寄存器字节地址,寄存器地址字节数,接收数据缓冲区字节地址,读取数据字节数,等待时间)
         - 中断使用：
            1. 
         - DMA中断：
            1. 
18. SPI串行外设接口：（四线,多主(对比总线信号仲裁)多从(设备地址)）
   - 软件SPI：（占用MCU）
      1. 配置：
         - 引脚：三个推挽输出(CS推荐上拉,SCK推荐空闲方向的上下拉,MOSI推荐下拉防上电干扰)和一个浮空/上拉输入(推荐上拉输入)的GPIO口分别作为片选CS和时钟线SCK和主出从入MOSI和主入从出MISO
         - 模式：时钟极性CPOL(空闲SCK=0/1)+时钟相位CPHA(第一/二边沿分别读/写数据)
            1. 模式0：CPOL=0(空闲SCK=0)，CPHA=0(1边沿收,2边沿发)（常用）
            2. 模式1：CPOL=0(空闲SCK=0)，CPHA=1(1边沿发,2边沿收)
            3. 模式2：CPOL=1(空闲SCK=1)，CPHA=0(1边沿收,2边沿发)
            4. 模式3：CPOL=1(空闲SCK=1)，CPHA=1(1边沿发,2边沿收)（常用）
         - 
      2. 代码：
         - 通信单元：
            1. 初始化：CS=1，SCK根据模式选0/1
            2. 起始条件（CS下降沿）：CS=0
            3. 交换字节（根据从机设备设置高/低位先行）：
               - 模式0：MOSI（循环移位发送一字节数据变量的每一位），SCK=1，MISO（循环移位接收一字节数据变量的每一位），SCK=0
               - 模式1：SCK=1，MOSI（循环移位发送一字节数据变量的每一位），SCK=0，MISO（循环移位接收一字节数据变量的每一位）
               - 模式2：MOSI（循环移位发送一字节数据变量的每一位），SCK=0，MISO（循环移位接收一字节数据变量的每一位），SCK=1
               - 模式3：SCK=0，MOSI（循环移位发送一字节数据变量的每一位），SCK=1，MISO（循环移位接收一字节数据变量的每一位）
            4. 终止条件（CS上升沿）：CS=1
         - 交换数据：起始条件，交换字节（发送读写命令/指令码/寄存器地址/假数据实现接收），终止条件
         - 功能封装：
            1. W25Q存储器：读取数据，读/写指令，等待繁忙，页编程写入数据，擦除扇区（容量-块-扇区-页-字节）
   - 硬件SPI：（传输快抗干扰强）
      1. 配置：在通信外设的SPI
         - 模式：
            1. 全双工：标准4线(CS,SCK,MOSI,MISO)
            2. 半双工：3线(MOSI和MISO合并)
            3. 仅发/收：2线(SCK,MOSI/MISO)
         - 硬件片选：在调用SPI交换字节时，硬件自动开启/关闭片选输入/输出（一般使用软件片选(使用上拉推挽输出)）
         - 基本参数：（需要考虑从机设置）
            1. 数据帧格式：摩托罗拉格式Motorola(标准SPI,常用)，TI，Microwire，Dual SPI，Quad SPI
            2. 数据位长度：8位(常用)，16位
            3. 数据位顺序：先传最高有效位MSB(常用)，先传最低有效位LSB
         - 时钟参数：（需要考虑从机设置）
            1. 预分频：2，4，8，16，32，64，128，256
            2. 波特率：传输速度
            3. 时钟极性CPOL：低极性Low(空闲SCK=0)，高极性High(空闲SCK=1)
            4. 时钟相位CPHA：1Edge(在第一边沿接收)，2Edge(在第二边沿接收)
               - 模式0：极性低，第一边沿接收
               - 模式1：极性低，第二边沿接收
               - 模式2：极性高，第一边沿接收
               - 模式3：极性高，第二边沿接收
         - 高级参数：
            1. NSS类型：软Software/硬件Hardware控制片选CS
            2. CRC校验：Disable禁用CRC校验（常用,一般从及设备不支持校验），Enable启用CRC校验
         - 传输顺序：高/低位先行
      2. 代码：
         - 阻塞使用：（一般不使用阻塞）
            1. 发送字节：HAL_SPI_Transmit(&hspi通信号,要发送数据字节地址,发送数据字节数,等待时间)
            2. 接收字节：HAL_SPI_Receive(&hspi通信号,接收数据缓冲区字节地址,接收数据字节数,等待时间)
            3. 交换字节：HAL_SPI_TransmitReceive(&hspi通信号,要发送数据字节地址,接收数据缓冲区字节地址,交换数据字节数,等待时间)
         - 中断使用：
         - DMA中断：
19. ----CAN控制器局域网络：
   - 配置：在连接外设的CAN勾选激活，根据CAN设备配置相应波特率(根据公式配置(RSJW越大越不容易出错但速度变慢,一般选1)(其他参数有设置先后顺序))，使能AR自动重传和TFP发送队列优先级，勾选RX中断
   - 代码：
      1. 初始化：HAL_CAN_Start(&hcan号)
      2. HAL_CAN_ActivateNotification(&hcan号,CAN_IT_RX_FIFOO_MSG_PENDING)
      3. 发送：HAL_CAN_AddTxMessage(&hcan号,&CAN发送结构体(写入部分参数),CAN数据帧的数组数据,&CAN邮箱变量(32位空值))
      4. void CAN_RX0_IRQHandler(void)
      5. HAL_CAN_irqhANDLER(&hcan号)
      6. 接收中断函数：HAL_CAN_RxFifo0MsgPendingCallback(CAN_HandleTypeDef *hcan号)
      7. 接收：HAL_CAN_GetRxMessage(&hcan号, CAN_RX_FIFO0,&CAN接收结构体,CAN数据帧的数组数据)
20. RTC实时时钟+BKP备份寄存器：
   - 配置：
      1. RTC实时时钟：在定时器的RTC，时钟源选择LSE外部低速时钟
         - 功能：勾选激活时钟源，勾选日历，选择禁用RTC时钟输出或闹钟输出或秒输出或校准模式
         - 数据格式：二进制编码的十进制或二进制
         - 数据初始：RTC初始年月日，RTC初始时分秒
      2. BKP备份寄存器：在定时器的RTC（需要VBAT引脚连接电池供电保持数据）
         - 功能：Tamper篡改侵入检测（拆外壳等侵入事件会清除数据）
   - 代码：
      1. RTC实时时钟：
         - 自动生成初始化配置：MX_RTC_Init()
         - 变量类型：
            1. 年月日：RTC_DateTypeDef结构体
            2. 时分秒：RTC_TimeTypeDef结构体
         - 读取时钟：（必须先读取时分秒再年月日）
            1. 年月日：HAL_RTC_GetDate(&hrtc,&年月日变量,RTC_FORMAT读取格式)
            2. 时分秒：HAL_RTC_GetTime(&hrtc,&时分秒变量,RTC_FORMAT读取格式)
            3. 计数器：RTC_ReadTimeCounter(&hrtc)（需要到头文件删除静态函数设置static）
      2. BKP备份寄存器：
         - 写入数据：HAL_RTCEx_BKUPWrite(&hrtc,RTC_BKP_DR备份寄存器号,写入的数据)
         - 读取数据：HAL_RTCEx_BKUPRead(&hrtc,RTC_BKP_DR备份寄存器号)
21. PWR电源控制：
   - 配置：
      1. 待机模式：可选配置WKUP引脚为SYS_WKUP
   - 代码：
      1. 睡眠模式：（CPU停止,时钟工作,外设工作,唤醒后继续运行）
         - 关闭运行系统的滴答定时器中断：HAL_SuspendTick()
         - 进入模式并等待中断唤醒：HAL_PWR_EnterSLEEPMode(PWR_MAINREGULATOR_ON,PWR_SLEEPENTRY_WFI)
         - 进入模式并等待事件唤醒：HAL_PWR_EnterSLEEPMode(PWR_MAINREGULATOR_ON,PWR_SLEEPENTRY_WFE)
         - 开启运行系统的滴答定时器中断：HAL_ResumeTick()
      2. 停止模式：（CPU停止,时钟停止,外设停止,保留寄存器数据,唤醒后继续运行）
         - 关闭运行系统的滴答定时器中断：HAL_SuspendTick()
         - 进入模式并等待中断唤醒：HAL_PWR_EnterSTOPMode(PWR_LOWPOWERREGULATOR_ON,PWR_STOPENTRY_WFI)
         - 进入模式并等待事件唤醒：HAL_PWR_EnterSTOPMode(PWR_LOWPOWERREGULATOR_ON,PWR_STOPENTRY_WFE)
         - 重配时钟：SystemClock_Config()
         - 开启运行系统的滴答定时器中断：HAL_ResumeTick()
      3. 待机模式：（CPU停止,时钟停止,外设停止,丢失寄存器数据,仅有唤醒电路和备份寄存器数据,唤醒后复位运行）
         - 清除唤醒标志位：__HAL_PWR_CLEAR_FLAG(PWR_FLAG_WU)
         - 启用WKUP唤醒引脚：HAL_PWR_EnableWakeUpPin(PWR_WAKEUP_PIN唤醒引脚)
         - 进入模式并等待外部事件唤醒：HAL_PWR_EnterSTANDBYMode()
22. IWDG独立看门狗：（超时喂狗则复位）
   - 配置：在系统核心System Core的IWDG
      1. 开关：勾选激活
      2. 计时：设置预分频值和重加载值
   - 代码：
      1. 自动生成初始化配置：MX_IWDG_Init()
      2. 循环喂狗：HAL_IWDG_Refresh(&hiwdg)
      3. 读取独立看门狗复位标志位：__HAL_RCC_GET_FLAG(RCC_FLAG_IWDGRST)
      4. 清除所有复位标志位：__HAL_RCC_CLEAR_RESET_FLAGS()
23. WWDG窗口看门狗：（不在区间时间内喂狗则复位）
   - 配置：在系统核心System Core的WWDG
      1. 开关：勾选激活
      2. 计时：设置预分频值和最早喂狗窗口值和递减计数器初始值
   - 代码：
      1. 自动生成初始化配置：MX_WWDG_Init()
      2. 循环喂狗：HAL_IWDG_Refresh(&hwwdg)
      3. 读取窗口看门狗复位标志位：__HAL_RCC_GET_FLAG(RCC_FLAG_WWDGRST)
      4. 清除所有复位标志位：__HAL_RCC_CLEAR_RESET_FLAGS()
24. Flash芯片内部存储器：
   - 配置：无
   - 代码：
      1. 读取数据：*((__IO uint_t *)(地址))
      2. 页擦除：
         - 解锁控制：HAL_FLASH_Unlock()
         - HAL_FLASHEx_eRASE(&eraseInit擦除设置,&sectorError擦除失败的地址)
            1. 擦除区域：eraseInit.TypeErase
            2. 擦除页址：eraseInit.PageAddress
            3. 擦除页数：eraseInit.NbPages
         - 锁定控制：HAL_FLASH_Lock()
      3. 写入数据：
         - 解锁控制：HAL_FLASH_Unlock()
         - 写入数据：HAL_FLASH_Program(FLASH_TYPEPROGRAM写入数据类型,地址,写入的数据)
         - 锁定控制：HAL_FLASH_Lock()
25. IR红外遥控：
   - 配置：定时器
   - 代码：
26. BT蓝牙：
   - 配置：串口
   - 代码：
27. WiFi无线网络：
   - 配置：串口
   - 代码：

# 6.高级应用
1. DWT数据观察点与跟踪
   - 作用：系统调试和跟踪，观察变量访问、程序运行轨迹、精确硬件计时代码运行时间（受主频控制的ns纳秒级且不受影响）
   - 特点：HAL库没有，这是内核的一部分，所以要自己封装函数
   - 代码：（一般设置文件名是bsp_dwt）
      1. 宏定义：
         - #define DEMCR *(uint32_t *)(0xE000EDFC)
         - #define DWT_CTRL *(uint32_t *)(0xE0001000)
         - #define DWT_CYCCNT *(uint32_t *)(0xE0001004)
         - #define DEMCR_TRCENA (1<<24)
         - #define DWT_CTRL_CYCCNTENA (1<<0)
      2. 初始化：
         - 使能DWT：DEMCR|=(uint32_t)DEMCR_TRCENA
         - 清零计数器：DWT_CYCCNT=(uint32_t)0U
         - 使能计数器：DWT_CTRL|=(uint32_t)DWT_CTRL_CYCCNTENA
      3. 读取节拍：return ((uint32_t)DWT_CYCCNT)
      4. 间隔时间：return (uint32_t)(1000000.0/芯片频率*节拍差)（时间单位us）
      5. 延时间隔：uint32_t duration=延时时间*(芯片频率/1000000)（时间单位us）
2. FreeRTOS多线程
   - 学习：https://www.bilibili.com/video/BV1vUpje9Ej2/?p=12，https://www.bilibili.com/video/BV1nvqSBAELQ/?，https://www.bilibili.com/video/BV1mhWqzFEzn/?，https://www.bilibili.com/video/BV1yJ41znEcA/?
      1. [基于STM32Cube的铁头山羊FreeRTOS教程-用于入门学习](https://www.bilibili.com/video/BV1KSLc6XEEt/?)
   - 名称：Free Real Time Operating System开源免费的实时操作系统（电脑是分时操作系统TSOS）
   - 特点：优先级抢占（电脑是分配均等时间片执行任务而超时则交出从而保证公平性）
   - 作用：多个任务近似同时进行≈多个main函数同时执行(调度器会快速轮流切换任务执行,但同一时间还是只有一个任务被执行(只有一个处理单元MCU))
   - 同类：RT-Thread
   - 发展：32位单片机高处理能力-昂贵的商业操作系统-开源操作系统
   - 优势：开源免费，轻量化，代码易读，使用简单
   - 框架：
      1. 调度器：调度算法是调度器切换任务的策略
         - 抢占式调度Preemptive Scheduling：调度器总是选中高优先级任务，立马打断切换的抢占式执行（≈STM32中断的抢占优先级）
            1. 带时间片wit Time Slicing（常用）：优先级相同的任务获得近似均等的执行时间
            2. 不带时间片without Time Slicing：优先级相同的任务遵循先来后到而使用MCU
         - 协作式调度Cooperative Scheduling：调度器总是选中高优先级任务执行，但只有在当前任务主动让出控制权时才会切换（≈STM32中断的响应优先级）（高级）
      2. 任务：执行工作（属于内核对象）
         - 启动调度器时创建的任务：空闲任务ILDE(不执行其他任务(延时等)时则执行空闲任务保证单片机工作)，定时器任务(软件定时器的服务器,使用软件定时器则创建)
         - 用户创建的任务
      3. 优先级：
         - 作用：任务切换顺序和响应速度
         - 数值：数字越大优先级越高（与STM32优先级相反）
         - 特点：0一般是空闲任务
      4. 中断：在内核中驱动调度器工作（函数在移植文件port.c中）
         - SVC：启动首个任务（函数vPortSVCHandler）
         - pendSV：后续任务切换（函数xPortPendSVHandler）
         - Systick：产生时间片帮助轮询调度，产生系统节拍（函数xPortSysTickHandler）（启动调度器时会自动配置和启动Systick,在Systick计数溢出产生中断时=1个时间片）
      5. 内核对象：
         - 队列(邮箱)：
         - 队列集合：
         - 事件组：
         - 软件定时器：需要经过定时器命令队列
         - 信号量：二进制信号量，计数信号量，互斥锁，递归互斥锁
         - 消息缓冲区：
         - 流缓冲区：
      6. 堆内存管理方案：在程序运行中给内核对象动态分配和释放堆内存（标准C库使用malloc和free函数管理堆内存,但是这两函数有不可重入和内存碎片化和执行速度慢和执行事件不确定的问题）
         - heap1：只能分配不能释放(没实现vPortFree函数)，可以设置堆大小，适合只创建不销毁内核对象
         - heap2：最优匹配算法(在新分配时选择满足要求的最小空闲块)但不合并相邻空闲块(始终保留8字节信息头)，过时不推荐使用，内存碎片化问题严重，可以设置堆大小，适合用来兼容老版本
         - heap3：
         - heap4：最优匹配算法且合并相邻空闲块（常用）
         - heap5：
      7. 临界区
      8. 任务通知
   - 基础：
      1. 存储：
         - Flash：存储程序和常量的不可变部分，掉电不丢失（≈硬盘）
         - SRAM：存储变量的经常变化部分，掉电丢失（≈内存）
            1. .data段：有初值的全局变量或静态变量
            2. .bss段：无/0初值的全局变量或静态变量
            3. .heap段：堆可分配的内存，在使用标准C库函数会用到堆（STM32CubeMX的项目管理位置可以设置长度）
            4. 未分配区域：提供给.heap段和.stack段分配空间
            5. .stack段：调用栈存储局部变量和参数等（STM32CubeMX的项目管理位置可以设置长度）
      2. 编译输出：
         - text：代码编译成二进制后存储在Flash的字节数
         - data：SRAM的.data段的字节数
         - bss：SRAM的.bss段+.heap段+.stack段的字节数
         - dec：前面总和，十进制显示
         - hex：前面总和，十六进制显示
      3. 堆：
         - 作用：动态分配的内存
         - 创建：8字节信息头(含长度信息,在空闲块自动放置)+堆字节
         - 原理：在堆空间中动态分配创建和删除堆，可能会产生堆空间空隙
         - 特点：不使用C类堆分配函数（速度慢不定时,内存碎片化,不可重入性(多个任务同时调用函数)）
         - 内核对象：需要堆动态分配内存
            1. 任务：Task Control Block任务控制块(存储任务运行的关键信息,约100字节)+任务栈(默认128字=512字节)
      4. 栈：
         - 作用：后进先出的数据结构
         - 关键词：栈顶，栈底，栈深度，压栈，弹栈，后进先出
         - 调用栈：系统自动维护的栈，在函数调用时压栈保存函数参数(地址字节数一般是单片机位数)、局部变量、返回地址(地址字节数一般是单片机位数)的上下文信息，在函数返回时弹栈取出上下文信息
         - 任务栈：FreeRTOS为每一个任务分配一个调用栈，但是main函数中仍有函数所以.stack段不能设置为0
      5. 任务：
         - 类型：
            1. 动态创建：在堆动态分配任务内存（常用）
            2. 静态创建：用户手动分配任务内存（高级）
         - 状态：
            1. 运行Running State：调度器选中任务并单片机CPU正在执行代码
            2. 就绪Ready State：满足条件，任务等待被执行
            3. 阻塞Blocked State：任务等待先决条件(超时/事件)而主动放弃就绪排队
            4. 暂停Suspened State：调度器不能选中任务
      6. API：Application Programming Interface应用程序编程接口
   - 使用：
      1. 源码：
         - FreeRTOS官网：https://www.freertos.org/zh-cn-cmn-s（LTS是Long-Term Support长期支持版本,一般两年）
         - FreeRTOS-Kernel内核文件夹：
            1. example：
               - FreeRTOSConfig.h：配置文件模板
            2. portable：移植层（用于适配不同编译工具链类型和单片机内核种类）
               - 开发工具链：GCC(STM32CubeIDE)，RVDS(Keil)，……
                  1. 内核类型：ARM_CM3(STM32F1,……)，……
               - MenMang：堆内存管理方案
            3. include：内核头文件
               - FreeRTOS.h（必须）：内核头文件，包含引用模板FreeRTOSConfig.h文件
               - task.h（必须）：调度器，任务，任务通知
               - queue.h：队列，队列集合，软件定时器
               - semphr.h：信号量
               - timers.h：软件定时器
               - event_group.h：事件组
               - message_buffer.h：消息缓冲区
               - stream_buffer.h：流缓冲区
            4. .c文件：内核源文件
               - task.c（必须）：调度器，任务，任务通知
               - list.c（必须）：列表数据结构
               - queue.c：队列，队列集合，信号量，软件定时器
               - timer.c：软件定时器
               - event_group.c：事件组
               - croutine.c：协程（用于资源匮乏的嵌入式硬件系统,现已弃用）
               - stream_buffer.c：流缓冲区，消息缓冲区
      2. 移植：
         - 源文件：在工程中创建FreeRTOS文件夹，在里面创建Src文件夹，存放FreeRTOS的.c文件
         - 头文件：在工程中创建FreeRTOS文件夹，在里面创建Inc文件夹，存放FreeRTOS的.h文件
         - 移植件：在工程中创建FreeRTOS文件夹，在里面创建Inc文件夹，在里面创建Src文件夹，分别存放FreeRTOS的对应编译工具链和单片机内核类型的port.c和portmacro.h文件
         - 内存件：在工程中创建FreeRTOS文件夹，在里面创建Src文件夹，存放FreeRTOS的堆内存管理方案(只能选择一个)的.c文件
         - 模板件：
            1. 放文件：在工程中创建FreeRTOS文件夹，在里面创建Inc文件夹，存放FreeRTOS的配置文件模板的.h文件（但是一般被认为是用户代码而放在Core的Inc中）
            2. 配置项：（需要手动修改到适合单片机使用）
               - configCPU_CLOCK_HZ：内核运行频率（时钟树右边的Core=HCLK）
               - configTICK_TYPE_WIDTH_IN_BITS：TickType-t(用于存储系统节拍≈系统时间)的位宽(多个bit位表示一个整数)（尽量大位宽从而减少清零消耗的工作时间,若设置1ms增加一次则16位≈1分钟,32位≈49天,64位≈5亿多年,一般选择相应单片机位数(特例8位单片机选择16位)从而保证处理效率最高）
               - configKERNEL_INTERRUPT_PRIORITY：pendSV和Systick的中断优先级(设置最低优先级,一般是数字最大,还需结合寄存器情况是否要移位)
               - configMAX_SYSCALL_INTERRUPT_PRIORITY：调用FreeRTOS编程接口的最高优先级界限(在最低优先级到设置的最高优先级才能调用FreeRTOS的API,避免高优先级的中断被FreeRTOS干扰)
               - configUSE_TIME_SLICING：是否使用时间片（仅影响抢占式调度）
               - configCHECK_FOR_STACKOVERFLOW：捕获任务栈是否溢出
               - configMAX_PRIORITIES：最高优先级的数值
               - configUSE_PREEMPTION：是否使用抢占式调度
               - configTICK_RATE_HZ：设置Systick的中断溢出频率（单位Hz=次/秒）（数值不是越大越好,溢出频率越高MCU越要花更多时间去处理中断从而影响程序执行效率,默认100）
               - configTOTAL_HEAP_SIZE：设置堆大小
               - ……
         - 中断向量表：
            1. 位置：工程文件夹-Core文件夹-Startup文件夹-startup_stm32.s启动文件
            2. 替换：约144行的SVC_Handler(SysTick的中断)替换为vPortSVCHandler，约147行的PendSV_Handler替换为xPortPendSVHandler，约148行的SysTick_Handler替换为xPortSysTickHandler
      3. 手册：https://www.freertos.org/zh-cn-cmn-s/Documentation/02-Kernel/07-Books-and-manual/01-RTOS_book
      4. 配置：
         - 外设：STM32CubeMX正常配置外设
         - RTOS：
            1. 时间基准：在系统核心System Core的SYS选择Timebase Source选择TIM定时器（HAL库时间函数是基于SysTick中断函数实现HAL计数+1工作,而SysTick定时器已经被FreeRTOS中断替换而使用,所以需要其他定时器代替SysTick帮助HAL库计时）
      5. 代码：
         - 头文件：
            1. #include "FreeRTOS.h"
            2. #include "task.h"
         - 宏定义：
            1. pdPASS成功，pdTRUE是：1
            2. pdFAIL失败，pdFALSE否：0
            3. portMAX_DELAY：无限时间
         - 命名规范：
            1. 命名数据：
               - 变量名称=类型前缀(全小写)+实际名字(首字母大写)
               - 函数名称=返回值类型前缀(全小写)/静态函数直接用prv+函数所在的文件名称(首字母大写)+实际名字(首字母大写)
               - 宏定义名称：所在文件名称的缩写(全小写)+实际名字(全大写,单词间用_分割)
            2. 符号前缀：
               - p：*=指针(数组也是)
               - u：unsigned=无符号
               - v：void
               - c：char=int8_t
               - s：short=int16_t
               - l：long=int32_t
               - x：TickType_t，BaseType_t，或其他数据类型
               - e：enum=枚举类型
         - 数据类型：
            1. TickType_t：记录系统节拍
            2. BaseType_t：逻辑0/1，自动选择处理器架构下最有效率的数据类型（32位单片机就是int32_t）
            3. UBaseType_t：BaseType_t的无符号(非负数)版本
            4. TaskHandle_t：任务句柄
         - 句柄驱动：（本质还是结构体）
            1. 定义：typedef struct{推荐变量+函数指针}结构体类型名称;
            2. 声明：结构体类型名称 结构体变量名称
            3. 定参：结构体类型名称 *结构体参数名称
            4. 传参：&结构体变量名称
            5. 用内：结构体->成员
         - 基础函数：
            1. 阻态延数：vTaskDelay(系统节拍数)（这个函数好处是可以任务变成阻塞状态从而让其他任务执行,而HAL_Delay函数内部是调用while循环）
            2. 阻态延时：vTaskDelay(pdMS_TO_TICKS(时间值))（时间单位ms）
            3. 系统计数：xTaskGetTickCount()
            4. 实际时间：pdTICKS_TO_MS(xTaskGetTickCount())
         - 任务函数：
            1. 任务函数：void 任务函数名称(void *pvParameters){}（main函数外）
            2. 动态创建：xTaskCreate(任务函数名称,"任务别名"(内部不会使用,仅调试时观看),分配任务栈的字数(1字=4字节,默认128),传递给任务参数的地址(默认NULL),任务优先级(默认1),使用变量地址获取返回的任务句柄(默认NULL不接收))（main函数内初始化位置,可以共用相同任务(Flash单份,栈空间依旧多份)）
            3. 静态创建：xTasjCreateStatic()
            4. 暂停任务：vTaskSuspend(任务句柄)
            5. 恢复任务：vTaskResume(任务句柄)
            6. 删除任务：vTaskDelete(任务句柄(NULL则删除自身任务))
            7. 主动让执：taskYIELD()
         - 调度器：
            1. 启动：vTaskStartSchedualer()（main函数内初始化位置,后面while防止调度函数退出而程序跑飞）
            2. 暂停：vTaskSuspendALL()
            3. 恢复：xTaskResumeALL()
         - 堆分配：（heap1-5提供）
            1. 分配内存：pvPortMalloc()
            2. 释放内存：vPortFree()
      6. 应用：
         - 按键：较高优先级+阻态延时=不需要消抖
      7. 
   -------------------------------------------（后期合并旧知识）
   - 优先级：
      1. 分类：
         - 空闲
         - 低
         - 低于正常
         - 正常
         - 高于正常
         - 高
         - 实时
      2. 特性：
         - 抢占：在高优先级任务触发时，直接抢占CPU而挂起暂停低优先级任务
         - 同级：在多个相同优先级任务时，按照任务就绪先后执行，每达到一个时间片（=频率周期）会自动强制轮询任务
   - 任务状态：
      1. 就绪：任务等待分配CPU
      2. 阻塞：任务不能使用CPU
   - 配置方法：
      1. 工具：在STM32CubeMX中，选择中间件和软件包的FreeRTOS
      2. 版本：FreeRTOS选择CMSIS_V1版本，打开任务与队列
      3. 参数：保留默认任务(修改可能造成不稳定)，自行添加新任务，输入任务名称和任务栈空间的字节数(影响任务内部变量数量)和任务函数名称，选择任务优先级和生成任务函数声明(Default是生成任务函数框架,AsExternal是生成任务函数声明,AsWeak是生成任务空的虚函数(写同名函数会覆盖这个虚函数作用))
   - 代码解析：
      1. 任务句柄：≈任务名称
      2. 函数声明：STM32CubeMX自动在FreeRTOS.c声明任务函数，而根据设置在FreeRTOS.c或其他文件手动定义函数
      3. 创建任务：STM32CubeMX会自动在MX_FREERTOS_Init中根据任务参数去创建任务得到任务句柄
      4. 定义任务：自己创建.c和.h文件声明和定义任务函数，在定义函数时同理使用externC变量+函数，使用while保持任务持续运行
   - 功能函数：来源FreeRTOS.h，cmsis_os.h
      1. 阻塞延时：低级调用vTaskDelay(时间值)，高级封装osDelay(时间值)
      2. 初始系统：MX_FREERTOS_Init()
      3. 运行系统：osKernelStart()（不再执行主函数Main中的While）
3. 电机
   - https://github.com/TongjiSuperPower/sp_middleware
   - 直流电机：
      1. 控制：两个电极，正接正转，反接反转
      2. 功率：对于STM32输出驱动来说非常大
      3. 驱动：需要配合电机驱动电路板，可以调整旋转方向（引脚正反接）和旋转速度（电压大小,一般使用PWM占空比模拟）
   - 无刷电机：
      1. 特点：
         - 开环控制：在电流控制和没有负载时，克服静摩擦力就很容易达到最高转速
         - 闭环控制：在电流控制时，可以在有无负载情况下都控制转速一致
      2. 控值：电流(=扭矩≈驱动力力≈加速度)
      3. 反馈：角度位置，转速，电流，温度
      4. 控制：PI/PID闭环控制
         - 原理：一定转速下会有一定阻力(基本无法测量)，需要一定扭矩克服阻力。所以单纯使用比例P控制，在接近目标位置时不能抵消阻力消除稳态误差
      5. 环控：
         - 电流环：芯片传输发送给电调信号是目标电流值，电调接收到后通过PID电流环调整电压矢量，电压矢量经过FOC磁场定向控制的SVPWM模块调制PWM占空比，PWM占空比控制三相逆变器输出三相正弦电流
         - 速度环：根据转速(扭矩的一次积分)误差和转速扭矩关系曲线(一般是1:1关系)控制电流大小
         - 位置环：根据角度位置(扭矩的二次积分)误差和转速扭矩关系曲线(一般是1:1关系)和位置转速关系曲线(一般是1:1关系)控制电流大小
      6. 注意：在没有接收到指令时，电机会因为电调控制而一直执行上一条指令
   - 舵机：
      1. 特点：只能转动特定角度，内部是闭环控制
      2. 控制：要求PWM周期20ms，高电平时间0.5-2.5ms，PWM占空比决定转动角度0-180°
      3. 线路：
         - 5V正极：红色
         - 负极：棕色
         - PWM信号线：橙黄色
      4. 分类
         - 模拟舵机
         - 数字舵机：程序控制和运行性能>模拟舵机
   - 步进电机：
      - 特点：转动角度精准。但转速增加扭矩下降，负载过大或转速太高可能失步
      - 控制：PWM周期控制速度，PWM数量控制角度位置
4. 底盘解算
   - 全向轮
      1. 特点：旋转快，但运动不稳且不精
      2. 控制：根据轮子方向进行速度分解
   - 麦轮
      1. 特点：
      2. 控制：根据滚子方向进行速度分解
   - 舵轮
      1. 特点：灵活，但重量重
      2. 控制：转动轮子方向
5. 功能设备
   - 示意
      1. 按键/旋钮/拨盘
         - 按键：前后延时10-20ms弹性触点(锅仔片的弹性)消抖（若硬件使用并联电容充放电消抖则无需延时）+while循环判断读取
         - 旋钮：顺时钟转动则A下降沿时B高电平，逆时钟转动则A下降沿时B低电平
            1. A：A相脉冲输出，默认上拉
            2. B：B相脉冲输出，默认上拉
            3. C：公共接地
            4. S1，S2：编码器按键，S1默认上拉，S2默认接地
      2. 电位器：旋转可变电阻
      3. 蜂鸣器
         - 特点：发出声音
         - 控制：PWM控制音调
         - 听频：20-20000Hz
         - 频源：
            1. 有源蜂鸣器：内置固定频率振荡源，只需高低电平开关发声
            2. 无源蜂鸣器：控制翻转电平频率发声
      4. LED灯
         - 特点：显示亮光
         - 控制：高低电平的亮灭灯，PWM的呼吸灯
      5. LCD显示屏
         - 原理：背光
         - 特点：功耗大，可视角小，
      6. OLED显示屏
         - 名称：有机发光二极管/有机电激光显示
         - 原理：每个像素自发光，不需要背光源
         - 特点：功耗低，可视角大，响应速度快，轻薄柔韧，内部有显存可以保留最后一次显示的内容，只能写入命令和数据
         - 像素：
            1. 0.96寸：128列×64行(1列×8位行=1页)
         - 线孔：4（I2C），7（SPI）
         - 显示：
            1. 字模：设定要显示的像素点阵（一般英文6×8/8×16,中文16×16/24×24）
            2. 位图：
         - 命令控制：
            1. 连续模式：开启后每个数据字节前要有控制字节，关闭则发送数据字节前只需一个控制字节
            2. 指令选择：写入数据，写入控制指令
         - 功能函数：（一般,新文本覆盖删除旧文本）
            1. 初始屏幕：OLED_Init()
            2. 清除屏幕：OLED_Clear()
            3. 显示字符：OLED_ShowChar(行，列，字符)
            4. 显示字串：OLED_ShowString(行，列，字串)
            5. 显示数字：OLED_ShowNum(行，列，数字，长度)
            6. 显示符数：OLED_ShowSignedNum(行，列，数字，长度)
            7. 显示二数：OLED_ShowBinNum(行，列，16进制数字，长度)
            8. 显示十六：OLED_ShowHexNum(行，列，16进制数字，长度)
   - 传感
      1. 光敏电阻：环境亮度影响电阻分压
      2. 热敏电阻：环境温度影响电阻分压
      3. 反射式红外：红外线会被黑色吸收
      4. 火焰传感器：
      5. 雷达模块：
      6. 土壤传感器：测容土壤湿度导通且湿度越高电阻越小的等效电阻
      7. 雨量传感器：测量雨量/积水深度导致并联导通的等效电阻
      8. 空气传感器：电导率(电阻减小)随污染气体浓度增大而检测污染气体，需要转换为浓度单位ppm
      9. 烟雾传感器：电导率(电阻减小)随可燃气体浓度增大而检测烟雾和可燃气体，需要转换为浓度单位ppm
      10. 超声波传感器：
      11. 温湿度传感器：电容式感湿和NTC测温和8位单片机
      12. 心率血氧传感器：红外光和可见红光LED和光电探测器，利用人体组织在血管搏动时造成透光率不同的，反射不同光亮从而实现测量
      13. 激光测距传感器：发射和接收激光
      14. 姿态传感器：三轴加速度+陀螺仪(角速度)
      15. Flash存储器：存储掉电不丢失的数据
      16. 气压计：测量大气压强和环境温度
      17. WiFi模块：ESP8266是速度较低的串口转WiFi（使用中断和DMA）
      18. 红外接收管
      19. 编码器
         - 作用：测量旋转方向、力矩、速度和位置
         - 分类：
            1. 光栅码盘
            2. 机械触点
            3. 霍尔传感
            4. 编码器元件
      20. 姿态传感器：
         - 分类：
            1. 6轴：
               - 作用：6轴姿态传感器，可以测量芯片自身的XYZ轴（横向,竖向,垂直）加速度（加速度计）和角速度（陀螺仪传感器），通过数据融合操作（互补滤波,卡尔曼滤波……）得到精准稳定的欧拉姿态角
               - 机械原理：（芯片是电子原理）
                  1. 加速度计：滑块六面有弹簧≈弹簧测力计/重量称。滑块上连接滑动电阻电位器，测量电压就可以得到加速度值。加速度分为重力加速度和运动加速度，所以测量静态时稳定性高
                  2. 陀螺仪：三个旋转圆环和中间的旋转轮。在旋转轮高速旋转时角动量守恒而保持旋转轮方向不变，而通过电位器测量旋转圆环的角度偏差对应电压就可以测量旋转角度。而测角速度可以用游乐场的旋转飞椅表示对向两个座位的距离或夹角得到角速度（注意MPU6050是得到的角速度）。角速度积分得到的角度会因为噪声而有偏差导致角度缓慢漂移，但是该角度的偏差不会受到运动影响，所以测量动态时稳定性高
               - MPU6050参数：
                  1. ADC采集：16位
                  2. 加速度范围：±2，±4，±8，±16（单位:g=9.8ms/s^2^）（越小则分辨率越高）
                  3. 陀螺仪范围：±250，±500，±1000，±2000（单位:°/s）（越小则分辨率越高）
                  4. 数字低通滤波器：可以选择是否对输出数据进行低通滤波
                  5. 时钟源+采样分频：可以选择是否对AD转换和内部电路提供是否分频后的时钟（时钟源可以选择内部时钟,陀螺仪时钟和外部输入时钟）
                  6. 引脚：
                     - VCC，GND：供电输入电源
                     - SCL，SDA：作为从机进行I2C通信
                     - XCL，XDA：连接外部磁力计和气压计，作为主机进行I2C通信，在芯片内部进行数据融合和姿态解算。也可以通过开关选择作为I2C总线的一部分，外部设备和芯片都作为从机
                     - AD0：改变从机地址
                     - INT：配置芯片内部事件触发中断输出
                  7. 从机地址：
                     - 二进制：1101000（AD0引脚是低电平），1101001（AD0引脚是高电平）
                     - 十六进制：0x68（前面补0,但在通信时要全部左移1位=0xD0(推荐使用)），0x69（左移1位=0xD2(推荐使用)）
                  8. 特殊功能：测量温度，自测单元（验证芯片功能,模拟外力输入查看自测前后数据之差在规定范围内）
                  9. 运行原理：分压输出模拟电压→ADC模数转换→数据寄存器
                  10. 代码控制：I2C通信读写寄存器（默认上电是睡眠模式则写入无效）（具体寄存器和位作用参考数据手册）
               - 解算校准
            2. 9轴：添加XYZ轴磁场强度
               - 作用：提供参考轴向而减小漂移误差
            3. 10轴：添加气压强度
               - 作用：测量高度
      21. 气压计
   - 存储：
      1. W25Q存储器
         - 特点：数据掉电不丢失，成本低，容量大，速度较快(Flash特性)
         - 介质：Nor Flash闪存
         - 容量：40(4Mbit=512KBit)，80(8Mbit=1MB)，16(16Mbit)，32(32Mbit)，64(64Mbit)，128(128Mbit)，256(256Mbit)
         - 地址：24位（=可以对应16MB容量），32位（256型号容量需要）
         - 划分：总容量划分为块，块划分为扇区，扇区划分为页
         - 传输：双线1发1收，双线1发收1发收，扩展成四线都发收
         - 引脚：
            1. VCC，GND：供电输入电源
            2. CLK，DI，DO，CS：SPI通信
            3. WP：写保护可以阻止写入
            4. HOLD：数据保持可以中断SPI通信
         - 原理：
            1. 写是通过通信写入RAM缓存区中，在停止通信后通过芯片内部高压电缓慢写入Flash闪存中，此时芯片处于繁忙状态无法继续写入（=写有短时数据量限制）
            2. 读则通过RAM缓存区快速读取出来（=读无短时数据量限制）
         - 操作：
            1. 输入(写入)：每次写入要进行写使能，但是规定数据位只能由1改写为0，所以写入数据前必须擦除把所有数据位变为1，而最小擦除单元是扇区（芯片也会处于繁忙状态），一次性写入最多写入1页数据而多了会回到页首覆盖（因为RAM缓存区）
            2. 输出(读取)：无需使能，无需额外操作，没有页限制，不能在芯片处于繁忙状态时读取
      2. 
   - 通信：
      1. 2.4G无线模块
      2. 蓝牙模块
      3. WiFi模块
6. FOC控制

## 2.5.辅助软件
1. Vofa+
2. ozone
3. Serialplot：串口调试
   - 左上方框：暂停/继续（快捷键P），清除数据，截图，收发COM端口号，刷新端口号
   - 中间图区：
      1. 放缩：按住鼠标左键拖动后可以放大对应区域，按下鼠标右键可以缩小回原来视图
      2. 看数：鼠标放在图表上可以观测数值
   - 左下界面：
      1. Port界面：选择收发COM端口号，波特率，校验方式，数据帧位数，停止位位数，串口发送模式
      2. Data Format界面：解码数据帧格式，数据帧开头，观测数据帧内容的通道数量，数据类型
      3. Channel界面：选择数据帧中的个别数据观察，数据暂存缓冲区
4. CanMVIDE
5. 串口助手
6. HyperTerminal
7. FreeMaster
8. SecureCRT
9. atk-logic：逻辑分析仪上位机软件，抓取分析数字信号
10. si9000：PCB阻抗计算和仿真
11. SquareLine Studio：用于LVGL嵌入式图形界面的可视化UI设计工具
12. FilterPro Desktop：德州仪器(TI)出品的滤波器设计与仿真软件
13. STM32 ST-LINK Utility：STM32单片机的烧录与调试工具（通过ST-LINK）
14. NI Multisim：电路仿真软件，用于模拟/数字电路的设计与仿真
15. USART HMI：串口屏（如淘晶驰）的UI界面设计软件
16. MounRiver Studio：国产RISC-V/沁恒单片机(WCH)的集成开发环境
17. XCOM：正点原子出品的串口调试助手
18. USBee Suite：USB协议分析仪软件，用于USB通信抓包与分析
19. mcuisp.exe：STM32串口下载工具（常用于正点原子开发板）
20. 飞机调试助手：无人机飞控参数调试与传感器数据查看软件
21. PulseView：逻辑分析仪/示波器开源软件
22. Prismatik (unofficial)：屏幕环境光同步软件
23. 软件：VScode(或Keil5-MDK编程烧录ARM架构芯片)，STM32CubeMX（图形化配置芯片引脚生成代码,否则使用标准库或HAL库自行配置），STLink驱动，CH340驱动（USB转串口）（一般自动下载,低版本Win7下载网址https://www.wch.cn/downloads/cH341SER_EXE.html），（FlyMcu串口下载，STLink Utility下载）（查看驱动：右键此电脑图标-属性-设备管理器-其他设备-无感叹号则已安装）
24. uartassist串口助手
25. SSCOM串口助手
26. （硬件）DAP下载器，逻辑分析仪，示波器
27. 编码转换：codetransmit
28. 字模点阵：PCtoLCD2002
29. 位图放缩：Img2Lcd
30. 野火多功能调试助手：