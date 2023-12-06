# 安卓modebus tcp后端

## 运行方法

- 安卓设备上安装termux
 1. 运行 termux-change-repo, 更换软件源为清华源(tsinghua)
 2. apt update && apt upgrade, 过程中全部选yes
 3. apt install nodejs (若报错,尝试再次 apt update && apt upgrade)
 4. apt install git
 5. git clone https://github.com/ColoeusEdward/tv_koa.git
 6. cd tv_koa
 7. npm i
 8. chmod +x go.sh
 9. ./go.sh
