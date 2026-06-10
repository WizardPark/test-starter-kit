"use client";

import { useEffect } from "react";

export default function GlobalError({
  error,
  unstable_retry,
}: {
  error: Error & { digest?: string };
  unstable_retry: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <html lang="ko">
      <body
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          minHeight: "100vh",
          gap: "1.5rem",
          padding: "1rem",
          fontFamily: "system-ui, sans-serif",
          textAlign: "center",
          background: "#fff",
          color: "#0a0a0a",
        }}
      >
        <h1 style={{ fontSize: "1.5rem", fontWeight: 700, margin: 0 }}>
          치명적인 오류가 발생했습니다
        </h1>
        <p style={{ color: "#71717a", margin: 0, maxWidth: "28rem" }}>
          애플리케이션에 심각한 오류가 발생했습니다.
        </p>
        <button
          onClick={() => unstable_retry()}
          style={{
            padding: "0.5rem 1.25rem",
            borderRadius: "0.375rem",
            background: "#0a0a0a",
            color: "#fff",
            border: "none",
            cursor: "pointer",
            fontSize: "0.875rem",
            fontWeight: 500,
          }}
        >
          다시 시도
        </button>
      </body>
    </html>
  );
}
