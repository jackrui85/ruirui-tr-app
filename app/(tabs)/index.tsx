import { useRef } from "react";
import { FlatList, Linking, Pressable, Text, View, type ListRenderItemInfo } from "react-native";
import * as Haptics from "expo-haptics";

import { ScreenContainer } from "@/components/screen-container";

type Work = {
  id: string;
  category: string;
  title: string;
  description: string;
  url: string;
  accent: string;
  icon: string;
};

const WORKS: Work[] = [
  {
    id: "train-visual",
    category: "AI 影音｜網站",
    title: "火車影音網站",
    description: "以 AI 故事與交通資訊為靈感的影音作品入口。",
    url: "https://gemini.google.com/share/192517d9a7d1",
    accent: "#FF775C",
    icon: "01",
  },
  {
    id: "train-timetable",
    category: "工具｜更新版",
    title: "火車時刻表",
    description: "整合即時查詢體驗的更新版火車時刻表工具。",
    url: "https://tr-292936321897.asia-east1.run.app/",
    accent: "#5ED5C1",
    icon: "02",
  },
  {
    id: "high-speed-rail",
    category: "工具｜高鐵",
    title: "高鐵時刻表",
    description: "快速進入高鐵班次查詢與行程規劃。",
    url: "https://share.gemini.google/7Iu8YG0uAH4k",
    accent: "#A993FF",
    icon: "03",
  },
  {
    id: "ai-image",
    category: "AI 創作｜工具",
    title: "AI 圖片生成工具",
    description: "探索影像生成、提示詞與視覺創作的實驗作品。",
    url: "https://gemini.google.com/share/d19e42717d70",
    accent: "#F7C95C",
    icon: "04",
  },
  {
    id: "ai-studio",
    category: "AI App｜互動",
    title: "AI Studio 作品",
    description: "用 Google AI Studio 打造的互動式應用作品。",
    url: "https://ai.studio/apps/178e570b-a4fb-4820-a214-bcfd5580189c",
    accent: "#78A9FF",
    icon: "05",
  },
  {
    id: "app-portfolio",
    category: "作品集｜App",
    title: "軟體作品集",
    description: "集中整理軟體、網站與創作實驗成果。",
    url: "https://lihi3.me/0DVhx",
    accent: "#FF9F7A",
    icon: "06",
  },
  {
    id: "android-app",
    category: "Android｜App",
    title: "安卓 App 作品",
    description: "可在 Google AI Studio 查看與體驗的 Android 作品。",
    url: "https://aistudio.google.com/apps/97cbce21-1e5a-425e-b7c4-d754182d733e",
    accent: "#8BD88A",
    icon: "07",
  },
];

const TAGS = ["#接案", "#廣告", "#行銷", "#雲林", "#影音", "#斗六", "#vibe code", "#veo3.1", "#google omni", "#youtube"];

async function openWork(url: string) {
  await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light).catch(() => undefined);
  const supported = await Linking.canOpenURL(url);
  if (supported) await Linking.openURL(url);
}

function WorkCard({ work }: { work: Work }) {
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={`開啟${work.title}`}
      onPress={() => openWork(work.url)}
      style={({ pressed }) => [styles.pressable, pressed && styles.pressed]}
    >
      <View className="flex-row items-center rounded-[22px] border border-border bg-surface p-4">
        <View className="mr-4 h-14 w-14 items-center justify-center rounded-2xl" style={{ backgroundColor: work.accent }}>
          <Text className="text-base font-black text-[#152232]">{work.icon}</Text>
        </View>
        <View className="flex-1">
          <Text className="mb-1 text-[11px] font-bold uppercase tracking-[1.4px] text-muted">{work.category}</Text>
          <Text className="text-[18px] font-bold leading-6 text-foreground">{work.title}</Text>
          <Text className="mt-1 text-[13px] leading-5 text-muted">{work.description}</Text>
        </View>
        <Text className="ml-3 text-2xl text-primary">›</Text>
      </View>
    </Pressable>
  );
}

