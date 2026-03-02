import EmailMagicLink from "@/components/login/EmailMagicLink";
import GoogleLoginBtn from "@/components/login/GoogleLoginBtn";
import { Metadata } from "next";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "로그인",
  description: "간편 로그인으로 추천 기록과 북마크 코스를 저장하고 관리하세요.",
};

export default function Page() {
  return (
    <section className="grid place-items-center mt-20">
      <div className="w-full max-w-xs flex flex-col justify-center gap-4">
        <h1 className="text-2xl font-semibold text-center">로그인</h1>
        <Suspense fallback={null}>
          <EmailMagicLink />
        </Suspense>
        <div className="flex items-center gap-4">
          <div className="flex-1 h-px bg-border" />
          <span className="text-sm text-muted-foreground">또는</span>
          <div className="flex-1 h-px bg-border" />
        </div>
        <Suspense fallback={null}>
          <GoogleLoginBtn />
        </Suspense>
        <p className="text-sm text-muted-foreground text-center break-keep">
          처음이신가요? 이메일로 로그인하면 계정이 자동 생성돼요!
        </p>
      </div>
    </section>
  );
}
