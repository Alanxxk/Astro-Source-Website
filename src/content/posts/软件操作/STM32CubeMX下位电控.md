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
1. 基于寄存器：程序直接配置寄存器
2. 基于标准库：ST官方封装函数（现已被官方逐渐淘汰）（推荐学习底层逻辑）
   - htmresc文件夹：图标图片
   - Libraries文件夹：库函数文件
   - Project文件夹：工程示例和模板
   - Utilities文件夹：ST官方设计评估板的示例程序
   - Release_Notes：库函数发布文档版本说明
   - stm32_stdperiph_lib_um：使用手册
3. 基于HAL库：图形化界面快速配置STM32（配置功能生成的代码）（推荐快速上手）
4. 基于LL库：轻量级寄存器操作（推荐高手提高性能）

# 3.代码生成编辑
1. STM32CubeMX
   - STM32CubeMX图形化配置主控芯片生成HAL库代码
2. STM32CubeMXIDE
   - 软件 = ST官方代码编辑器+内置STM32CubeMX
   - 特点：在一个软件中，完成芯片配置+代码生成+代码编辑+下载调试（需要勾选生成.hex文件）
   - 缺点：可能一部分芯片无法支持
3. STM32CubeMX+VSCode（推荐）
   - 组合 = STM32CubeMX代码生成+VSCode代码编辑下载调试
   - 具体设置请移步VSCode文章
