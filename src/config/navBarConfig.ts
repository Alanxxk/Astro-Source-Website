import {
	type NavBarConfig,
	type NavBarLink,
	type NavBarSearchConfig,
	NavBarSearchMethod,
} from "../types/navBarConfig";

// ============================================================================
// 导航栏配置 - 根据顺序动态生成导航栏链接
// NavBar Configuration - Dynamically generate navigation bar links based on order
// ============================================================================
const getDynamicNavBarConfig = (): NavBarConfig => {
	// 基础导航栏链接
	const links: NavBarLink[] = [];

	// 主页
	links.push(LinkPresets.Home);

	// 文章及其子菜单
	links.push({
		name: "文章",
		url: "#",
		icon: "material-symbols:article",
		children: [
			// 归档
			LinkPresets.Archive,

			// 分类
			LinkPresets.Categories,

			// 标签
			LinkPresets.Tags,
		],
	});

	// 留言
    links.push(LinkPresets.Guestbook);

	//社交及其子菜单
	links.push({
		name: "社交",
		url: "#",
		icon: "material-symbols:group",
		children: [
			// 友链
			LinkPresets.Friends,
			
			// 动态
			LinkPresets.Dynamic,
			
			// // 留言
			// LinkPresets.Guestbook,
		],
	});

	// 我的及其子菜单
	links.push({
		name: "我的",
		url: "#",
		icon: "material-symbols:person",
		children: [
			// // 动态
			// LinkPresets.Dynamic,

			// 相册
			LinkPresets.Gallery,

			// 追番
			LinkPresets.Anime,

			// 番组计划
			LinkPresets.Bangumi,
		],
	});

	// 关于及其子菜单
	links.push({
		name: "关于",
		url: "#",
		icon: "material-symbols:info",
		children: [
			// 打赏
			LinkPresets.Sponsor,

			// 关于页面
			LinkPresets.About,
		],
	});

	// 自定义导航栏链接
	links.push({
		name: "链接",
		url: "#",
		icon: "material-symbols:link",
		// 子菜单
		children: [
			// {
			// 	name: "GitHub",
			// 	url: "https://github.com/CuteLeaf/Firefly",
			// 	external: true,
			// 	icon: "fa7-brands:github",
			// },
			// {
			// 	name: "Gitee",
			// 	url: "https://gitee.com/CuteLeaf/Firefly",
			// 	external: true,
			// 	icon: "fa7-brands:gitee",
			// },
			// {
			// 	name: "QQ交流群",
			// 	url: "https://qm.qq.com/q/ZGsFa8qX2G",
			// 	external: true,
			// 	icon: "fa7-brands:qq",
			// },
			// {
			// 	name: "Firefly文档",
			// 	url: "https://docs-firefly.cuteleaf.cn",
			// 	external: true,
			// 	icon: "material-symbols:docs",
			// },
			//内网
			{
				name: "Bilibili",
				url: "https://space.bilibili.com/629069256?spm_id_from=333.1007.0.0",
				external: true,
				icon: "fa7-brands:bilibili",
			},
			{
				name: "CSDN",
				url: "https://blog.csdn.net/Alan_xxk?spm=1000.2115.3001.5343",
				external: true,
				icon: "simple-icons:csdn",
			},
			{
				name: "知乎",
				url: "https://www.zhihu.com/people/xxk-74-98",
				external: true,
				icon: "simple-icons:zhihu",
			},
			//外网—学术
			{
				name: "Stack Overflow",
				url: "https://stackoverflow.com/users/32066616/xxk-xxk?tab=profile",
				external: true,
				icon: "simple-icons:stackoverflow",
			},
			{
				name: "GitHub",
				url: "https://github.com/Alanxxk",
				external: true,
				icon: "fa7-brands:github",
			},
			{
				name: "Hugging Face",
				url: "https://huggingface.co/Alanxxk",
				external: true,
				icon: "simple-icons:huggingface",
			},
			{
				name: "Pinterest",
				url: "https://www.pinterest.com/alanxxkmikasa/",
				external: true,
				icon: "fa7-brands:pinterest",
			},
			//外网—媒体
			{
				name: "YouTube",
				url: "https://www.youtube.com/channel/UCSmG58-YIUVchDo9eEgPMwg",
				external: true,
				icon: "simple-icons:youtube",
			},
			{
				name: "Instagram",
				url: "https://www.instagram.com/xxk7680/",
				external: true,
				icon: "simple-icons:instagram",
			},
			{
				name: "Snapchat",
				url: "https://www.snapchat.com/@alan_xxk",
				external: true,
				icon: "fa7-brands:snapchat",
			},
			//外网—联系
			{
				name: "Facebook",
				url: "https://www.facebook.com/profile.php?id=61559231013943",
				external: true,
				icon: "fa7-brands:facebook",
			},
			{
				name: "X-Twitter",
				url: "https://x.com/xxkxxk619587",
				external: true,
				icon: "fa7-brands:x-twitter",
			},
			{
				name: "Reddit",
				url: "https://www.reddit.com/user/Delicious-Guess732/",
				external: true,
				icon: "fa7-brands:reddit",
			},
			{
				name: "WhatsApp-Group",
				url: "https://chat.whatsapp.com/JuTFUqI1y0g8k0U21yOFqU",
				external: true,
				icon: "fa7-brands:whatsapp",
			},
			//外网—游戏
			{
				name: "Discord-Group",
				url: "https://discord.com/channels/997898972746223777/997898972746223780",
				external: true,
				icon: "simple-icons:discord",
			},
			
			{
				name: "Twitch",
				url: "https://www.twitch.tv/alanxxks",
				external: true,
				icon: "fa7-brands:twitch",
			},
			// {
			//   name: "LinkedIn",
			//   url: "mailto:Alan_xxk@foxmail.com?subject=网站联系&body=你好，我从网站了解到...",
			//   external: true,
			//   icon: "fa7-brands:linkedin",
			// },
			// {
			//   name: "line",
			//   url: "https://chat.whatsapp.com/JuTFUqI1y0g8k0U21yOFqU",
			//   external: true,
			//   icon: "fa7-brands:line",
			// },
		],
	});

	// 文档链接
	// links.push({
	// 	name: "文档",
	// 	url: "https://docs-firefly.cuteleaf.cn",
	// 	external: true,
	// 	icon: "material-symbols:docs",
	// });

	return { links } as NavBarConfig;
};

