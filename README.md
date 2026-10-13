# ThyroAI (Prototype)

แอปวิเคราะห์อาหารสำหรับผู้ป่วยโรคไทรอยด์ — React 18 + TypeScript + Vite
ข้อมูลทั้งหมดเป็นข้อมูลจำลอง เก็บใน `localStorage` ของเบราว์เซอร์ ไม่มี backend

## รันในเครื่อง

```bash
npm install
npm run dev          # http://localhost:5173
```

กล้องใช้ได้บน `localhost` หรือ HTTPS เท่านั้น (บนมือถือให้ทดสอบหลัง deploy)

## Deploy ขึ้น Firebase Hosting (Google)

1. สร้างโปรเจกต์ที่ https://console.firebase.google.com
2. แก้ `.firebaserc` เปลี่ยน `YOUR-FIREBASE-PROJECT-ID` เป็น Project ID ของคุณ
3. รันคำสั่ง

```bash
npm install -g firebase-tools
firebase login
npm run deploy       # = npm run build && firebase deploy --only hosting
```

ได้ลิงก์ `https://<project-id>.web.app`

## โครงสร้าง

```
src/
├── components/common/   Icon, Plate, TopBar, TabBar, Toast, FoodRow, HistoryRow
├── data/foods.ts         เมนูจำลอง 15 เมนู + mockAnalyze() (AI จำลอง)
├── hooks/useCamera.ts    เปิดกล้องจริงด้วย getUserMedia + จับภาพเฟรม
├── pages/                Splash, register/1-4, Home, Scan, Result, Menu, History, Profile
├── store/useAppStore.ts  Zustand + persist (localStorage)
├── styles/               tokens.css (light/dark), globals.css, components.css
├── types/                Food, Profile, HistoryEntry
└── utils/health.ts       BMI, พลังงานต่อวัน (Mifflin-St Jeor), วันที่
```

## เส้นทาง (routes)

| Path | หน้า |
|---|---|
| `/` | หน้าต้อนรับ |
| `/register/1`–`4` | ลงทะเบียน 4 ขั้น (`?edit` = แก้ไขจากหน้าโปรไฟล์) |
| `/home` | หน้าแรก |
| `/scan` | สแกนอาหาร |
| `/result/:id` | ผลการวิเคราะห์ |
| `/menu` | เมนูอาหาร (`?cat=1\|2\|3\|fav`) |
| `/history` | ประวัติ |
| `/profile` | โปรไฟล์ |

## ต่อ AI จริงภายหลัง

แทนที่ `mockAnalyze()` ใน `src/data/foods.ts` ด้วยการเรียก API ที่รับภาพ (`lastPhoto` เป็น data URL ใน store) แล้วคืน `Food`
