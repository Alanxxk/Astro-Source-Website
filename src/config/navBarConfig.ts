import {LinkPreset, type NavBarConfig, type NavBarLink, NavBarSearchMethod, type NavBarSearchConfig} from "../types/config";
import {siteConfig} from "./siteConfig";

// 根据页面开关动态生成导航栏配置
const getDynamicNavBarConfig = (): NavBarConfig => {
  const links: (NavBarLink | LinkPreset)[] = [
    LinkPreset.Home,
    LinkPreset.Archive,
    LinkPreset.Bangumi,
  ];

  // 根据配置决定是否添加留言板页面
  if (siteConfig.pages.guestbook) {
    links.push(LinkPreset.Guestbook);
  }

  // 支持自定义导航栏链接,并且支持多级菜单
  links.push({
    name: "链接",
    url: "/links/",
    icon: "material-symbols:link",
    children: [
      //内网
      {
        name: "Bilibili",
        url: "https://space.bilibili.com/629069256?spm_id_from=333.1007.0.0",
        external: true,
        icon: "fa6-brands:bilibili",
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
        icon: "fa6-brands:zhihu",
      },
      //外网—学术
      {
        name: "GitHub",
        url: "https://github.com/Alanxxk",
        external: true,
        icon: "fa6-brands:github",
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
        icon: "fa6-brands:pinterest",
      },
      //外网—媒体
      {
        name: "YouTube",
        url: "https://www.youtube.com/channel/UCSmG58-YIUVchDo9eEgPMwg",
        external: true,
        icon: "fa6-brands:youtube",
      },
      {
        name: "Instagram",
        url: "https://www.instagram.com/xxk7680/",
        external: true,
        icon: "fa6-brands:instagram",
      },
      {
        name: "Snapchat",
        url: "https://www.snapchat.com/@alan_xxk",
        external: true,
        icon: "fa6-brands:snapchat",
      },
      //外网—联系
      {
        name: "Facebook",
        url: "https://www.facebook.com/profile.php?id=61559231013943",
        external: true,
        icon: "fa6-brands:facebook",
      },
      {
        name: "X",
        url: "https://x.com/xxkxxk619587",
        external: true,
        icon: "fa6-brands:x-twitter",
      },
      {
        name: "Reddit",
        url: "https://www.reddit.com/user/Delicious-Guess732/",
        external: true,
        icon: "fa6-brands:reddit",
      },
      {
        name: "WhatsApp-Group",
        url: "https://chat.whatsapp.com/JuTFUqI1y0g8k0U21yOFqU",
        external: true,
        icon: "fa6-brands:whatsapp",
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
        icon: "fa6-brands:twitch",
      },
      // {
      //   name: "LinkedIn",
      //   url: "mailto:377329149@qq.com?subject=网站联系&body=你好，我从网站了解到...",
      //   external: true,
      //   icon: "fa6-brands:linkedin",
      // },
      // {
      //   name: "line",
      //   url: "https://chat.whatsapp.com/JuTFUqI1y0g8k0U21yOFqU",
      //   external: true,
      //   icon: "fa6-brands:line",
      // },
    ],
  });

  // links.push(LinkPreset.Friends);

  links.push({
    name: "关于",
    url: "/content/",
    icon: "material-symbols:info",
    children: [
      ...(siteConfig.pages.sponsor ? [LinkPreset.Sponsor] : []), // 根据配置决定是否添加赞助页面
      ...(siteConfig.pages.bangumi ? [LinkPreset.Friends] : []), // 根据配置决定是否添加番组计划页面
      LinkPreset.About,
      // ...(siteConfig.pages.bangumi ? [LinkPreset.Bangumi] : []), // 根据配置决定是否添加番组计划页面
    ],
  });
  // 仅返回链接，其它导航搜索相关配置在模块顶层常量中独立导出
  return { links } as NavBarConfig;
};

// 导航搜索配置
export const navBarSearchConfig: NavBarSearchConfig = {
  // 可选：PageFind， MeiliSearch
  // 选择PageFind时：NavBarSearchMethod.PageFind,
  // 选择MeiliSearch时：NavBarSearchMethod.MeiliSearch,
  method: NavBarSearchMethod.PageFind,
  // 当选择 MeiliSearch 时的配置
  meiliSearchConfig: {
    INDEX_NAME: 'posts',
    CONTENT_DIR: 'src/content/posts',
    MEILI_HOST: "http://localhost:7700",
    PUBLIC_MEILI_HOST: "http://localhost:7700",
    PUBLIC_MEILI_SEARCH_KEY: "41134b15079da66ca545375edbea848a9b7173dff13be2028318fefa41ae8f2b",
  }
}

export const navBarConfig: NavBarConfig = getDynamicNavBarConfig();
