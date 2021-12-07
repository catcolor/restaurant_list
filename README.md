# 我的餐廳清單
可以瀏覽餐廳，點擊餐廳圖片，查看詳細資訊
# 功能
* 可註冊帳號，也可用facebook登入
* 在首頁看到所有餐廳的資訊
* 點擊圖片看到餐廳詳細資料
* 可搜尋餐廳名稱或類別找到想要的餐廳
* 新增餐廳
* 刪除餐廳
* 修改餐廳內容
* 從店名、類型、地區擇一，依字母順序排列餐廳
# 安裝與執行步驟
1.開啟終端機，下載 restaurant_list 資料夾到本地電腦    
   
    git clone https://github.com/catcolor/restaurant_list.git

2.進入 restaurant_list    

    cd restaurant_list
    
3.安裝必要套件

    npm install
    
4.安裝種子資料

    npm run seed
  
5.執行

    npm run dev
    
6.輸入網址 http://localhost:3000/    
# 開發工具
* Node.js 14.16.0
* Express 4.17.1
* Express-handlebars 5.3.4
* Boostrap 4.2.1
* Mongoose 6.0.12