// 导航搜索配置
export const navBarSearchConfig: NavBarSearchConfig = {
	method: NavBarSearchMethod.PageFind,
};

// ============================================================================
// 链接预设 - 可自由自定义导航栏链接的名称、图标和URL
// Link Presets - Allows free customization of the name, icon, and URL of navigation bar links
// ============================================================================
export const LinkPresets: Record<string, NavBarLink> = {
	Home: {
		name: "主页",
		url: "/",
		icon: "material-symbols:home",
	},
	Dynamic: {
		name: "动态",
		url: "/dynamic/",
		icon: "material-symbols:forum-rounded",
		pageKey: "dynamic",
	},
	Archive: {
		name: "归档",
		url: "/archive/",
		icon: "material-symbols:archive",
	},
	Categories: {
		name: "分类",
		url: "/categories/",
		icon: "material-symbols:folder-open-rounded",
	},
	Tags: {
		name: "标签",
		url: "/tags/",
		icon: "material-symbols:tag-rounded",
	},
	Friends: {
		name: "友链",
		url: "/friends/",
		icon: "material-symbols:link-2-rounded",
		pageKey: "friends",
	},
	Sponsor: {
		name: "打赏",
		url: "/sponsor/",
		icon: "material-symbols:favorite",
		pageKey: "sponsor",
	},
	Guestbook: {
		name: "留言",
		url: "/guestbook/",
		icon: "material-symbols:chat",
		pageKey: "guestbook",
	},
	About: {
		name: "关于我",
		url: "/about/",
		icon: "material-symbols:person",
	},
	Bangumi: {
		name: "番组计划",
		url: "/bangumi/",
		icon: "material-symbols:movie",
		pageKey: "bangumi",
	},
	Gallery: {
		name: "相册",
		url: "/gallery/",
		icon: "material-symbols:photo-library",
		pageKey: "gallery",
	},
	Anime: {
		name: "追番",
		url: "/anime/",
		icon: "material-symbols:live-tv",
		pageKey: "anime",
	},
};

export const navBarConfig: NavBarConfig = getDynamicNavBarConfig();
