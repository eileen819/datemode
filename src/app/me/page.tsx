import BookmarkSection from "@/components/me/BookmarkSection";
import HistorySection from "@/components/me/HistorySection";
import MeTabs from "@/components/me/MeTabs";
import ProfileBox from "@/components/me/ProfileBox";

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ tab: string }>;
}) {
  const { tab } = await searchParams;

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
