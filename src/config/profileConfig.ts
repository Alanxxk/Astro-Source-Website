import type { ProfileConfig } from "../types/profileConfig";

export const profileConfig: ProfileConfig = {
	// 头像
	// 图片路径支持三种格式：
	// 1. public 目录（以 "/" 开头，不优化）："/assets/images/avatar.webp"
	// 2. src 目录（不以 "/" 开头，自动优化但会增加构建时间，推荐）："assets/images/avatar.webp"
	// 3. 远程 URL："https://example.com/avatar.jpg"
	avatar: "/assets/images/Alanxxk_material/Alanxxk.jpg",

	// 名字
	name: "Alan_xxk",

	// 个人签名
	bio: "君子生非异也，善假于物也。故余虽愚，卒获有所闻。",

	// 链接配置
	// 已经预装的图标集：fa7-brands，fa7-regular，fa7-solid，material-symbols，simple-icons
	// 访问https://icones.js.org/ 获取图标代码，
	// 如果想使用尚未包含相应的图标集，则需要安装它
	// `pnpm add @iconify-json/<icon-set-name>`
	// showName: true 时显示图标和名称，false 时只显示图标
	links: [
		// {
		// 	name: "qq",
		// 	icon: "fa7-brands:qq",
		// 	url: "https://qm.qq.com/q/ZGsFa8qX2G",
		// 	showName: false,
		// },
		// {
		// 	name: "GitHub",
		// 	icon: "fa7-brands:github",
		// 	url: "https://github.com/CuteLeaf",
		// 	showName: false,
		// },
		// {
		// 	name: "Email",
		// 	icon: "fa7-solid:envelope",
		// 	url: "mailto:xiaye@msn.com",
		// 	showName: false,
		// },
		// {
		// 	name: "RSS",
		// 	icon: "fa7-solid:rss",
		// 	url: "/rss/",
		// 	showName: false,
		// },
		{
			name: "QQ Mail",
			icon: "fa7-solid:envelope",
			url: "mailto:Alan_xxk@foxmail.com?subject=网站联系&body=你好，我从网站了解到...",
		},
		{
			name: "RSS",
			icon: "fa7-solid:rss",
			url: "/rss/",
		},
		{
			name: "Gmail",
			icon: "simple-icons:gmail",
			url: "mailto:alan.xxk.mikasa@gmail.com?subject=网站联系&body=你好，我从网站了解到...",
		},
		{
			name: "Outlook",
			icon: "mdi:microsoft-outlook",
			url: "mailto:Alan_xxk@outlook.com?subject=网站联系&body=你好，我从网站了解到...",
		},
		// {
		// 	name: "Proton Mail",
		// 	icon: "simple-icons:proton",
		// 	url: "mailto:Alan_xxk@proton.me?subject=网站联系&body=你好，我从网站了解到...",
		// },
		{
			name: "Telegram",
			icon: "fa7-brands:telegram",
			url: "https://web.telegram.org/a/#5163711212",
		},
	],
};