function Header({ onNoticePress }: { onNoticePress: () => void }) {
  return (
    <View>
      <View className="mb-7 mt-2 flex-row items-start justify-between">
        <View className="flex-1 pr-4">
          <Text className="mb-2 text-[12px] font-bold uppercase tracking-[2px] text-primary">RUĪRUĪ / CREATIVE PORTFOLIO</Text>
          <Text className="text-[40px] font-black leading-[44px] text-foreground">瑞瑞作品</Text>
          <Text className="mt-3 text-[16px] leading-6 text-muted">AI 影音 × 行銷創意 × 雲林接案</Text>
        </View>
        <View className="h-16 w-16 items-center justify-center rounded-[22px] bg-primary">
          <Text className="text-[28px] font-black text-background">瑞</Text>
        </View>
      </View>

      <View className="mb-6 rounded-[28px] bg-[#19334A] p-5">
        <View className="mb-4 flex-row items-center justify-between">
          <View className="rounded-full bg-[#FF775C] px-3 py-1">
            <Text className="text-[11px] font-black tracking-[1px] text-[#152232]">合作前必讀</Text>
          </View>
          <Text className="text-[12px] font-semibold text-[#AFC4D4]">01 / 作品索引</Text>
        </View>
        <Text className="text-[20px] font-extrabold leading-7 text-white">請先看作品，再來邀請。</Text>
        <Text className="mt-2 text-[14px] leading-6 text-[#C2D1DC]">AI 篩選職缺，煩請徵才者觀看作品後再邀；僅興趣工作 104 訊息回覆。無相關工作不回，謝謝尊重與配合。</Text>
        <Pressable
          accessibilityRole="button"
          accessibilityLabel="跳到合作規則"
          onPress={onNoticePress}
          style={({ pressed }) => [styles.noticeButton, pressed && styles.pressed]}
        >
          <Text className="text-[13px] font-bold text-[#FFB3A4]">查看合作條件  →</Text>
        </Pressable>
      </View>

      <View className="mb-7 flex-row flex-wrap gap-2">
        {TAGS.map((tag) => (
          <View key={tag} className="rounded-full border border-border bg-surface px-3 py-2">
            <Text className="text-[12px] font-semibold text-muted">{tag}</Text>
          </View>
        ))}
      </View>

      <View className="mb-4 flex-row items-end justify-between">
        <View>
          <Text className="text-[12px] font-bold uppercase tracking-[1.8px] text-primary">Selected work</Text>
          <Text className="mt-1 text-[25px] font-extrabold text-foreground">作品導覽</Text>
        </View>
        <Text className="pb-1 text-[13px] font-semibold text-muted">點卡片開啟 ↗</Text>
      </View>
    </View>
  );
}

function Footer({ onContactPress }: { onContactPress: () => void }) {
  return (
    <View className="pb-10 pt-5">
      <View className="mb-4 rounded-[24px] border border-[#F1C9BF] bg-[#FFF1ED] p-5">
        <Text className="text-[12px] font-bold uppercase tracking-[1.5px] text-[#C75B4A]">Looking for the right fit?</Text>
        <Text className="mt-2 text-[19px] font-extrabold leading-7 text-[#46241F]">有相關的 AI 影音、廣告或行銷需求，再來聊聊。</Text>
        <Text className="mt-2 text-[13px] leading-5 text-[#81534B]">合作邀約請先附上工作內容與預期成果，讓彼此更有效率。</Text>
        <Pressable
          accessibilityRole="button"
          accessibilityLabel="查看合作提醒"
          onPress={onContactPress}
          style={({ pressed }) => [styles.cta, pressed && styles.pressed]}
        >
          <Text className="text-center text-[14px] font-bold text-white">我知道了，回到合作條件</Text>
        </Pressable>
      </View>
      <Text className="text-center text-[12px] leading-5 text-muted">瑞瑞作品 · AI 影音作品平台{`\n`}Made for meaningful collaborations.</Text>
    </View>
  );
}

export default function HomeScreen() {
  const listRef = useRef<FlatList<Work>>(null);
  const scrollToNotice = () => listRef.current?.scrollToOffset({ offset: 0, animated: true });
  const renderWork = ({ item }: ListRenderItemInfo<Work>) => <WorkCard work={item} />;

  return (
    <ScreenContainer className="px-5" containerClassName="bg-background">
      <FlatList
        ref={listRef}
        data={WORKS}
        keyExtractor={(item) => item.id}
        renderItem={renderWork}
        ItemSeparatorComponent={() => <View className="h-3" />}
        ListHeaderComponent={<Header onNoticePress={scrollToNotice} />}
        ListFooterComponent={<Footer onContactPress={scrollToNotice} />}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.content}
      />
    </ScreenContainer>
  );
}

const styles = {
  content: { paddingTop: 8, paddingBottom: 24 },
  pressable: { borderRadius: 22 },
  pressed: { opacity: 0.72, transform: [{ scale: 0.985 }] },
  noticeButton: { marginTop: 14, paddingVertical: 4 },
  cta: { marginTop: 16, borderRadius: 999, backgroundColor: "#C75B4A", paddingVertical: 12 },
} as const;
