import type { FriendLink } from "../types/config";

// 可以在src/content/spec/friends.md中编写友链页面下方的自定义内容

// 友链配置
export const friendsConfig: FriendLink[] = [
  {
    title: "夏夜流萤",
    imgurl:
      "https://q1.qlogo.cn/g?b=qq&nk=7618557&s=640",
    desc: "飞萤之火自无梦的长夜亮起，绽放在终竟的明天。",
    siteurl: "https://blog.cuteleaf.cn",
    tags: ["Blog"],
    weight: 10, // 权重，数字越大排序越靠前
    enabled: true, // 是否启用
  },
  {
    title: "Firefly Docs",
    imgurl: "https://docs-firefly.cuteleaf.cn/logo.png",
    desc: "Firefly主题模板文档",
    siteurl: "https://docs-firefly.cuteleaf.cn",
    tags: ["Docs"],
    weight: 9,
    enabled: true,
  },
  {
    title: "Astro",
    imgurl: "https://avatars.githubusercontent.com/u/44914786?v=4&s=640",
    desc: "The web framework for content-driven websites. ⭐️ Star to support our work!",
    siteurl: "https://github.com/withastro/astro",
    tags: ["Framework"],
    weight: 8,
    enabled: true,
  },
  {
    title: "Alanxxk",
    imgurl:
      "https://raw.githubusercontent.com/Alanxxk/Astro-Source-Website_Archive_v1/main/public/assets/images/Alanxxk_material/Alan-xxk.jpg",
    desc: "为迷茫的技术旅人点亮星光。（博主旧站,用作纪念,已停止更新维护）",
    siteurl: "https://alanxxk-blog-archive-v1.netlify.app/",
    tags: ["Blog"],
    weight: 7, // 权重，数字越大排序越靠前
    enabled: true, // 是否启用
  },
];

// 获取启用的友链并按权重排序
export const getEnabledFriends = (): FriendLink[] => {
  return friendsConfig
    .filter((friend) => friend.enabled)
    .sort((a, b) => b.weight - a.weight); // 按权重降序排序
};
