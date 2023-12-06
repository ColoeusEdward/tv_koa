/*
 * @Author: your name
 * @Date: 2023-07-22 01:29:44
 * @LastEditTime: 2023-07-22 06:36:28
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /lexue/script/feedAdd.js
 */
const axios = require('axios');
const { rowHeaderToObj, sleep } = require('../util/util');

let origin = [
  {
    "customizable": true,
    "id": "user/7eb0d116-0cca-4a90-9594-0563a315555e/category/d318e11b-2ddb-433d-8e69-ebc4c72ac6f4",
    "feeds": [
      {
        "language": "zh",
        "id": "feed/https://www.gcores.com/rss",
        "description": "机核从2010年开始一直致力于分享游戏玩家的生活，以及深入探讨游戏相关的文化。我们开发原创的电台以及视频节目，一直在不断寻找民间高质量的内容创作者。 我们坚信游戏不止是游戏，游戏中包含的科学，文化，历史等各个层面的知识和故事，它们同时也会辐射到二次元甚至电影的领域，这些内容非常值得分享给热爱游戏的您。",
        "title": "机核",
        "feedId": "feed/https://www.gcores.com/rss",
        "website": "https://www.gcores.com",
        "subscribers": 667,
        "velocity": 177,
        "updated": 1689958328748,
        "iconUrl": "https://storage.googleapis.com/site-assets/UciqcR8ig6yjxYaWXZ0BED0SThc-AlYu6L4F00kEsqM_sicon-1846996b58a",
        "partial": false,
        "visualUrl": "https://storage.googleapis.com/site-assets/UciqcR8ig6yjxYaWXZ0BED0SThc-AlYu6L4F00kEsqM_svisual-1846996b58a",
        "numReadEntriesPastMonth": 4,
        "numLongReadEntriesPastMonth": 2,
        "totalReadingTimePastMonth": 124558,
        "numTaggedEntriesPastMonth": 0
      },
      {
        "language": "zh",
        "id": "feed/http://feed.iplaysoft.com/",
        "description": "软件改变生活",
        "title": "异次元软件世界",
        "feedId": "feed/http://feed.iplaysoft.com/",
        "website": "https://www.iplaysoft.com",
        "topics": [
          "it",
          "tech"
        ],
        "subscribers": 27403,
        "velocity": 2,
        "updated": 1689819587400,
        "iconUrl": "https://storage.googleapis.com/site-assets/SMjlyCXhSOEGJTTS0WwiJNlz7Fa19U9JqvvU3Lczp80_icon-176777cf993",
        "partial": true,
        "coverUrl": "https://storage.googleapis.com/site-assets/SMjlyCXhSOEGJTTS0WwiJNlz7Fa19U9JqvvU3Lczp80_cover-170166d0126",
        "visualUrl": "https://storage.googleapis.com/site-assets/SMjlyCXhSOEGJTTS0WwiJNlz7Fa19U9JqvvU3Lczp80_visual-176777cf993"
      },
      {
        "language": "multi",
        "id": "feed/https://meamoe.ml/rss/twitter/user/laike9m",
        "description": "Software engineer  \n\n👨‍💻 https://t.co/O7ZlK1Goz2    \n🎙️ @pythonhunter__   \n📝 @logseq  \n🐘 https://t.co/zaEbnkIm2y\n🧵 https://t.co/Oov2wjg6Yk - Made with love by RSSHub(https://github.com/DIYgod/RSSHub)",
        "title": "Twitter @laike9m",
        "feedId": "feed/https://meamoe.ml/rss/twitter/user/laike9m",
        "website": "https://twitter.com/laike9m",
        "subscribers": 1,
        "velocity": 20.5,
        "updated": 1689818279239,
        "numReadEntriesPastMonth": 25,
        "numLongReadEntriesPastMonth": 17,
        "totalReadingTimePastMonth": 4597065,
        "numTaggedEntriesPastMonth": 0
      },
      {
        "language": "multi",
        "id": "feed/https://meamoe.ml/rss/twitter/user/randyloop",
        "description": "Fullstack engineer, Blogger.\nMade https://t.co/61AKA6pGVs\nAlways welcome good opportunity. - Made with love by RSSHub(https://github.com/DIYgod/RSSHub)",
        "title": "Twitter @Randy Lu",
        "feedId": "feed/https://meamoe.ml/rss/twitter/user/randyloop",
        "website": "https://twitter.com/randyloop",
        "subscribers": 1,
        "velocity": 18.3,
        "updated": 1689836249342,
        "numReadEntriesPastMonth": 18,
        "numLongReadEntriesPastMonth": 10,
        "totalReadingTimePastMonth": 1136514,
        "numTaggedEntriesPastMonth": 0
      },
      {
        "language": "en",
        "id": "feed/http://feeds.feedburner.com/ruanyifeng",
        "description": "Stay Focused, Keep Shipping. Build Early, Build Always. Improve yourself, Write solid/simple/stupid code.",
        "title": "阮一峰的网络日志",
        "feedId": "feed/http://feeds.feedburner.com/ruanyifeng",
        "website": "http://www.ruanyifeng.com/blog/",
        "topics": [
          "tech",
          "programming"
        ],
        "subscribers": 39835,
        "velocity": 0.9,
        "updated": 1689902288484,
        "iconUrl": "https://storage.googleapis.com/site-assets/1gOA8sgsyIN6Fa4oaXZX0qh2K2SOUMLVRi6qwkvVFZQ_icon-186503f5427",
        "partial": false,
        "coverUrl": "https://storage.googleapis.com/site-assets/1gOA8sgsyIN6Fa4oaXZX0qh2K2SOUMLVRi6qwkvVFZQ_cover-186503f5427",
        "visualUrl": "https://storage.googleapis.com/site-assets/1gOA8sgsyIN6Fa4oaXZX0qh2K2SOUMLVRi6qwkvVFZQ_visual-186503f5427"
      },
      {
        "language": "en",
        "id": "feed/https://www.trickster.dev/post/index.xml",
        "description": "Recent content in Posts on Trickster Dev",
        "title": "Posts on Trickster Dev",
        "feedId": "feed/https://www.trickster.dev/post/index.xml",
        "website": "https://www.trickster.dev/post/",
        "subscribers": 31,
        "velocity": 0.7,
        "updated": 1688312504713
      },
      {
        "language": "multi",
        "id": "feed/https://champhoon.xyz/rss2.xml",
        "description": "Stay hungry, Stay foolish.",
        "title": "澄沨的漫游茶记",
        "feedId": "feed/https://champhoon.xyz/rss2.xml",
        "website": "https://champhoon.xyz/",
        "subscribers": 2,
        "velocity": 0.9,
        "updated": 1689234819187,
        "numReadEntriesPastMonth": 1,
        "numLongReadEntriesPastMonth": 1,
        "totalReadingTimePastMonth": 157831,
        "numTaggedEntriesPastMonth": 0
      },
      {
        "language": "en",
        "id": "feed/https://noisypixel.net/feed/",
        "description": "Noisy Pixel is a collective of dedicated gamers and writers from across the gaming industry. We are here to provide readers with opinions from actual players and fans of the industry.",
        "title": "Noisy Pixel",
        "feedId": "feed/https://noisypixel.net/feed/",
        "website": "https://noisypixel.net",
        "topics": [
          "gaming"
        ],
        "subscribers": 201,
        "velocity": 137.7,
        "updated": 1689984472789,
        "iconUrl": "https://storage.googleapis.com/site-assets/q_qHxqW4_kKR46CgHi-1R_r-924Mzb50JljtehNQXYo_icon-18563689f76",
        "partial": true,
        "coverUrl": "https://storage.googleapis.com/site-assets/q_qHxqW4_kKR46CgHi-1R_r-924Mzb50JljtehNQXYo_cover-16b40f948bf",
        "visualUrl": "https://storage.googleapis.com/site-assets/q_qHxqW4_kKR46CgHi-1R_r-924Mzb50JljtehNQXYo_visual-18563689f76",
        "estimatedEngagement": 0,
        "numReadEntriesPastMonth": 5,
        "numLongReadEntriesPastMonth": 0,
        "totalReadingTimePastMonth": 12258,
        "numTaggedEntriesPastMonth": 0
      },
      {
        "language": "multi",
        "id": "feed/https://meamoe.ml/rss/twitter/user/aliez_bot",
        "description": "Punk 1084, Web3 (good part) developer https://t.co/GpGz9nwNQJ - Made with love by RSSHub(https://github.com/DIYgod/RSSHub)",
        "title": "Twitter @Aliez Ren",
        "feedId": "feed/https://meamoe.ml/rss/twitter/user/aliez_bot",
        "website": "https://twitter.com/aliez_bot",
        "subscribers": 1,
        "velocity": 25.5,
        "updated": 1689793617073,
        "numReadEntriesPastMonth": 25,
        "numLongReadEntriesPastMonth": 16,
        "totalReadingTimePastMonth": 680809,
        "numTaggedEntriesPastMonth": 0
      },
      {
        "language": "multi",
        "id": "feed/https://meamoe.ml/rss/twitter/user/myfreax",
        "description": "Fullstack Developer And #Linux lover - Made with love by RSSHub(https://github.com/DIYgod/RSSHub)",
        "title": "Twitter @myfreax",
        "feedId": "feed/https://meamoe.ml/rss/twitter/user/myfreax",
        "website": "https://twitter.com/myfreax",
        "subscribers": 1,
        "velocity": 1.6,
        "updated": 1689777136818,
        "estimatedEngagement": 0,
        "numReadEntriesPastMonth": 2,
        "numLongReadEntriesPastMonth": 1,
        "totalReadingTimePastMonth": 235580,
        "numTaggedEntriesPastMonth": 0
      },
      {
        "language": "zh",
        "id": "feed/https://anyway.fm/news/rss.xml",
        "description": "由 Anyway.FM 发行，为你提供与设计行业相关的新闻资讯、网摘推荐以及专栏文章等内容。",
        "title": "安妮薇看看 Anyway.News",
        "feedId": "feed/https://anyway.fm/news/rss.xml",
        "website": "https://anyway.news",
        "topics": [
          "design",
          "tech"
        ],
        "subscribers": 604,
        "velocity": 0.5,
        "updated": 1689964876761,
        "iconUrl": "https://storage.googleapis.com/site-assets/bs9839XacqyD58iNWntTN6aW0ooAZS1iYVxGRPElsM8_sicon-17062eb5b2d",
        "partial": false,
        "visualUrl": "https://storage.googleapis.com/site-assets/bs9839XacqyD58iNWntTN6aW0ooAZS1iYVxGRPElsM8_svisual-17062eb5b2d"
      },
      {
        "language": "multi",
        "id": "feed/https://anubis.cafe/atom.xml",
        "description": "「教」是最好的「学」。",
        "title": "Anubis的小窝",
        "feedId": "feed/https://anubis.cafe/atom.xml",
        "website": "https://anubis.cafe",
        "subscribers": 1,
        "velocity": 0.7,
        "updated": 1689973933377
      },
      {
        "language": "multi",
        "id": "feed/https://meamoe.ml/rss/twitter/user/DIYgod",
        "description": "写代码是热爱，写到世界充满爱！\n发小 @justjustjustcc.\nCofounder @_Crossbell @RSS3_.\nDev @_xLog , RSSHub, DPlayer.\ndiygod@crossbell - Made with love by RSSHub(https://github.com/DIYgod/RSSHub)",
        "title": "Twitter @DIŸgöd ☀️",
        "feedId": "feed/https://meamoe.ml/rss/twitter/user/DIYgod",
        "website": "https://twitter.com/DIYgod",
        "subscribers": 1,
        "velocity": 8.6,
        "updated": 1689818872618,
        "numReadEntriesPastMonth": 5,
        "numLongReadEntriesPastMonth": 2,
        "totalReadingTimePastMonth": 36845,
        "numTaggedEntriesPastMonth": 0
      }
    ],
    "label": "intrest",
    "enterprise": false,
    "created": 1641296557329,
    "numFeeds": 16
  },
  {
    "customizable": true,
    "id": "user/7eb0d116-0cca-4a90-9594-0563a315555e/category/23f28605-4e7a-4d3a-af34-20372df42689",
    "feeds": [
      {
        "language": "multi",
        "id": "feed/https://meamoe.ml/rss/twitter/user/Siino_13",
        "description": "イラストレーターやってます。\n■https://t.co/giaAXZ2ejP\n■https://t.co/MKVJudZAym - Made with love by RSSHub(https://github.com/DIYgod/RSSHub)",
        "title": "Twitter @Siino特訓中",
        "feedId": "feed/https://meamoe.ml/rss/twitter/user/Siino_13",
        "website": "https://twitter.com/Siino_13",
        "subscribers": 1,
        "velocity": 25.3,
        "updated": 1689755329786,
        "numReadEntriesPastMonth": 10,
        "numLongReadEntriesPastMonth": 1,
        "totalReadingTimePastMonth": 178329,
        "numTaggedEntriesPastMonth": 0
      },
      {
        "language": "multi",
        "id": "feed/https://meamoe.ml/rss/twitter/user/yuebaihezi",
        "description": "https://t.co/h86WWxz2w0 - Made with love by RSSHub(https://github.com/DIYgod/RSSHub)",
        "title": "Twitter @月川",
        "feedId": "feed/https://meamoe.ml/rss/twitter/user/yuebaihezi",
        "website": "https://twitter.com/yuebaihezi",
        "subscribers": 1,
        "velocity": 7.9,
        "updated": 1689252998830,
        "numReadEntriesPastMonth": 6,
        "numLongReadEntriesPastMonth": 2,
        "totalReadingTimePastMonth": 20988,
        "numTaggedEntriesPastMonth": 0
      },
      {
        "language": "multi",
        "id": "feed/https://meamoe.ml/rss/twitter/user/UesugiHarukaWD",
        "description": "Coser 简体/繁體中文/English\n微博难民:上杉遥_武装凛Rusted - Made with love by RSSHub(https://github.com/DIYgod/RSSHub)",
        "title": "Twitter @上杉遥_武裝凜預備役",
        "feedId": "feed/https://meamoe.ml/rss/twitter/user/UesugiHarukaWD",
        "website": "https://twitter.com/UesugiHarukaWD",
        "subscribers": 1,
        "velocity": 0.9,
        "updated": 1688827782538,
        "numReadEntriesPastMonth": 3,
        "numLongReadEntriesPastMonth": 1,
        "totalReadingTimePastMonth": 21227,
        "numTaggedEntriesPastMonth": 0
      },
      {
        "language": "zh",
        "id": "feed/https://meamoe.ml/rss/bilibili/user/dynamic/423895",
        "description": "怕上火暴王老菊 的 bilibili 动态 - Made with love by RSSHub(https://github.com/DIYgod/RSSHub)",
        "title": "怕上火暴王老菊 的 bilibili 动态",
        "feedId": "feed/https://meamoe.ml/rss/bilibili/user/dynamic/423895",
        "website": "https://space.bilibili.com/423895/dynamic",
        "subscribers": 1,
        "velocity": 1.6,
        "updated": 1689683482000
      },
      {
        "language": "multi",
        "id": "feed/https://meamoe.ml/rss/twitter/user/Cheon1986",
        "description": "WAGADORA\nYOUTUBE_ https://t.co/r8IDP6nWNG\n#ダイヤログ\n\nFANBOX_ https://t.co/SFoh9klK6l\nPATREON_ https://t.co/54Ok50pPaL - Made with love by RSSHub(https://github.com/DIYgod/RSSHub)",
        "title": "Twitter @HxxG / ホン🍡土曜東A18ab",
        "feedId": "feed/https://meamoe.ml/rss/twitter/user/Cheon1986",
        "website": "https://twitter.com/Cheon1986",
        "subscribers": 1,
        "velocity": 16,
        "updated": 1689780652113,
        "numReadEntriesPastMonth": 22,
        "numLongReadEntriesPastMonth": 3,
        "totalReadingTimePastMonth": 156108,
        "numTaggedEntriesPastMonth": 0
      },
      {
        "language": "multi",
        "id": "feed/https://meamoe.ml/rss/twitter/user/gks569",
        "description": "그림 그립니다. \npixiv:https://t.co/PvsoWFBz83\ninstagram:https://t.co/ElKWkdXV7u\nHoYoLAB:https://t.co/yDZ8DHpZ85 - Made with love by RSSHub(https://github.com/DIYgod/RSSHub)",
        "title": "Twitter @pul",
        "feedId": "feed/https://meamoe.ml/rss/twitter/user/gks569",
        "website": "https://twitter.com/gks569",
        "subscribers": 1,
        "velocity": 0.9,
        "updated": 1689227145750,
        "estimatedEngagement": 0,
        "numReadEntriesPastMonth": 1,
        "numLongReadEntriesPastMonth": 0,
        "totalReadingTimePastMonth": 2034,
        "numTaggedEntriesPastMonth": 0
      },
      {
        "language": "multi",
        "id": "feed/https://meamoe.ml/rss/twitter/user/wabot4",
        "description": "たまに絵をかいてます。 - Made with love by RSSHub(https://github.com/DIYgod/RSSHub)",
        "title": "Twitter @wabot",
        "feedId": "feed/https://meamoe.ml/rss/twitter/user/wabot4",
        "website": "https://twitter.com/wabot4",
        "subscribers": 1,
        "velocity": 0.2,
        "updated": 1688522019236
      },
      {
        "language": "multi",
        "id": "feed/https://meamoe.ml/rss/twitter/user/yun_216",
        "description": "お仕事のご相談は下記アドレスへお願いします。 ◆Mail→【amagasa.yun@gmail.com】 ◆FANBOX→【https://t.co/9zeoxKStTl】 制作物の無断転載や使用、加工等はご遠慮ください。 - Made with love by RSSHub(https://github.com/DIYgod/RSSHub)",
        "title": "Twitter @雨傘ゆん",
        "feedId": "feed/https://meamoe.ml/rss/twitter/user/yun_216",
        "website": "https://twitter.com/yun_216",
        "subscribers": 1,
        "velocity": 4.5,
        "updated": 1689098255000,
        "numReadEntriesPastMonth": 2,
        "numLongReadEntriesPastMonth": 1,
        "totalReadingTimePastMonth": 11694,
        "numTaggedEntriesPastMonth": 0
      },
      {
        "language": "multi",
        "id": "feed/https://meamoe.ml/rss/twitter/user/nosongang",
        "description": "nosongang@gmail.com\nhttps://t.co/hm3lVQXu5J - Made with love by RSSHub(https://github.com/DIYgod/RSSHub)",
        "title": "Twitter @Mx2J",
        "feedId": "feed/https://meamoe.ml/rss/twitter/user/nosongang",
        "website": "https://twitter.com/nosongang",
        "subscribers": 1,
        "velocity": 0.2,
        "updated": 1688183345000,
        "numReadEntriesPastMonth": 2,
        "numLongReadEntriesPastMonth": 0,
        "totalReadingTimePastMonth": 3909,
        "numTaggedEntriesPastMonth": 0
      },
      {
        "language": "multi",
        "id": "feed/https://meamoe.ml/rss/twitter/user/fkey123",
        "description": "- - Made with love by RSSHub(https://github.com/DIYgod/RSSHub)",
        "title": "Twitter @FKEY",
        "feedId": "feed/https://meamoe.ml/rss/twitter/user/fkey123",
        "website": "https://twitter.com/fkey123",
        "subscribers": 1,
        "velocity": 0.5,
        "updated": 1688077803157,
        "numReadEntriesPastMonth": 3,
        "numLongReadEntriesPastMonth": 1,
        "totalReadingTimePastMonth": 12558,
        "numTaggedEntriesPastMonth": 0
      },
      {
        "language": "multi",
        "id": "feed/https://meamoe.ml/rss/twitter/user/bisonham",
        "description": "ハムスターです(●´ω`●)少し絵を描きます。/ お仕事は bisonbison@foxmail.com にお願いします。  / フォローありがとうございます！/イラストの保存・壁紙やプロフ画像の使用はご自由に(●´ω`●) NO AI USE PLEASE - Made with love by RSSHub(https://github.com/DIYgod/RSSHub)",
        "title": "Twitter @Bison倉鼠",
        "feedId": "feed/https://meamoe.ml/rss/twitter/user/bisonham",
        "website": "https://twitter.com/bisonham",
        "subscribers": 1,
        "velocity": 1.6,
        "updated": 1689776341761
      },
      {
        "language": "multi",
        "id": "feed/https://meamoe.ml/rss/twitter/user/B_huni_",
        "description": "ゲーム会社所属・趣味絵描き - Made with love by RSSHub(https://github.com/DIYgod/RSSHub)",
        "title": "Twitter @Huni",
        "feedId": "feed/https://meamoe.ml/rss/twitter/user/B_huni_",
        "website": "https://twitter.com/B_huni_",
        "subscribers": 1,
        "velocity": 5,
        "updated": 1689763390453,
        "numReadEntriesPastMonth": 3,
        "numLongReadEntriesPastMonth": 2,
        "totalReadingTimePastMonth": 25911,
        "numTaggedEntriesPastMonth": 0
      },
      {
        "language": "multi",
        "id": "feed/https://meamoe.ml/rss/bilibili/user/dynamic/433351",
        "description": "EdmundDZhang 的 bilibili 动态 - Made with love by RSSHub(https://github.com/DIYgod/RSSHub)",
        "title": "EdmundDZhang 的 bilibili 动态",
        "feedId": "feed/https://meamoe.ml/rss/bilibili/user/dynamic/433351",
        "website": "https://space.bilibili.com/433351/dynamic",
        "subscribers": 1,
        "velocity": 0.9,
        "updated": 1689568254460,
        "numReadEntriesPastMonth": 2,
        "numLongReadEntriesPastMonth": 0,
        "totalReadingTimePastMonth": 4071,
        "numTaggedEntriesPastMonth": 0
      },
      {
        "language": "multi",
        "id": "feed/https://meamoe.ml/rss/twitter/user/matchach",
        "description": "🎀Illustrator🎀 中文/EN/日本語. Arts other than commissions can be used for non-commercial purposes. |AI学習禁止|Contact: matchachmat@gmail.com. Best match @CiloRanko - Made with love by RSSHub(https://github.com/DIYgod/RSSHub)",
        "title": "Twitter @Matcha🍵@C102(日)西め07a",
        "feedId": "feed/https://meamoe.ml/rss/twitter/user/matchach",
        "website": "https://twitter.com/matchach",
        "subscribers": 1,
        "velocity": 2.5,
        "updated": 1689763996727,
        "numReadEntriesPastMonth": 2,
        "numLongReadEntriesPastMonth": 1,
        "totalReadingTimePastMonth": 11993,
        "numTaggedEntriesPastMonth": 0
      },
      {
        "language": "zh",
        "id": "feed/https://meamoe.ml/weiborss/rss/1366356590",
        "description": "淘宝官方周边店铺【摸鱼禁止】",
        "title": "Mr_Quin的微博",
        "feedId": "feed/https://meamoe.ml/weiborss/rss/1366356590",
        "website": "https://weibo.com/1366356590",
        "subscribers": 1,
        "velocity": 11.1,
        "updated": 1689775610980,
        "numReadEntriesPastMonth": 1,
        "numLongReadEntriesPastMonth": 0,
        "totalReadingTimePastMonth": 2513,
        "numTaggedEntriesPastMonth": 0
      },
      {
        "language": "multi",
        "id": "feed/https://meamoe.ml/rss/twitter/user/Atdan86",
        "description": "ATDAN 本人です,AI学習禁止 - Made with love by RSSHub(https://github.com/DIYgod/RSSHub)",
        "title": "Twitter @ATDAN",
        "feedId": "feed/https://meamoe.ml/rss/twitter/user/Atdan86",
        "website": "https://twitter.com/Atdan86",
        "subscribers": 1,
        "velocity": 2.5,
        "updated": 1689497291091
      },
      {
        "language": "multi",
        "id": "feed/https://meamoe.ml/rss/twitter/user/hikinito0902",
        "description": "Freelance illustrator  |\nemail : hikinito0902@gmail.com  |\n\n 수강생 모집중\nClass info.\nhttps://t.co/2zbnevcnWs - Made with love by RSSHub(https://github.com/DIYgod/RSSHub)",
        "title": "Twitter @Leviathan /수강생 모집중",
        "feedId": "feed/https://meamoe.ml/rss/twitter/user/hikinito0902",
        "website": "https://twitter.com/hikinito0902",
        "subscribers": 1,
        "velocity": 0.2,
        "updated": 1689736737031
      },
      {
        "language": "multi",
        "id": "feed/https://meamoe.ml/rss/twitter/user/RSTRST7755",
        "description": "興味で絵を描く人 - Made with love by RSSHub(https://github.com/DIYgod/RSSHub)",
        "title": "Twitter @RST",
        "feedId": "feed/https://meamoe.ml/rss/twitter/user/RSTRST7755",
        "website": "https://twitter.com/RSTRST7755",
        "subscribers": 1,
        "velocity": 6.3,
        "updated": 1689427195068,
        "numReadEntriesPastMonth": 12,
        "numLongReadEntriesPastMonth": 5,
        "totalReadingTimePastMonth": 102431,
        "numTaggedEntriesPastMonth": 0
      },
      {
        "language": "multi",
        "id": "feed/https://meamoe.ml/rss/twitter/user/iktd13_",
        "description": "PCゲーム作ったりしてます。 - Made with love by RSSHub(https://github.com/DIYgod/RSSHub)",
        "title": "Twitter @Na-Ga🎳",
        "feedId": "feed/https://meamoe.ml/rss/twitter/user/iktd13_",
        "website": "https://twitter.com/iktd13_",
        "subscribers": 1,
        "velocity": 27.8,
        "updated": 1689434257022,
        "numReadEntriesPastMonth": 15,
        "numLongReadEntriesPastMonth": 5,
        "totalReadingTimePastMonth": 869300,
        "numTaggedEntriesPastMonth": 0
      },
      {
        "language": "multi",
        "id": "feed/https://meamoe.ml/rss/twitter/user/homutan1",
        "description": "絵を描く - Made with love by RSSHub(https://github.com/DIYgod/RSSHub)",
        "title": "Twitter @Homutan",
        "feedId": "feed/https://meamoe.ml/rss/twitter/user/homutan1",
        "website": "https://twitter.com/homutan1",
        "subscribers": 1,
        "velocity": 7,
        "updated": 1689064632826,
        "numReadEntriesPastMonth": 10,
        "numLongReadEntriesPastMonth": 6,
        "totalReadingTimePastMonth": 199171,
        "numTaggedEntriesPastMonth": 0
      },
      {
        "language": "ja",
        "id": "feed/https://meamoe.ml/rss/twitter/user/ezoshika_gg",
        "description": "絵を描いてます。マイペース更新なのはご容赦を。見てくださる皆様に感謝。 ご依頼等のご相談はこちら【ezoshika_gg@yahoo.co.jp】 - Made with love by RSSHub(https://github.com/DIYgod/RSSHub)",
        "title": "Twitter @エゾシカ",
        "feedId": "feed/https://meamoe.ml/rss/twitter/user/ezoshika_gg",
        "website": "https://twitter.com/ezoshika_gg",
        "subscribers": 1,
        "velocity": 7.9,
        "updated": 1689610165504,
        "numReadEntriesPastMonth": 4,
        "numLongReadEntriesPastMonth": 0,
        "totalReadingTimePastMonth": 9301,
        "numTaggedEntriesPastMonth": 0
      },
      {
        "language": "multi",
        "id": "feed/https://meamoe.ml/rss/twitter/user/REDUM4",
        "description": "見つけてくれてありがとう！私はredum /三土です\n転載禁止\nThanks for your attention. I am REDUM. \n/未经允许禁止搬运/ - Made with love by RSSHub(https://github.com/DIYgod/RSSHub)",
        "title": "Twitter @REDUM",
        "feedId": "feed/https://meamoe.ml/rss/twitter/user/REDUM4",
        "website": "https://twitter.com/REDUM4",
        "subscribers": 1,
        "velocity": 0.7,
        "updated": 1688885050745,
        "numReadEntriesPastMonth": 1,
        "numLongReadEntriesPastMonth": 0,
        "totalReadingTimePastMonth": 2715,
        "numTaggedEntriesPastMonth": 0
      },
      {
        "language": "multi",
        "id": "feed/https://meamoe.ml/rss/twitter/user/Dino_illus",
        "description": "drawing🎨  |working email: dinohu0019@gmail.com | Personal commission request currently closed 🌙 - Made with love by RSSHub(https://github.com/DIYgod/RSSHub)",
        "title": "Twitter @Dino",
        "feedId": "feed/https://meamoe.ml/rss/twitter/user/Dino_illus",
        "website": "https://twitter.com/Dino_illus",
        "subscribers": 1,
        "velocity": 10.2,
        "updated": 1689729040068,
        "numReadEntriesPastMonth": 3,
        "numLongReadEntriesPastMonth": 1,
        "totalReadingTimePastMonth": 13654,
        "numTaggedEntriesPastMonth": 0
      },
      {
        "language": "ja",
        "id": "feed/https://meamoe.ml/rss/twitter/user/Futidori_came",
        "description": "【サークル ふちどり庵🐯🍈委託中】同じ趣味趣向のフェチを持つ同志に向けて作品が届くよう活動中です！過去作品のタグ #ふち撮 無断転載 無断利用禁止/Please do not reprint without./Please stop secondary creation using AI with my work！ - Made with love by RSSHub(https://github.com/DIYgod/RSSHub)",
        "title": "Twitter @ふちどり@夏コミ2日目(日)西け26b",
        "feedId": "feed/https://meamoe.ml/rss/twitter/user/Futidori_came",
        "website": "https://twitter.com/Futidori_came",
        "subscribers": 1,
        "velocity": 67.5,
        "updated": 1689829118978,
        "numReadEntriesPastMonth": 38,
        "numLongReadEntriesPastMonth": 5,
        "totalReadingTimePastMonth": 184470,
        "numTaggedEntriesPastMonth": 0
      },
      {
        "language": "multi",
        "id": "feed/https://meamoe.ml/rss/twitter/user/mimmi_sak",
        "description": "〔Pixiv FANBOX〕https://t.co/elXg6ff9l0\n / misskey https://t.co/m15YWnBKRa - Made with love by RSSHub(https://github.com/DIYgod/RSSHub)",
        "title": "Twitter @Sak",
        "feedId": "feed/https://meamoe.ml/rss/twitter/user/mimmi_sak",
        "website": "https://twitter.com/mimmi_sak",
        "subscribers": 1,
        "velocity": 4.3,
        "updated": 1688550807111,
        "numReadEntriesPastMonth": 3,
        "numLongReadEntriesPastMonth": 0,
        "totalReadingTimePastMonth": 8552,
        "numTaggedEntriesPastMonth": 0
      },
      {
        "language": "ja",
        "id": "feed/https://meamoe.ml/rss/twitter/user/ppp_usagi_",
        "description": "お仕事依頼→shiratama.mochiii@gmail.com 【pixiv】https://t.co/d8C5JsvDry 【FANBOX】https://t.co/QsDX4TkOvd【booth】https://t.co/BbGoTu7oRV　　イラストの無断使用、AI学習、転載禁止です。Unauthorized copying prohibited. - Made with love by RSSHub(https://github.com/DIYgod/RSSHub)",
        "title": "Twitter @木なこ@日曜 東Q-29b",
        "feedId": "feed/https://meamoe.ml/rss/twitter/user/ppp_usagi_",
        "website": "https://twitter.com/ppp_usagi_",
        "subscribers": 1,
        "velocity": 10.2,
        "updated": 1689788655529,
        "numReadEntriesPastMonth": 1,
        "numLongReadEntriesPastMonth": 1,
        "totalReadingTimePastMonth": 27826,
        "numTaggedEntriesPastMonth": 0
      },
      {
        "language": "multi",
        "id": "feed/https://meamoe.ml/rss/twitter/user/yeejchan",
        "description": "YeeJ | 于于子酱 | EN/中文 | Contact✉️ junnechan00@gmail.com I https://t.co/YUPiXkt1ll - Made with love by RSSHub(https://github.com/DIYgod/RSSHub)",
        "title": "Twitter @Yeej",
        "feedId": "feed/https://meamoe.ml/rss/twitter/user/yeejchan",
        "website": "https://twitter.com/yeejchan",
        "subscribers": 1,
        "velocity": 2.9,
        "updated": 1688809467563,
        "numReadEntriesPastMonth": 1,
        "numLongReadEntriesPastMonth": 0,
        "totalReadingTimePastMonth": 4483,
        "numTaggedEntriesPastMonth": 0
      },
      {
        "language": "multi",
        "id": "feed/https://meamoe.ml/rss/twitter/user/imigimuru",
        "description": "漫画家。『この美術部には問題がある！』連載中。【FGO/概念礼装】【負けヒロインが多すぎる！/イラスト】【リコリス・リコイル/キャラクターデザイン】初画集『fruits』発売中。お仕事はこちら→ayac2006☆https://t.co/dZYWX96uXD (☆→@) アーセナルが好き⚽️ - Made with love by RSSHub(https://github.com/DIYgod/RSSHub)",
        "title": "Twitter @いみぎむる",
        "feedId": "feed/https://meamoe.ml/rss/twitter/user/imigimuru",
        "website": "https://twitter.com/imigimuru",
        "subscribers": 1,
        "velocity": 90.3,
        "updated": 1689835739575,
        "numReadEntriesPastMonth": 38,
        "numLongReadEntriesPastMonth": 13,
        "totalReadingTimePastMonth": 740750,
        "numTaggedEntriesPastMonth": 0
      },
      {
        "language": "multi",
        "id": "feed/https://meamoe.ml/rss/twitter/user/Hitoimim",
        "description": "絵描きます。 FANBOX: https://t.co/dTV4yt068y 連絡先. hitoroa415@gmail.com BOOTH https://t.co/gmvz3bAboe - Made with love by RSSHub(https://github.com/DIYgod/RSSHub)",
        "title": "Twitter @ヒトこもる",
        "feedId": "feed/https://meamoe.ml/rss/twitter/user/Hitoimim",
        "website": "https://twitter.com/Hitoimim",
        "subscribers": 1,
        "velocity": 3.2,
        "updated": 1689330508407,
        "numReadEntriesPastMonth": 1,
        "numLongReadEntriesPastMonth": 0,
        "totalReadingTimePastMonth": 1953,
        "numTaggedEntriesPastMonth": 0
      },
      {
        "language": "multi",
        "id": "feed/https://meamoe.ml/rss/twitter/user/min5526",
        "description": "https://t.co/XpBKirqAc1\nhttps://t.co/KXX36xbQzE\n\nContact🔔/DM\n\n📧: jym052626@gmail.com - Made with love by RSSHub(https://github.com/DIYgod/RSSHub)",
        "title": "Twitter @KONGSI",
        "feedId": "feed/https://meamoe.ml/rss/twitter/user/min5526",
        "website": "https://twitter.com/min5526",
        "subscribers": 1,
        "velocity": 3.4,
        "updated": 1689460656905,
        "numReadEntriesPastMonth": 11,
        "numLongReadEntriesPastMonth": 1,
        "totalReadingTimePastMonth": 40826,
        "numTaggedEntriesPastMonth": 0
      },
      {
        "language": "multi",
        "id": "feed/https://meamoe.ml/rss/twitter/user/opopowa1",
        "description": "moreillust(r18):https://t.co/vV5u5XlDLU - Made with love by RSSHub(https://github.com/DIYgod/RSSHub)",
        "title": "Twitter @ｼﾞﾏ",
        "feedId": "feed/https://meamoe.ml/rss/twitter/user/opopowa1",
        "website": "https://twitter.com/opopowa1",
        "subscribers": 1,
        "velocity": 4.1,
        "updated": 1689370973694
      },
      {
        "state": "dormant",
        "language": "multi",
        "id": "feed/https://meamoe.ml/rss/twitter/user/yua_n0",
        "description": "好きな人を可愛く描けるようになりたいな - Made with love by RSSHub(https://github.com/DIYgod/RSSHub)",
        "title": "Twitter @ゆあの",
        "feedId": "feed/https://meamoe.ml/rss/twitter/user/yua_n0",
        "website": "https://twitter.com/yua_n0",
        "subscribers": 1,
        "velocity": 0,
        "updated": 1668616285291
      },
      {
        "language": "ja",
        "id": "feed/https://meamoe.ml/rss/twitter/user/yukkieeeeeen",
        "description": "くさかしと読みます。 絵まとめ (pixiv : https://t.co/Yf62WXQ3Em) - Made with love by RSSHub(https://github.com/DIYgod/RSSHub)",
        "title": "Twitter @日下氏(ゆっきー)",
        "feedId": "feed/https://meamoe.ml/rss/twitter/user/yukkieeeeeen",
        "website": "https://twitter.com/yukkieeeeeen",
        "subscribers": 1,
        "velocity": 7.7,
        "updated": 1689762482977,
        "numReadEntriesPastMonth": 35,
        "numLongReadEntriesPastMonth": 8,
        "totalReadingTimePastMonth": 967778,
        "numTaggedEntriesPastMonth": 0
      },
      {
        "language": "multi",
        "id": "feed/https://meamoe.ml/rss/twitter/user/giki3748",
        "description": "CONTACT ✉ gjdkfma279@gmail.com\n\n- pixiv Request\nhttps://t.co/eo8VY0wD5L\n- ARTMUG\nhttps://t.co/wtw9V9deOS - Made with love by RSSHub(https://github.com/DIYgod/RSSHub)",
        "title": "Twitter @GIKI",
        "feedId": "feed/https://meamoe.ml/rss/twitter/user/giki3748",
        "website": "https://twitter.com/giki3748",
        "subscribers": 1,
        "velocity": 4.1,
        "updated": 1689274761385
      },
      {
        "language": "ja",
        "id": "feed/https://meamoe.ml/rss/twitter/user/NamikiShiho",
        "description": "絵を描きます。\nご連絡は【namikishiho0321★https://t.co/NT37S6eBuj】(★→@)まで。 \nFANBOX【https://t.co/yyG5JEJHhG】\nFantia【https://t.co/5Teu9hM3Nz】\n Skeb【https://t.co/Zl6hbCcNpG】 - Made with love by RSSHub(https://github.com/DIYgod/RSSHub)",
        "title": "Twitter @波器しほ",
        "feedId": "feed/https://meamoe.ml/rss/twitter/user/NamikiShiho",
        "website": "https://twitter.com/NamikiShiho",
        "subscribers": 1,
        "velocity": 13.8,
        "updated": 1689777379366,
        "numReadEntriesPastMonth": 5,
        "numLongReadEntriesPastMonth": 5,
        "totalReadingTimePastMonth": 51048,
        "numTaggedEntriesPastMonth": 0
      },
      {
        "language": "multi",
        "id": "feed/https://meamoe.ml/rss/twitter/user/kengo1212",
        "description": "アニメーターやってます。 空色ユーティリティ監督？ yostar pictures所属 趣味、ゴルフ、ロードバイク、サバゲー、キャンプ。お仕事のご依頼はこちら↓ - Made with love by RSSHub(https://github.com/DIYgod/RSSHub)",
        "title": "Twitter @斉藤健吾",
        "feedId": "feed/https://meamoe.ml/rss/twitter/user/kengo1212",
        "website": "https://twitter.com/kengo1212",
        "subscribers": 1,
        "velocity": 5,
        "updated": 1689783288405,
        "numReadEntriesPastMonth": 1,
        "numLongReadEntriesPastMonth": 0,
        "totalReadingTimePastMonth": 3699,
        "numTaggedEntriesPastMonth": 0
      },
      {
        "language": "multi",
        "id": "feed/https://meamoe.ml/rss/twitter/user/Matsogm_",
        "description": "Matsogum \nmail : minsg0606@gmail.com \n2021.07.03~ / - Made with love by RSSHub(https://github.com/DIYgod/RSSHub)",
        "title": "Twitter @MSG",
        "feedId": "feed/https://meamoe.ml/rss/twitter/user/Matsogm_",
        "website": "https://twitter.com/Matsogm_",
        "subscribers": 1,
        "velocity": 33,
        "updated": 1689794038632,
        "numReadEntriesPastMonth": 81,
        "numLongReadEntriesPastMonth": 15,
        "totalReadingTimePastMonth": 291624,
        "numTaggedEntriesPastMonth": 1
      },
      {
        "language": "multi",
        "id": "feed/https://meamoe.ml/rss/twitter/user/Gotie23",
        "description": "月の狩人 - Made with love by RSSHub(https://github.com/DIYgod/RSSHub)",
        "title": "Twitter @Goti",
        "feedId": "feed/https://meamoe.ml/rss/twitter/user/Gotie23",
        "website": "https://twitter.com/Gotie23",
        "subscribers": 1,
        "velocity": 0.1,
        "updated": 1685700080913
      },
      {
        "language": "multi",
        "id": "feed/https://meamoe.ml/rss/twitter/user/ry_o_ta_",
        "description": "Illustrator - Made with love by RSSHub(https://github.com/DIYgod/RSSHub)",
        "title": "Twitter @ryota",
        "feedId": "feed/https://meamoe.ml/rss/twitter/user/ry_o_ta_",
        "website": "https://twitter.com/ry_o_ta_",
        "subscribers": 1,
        "velocity": 0.9,
        "updated": 1689513385919
      },
      {
        "language": "multi",
        "id": "feed/https://meamoe.ml/rss/twitter/user/imlllsn",
        "description": "エッチな絵（成人向けをふくむ）を描きます - Made with love by RSSHub(https://github.com/DIYgod/RSSHub)",
        "title": "Twitter @お久しぶり■一日目め59b",
        "feedId": "feed/https://meamoe.ml/rss/twitter/user/imlllsn",
        "website": "https://twitter.com/imlllsn",
        "subscribers": 1,
        "velocity": 9.5,
        "updated": 1689682291963
      },
      {
        "language": "multi",
        "id": "feed/https://meamoe.ml/rss/twitter/user/oaoer0403",
        "description": "yjs0803123 - Made with love by RSSHub(https://github.com/DIYgod/RSSHub)",
        "title": "Twitter @Saro",
        "feedId": "feed/https://meamoe.ml/rss/twitter/user/oaoer0403",
        "website": "https://twitter.com/oaoer0403",
        "subscribers": 1,
        "velocity": 1.6,
        "updated": 1689764170057,
        "numReadEntriesPastMonth": 1,
        "numLongReadEntriesPastMonth": 1,
        "totalReadingTimePastMonth": 5632,
        "numTaggedEntriesPastMonth": 0
      },
      {
        "language": "multi",
        "id": "feed/https://meamoe.ml/rss/twitter/user/ling_desu",
        "description": "一般路过社畜 - Made with love by RSSHub(https://github.com/DIYgod/RSSHub)",
        "title": "Twitter @__彩铃哒哟",
        "feedId": "feed/https://meamoe.ml/rss/twitter/user/ling_desu",
        "website": "https://twitter.com/ling_desu",
        "subscribers": 1,
        "velocity": 31.4,
        "updated": 1689826107476,
        "numReadEntriesPastMonth": 35,
        "numLongReadEntriesPastMonth": 15,
        "totalReadingTimePastMonth": 908522,
        "numTaggedEntriesPastMonth": 0
      },
      {
        "language": "multi",
        "id": "feed/https://meamoe.ml/rss/twitter/user/luluchan_s",
        "description": "vtuberだよ 日语◎ 中文○ 英语× - Made with love by RSSHub(https://github.com/DIYgod/RSSHub)",
        "title": "Twitter @雫るる",
        "feedId": "feed/https://meamoe.ml/rss/twitter/user/luluchan_s",
        "website": "https://twitter.com/luluchan_s",
        "subscribers": 1,
        "velocity": 0,
        "updated": 1674738788747
      },
      {
        "language": "zh",
        "id": "feed/https://meamoe.ml/rss/bilibili/user/dynamic/8730238",
        "description": "小熊flippy 的 bilibili 动态 - Made with love by RSSHub(https://github.com/DIYgod/RSSHub)",
        "title": "小熊flippy 的 bilibili 动态",
        "feedId": "feed/https://meamoe.ml/rss/bilibili/user/dynamic/8730238",
        "website": "https://space.bilibili.com/8730238/dynamic",
        "subscribers": 1,
        "velocity": 0.2,
        "updated": 1688343349091
      },
      {
        "language": "multi",
        "id": "feed/https://meamoe.ml/rss/twitter/user/Kana_Taka11",
        "description": "ネットでもコミュ症/ぼっち・ざ・ろっく！に救われどハマり中…/Skeb▷▶︎ https://t.co/SbfEb0846w - Made with love by RSSHub(https://github.com/DIYgod/RSSHub)",
        "title": "Twitter @鷹なゆ",
        "feedId": "feed/https://meamoe.ml/rss/twitter/user/Kana_Taka11",
        "website": "https://twitter.com/Kana_Taka11",
        "subscribers": 1,
        "velocity": 44.7,
        "updated": 1689815169188,
        "numReadEntriesPastMonth": 37,
        "numLongReadEntriesPastMonth": 12,
        "totalReadingTimePastMonth": 712022,
        "numTaggedEntriesPastMonth": 0
      },
      {
        "language": "ja",
        "id": "feed/https://meamoe.ml/rss/twitter/user/megumi_katoh",
        "description": "同人サークル『Blessing software』メインヒロイン担当、副社長。～this account is unofficial～原作既刊既読/アニメ視聴済/アイコン、ヘッダー保存禁止/全手動/鍵垢フォローNG - Made with love by RSSHub(https://github.com/DIYgod/RSSHub)",
        "title": "Twitter @🌸加藤恵🌸",
        "feedId": "feed/https://meamoe.ml/rss/twitter/user/megumi_katoh",
        "website": "https://twitter.com/megumi_katoh",
        "subscribers": 1,
        "velocity": 0.9,
        "updated": 1689786866274,
        "numReadEntriesPastMonth": 3,
        "numLongReadEntriesPastMonth": 1,
        "totalReadingTimePastMonth": 14928,
        "numTaggedEntriesPastMonth": 0
      },
      {
        "language": "multi",
        "id": "feed/https://meamoe.ml/rss/twitter/user/dk_senie",
        "description": "自閉人 - Made with love by RSSHub(https://github.com/DIYgod/RSSHub)",
        "title": "Twitter @dK.senie",
        "feedId": "feed/https://meamoe.ml/rss/twitter/user/dk_senie",
        "website": "https://twitter.com/dk_senie",
        "subscribers": 1,
        "velocity": 0.5,
        "updated": 1688881139485,
        "numReadEntriesPastMonth": 2,
        "numLongReadEntriesPastMonth": 0,
        "totalReadingTimePastMonth": 5821,
        "numTaggedEntriesPastMonth": 0
      },
      {
        "language": "multi",
        "id": "feed/https://meamoe.ml/rss/twitter/user/ririkocafe",
        "description": "りりこです、絵を描くが大好き．毎週更新します！\npixiv → https://t.co/3MezQ9tHvK\nyoutube→https://t.co/y0tSUh15mF - Made with love by RSSHub(https://github.com/DIYgod/RSSHub)",
        "title": "Twitter @りりこ",
        "feedId": "feed/https://meamoe.ml/rss/twitter/user/ririkocafe",
        "website": "https://twitter.com/ririkocafe",
        "subscribers": 1,
        "velocity": 3.8,
        "updated": 1689786963964,
        "numReadEntriesPastMonth": 4,
        "numLongReadEntriesPastMonth": 0,
        "totalReadingTimePastMonth": 15477,
        "numTaggedEntriesPastMonth": 0
      },
      {
        "language": "multi",
        "id": "feed/https://meamoe.ml/rss/twitter/user/messikid_rylynn",
        "description": "こんな日々を - Made with love by RSSHub(https://github.com/DIYgod/RSSHub)",
        "title": "Twitter @トルQ",
        "feedId": "feed/https://meamoe.ml/rss/twitter/user/messikid_rylynn",
        "website": "https://twitter.com/messikid_rylynn",
        "subscribers": 1,
        "velocity": 0,
        "updated": 1676480100733
      },
      {
        "language": "en",
        "id": "feed/https://meamoe.ml/rss/bilibili/user/dynamic/585267",
        "description": "-纯黑- 的 bilibili 动态 - Made with love by RSSHub(https://github.com/DIYgod/RSSHub)",
        "title": "-纯黑- 的 bilibili 动态",
        "feedId": "feed/https://meamoe.ml/rss/bilibili/user/dynamic/585267",
        "website": "https://space.bilibili.com/585267/dynamic",
        "subscribers": 1,
        "velocity": 1.8,
        "updated": 1689349795583,
        "numReadEntriesPastMonth": 3,
        "numLongReadEntriesPastMonth": 2,
        "totalReadingTimePastMonth": 77265,
        "numTaggedEntriesPastMonth": 0
      },
      {
        "language": "multi",
        "id": "feed/https://meamoe.ml/rss/twitter/user/dolosseXD",
        "description": "🍺Illustrator&Concept designer🍺\n🍺email：dolosse24@gmail.com🍺 - Made with love by RSSHub(https://github.com/DIYgod/RSSHub)",
        "title": "Twitter @ドロス",
        "feedId": "feed/https://meamoe.ml/rss/twitter/user/dolosseXD",
        "website": "https://twitter.com/dolosseXD",
        "subscribers": 1,
        "velocity": 1.6,
        "updated": 1689835828517,
        "numReadEntriesPastMonth": 2,
        "numLongReadEntriesPastMonth": 1,
        "totalReadingTimePastMonth": 7578,
        "numTaggedEntriesPastMonth": 0
      },
      {
        "language": "multi",
        "id": "feed/https://meamoe.ml/weiborss/rss/5357501349",
        "description": "本命初音 / VOCALOID老曲热衷 / 吃的cp:鱼葱 / live爱好者 / jp留学中 / 不合格東方乡民/10年单推miku达成",
        "title": "铭音MeIoN的微博",
        "feedId": "feed/https://meamoe.ml/weiborss/rss/5357501349",
        "website": "https://weibo.com/5357501349",
        "subscribers": 1,
        "velocity": 0.5,
        "updated": 1688946662599
      },
      {
        "language": "multi",
        "id": "feed/https://meamoe.ml/rss/twitter/user/CiloRanko",
        "description": "Best Match　@matchach。 - Made with love by RSSHub(https://github.com/DIYgod/RSSHub)",
        "title": "Twitter @TrNyteal",
        "feedId": "feed/https://meamoe.ml/rss/twitter/user/CiloRanko",
        "website": "https://twitter.com/CiloRanko",
        "subscribers": 1,
        "velocity": 0.1,
        "updated": 1682780753854
      },
      {
        "language": "multi",
        "id": "feed/https://meamoe.ml/rss/twitter/user/kl0n_z",
        "description": "🍄 Anime 🍄 Art 🍄 Games 🍄 - Made with love by RSSHub(https://github.com/DIYgod/RSSHub)",
        "title": "Twitter @Huge",
        "feedId": "feed/https://meamoe.ml/rss/twitter/user/kl0n_z",
        "website": "https://twitter.com/kl0n_z",
        "subscribers": 1,
        "velocity": 16.5,
        "updated": 1689754429544,
        "estimatedEngagement": 0,
        "numReadEntriesPastMonth": 6,
        "numLongReadEntriesPastMonth": 2,
        "totalReadingTimePastMonth": 184799,
        "numTaggedEntriesPastMonth": 0
      },
      {
        "language": "multi",
        "id": "feed/https://meamoe.ml/rss/twitter/user/rswxx",
        "description": "💙画集「MELLOW」5/31発売\nガーディアンテイルズ、ブルーアーカイブ（氷室セナ）\nOC:モノクロバニーなつめ・アオイ\n【連絡先・お仕事履歴】https://t.co/IqfYK8TU42\n【misskey】https://t.co/lUXGDNBPzk\nサブ：@icomochi_sb - Made with love by RSSHub(https://github.com/DIYgod/RSSHub)",
        "title": "Twitter @イコモチ🍡",
        "feedId": "feed/https://meamoe.ml/rss/twitter/user/rswxx",
        "website": "https://twitter.com/rswxx",
        "subscribers": 1,
        "velocity": 83.5,
        "updated": 1689819686330,
        "numReadEntriesPastMonth": 36,
        "numLongReadEntriesPastMonth": 8,
        "totalReadingTimePastMonth": 356302,
        "numTaggedEntriesPastMonth": 0
      },
      {
        "language": "multi",
        "id": "feed/https://meamoe.ml/rss/twitter/user/AGM86997980",
        "description": "。 - Made with love by RSSHub(https://github.com/DIYgod/RSSHub)",
        "title": "Twitter @阿戈魔AGM",
        "feedId": "feed/https://meamoe.ml/rss/twitter/user/AGM86997980",
        "website": "https://twitter.com/AGM86997980",
        "subscribers": 1,
        "velocity": 0.1,
        "updated": 1681369517250
      },
      {
        "language": "multi",
        "id": "feed/https://meamoe.ml/rss/twitter/user/qry51811566",
        "description": "自由画师 - Made with love by RSSHub(https://github.com/DIYgod/RSSHub)",
        "title": "Twitter @粉帮老大",
        "feedId": "feed/https://meamoe.ml/rss/twitter/user/qry51811566",
        "website": "https://twitter.com/qry51811566",
        "subscribers": 1,
        "velocity": 0.1,
        "updated": 1684798141261
      },
      {
        "language": "multi",
        "id": "feed/https://meamoe.ml/rss/twitter/user/yohan1754",
        "description": "yohan1754@naver.com\nCommission ( x )\nhttps://t.co/G1diBFIaVE\nhttps://t.co/Dumtj176rL\nhttps://t.co/2pTA0956tp - Made with love by RSSHub(https://github.com/DIYgod/RSSHub)",
        "title": "Twitter @Free Style /fevercell",
        "feedId": "feed/https://meamoe.ml/rss/twitter/user/yohan1754",
        "website": "https://twitter.com/yohan1754",
        "subscribers": 1,
        "velocity": 0.5,
        "updated": 1688892775989,
        "numReadEntriesPastMonth": 1,
        "numLongReadEntriesPastMonth": 0,
        "totalReadingTimePastMonth": 4729,
        "numTaggedEntriesPastMonth": 0
      }
    ],
    "label": "social",
    "enterprise": false,
    "created": 1589961495144,
    "numFeeds": 58
  },
  {
    "customizable": true,
    "id": "user/7eb0d116-0cca-4a90-9594-0563a315555e/category/b2231ddf-c44c-42c0-8dd3-c16e28679f24",
    "feeds": [],
    "label": "tec",
    "enterprise": false,
    "created": 1665823864550,
    "numFeeds": 0
  }
]
const headers = rowHeaderToObj(`Authorization: Bearer A2r4yxDtA8Ep-xd4Z-u5IiFJABN53GXhOmTd9K78TF32LHS4740ZSgONRLjoUbwjAqRwiRCWNSDX7g93ZxetpiRTW2683mQfG922TMvCdVBwa3FfWhABEG5ywc0X258EEBGZ7-1opcs6iLp4M7rb2ZvQnHuYEYXVX3mifBzXuDCeuicKtKuRbVksGXxCL7piDkMqVCgiYSCWF-n9VqIbsPNyIzVdWE3teVgDr8jk6L1GaHE:feedly
Cookie: __stripe_mid=310ea289-178b-476e-b55e-7dbf4b554a952c8c03; AMP_MKTG_9f09d75df8=JTdCJTdE; AMP_9f09d75df8=JTdCJTIyZGV2aWNlSWQlMjIlM0ElMjJoMVlDMmwxS1ZFaFNCdHd6dzBjQ0ZnJTIyJTJDJTIydXNlcklkJTIyJTNBJTIyN2ViMGQxMTYtMGNjYS00YTkwLTk1OTQtMDU2M2EzMTU1NTVlJTIyJTJDJTIyc2Vzc2lvbklkJTIyJTNBMTY4ODAxMTA1NDI0MSUyQyUyMm9wdE91dCUyMiUzQWZhbHNlJTJDJTIybGFzdEV2ZW50VGltZSUyMiUzQTE2ODgwMTEwNTQyNDQlMkMlMjJsYXN0RXZlbnRJZCUyMiUzQTYwJTdE; mp_08ec115c8ead663134637b6167db2a1c_mixpanel=%7B%22distinct_id%22%3A%20%227eb0d116-0cca-4a90-9594-0563a315555e%22%2C%22%24device_id%22%3A%20%2218971c7eb2f8e9-02f0fb0597aae4-26031d51-100200-18971c7eb2f8e9%22%2C%22%24initial_referrer%22%3A%20%22%24direct%22%2C%22%24initial_referring_domain%22%3A%20%22%24direct%22%2C%22%24user_id%22%3A%20%227eb0d116-0cca-4a90-9594-0563a315555e%22%7D; __stripe_sid=d8f7efe5-3c4e-4986-8461-baae1172fe9becd059
Referer: https://feedly.com/
Origin: https://feedly.com
User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Safari/537.36
Sec-Fetch-Mode: cors`)

