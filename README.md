# Github 任務管理系統
這是一個可以管理個人 github 任務 (isssues) 的系統，主要功能如下
1. 登入
2. 搜尋任務
3. 篩選任務列表
4. 查看任務詳細資料
5. 新增、編輯、開啟與關閉任務(關閉任務同刪除任務)
6. 錯誤處理

可以到以下網址使用: \
https://issueapp.onrender.com (等候網站啟動需要 1 至 2 分鐘)

## 啟動專案
1. 從 github 上將專案 clone 下來，進入 main 分支

    ```shell
   $ git clone https://github.com/xiaoxuan0117/issue_app.git
   $ git checkout main
    ```
2. 在正式啟動前必須先加上儲存應用程式 `Client ID` 和 `Client secrets` 的環境變數檔案，需參考 [Creacting an oauth app](https://docs.github.com/en/apps/oauth-apps/building-oauth-apps/creating-an-oauth-app) 建立一個 OAuth Apps，特定項目依照以下規則填入
   * Homepage URL: http://127.0.0.1:3000/login
   * Authorization callback URL: http://127.0.0.1:5000/api/login/oauth/access_token
  
    建立完成後請在專案根資料夾建立一個 `.env` 檔案，並將取得的 `Client ID` 和 `Client secrets` 寫進檔案中，參考以下檔案內容
    ```
    // .env

    REACT_APP_CLIENT_ID = xxxxxxxxxxxxxxxxxx
    REACT_APP_CLIENT_SECRETS = xxxxxxxxxxxxxxxxxxxxxxxxx
    ```
3. 接下來安裝所需套件，並啟動專案，此專案分為前端和後端，需要開啟兩個終端分別輸入以下指令
   > 前端
   ```shell
   $ yarn install
   $ yarn start-client
   ```
   > 後端
   ```shell
   $ cd server
   $ yarn install
   $ yarn start
   ```
4. 完成啟動後前端將使用 http://127.0.0.1:3000 網址，後端使用 http://127.0.0.1:5000 網址

## 架構說明
此專案的前端部分是基於 TypeScript 使用 React 框架製作的，後端則是以 JavaScript 用 Express 建立伺服器，其中建立伺服器的程式碼是寫在 `server` 資料夾中，而渲染前端頁面的內容則是在 `src` 中

### 前端架構
前端利用 React-router 管理路由，以及使用 Redux toolkit 管理資料狀態，可參考以下資料夾結構了解檔案位置。
```
src
|
|--assets // 圖片
|--components // 存放元件
   |
   |--atom // 存放最基礎元件: 例如按鈕、輸入框
   |--molecule // 存放以基礎元件組合的中型元件
   |--organisms // 存放以中型元件組合的大型元件
|--reducer // redux reducer，以功能分為五個 reducer 製作
|--routes // 存放路由頁面，以 components 內的元件組成
|--sass // 共用樣式
|--store // redux store
|--type // 存放 type
|--index.css
|--index.tsx
```

#### 元件說明
其中每個元件皆由三個檔案組成，以**按鈕**為例
```
src/components/atom/Button

Button.stories.tsx // 查看元件 UI 呈現
index.tsx // 元件製作
style.scss // 元件樣式
```

#### react-router 說明
`router` 寫在 `src/index.tsx` 中，有針對無內容的頁面進行錯誤處理

#### redux 說明
上述提到之五個 reducer 檔案分別為
1. `addIssue`: 管理 **新增 issue** 的資料
2. `editIssue`: 管理 **編輯 issue** 的資料
3. `issueDetail`: 管理 **issue 詳情頁** 的資料
4. `issueList`: 管理 **issue 列表** 的資料
5. `user`: 管理 **使用者** 的資料

### 後端架構
後端是使用 `express-generator` 建立的專案，路由統一寫在 `routes/index.js` 中

## 使用注意事項
### 搜尋功能
位於任務列表頁右側最上方的搜尋功能，有兩項注意事項
#### 1. 格式規則
此功能可用於搜尋 title、body 和 comment 中含有使用者輸入之關鍵字的任務，以及搜尋包含特定 label 的任務。
1. 搜尋關鍵字: 直接於輸入框填入關鍵字，例如 `issue`
2. 搜尋特定 label: 於輸入框填入 `label: "[特定 label]"`，例如想查詢有 `help wanted` 的 label 填入則 `label:"help wanted"`
3. 同時搜尋關鍵字與特定 label: 先輸入關鍵字再輸入 label，例如 `issue label:"help wanteds"`
#### 2. 搜尋結果說明
一開始的任務列表會將使用者可以看到的任務都列出，而搜尋功能的結果必須再符合以下四點任一點
* 任務為使用者建立的 (Created)
* 任務任命予使用者 (Assigned)
* 任務內容提及使用者 (Mentioned)
* 使用者是任務留言者之一 (Commenter)

**特別注意** 使用者若只是可以看到任務，在搜尋結果中是不會出現該任務的
