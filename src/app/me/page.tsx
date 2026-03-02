import BookmarkSection from "@/components/me/BookmarkSection";
import HistorySection from "@/components/me/HistorySection";
import MeTabs from "@/components/me/MeTabs";
import ProfileBox from "@/components/me/ProfileBox";
import { Metadata } from "next";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "내 활동",
  description:
    "AI 추천 기록과 저장한 코스를 한곳에서 확인하고 관리할 수 있는 개인 마이페이지입니다.",
};

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ tab: string }>;
}) {
  const { tab } = await searchParams;
  if (!tab) {
    redirect("/me?tab=history");
  }

  return (
    <div>
      <h1 className="text-2xl md:text-3xl font-bold mb-4">내 활동</h1>
      <ProfileBox />
      <MeTabs activeTab={tab} />
      {tab === "history" && <HistorySection />}
      {tab === "bookmarks" && <BookmarkSection />}
    </div>
  );
}
