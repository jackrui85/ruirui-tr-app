import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";

const homeSource = readFileSync(resolve(process.cwd(), "app/(tabs)/index.tsx"), "utf8");

describe("瑞瑞作品首頁內容", () => {
  it("保留所有使用者提供的作品入口", () => {
    const requiredLinks = [
      "https://gemini.google.com/share/192517d9a7d1",
      "https://tr-292936321897.asia-east1.run.app/",
      "https://share.gemini.google/7Iu8YG0uAH4k",
      "https://gemini.google.com/share/d19e42717d70",
      "https://ai.studio/apps/178e570b-a4fb-4820-a214-bcfd5580189c",
      "https://lihi3.me/0DVhx",
      "https://aistudio.google.com/apps/97cbce21-1e5a-425e-b7c4-d754182d733e",
    ];

    for (const link of requiredLinks) expect(homeSource).toContain(link);
  });

  it("顯示合作前的職缺篩選提醒與定位標籤", () => {
    expect(homeSource).toContain("AI 篩選職缺，煩請徵才者觀看作品後再邀");
    expect(homeSource).toContain("無相關工作不回，謝謝尊重與配合");
    expect(homeSource).toContain("#接案");
    expect(homeSource).toContain("#veo3.1");
    expect(homeSource).toContain("#google omni");
  });

  it("以 FlatList 呈現作品並讓每張卡片可開啟外部連結", () => {
    expect(homeSource).toContain("FlatList");
    expect(homeSource).not.toContain("<ScrollView");
    expect(homeSource).toContain("onPress={() => openWork(work.url)}");
    expect(homeSource).toContain("Linking.openURL(url)");
  });
});
