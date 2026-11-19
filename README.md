# Hall-Frontend（PlayStar 大厅 + 游戏客户端）

本仓库只含**前端代码**（大厅 cocos 工程：src/frameworks/lib/index.html/main.js/project.json）。
**素材(res/图集/游戏客户端)体积数 GB，不进 git**，用随附脚本从公网服务器拉取。

## 拉下来跑（另一人）
1. clone 本仓库
2. 拉素材（含大厅 res + 全部 12 游戏客户端）：
   ```
   python fetch_assets.py
   ```
   会下载 `http://82.158.228.38:8888/g/assets.tar` 并解压到 `lobby/res` 与 `g/`。
3. 起静态服务（任选）：
   ```
   python -m http.server 8083 --directory lobby
   ```
   或用后端仓库的 nocache_server.py。
4. 后端：clone Hall-Backend 并按其 README 起 WS stub(8084)+游戏服务端；大厅默认连 `ws://127.0.0.1:8084/lobby`（本地）或公网 `/ws/lobby`。
5. 浏览器开 `http://127.0.0.1:8083/?access_token=dev&lang=sch`。

## 公网现成环境
http://82.158.228.38:8888/ （已部署 12 客户端+5 服务端，可直接玩/对照）

## 结构
- lobby/ 大厅 cocos 工程（代码，res 由 fetch 补）
- fetch_assets.py 素材拉取脚本
- 游戏客户端 g/<ID>/ 由 fetch 解出

## 多语言
大厅默认 sch + 🌐 选择器；启动游戏带 &lang=。棋牌客户端中文布局表不全，非 tai/eng 回退 eng。