4. STM32CubeMX+Keil5(Crack)
   - 组合 = STM32CubeMX代码生成+Keil5代码编辑下载调试
   - 特点：软件界面传统，插件生态薄弱
   - 设置：
      1. 编译器等级：最低优化等级
      2. 软件安装：Keil5基本上是同意和下一步和避免中文路径
      3. 软件破解：Keil5管理员运行-菜单栏File-许可证License Management-复制CID-关闭系统音量和杀毒软件-打开注册机软件-粘贴CID和选择ARM和选择professional-点击Generate生成注册码-复制注册码-回到Keil5软件在LIC粘贴注册码-点击Add LIC添加注册码到软件中
      4. 器件支持包：
         - 软件外文件：在Keil网站下载器件支持包，双击安装Keil5对应的STM32_DFP.pack
         - 软件内在线：工具栏的Pack Installer-左上角循环图标获取更新列表（左下角是正在获取的内容,右下角是进度）-选择对应的STM32型号系列-安装STM32_DFP文件
      5. 软件破解：右键软件图标-以管理员身份运行-菜单栏的File-License Management-复制CID-打开注册机-粘贴CID-选择ARM-生成序列码-复制序列码-粘贴在New License ID Code位置-选择Add LIC
      6. 新建工程：菜单栏的Project-New uVision Project-命名-选择STM32型号-关掉新建工程小助手-工程目录新建文件夹Start-复制粘贴外围寄存器描述头文件和配置时钟文件（位置在Libraries-CMSIS-CM3-DeviceSupport-ST-STM32型号系列）-复制粘贴启动文件（位置在Libraries-CMSIS-CM3-DeviceSupport-ST-STM32型号系列-startup-arm）-复制粘贴内核寄存器描述文件（位置在Libraries-CMSIS-CM3-CoreSupport）-左侧栏右键Target-选择Add Existing Files to Group-推荐命名与文件夹同名易辨认-添加Start文件夹的.c.h文件和一个启动文件（根据FLASH容量选择）-左侧栏文件小钥匙图标表示只读文件-工具栏选择Options for Target-选择C/C++-Include Paths添加头文件路径Start文件夹-工程目录新建文件夹User-左侧栏右键Target-选择Add Group-右键新建文件夹-选择Add New Item to Group-选择C文件-输入main名称-main.c文件空白处右键-选择Insert #include file-选择Start文件夹的stm32.h-编写main函数int main(void){while(1){}}-文件最后一行是空行（防止报警告）
      7. 编程方式：（开启外设时钟+初始化配置外设参数+设置输入输出数据）
         - 寄存器：查阅数据手册了解每个32位寄存器，设定2进制32位寄存器的16进制数值（4数=1数）
         - 标准库（函数内部包装了外设的寄存器使用方法）：工程目录新建文件夹Library-复制粘贴标准库的文件（位置在Libraries-STM32_StdPeriph_Driver-Inc和src）-左侧栏右键Target-选择Add Group-左侧栏右键Target-选择Add Existing Files to Group-添加Library文件夹的所有文件-工程目录打开User文件夹-复制粘贴标准库的包含所有头文件关系的头文件和中断函数文件（位置在Project-STM32_StdPeriph_Template-stm32_conf和stm32_it）-左侧栏同理添加到main文件位置-打开stm32.h头文件-复制条件宏命令的USE_STDPERIPH_DRIVER（定义宏字符串才能引用stm32_conf.h）-工具栏选择Options for Target-选择C/C++-粘贴在Define-Include Paths添加头文件路径User和Library文件夹-工具栏选择File Extensions-Group里下调包含main.c的文件夹（方便查看左侧栏）（此处也可以创建左侧栏文件夹和添加文件）
         - HAL库：暂无
      8. 代码提示：<kbd>CTRL</kbd>+<kbd>Alt</kbd>+<kbd>Space</kbd>（需要设置电脑系统输入法按键配置取消勾选<kbd>CTRL</kbd>+<kbd>Space</kbd>中英切换）
      9. 代码框选：<kbd>Alt</kbd>+鼠标左键
      10. 辅助书签：工具栏的Bookmarks-工具栏功能分别是添加书签、跳转到上一个书签位置、跳转到下一个、清除所有书签
      11. 移除文件：左侧栏-选中文件-右键-选中Remove File
      12. 编译工程：工具栏的Build(F7)
      13. 代码调试：工具栏的Configuration-选择Debug-Use Simulator仿真调试/Use STLink硬件实时调试-工具栏的Start/Stop Debug Session-左侧栏是寄存器和标志位而上侧栏是汇编语言-工具栏功能分别是复位、运行（可以点击行号旁空白设置断点）、停止、单步运行、跳过当前行单步运行、跳出当前函数单步运行、跳到光标行运行、各种窗口-修改代码要退出调试模式
      14. 下载工程：工具栏的Download(F8)
      15. 软件设置：工具栏的Configuration
         - 编码：选择Editor-Encoding-选择UTF-8（防止中文乱码）
         - 缩进：选择Editor-Tab size输入4
         - 字体：选择Colors&Fonts-选择C/C++ Edotpr files-选择Font Courier New，同理调整Asm Editor files
         - 空间：工具栏的Options for Target-选择Target-左边IROM1（右边是设置RAM）-Start可以设置程序代码的起始地址-Size可以设置程序代码的占用空间（过小导致无法写入程序代码会报错）（在程序代码编译后的提示Program Size,前三个数的和=程序代码占用闪存容量,后两个数的和=占用SRAM容量,也可以双击左侧栏的Target后查看编译信息的最后面得知RW是SRAM占用和ROM是闪存占用）
         - 擦除：工具栏的Options for Target-选择Debug-Use选择ST-Link Debugger-选择Settings-选择Flash Download-选择Erase Sectors（根据需求擦除对应页）
         - 移植：工具栏选择Options for Target-选择Target-勾选Use MicroLIB-代码添加C语言库和编写重定向函数就可以使用printf输出数据到串口，或者直接使用spritf，或者编写封装函数使用vspritf
         - 中文GBK：工具栏的Configuration-选择Editor-Encoding-选择GB2312-删除中文-重新打开文件
         - 中文UTF8：工具栏选择Options for Target-选择C/C++-在Misc Controls处输入--no-multibyte-chars
         - 串口下载写入程序：工具栏选择Options for Target-选择Output-勾选Create HEX File-FlyMcu软件选择串口号、波特率、生成的.HEX文件-硬件跳线帽换成串口下载Boot模式和按下复位按键生效Boot模式（勾选编程后执行和取消勾选编程到FLASH时写选项字节则无需复位即可显示一次性程序而复位后会回到BootLoad模式）-FlyMcu软件选择开始编程而下载程序-更换回跳线帽和同理按下复位按键（可以设计下载电路设置CH340串口芯片的DTR和RTS引脚实现不用更换跳线帽,推荐DTR的低电平复位RTS高电平进BooLoader）
         - 串口下载写出程序：FlyMcu软件选择读FLASH可以读出芯片程序
         - 串口下载清除芯片：FlyMcu软件选择清除芯片擦除芯片内容
         - 串口下载芯片信息：FlyMcu软件选择读器件信息可以读取芯片的参数
         - 串口下载选项字节：FlyMcu软件选择勾选编程到FLASH时写选项字节和设定选项字节等可以设置读保护保证程序安全（取消时会清空芯片程序）和写保护保护部分区域不被擦除等等不随程序变化的设置参数，但是需要和下载程序同步更改
      16. STLink相关
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
      17. 安装JLink驱动：“Keil文件夹-ARM-Segger-USBDriver”

