import type { AnnouncementConfig } from "../types/config";

export const announcementConfig: AnnouncementConfig = {
  title: "通知公告", // 公告标题
  content: "欢迎来到Alanxxk的博客！觉得本站内容不错的话，请给我多多反馈哟~", // 公告内容
  closable: false, // 允许用户关闭公告
  link: {
    enable: true, // 启用链接
    text: "关于Alanxxk", // 链接文本
    url: "/about/", // 链接 URL
    external: false, // 内部链接
  },
};
