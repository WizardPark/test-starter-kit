// Server Component — ContactForm(Client)과 CodeBlock(async Server)을 함께 사용
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CodeBlock } from "@/components/shared/code-block";
import { ContactForm } from "./contact-form";

export const metadata = {
  title: "폼 검증 예제",
};

const codeExample = `"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

// 1. zod로 스키마 정의
const schema = z.object({
  name: z.string().min(2, "이름은 2자 이상이어야 합니다."),
  email: z.string().email("올바른 이메일 형식을 입력하세요."),
  message: z.string().min(10, "메시지는 10자 이상이어야 합니다."),
});

type FormValues = z.infer<typeof schema>;

export default function ContactForm() {
  // 2. zodResolver로 연결
  const { register, handleSubmit, formState: { errors } } =
    useForm<FormValues>({ resolver: zodResolver(schema) });

  function onSubmit(data: FormValues) {
    console.log(data); // 타입 안전한 데이터
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input {...register("name")} />
      {errors.name && <p>{errors.name.message}</p>}
      {/* ... */}
    </form>
  );
}`;

export default function FormValidationPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12 md:px-6">
      <Button asChild variant="ghost" size="sm" className="mb-6 -ml-2 gap-1.5">
        <Link href="/#examples">
          <ArrowLeft className="h-4 w-4" />
          예제 목록
        </Link>
      </Button>

      <div className="mb-10">
        <div className="mb-3 flex items-center gap-2">
          <h1 className="text-3xl font-bold tracking-tight">폼 검증</h1>
          <Badge variant="secondary">react-hook-form + zod</Badge>
        </div>
        <p className="text-muted-foreground">
          <code className="rounded bg-muted px-1 py-0.5 text-sm font-mono">
            zod
          </code>
          로 스키마를 정의하고,{" "}
          <code className="mx-1 rounded bg-muted px-1 py-0.5 text-sm font-mono">
            react-hook-form
          </code>
          으로 폼 상태를 관리합니다. 불필요한 리렌더링 없이 실시간 유효성
          검사를 제공합니다.
        </p>
      </div>

      {/* 결과 — Client Component */}
      <section className="mb-10">
        <h2 className="mb-4 text-lg font-semibold">결과</h2>
        <ContactForm />
      </section>

      {/* 코드 — shiki 신택스 하이라이팅 적용 */}
      <section>
        <h2 className="mb-4 text-lg font-semibold">코드</h2>
        <CodeBlock code={codeExample} lang="tsx" />
      </section>
    </div>
  );
}
