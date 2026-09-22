# 瑞瑞作品 APK 建置說明

本專案是 Expo SDK 54 原生手機 App，已在 `eas.json` 設定 `preview` profile 產出可直接安裝的 Android APK。

## 建置 APK

請在專案根目錄執行：

```bash
npm install -g eas-cli
eas login
eas build:configure
eas build --platform android --profile preview
```

建置完成後，EAS 會提供 APK 下載連結。下載 APK 到 Android 手機後，開啟檔案即可安裝；若手機提示權限，請允許該來源安裝應用程式。

## 目前設定

- App 名稱：瑞瑞作品
- Android package：`com.app.ruiruiworksapp`
- 預覽建置：APK（`preview`）
- 商店建置：AAB（`production`）
- 方向：直向手機畫面

本次沙盒已完成型別檢查、完整 Vitest 測試與 Expo Web 匯出驗證。由於目前環境沒有 Android SDK、Gradle 或 EAS 登入憑證，APK 二進位檔需在具備 EAS 帳號的環境執行上述命令產出。
