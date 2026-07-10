import type { AnnouncementConfig } from "../types/config";

export const announcementConfig: AnnouncementConfig = {
	// 公告标题
	title: "通知公告",

	// 公告内容
	content: "欢迎来到Alanxxk的博客！觉得本站内容不错的话，请给我多多反馈哟~",

	// 是否允许用户关闭公告
	closable: true,

	link: {
		// 启用链接
		enable: true,
		// 链接文本
		text: "关于Alanxxk",
		// 链接 URL
		url: "/about/",
		// 内部链接
		external: false,
	},
};
