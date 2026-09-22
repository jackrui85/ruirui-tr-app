import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";

type PackageJson = {
  dependencies?: Record<string, string>;
  devDependencies?: Record<string, string>;
};

const packageJson = JSON.parse(
  readFileSync(resolve(process.cwd(), "package.json"), "utf8"),
) as PackageJson;
const appConfig = readFileSync(resolve(process.cwd(), "app.config.ts"), "utf8");

describe("Expo SDK 57 升級設定", () => {
  it("使用 SDK 57 與 React Native 0.86 相容版本", () => {
    expect(packageJson.dependencies?.expo).toMatch(/^~57\./);
    expect(packageJson.dependencies?.["react-native"]).toMatch(/^0\.86\./);
    expect(packageJson.dependencies?.react).toMatch(/^19\.2\./);
    expect(packageJson.dependencies?.["expo-router"]).toMatch(/^~57\./);
  });

  it("包含 Expo Doctor 要求的直接原生相依套件與插件", () => {
    expect(packageJson.dependencies?.["expo-asset"]).toMatch(/^~57\./);
    expect(appConfig).toContain('"expo-asset"');
    expect(appConfig).toContain('"expo-font"');
    expect(appConfig).toContain('"expo-image"');
  });

  it("使用 Expo Router SDK 57 公開匯入入口", () => {
    const hapticTab = readFileSync(resolve(process.cwd(), "components/haptic-tab.tsx"), "utf8");
    expect(hapticTab).toContain('from "expo-router/js-tabs"');
    expect(hapticTab).toContain('from "expo-router/react-navigation"');
    expect(hapticTab).not.toContain("@react-navigation/");
  });
});
