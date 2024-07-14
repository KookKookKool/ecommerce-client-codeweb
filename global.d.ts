// สร้างไฟล์ global.d.ts ใน root ของโปรเจกต์ของคุณ
declare global {
    interface Window {
      GA_INITIALIZED?: boolean;
    }
  }
  
  export {};
  