const addRequest = (urlList)=>{
  let finalUrl = `https://api.feedly.com/v3/collections/user%2F7eb0d116-0cca-4a90-9594-0563a315555e%2Fcategory%2Fd318e11b-2ddb-433d-8e69-ebc4c72ac6f4/feeds/.mput`
  let dataList = urlList.map((item)=>{
    return {
      id:`feed/${item}`,
      scheme:""
    }
  })
  
  return axios.post(finalUrl,dataList,{
    headers,
    params:{
      ck:new Date().getTime(),
      ct:`feedly.desktop`,
      cv:`31.0.1836`
    }
  })
}
const feedAdd = ()=>{


  let urlList = origin[1].feeds.filter(e=>{
    return e.id.search(`meamoe.ml`) > -1
  }).map(e=>{
    let url = e.id.replace(`feed/`,'').replace('meamoe.ml','meamoe.one')
    return url
  })

  addRequest(urlList).then(e=>{

  }).catch(e=>{
    console.error(e)
  })
}

const feedDel =async ()=>{
  let urlList = origin[1].feeds.filter(e=>{
    return e.id.search(`meamoe.ml`) > -1
  }).map(e=>{
    let url = e.id
    return url
  })
  let finalUrlList =urlList.map(e=>{
    return `https://api.feedly.com/v3/collections/user%2F7eb0d116-0cca-4a90-9594-0563a315555e%2Fcategory%2Fglobal.all/feeds/${encodeURIComponent(e)}`
  })
  for (const finalUrl of finalUrlList) {
    await sleep(1000)
    await axios.delete(finalUrl,{
      headers,
      params:{
        ck:new Date().getTime(),
        ct:`feedly.desktop`,
        cv:`31.0.1836`
      }
    })
    
  }
}

// feedAdd()
// feedDel()