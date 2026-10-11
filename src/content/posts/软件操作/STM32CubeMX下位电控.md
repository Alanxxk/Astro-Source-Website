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
   - 特点：在一个软件中，完成芯片配置+代码生成+代码编辑+下载调试
3. STM32CubeMX+VSCode（推荐）
   - 组合 = STM32CubeMX代码生成+VSCode代码编辑下载调试
   - 具体设置请移步VSCode文章
4. STM32CubeMX+Keil5(Crack)
   - 组合 = STM32CubeMX代码生成+Keil5代码编辑下载调试
   - 特点：软件界面传统，插件生态薄弱
   - 设置：
      1. 编译器等级：最低优化等级
      2. 软件安装：安装路径不要有中文
      3. 器件支持包：
         - 软件外文件：在Keil网站下载器件支持包，双击安装Keil5对应的STM32_DFP.pack
         - 软件内在线：工具栏的Pack Installer-左上角循环图标获取更新列表（左下角是正在获取的内容,右下角是进度）-选择对应的STM32型号系列-安装STM32_DFP文件
      4. 软件破解：右键软件图标-以管理员身份运行-菜单栏的File-License Management-复制CID-打开注册机-粘贴CID-选择ARM-生成序列码-复制序列码-粘贴在New License ID Code位置-选择Add LIC
      5. 新建工程：菜单栏的Project-New uVision Project-命名-选择STM32型号-关掉新建工程小助手-工程目录新建文件夹Start-复制粘贴外围寄存器描述头文件和配置时钟文件（位置在Libraries-CMSIS-CM3-DeviceSupport-ST-STM32型号系列）-复制粘贴启动文件（位置在Libraries-CMSIS-CM3-DeviceSupport-ST-STM32型号系列-startup-arm）-复制粘贴内核寄存器描述文件（位置在Libraries-CMSIS-CM3-CoreSupport）-左侧栏右键Target-选择Add Existing Files to Group-推荐命名与文件夹同名易辨认-添加Start文件夹的.c.h文件和一个启动文件（根据FLASH容量选择）-左侧栏文件小钥匙图标表示只读文件-工具栏选择Options for Target-选择C/C++-Include Paths添加头文件路径Start文件夹-工程目录新建文件夹User-左侧栏右键Target-选择Add Group-右键新建文件夹-选择Add New Item to Group-选择C文件-输入main名称-main.c文件空白处右键-选择Insert #include file-选择Start文件夹的stm32.h-编写main函数int main(void){while(1){}}-文件最后一行是空行（防止报警告）
      6. 编程方式：（开启外设时钟+初始化配置外设参数+设置输入输出数据）
         - 寄存器：查阅数据手册了解每个32位寄存器，设定2进制32位寄存器的16进制数值（4数=1数）
         - 标准库（函数内部包装了外设的寄存器使用方法）：工程目录新建文件夹Library-复制粘贴标准库的文件（位置在Libraries-STM32_StdPeriph_Driver-Inc和src）-左侧栏右键Target-选择Add Group-左侧栏右键Target-选择Add Existing Files to Group-添加Library文件夹的所有文件-工程目录打开User文件夹-复制粘贴标准库的包含所有头文件关系的头文件和中断函数文件（位置在Project-STM32_StdPeriph_Template-stm32_conf和stm32_it）-左侧栏同理添加到main文件位置-打开stm32.h头文件-复制条件宏命令的USE_STDPERIPH_DRIVER（定义宏字符串才能引用stm32_conf.h）-工具栏选择Options for Target-选择C/C++-粘贴在Define-Include Paths添加头文件路径User和Library文件夹-工具栏选择File Extensions-Group里下调包含main.c的文件夹（方便查看左侧栏）（此处也可以创建左侧栏文件夹和添加文件）
         - HAL库：暂无
      7. 代码提示：<kbd>CTRL</kbd>+<kbd>Alt</kbd>+<kbd>Space</kbd>（需要设置电脑系统输入法按键配置取消勾选<kbd>CTRL</kbd>+<kbd>Space</kbd>中英切换）
      8. 代码框选：<kbd>Alt</kbd>+鼠标左键
      9. 辅助书签：工具栏的Bookmarks-工具栏功能分别是添加书签、跳转到上一个书签位置、跳转到下一个、清除所有书签
      10. 移除文件：左侧栏-选中文件-右键-选中Remove File
      11. 编译工程：工具栏的Build(F7)
      12. 代码调试：工具栏的Configuration-选择Debug-Use Simulator仿真调试/Use STLink硬件实时调试-工具栏的Start/Stop Debug Session-左侧栏是寄存器和标志位而上侧栏是汇编语言-工具栏功能分别是复位、运行（可以点击行号旁空白设置断点）、停止、单步运行、跳过当前行单步运行、跳出当前函数单步运行、跳到光标行运行、各种窗口-修改代码要退出调试模式
      13. 下载工程：工具栏的Download(F8)
      14. 软件设置：工具栏的Configuration
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
      15. STLink相关
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
      16. 安装JLink驱动：“Keil文件夹-ARM-Segger-USBDriver”

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
   - [STM32江协内容转HAL库](https://www.bilibili.com/video/BV1pAojYNEhx?)

# 5.功能配置HAL库函数
1. 基本配置：
   - 选择芯片：在STM32CubeMX中新建项目，选择芯片型号MCU，开启项目
   - 查原理图/用户手册：查阅开发板的引脚作用，有无外部时钟源（一般是OSC），定时器输出通道引脚，串口TxRx引脚，CANTxRx引脚
   - 调试类型：在系统核心的SYS选择SerialWire串口调试
   - 时钟类型：在系统核心的RCC选择外部晶振或外部设备提供的时钟源
   - 配时钟树：一般是HCLK填写最大值后按下回车，自动配置时钟树，改写晶振值和选用外部晶振
   - 保存项目：点击项目管理，输入项目名称，英文路径文件夹，选择Cmake编译（使用Keil则使用MDK-ARM编译），选择下载已配置的库文件，勾选把功能代码分散在不同文件中，生成代码
   - 重复配置：在生成的项目中，打开.ioc文件可以重复配置项目
2. 头文件固定代码：避免头文件重复命名导致重复编译而失败
   - #ifndef：如果宏没有定义
   - #define：定义宏
   - #endif：结束判断
3. Main主函数解析
   - 注释：在重新生成代码时，只会保留在注释之间的代码
   - HAL_Init()：初始化HAL库
   - SystemClock_Config()：初始化配置的时钟树
   - MX_GPIO_Init()：初始化配置的引脚
   - while(1)：循环做的任务
4. 基础函数：
   - 延时：HAL_Delay(时间值)（时间单位ms，阻塞整个CPU）
5. GPIO引脚：
   - 配置：
      1. 在系统核心的GPIO选择引脚，每个引脚可以选择输入输出，选择功能配置
         - 输出电平：默认低电平
            1. 低电平
            2. 高电平
         - 模式：默认推挽输出
            1. 浮空输入No pull-up and pull-down：引脚悬空则输入不确定
            2. 上拉输入Pull-up：内部连接上拉电阻则悬空默认高电平
            3. 下拉输入Pull-down：内部连接下拉电阻则悬空默认低电平
            4. 模拟输入：GPIO无效而接入内部ADC
            5. 开漏输出Output Open Drain：输出高电平为高阻态
            6. 推挽输出Output Push Pull：高则高，低则低
            7. 复用开漏输出：芯片内部外设控制的开漏输出
            8. 复用推挽输出：芯片内部外设控制的推挽输出
         - 默认无上下拉电阻
         - 默认低速切换
   - 代码：
      1. 翻转输出：HAL_GPIO_TogglePin(GPIO引脚分组,GPIO_PIN引脚)
      2. 电平输出：HAL_GPIO_WritePin(GPIO引脚分组,GPIO_PIN引脚,GPIO_PIN高/低电平)
      3. 读取输入：HAL_GPIO_ReadPin(GPIO引脚分组,GPIO_PIN引脚)
6. EXIT外部中断
   - 配置：在系统核心的GPIO选择引脚，每个引脚可以选择外部中断，选择功能配置
      1. 模式：上升沿，下降沿，双边沿，软件触发
      2. NVIC：勾选启用中断控制
      3. 系统核心的NVIC：抢占优先级（中断嵌套），响应优先级（优先排队）
      4. 响应方式：中断响应，事件响应
   - 代码：
      1. 外部中断判断：EXTIx_IRQHandler(void)
      2. 外部中断符号：__HAL_GPIO_EXTI_GET_FLAG(GPIO_PIN引脚)
      3. 外部中断函数：HAL_GPIO_EXTI_IRQHandler(GPIO_PIN引脚)
7. TIM定时器：
   - 配置：在系统核心的RCC选择外部时钟源的晶振来源。在定时器选择通道输出和引脚，输入PSC分频倍数(寄存器内部实际分频倍数数值=填写数值=分频倍数目标数值-1)和CM计数方向和ARR计数总数(寄存器内部实际计数总数数值=填写数值=计数总数目标数值-1)和上电默认CCR捕获比较的Pulse值(上电默认输出一定占空比的PWM)。在时钟树中输入外部晶振频率，选择时钟源和倍分频
      1. 时钟源：InternalClock内部时钟，ETR外部触发输入
      2. 通道：输入捕获，输出比较，PWM
      3. 计数器：
         - 预分频器PSC：（从0开始计数故-1）
         - 计数模式：向上，乡下，中央对齐先上再下
         - 自动重装载值ARR：（从0开始计数故-1）
         - 自动重装载的预装载使能：使能(修改ARR不会立即生效)，不使能
      4. PWM：
         - Pulse：高电平数值（占空比=Pulse/(ARR+1)）
      5. 
   - 代码：
      1. 初始化：
         - 开启定时器PWM：HAL_TIM_PWM_Start(&htim定时器号,TIME_CHANNEL定时器通道)
      2. 使用：
         - 设置比较值：__HAL_TIM_SET_COMPARE(&htim定时器号,TIME_CHANNEL定时器通道,CCR捕获比较的值)
8. USART串口：
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
         - 接函：***HAL_UART_RxCpltCallback()***
         - 接收中断函数：HAL_UARTEx_RxEventCallback(UART_HandleTypeDef *串口号)
         - 中断错误函数：HAL_UART_ErrorCallback(UART_HandleTypeDef *串口号)
9.  I2C总线：
10. SPI总线：
11. CAN总线：
   - 配置：在连接外设的CAN勾选激活，根据CAN设备配置相应波特率(根据公式配置(RSJW越大越不容易出错但速度变慢,一般选1)(其他参数有设置先后顺序))，使能AR自动重传和TFP发送队列优先级，勾选RX中断
   - 代码：
      1. 发送：HAL_CAN_AddTxMessage(&CAN号,&CAN发送结构体(写入部分参数),CAN数据帧的数组数据,&CAN邮箱变量(32位空值))
      2. 接收中断函数：HAL_CAN_RxFifo0MsgPendingCallback(CAN_HandleTypeDef *CAN号)
      3. 接收：HAL_CAN_GetRxMessage(CAN号, CAN_RX_FIFO0,&CAN接收结构体,CAN数据帧的数组数据)
12. 

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