# 4.STM32CubeMX软件
1. 下载：[STM32CubeMX下载官网](https://www.st.com.cn/zh/development-tools/stm32cubemx.html)
2. 安装：基本上是同意和下一步和避免中文路径和创建桌面图标
3. 设置：设置包路径，关闭自动更新
4. 注意：在输入芯片型号时，切换英文输入法可以避免双重字母
5. 编程
   - C语言
   - C++
6. 学习：
   - [STM32江协标准库](https://www.bilibili.com/video/BV1th411z7sn/?)
   - [STM32江协内容转HAL库-部分内容有错而仅用于快速熟悉配置和HAL函数（还有红外蓝牙WiFi）](https://www.bilibili.com/video/BV1pAojYNEhx?)
   - [STM32铁头山羊动画讲解HAL库-用于入门学习](https://www.bilibili.com/video/BV16J4m1w7HB?)
7. 常识：
   - 电源引脚（来源是MOS管的电流是漏极D到源极S）
      1. 正极：Vdd（相比其他是Vcc）
      2. 负极：Vss（相比其他是GND）
   - 
8. 

# 5.功能配置HAL库函数
1. 基本配置：
   - 选择芯片：在STM32CubeMX中新建项目，选择芯片型号MCU，开启项目
   - 查原理图/用户手册：查阅开发板的引脚作用，有无外部时钟源（一般是OSC），定时器输出通道引脚，串口TxRx引脚，CANTxRx引脚
   - 调试类型：在系统核心的SYS选择SerialWire串口调试
   - 时钟类型：在系统核心的RCC选择外部晶振（无源晶振）或外部设备提供的时钟源（有源晶振）
   - 配时钟树：一般是HCLK填写最大值后按下回车，自动配置时钟树，改写晶振值和选用外部晶振
   - 保存项目：点击项目管理，输入项目名称，英文路径文件夹，选择Cmake编译（使用Keil则使用MDK-ARM编译），选择下载已配置的库文件，勾选把功能代码分散在不同文件中，生成代码
   - 重复配置：在生成的项目中，打开.ioc文件可以重复配置项目
2. 头文件固定代码：避免头文件重复命名导致重复编译而失败
   - #ifndef：如果宏没有定义
   - #define：定义宏
   - #endif：结束判断
3. 头文件
   - 数据类型：stdint.h
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
   - 配置：
      1. 在系统核心的GPIO选择引脚，每个引脚可以选择功能配置
         - 初始电平：默认低电平
            1. 低电平：Low
            2. 高电平：High
         - 模式：默认推挽输出
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
         - 用户标签：默认无
   - 宏定义：
      1. 低电平0：GPIO_PIN_RESET
      2. 高电平1：GPIO_PIN_SET
   - 代码：
      1. 自动生成初始化配置：MX_GPIO_Init()
      2. 翻转输出：HAL_GPIO_TogglePin(GPIO引脚分组,GPIO_PIN引脚)
      3. 电平输出：HAL_GPIO_WritePin(GPIO引脚分组,GPIO_PIN引脚,GPIO_PIN高/低电平)
      4. 读取电平：HAL_GPIO_ReadPin(GPIO引脚分组,GPIO_PIN引脚)
11. EXIT外部中断
   - 配置：在系统核心的GPIO选择引脚，每个引脚可以选择外部中断，选择功能配置
      1. 模式：上升沿，下降沿，双边沿，软件触发
      2. NVIC：勾选启用中断控制
      3. 系统核心的NVIC：抢占优先级（中断嵌套），响应优先级（优先排队）
      4. 响应方式：中断响应，事件响应
   - 代码：
      1. 外部中断判断：EXTIx_IRQHandler(void)
      2. 外部中断符号：__HAL_GPIO_EXTI_GET_FLAG(GPIO_PIN引脚)
      3. 外部中断函数：HAL_GPIO_EXTI_IRQHandler(GPIO_PIN引脚)
12. TIM定时器：
   - 配置：在系统核心的RCC选择外部时钟源的晶振来源。在定时器选择通道输出和引脚，输入PSC分频倍数(寄存器内部实际分频倍数数值=填写数值=分频倍数目标数值-1)和CM计数方向和ARR计数总数(寄存器内部实际计数总数数值=填写数值=计数总数目标数值-1)和上电默认CCR捕获比较的Pulse值(上电默认输出一定占空比的PWM)。在时钟树中输入外部晶振频率，选择时钟源和倍分频
      1. 从模式：复位模式（接收到触发信号则清空计数器CNT和产生更新事件），门控模式（触发信号有效时计数），触发模式（触发信号来时启动计数器CNT），外部时钟模式（触发信号作为计数器CNT），编码器格式（正交编码器接口AB相计数）
      2. 触发源：从模式的触发信号来源
      3. 时钟源：InternalClock内部时钟，ETR外部触发输入
      4. 通道：输入捕获IC，输出比较OC，PWM
      5. 计数器：
         - 预分频器PSC：（从0开始计数故-1）
         - 计数模式：向上，乡下，中央对齐先上再下
         - 自动重装载值ARR：（从0开始计数故-1）
         - 自动重装载的预装载使能：使能(修改ARR不会立即生效)，不使能
      6. PWM：
         - Pulse：高电平数值（占空比=Pulse/(ARR+1)）
      7. IC：
         - 输入捕获选择：
            1. Direct：直接连接（捕获通道连接直接对应引脚）
            2. Indirect：间接连接（捕获通道连接到交叉引脚）
         - 极性选择：上升沿，下降沿，上下沿都捕获
      8. 组合通道模式之编码器模式Encoder：
         - 编码器模式：通道1，通道2，通道1和2
         - 极性选择：A相上下计数B相判断方向，B相上下计数A相判断方向，AB相都上下计数和交替判断方向
      9.  组合通道模式：测量PWM周期和占空比，霍尔传感器模式，异或霍尔模式
      10. NVIC Setting：勾选启用中断控制
   - 代码：
      1. 初始化：
         - 开启定时器PWM通道：HAL_TIM_PWM_Start(&htim定时器号,TIME_CHANNEL定时器通道)
         - 开启定时器IC通道：HAL_TIM_IC_Start(&htim定时器号,TIME_CHANNEL定时器通道)
         - 开启定时器Encoder模式：HAL_TIM_Encoder_Start(&htim定时器号,TIME_CHANNEL_ALL)
      2. 使用：
         - 定时器句柄：htim->Instance定时器，htim->Channel通道
         - 定时器宏定义：
            1. HAL_TIM_ACTIVE_CHANNEL：判断触发中断或事件的通道
         - 定时器基本函数：
            1. 设置比较值：__HAL_TIM_SET_COMPARE(&htim定时器号,TIME_CHANNEL定时器通道,CCR捕获比较的值)
            2. 设置计数值：__HAL_TIM_SET_COUNTER(&htim定时器号,计数值)
            3. 获取计数值：__HAL_TIM_GET_COUNTER(&htim定时器号)
         - IC：
            1. 中断回调弱函数：void HAL_TIM_IC_CaptureCallback(TIM_HandleTypeDef *htim)
            2. IC读取捕获比较寄存器CCR值函数：HAL_TIM_ReadCapturedValue(&htim定时器号,TIME_CHANNEL定时器通道)
         - Encoder：
            1. 
13. ADC模数转换器：
   - 配置：
      1. 开启通道：在模拟的ADC勾选通道
      2. 功能设置：
         - 模式：
            1. 独立模式：多个ADC独立工作互不干扰
            2. 同步模式：多个ADC同时采样提升速度
         - 对齐：寄存器是16位但ADC是12位
            1. 左对齐：读取数据变大，因为低位补0
            2. 右对齐：读取数据正常
         - 扫描：
            1. 禁用：每次触发只转换Rank1通道
            2. 启用：可以转换多个通道
         - 连续：
            1. 禁用：触发一次则扫描一次序列转换
            2. 启用：触发一次则连续扫描转换
         - 间断：
            1. 禁用：触发一次则扫描一个序列转换
            2. 启用：触发一次则只转换序列的前N个
      3. 规则转换：
         - 数量：每次转换时按顺序连续转换开启的通道，但是数据寄存器只有一个所以数据不及时读取会被覆盖
      4. 序列设置
         - RANK通道：更改每个RANK的ADC通道
         - 采样周期：时间短则采样电容未充满电导致读数不准，时间长则能适应高阻抗充满电。总时间=采样时间+逐次逼近时间(12位是12.5周期)
   - 代码：
      1. 自动生成配置：MX_ADC_Init()
      2. 初始化校准：HAL_ADCEx_Calibration_Start(&hadc模数转换器号)
      3. 使用：
         - 开启ADC：HAL_ADC_Start(&hadc模数转换器号)
         - 模数转换：HAL_ADC_PollForConversion(&hadc模数转换器号,等待时间)
         - 获取结果：HAL_ADC_GetValue(&hadc模数转换器号)
      4. 转换完成回调函数：void HAL_ADC_ConvCpltCallback(ADC_HandleTypeDef* hadc)（无DMA则转换一个通道调用一次,有DMA则转换一个序列调用一次）
   - DMA中断：
      1. ：HAL_ADC_Start_DMA(&hadc1,(uint32_t*)DataB目标地址,搬运数据数量)
14. DMA直接存储器访问：
   - 配置：在系统核心的DMA，添加DMA
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
      7. 优先级：
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
15. USART串口：
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
      4. 开关中断：在NVIC设置或在系统核心的NVIC勾选USART的中断
      5. DMA中断：在DMA设置添加串口的发送接收，按需勾选源端地址自增、目标地址自增和选择自增地址间隔
   - 代码：
      1. 初始化：
         - 自动生成配置：MX_USART_UART_Init()
      2. 阻塞使用：（一般不使用轮询阻塞）
         - 轮询阻塞发送定长数据：HAL_UART_Transmit(&huart串口号,要发送数据的地址,发送数据字节数,等待时间)
         - 轮询阻塞接收定长数据：HAL_UART_Receive(&huart串口号,接收数据缓冲区的地址,接收数据字节数,等待时间)
      3. 中断使用：
         - 中断模式：
            1. 开启一次非阻塞发送定长数据中断：HAL_UART_Transmit_IT(&huart串口号,要发送数据的地址,发送数据字节数)
            2. 开启一次非阻塞接收定长数据中断：HAL_UART_Receive_IT(&huart串口号,接收数据缓冲区的地址,接收数据字节数)
         - 入口函数（硬件调用）：USART1_IRQHandler(void)
         - 处理函数（判中断类）：HAL_UART_IRQHandler(&huart串口号)
         - 回调函数（中断内容）：
            1. 非阻塞发送中断的回调函数：void HAL_UART_TxCpltCallback(UART_HandleTypeDef *huart)
            2. 非阻塞接收中断的回调函数：void HAL_UART_RxCpltCallback(UART_HandleTypeDef *huart)
      4. DMA中断：
         - 中断模式：
            1. 开启一次非阻塞发送定长数据DMA中断：HAL_UART_Transmit_DMA(&huart串口号,要发送数据的地址,发送数据字节数)
            2. 开启一次非阻塞接收不定长数据DMA中断：HAL_UARTEx_ReceiveToIdle_DMA(&huart串口号,接收数据缓冲区的地址,接收数据缓冲区最大字节数)（空闲或缓冲区满则触发回调函数）
         - 回调函数：
            1. 接收：void HAL_UARTEx_RxEventCallback(UART_HandleTypeDef *huart, uint16_t Size)
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
      3. DMA收发数据帧：
         - 接收：HAL_UART_Receive_DMA(&串口号,&数据帧变量,字节数)
         - 发送：HAL_UART_Transmit_DMA(&串口号,&数据帧变量,字节数)
      4. 串口接收中断函数：
         - 接函：HAL_UART_RxCpltCallback()
         - 接收中断函数：HAL_UARTEx_RxEventCallback(UART_HandleTypeDef *串口号)
         - 中断错误函数：HAL_UART_ErrorCallback(UART_HandleTypeDef *串口号)
16. I2C集成电路总线：
   - 软件I2C：（占用MCU）
      1. 硬件：串行时钟线SCL和串行数据线SDA都分别连接4.7K的上拉电阻
      2. 配置：两个开漏输出和上拉(外部上拉则无拉)的GPIO口分别作为时钟线SCL和数据线SDA
      3. 代码：
         - 通信单元：
            1. 初始化（空闲）：SCL=1，SDA=1
            2. 起始条件（SCL=1时SDA下降沿）：SDA=1，SCL=1，SDA=0，SCL=0
            3. 发送字节（高位先发,SCL=1时发送）：SDA(循环发送一字节数据变量的每一位)，SCL=1，SCL=0
            4. 接收应答（主发从答,需要提前释放SDA,0=应答=从机收到,1=非应答=发址填错/从机繁忙/从机故障）：SDA=1，SCL=1，SDA=接收应答位，SCL=0
            5. 接收字节（高位先收,SCL=1时接收）：SDA(循环接收一字节数据变量的每一位)，SCL=1，SCL=0
            6. 发送应答（主收主答,0=应答=继续读,1=非应答=不读了）：SDA=发送应答位，SCL=1，SCL=0
            7. 终止条件（SCL=1时SDA上升沿）：SCL=0，SDA=0，SCL=1，SDA=1
         - 发送接收：
            1. 发送数据：起始条件，发送字节(7位从机设备地址+1位读写(10)操作(少有2字节表示=5位固定+2位从机设备地址高二位+1位读写操作+8位从机设备地址低八位))，接收应答，发送字节(寄存器地址字节)，接收应答，发送字节(具体数据字节)，接收应答，终止条件
            2. 接收数据：起始条件，发送字节(7位从机设备地址+1位读写(10)操作(少有2字节表示=5位固定+2位从机设备地址高二位+1位读写操作+8位从机设备地址低八位))，接收应答，发送字节(寄存器地址字节)，接收应答，接收字节(具体数据字节)，发送应答，终止条件
         - 功能封装：
            1. OLED屏幕：设置光标位置，清屏，初始化设置，显示字符，显示字符串，显示有无符号的数字，显示十六进制数字，高级封装成U8G2图形库
   - 硬件I2C：（传输快抗干扰强）
      1. 配置：在通信外设的I2C
         - 模式：
            1. I2C：
            2. SMBus：系统管理总线
         - 作为主机参数：
            1. 速度等级：（需要考虑从机速度）
               - 标准模式Standard Mode：最大传输速度100kbps
               - 快速模式Fast Mode：最大传输速度400kbps
               - 快速增强模式Fast Mode Plus：最大传输速度1Mbps
               - 高速模式High Speed Mode：最大传输速度3.4Mbps
               - 超快模式Ultra Fast Mode：最大传输速度5Mbps
            2. 时钟速度：设置传输速度的波特率值
            3. 时钟占空比：
               - 2：1低1高，占空比50%
               - 16/9：16低9高，外部电阻上拉高电平导致上升沿变缓，所以拉长低电平保证被读取
         - 作为从机参数：
      2. 代码：
         - 阻塞使用：（一般不使用阻塞）
            1. 阻塞发送字节：HAL_I2C_Master_Transmit(&hi2c通信号, 从机设备地址与读写操作的字节,要发送数据的地址,发送数据字节数,等待时间)
            2. 阻塞接收字节：HAL_I2C_Master_Receive(&hi2c通信号, 从机设备地址与读写操作的字节,接收数据缓冲区的地址,接收数据字节数,等待时间)
            3. 阻塞发送到从机寄存器(≈阻塞发送2字节)：HAL_I2C_Mem_Write(&hi2c通信号,从机设备地址与读写操作的字节,从机设备寄存器字节地址,寄存器地址字节数,发送数据字节地址,发送数据字节数,等待时间)
            4. 阻塞读取从机寄存器(≈阻塞接收2字节)：HAL_I2C_Mem_Read(&hi2c通信号,从机设备地址与读写操作的字节,从机设备寄存器字节地址,寄存器地址字节数,接收数据缓冲区字节地址,读取数据字节数,等待时间)
         - 中断使用：
            1. 
         - DMA中断：
            1. 
17. SPI串行外设接口：
   - 软件SPI：（占用MCU）
      1. 配置：
         - 引脚：三个推挽输出(CS推荐上拉,SCK推荐空闲方向的上下拉,MOSI推荐下拉防上电干扰)和一个浮空/上拉输入(推荐上拉输入)的GPIO口分别作为片选CS和时钟线SCK和主出从入MOSI和主入从出MISO
         - 模式：时钟极性CPOL(空闲SCK=0/1)+时钟相位CPHA(第一/二边沿分别读/写数据)
            1. 模式0：CPOL=0(空闲SCK=0)，CPHA=0(1边沿读,2边沿写)（常用）
            2. 模式1：CPOL=0(空闲SCK=0)，CPHA=1(1边沿写,2边沿读)
            3. 模式2：CPOL=1(空闲SCK=1)，CPHA=0(1边沿读,2边沿写)
            4. 模式3：CPOL=1(空闲SCK=1)，CPHA=1(1边沿写,2边沿读)（常用）
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
         - 交换数据：起始条件，交换字节（发送控制命令），交换字节（发送寄存器地址），交换字节（发送假数据和接收从机数据），终止条件
         - 功能封装：
            1. W25Q存储器：读取数据，读/写指令，等待繁忙，页编程写入数据，擦除扇区
   - 硬件SPI：（传输快抗干扰强）
      1. 配置：在通信外设的SPI
         - 模式：
            1. 全双工：标准4线(CS,SCK,MOSI,MISO)
            2. 半双工：3线(MOSI和MISO合并)
            3. 仅发/收：2线(SCK,MOSI/MISO)
         - 硬件片选：在调用SPI交换字节时，硬件自动开启/关闭片选（软件片选使用上拉推挽输出）
         - 
      2. 代码：
         - 阻塞使用：（一般不使用阻塞）
            1. 发送字节：HAL_SPI_Transmit(&hspi通信号,发送数据字节地址,发送数据字节数,等待时间)
            2. 接收字节：HAL_SPI_Receive(&hspi通信号,接收数据缓冲区字节地址,接收数据字节数,等待时间)
            3. 交换字节：HAL_SPI_TransmitReceive(&hspi, 发送数据字节地址,接收数据缓冲区字节地址,交换数据字节数,等待时间)
         - 中断使用：
         - DMA中断：
18. ----CAN控制器局域网络：
   - 配置：在连接外设的CAN勾选激活，根据CAN设备配置相应波特率(根据公式配置(RSJW越大越不容易出错但速度变慢,一般选1)(其他参数有设置先后顺序))，使能AR自动重传和TFP发送队列优先级，勾选RX中断
   - 代码：
      1. 发送：HAL_CAN_AddTxMessage(&CAN号,&CAN发送结构体(写入部分参数),CAN数据帧的数组数据,&CAN邮箱变量(32位空值))
      2. 接收中断函数：HAL_CAN_RxFifo0MsgPendingCallback(CAN_HandleTypeDef *CAN号)
      3. 接收：HAL_CAN_GetRxMessage(CAN号, CAN_RX_FIFO0,&CAN接收结构体,CAN数据帧的数组数据)
19. RTC实时时钟+BKP备份寄存器：
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
20. PWR电源控制：
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
21. IWDG独立看门狗：（超时喂狗则复位）
   - 配置：在系统核心的IWDG
      1. 开关：勾选激活
      2. 计时：设置预分频值和重加载值
   - 代码：
      1. 自动生成初始化配置：MX_IWDG_Init()
      2. 循环喂狗：HAL_IWDG_Refresh(&hiwdg)
      3. 读取独立看门狗复位标志位：__HAL_RCC_GET_FLAG(RCC_FLAG_IWDGRST)
      4. 清除所有复位标志位：__HAL_RCC_CLEAR_RESET_FLAGS()
22. WWDG窗口看门狗：（不在区间时间内喂狗则复位）
   - 配置：在系统核心的WWDG
      1. 开关：勾选激活
      2. 计时：设置预分频值和最早喂狗窗口值和递减计数器初始值
   - 代码：
      1. 自动生成初始化配置：MX_WWDG_Init()
      2. 循环喂狗：HAL_IWDG_Refresh(&hwwdg)
      3. 读取窗口看门狗复位标志位：__HAL_RCC_GET_FLAG(RCC_FLAG_WWDGRST)
      4. 清除所有复位标志位：__HAL_RCC_CLEAR_RESET_FLAGS()
23. Flash芯片内部存储器：
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
24. IR红外遥控：
   - 配置：定时器
   - 代码：
25. BT蓝牙：
   - 配置：串口
   - 代码：
26. WiFi无线网络：
   - 配置：串口
   - 代码：

# 6.高级应用
1. FreeRTOS
   - 作用：多个任务近似同时进行(不断快速轮着切换任务)
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
2. 电机
   - https://github.com/TongjiSuperPower/sp_middleware
   - 直流电机：
      1. 控制：两个电极，正接正转，反接反转
      2. 功率：对于STM32输出驱动来说非常大
      3. 驱动：需要配合电机驱动电路板，可以调整旋转方向（引脚正反接）和旋转速度（电压大小）
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
      2. 控制：要求PWM周期20ms，高电平时间0.5-2.5ms，PWM占空比决定转动角度
   - 步进电机：
      - 特点：转动角度精准。但转速增加扭矩下降，负载过大或转速太高可能失步
      - 控制：PWM周期控制速度，PWM数量控制角度位置
3. 底盘解算
   - 全向轮
      1. 特点：旋转快，但运动不稳且不精
      2. 控制：根据轮子方向进行速度分解
   - 麦轮
      1. 特点：
      2. 控制：根据滚子方向进行速度分解
   - 舵轮
      1. 特点：灵活，但重量重
      2. 控制：转动轮子方向
4. 功能设备
   - 示意
      1. 按键/旋钮/拨盘
         - 按键：前后延时20ms消抖+while循环判断读取
         - 旋钮：顺时钟转动A下降沿时B高电平
      2. 蜂鸣器
         - 特点：发出声音
         - 控制：PWM控制音调
         - 听频：20-20000Hz
         - 频源：
            1. 有源蜂鸣器：内置固定频率振荡源，只需开关发声
            2. 无源蜂鸣器：控制翻转电平频率发声
      3. LED灯
         - 特点：显示亮光
         - 控制：高低电平的亮灭灯，PWM的呼吸灯
      4. LCD显示屏
         - 原理：背光
         - 特点：功耗大，可视角小，
      5. OLED显示屏
         - 原理：每个像素自发光
         - 特点：功耗低，可视角大，响应速度快，轻薄柔韧，内部有显存可以保留最后一次显示的内容
         - 像素：128×64
         - 线孔：4（I2C），7（SPI）
         - 字库代码：设定要显示的像素点阵
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
      1. 光敏电阻
      2. 热敏电阻
      3. 红外接收管
      4. 编码器
         - 作用：测量旋转方向、力矩、速度和位置
         - 分类：
            1. 光栅码盘
            2. 机械触点
            3. 霍尔传感
            4. 编码器元件
      5. 姿态传感器：
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
      6. 气压计
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
5. FOC控制

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
23. 软件：VScode(或Keil5-MDK编程烧录ARM架构芯片)，STM32CubeMX（图形化配置芯片引脚生成代码,否则使用标准库或HAL库自行配置），STLink驱动，CH340驱动（USB转串口），（FlyMcu串口下载，STLink Utility下载）（查看驱动：右键此电脑图标-属性-设备管理器-其他设备-无感叹号则已安装）
24. uartassist串口助手
25. SSCOM串口助手