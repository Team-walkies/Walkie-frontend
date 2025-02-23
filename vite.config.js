import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: true, // ✅ 모든 네트워크에서 접근 가능하도록 설정
    port: 5173, // 기본 포트 설정 (원하는 번호로 변경 가능)
  },
});
