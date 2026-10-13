import type { Food, Level } from '@/types';

const g = (text: string) => ({ kind: 'good' as const, text });
const w = (text: string) => ({ kind: 'warn' as const, text });
const b = (text: string) => ({ kind: 'bad' as const, text });

/** ข้อมูลจำลอง: ค่าสารอาหารเป็นค่าประมาณต่อหน่วยบริโภค */
export const FOODS: Food[] = [
  { id: 'salmon', name: 'แซลมอนย่าง + ข้าวกล้อง', serving: 'ผักรวม', kcal: 450, level: 1, emoji: '🐟', side: '🍚', hue: '#F29A6B',
    nutrients: { protein: 28, fat: 18, carb: 45, iodine: 35 },
    reasons: [g('โปรตีนคุณภาพดี ช่วยซ่อมแซมร่างกาย'), g('ไขมันโอเมก้า-3 ช่วยลดการอักเสบ'), g('มีซีลีเนียมซึ่งร่างกายใช้สร้างฮอร์โมนไทรอยด์'), g('ไฟเบอร์สูงจากข้าวกล้องและผัก ช่วยระบบขับถ่าย')] },
  { id: 'rice', name: 'ข้าวกล้อง', serving: '1 ทัพพีใหญ่', kcal: 320, level: 1, emoji: '🍚', hue: '#C9A27A',
    nutrients: { protein: 7, fat: 3, carb: 68, iodine: 2 },
    reasons: [g('ไฟเบอร์สูง อิ่มนาน'), g('น้ำตาลในเลือดขึ้นช้ากว่าข้าวขาว'), g('มีวิตามินบีที่ช่วยเรื่องอ่อนเพลีย')] },
  { id: 'tofu', name: 'ต้มจืดเต้าหู้หมูสับ', serving: '1 ถ้วย', kcal: 150, level: 1, emoji: '🍲', hue: '#F2D9A6',
    nutrients: { protein: 14, fat: 7, carb: 6, iodine: 8 },
    reasons: [g('โปรตีนสูง แคลอรี่ต่ำ'), g('น้ำซุปใส โซเดียมไม่สูงมาก')],
    medNote: 'เต้าหู้ทำจากถั่วเหลือง ควรกินห่างจากเวลากินยาไทรอยด์อย่างน้อย 4 ชั่วโมง' },
  { id: 'fish', name: 'ปลานึ่งมะนาว', serving: 'ปลากะพง ½ ตัว', kcal: 180, level: 1, emoji: '🐠', side: '🍋', hue: '#E8E2C8',
    nutrients: { protein: 30, fat: 5, carb: 4, iodine: 40 },
    reasons: [g('โปรตีนย่อยง่าย ไขมันต่ำ'), g('ปลาทะเลมีไอโอดีนในปริมาณพอเหมาะ'), g('ปรุงด้วยการนึ่ง ไม่ใช้น้ำมัน')] },
  { id: 'veg', name: 'ผัดผักรวมน้ำมันน้อย', serving: 'แครอท ข้าวโพดอ่อน เห็ด', kcal: 150, level: 1, emoji: '🥕', side: '🍄', hue: '#8CC27A',
    nutrients: { protein: 5, fat: 8, carb: 14, iodine: 3 },
    reasons: [g('ไฟเบอร์และวิตามินหลากหลาย'), g('ช่วยลดอาการท้องผูกที่พบบ่อยในภาวะไทรอยด์ต่ำ')] },
  { id: 'egg', name: 'ไข่ต้ม', serving: '2 ฟอง', kcal: 150, level: 1, emoji: '🥚', hue: '#F7D774',
    nutrients: { protein: 13, fat: 10, carb: 1, iodine: 48 },
    reasons: [g('โปรตีนครบถ้วน ราคาประหยัด'), g('มีไอโอดีนและซีลีเนียมตามธรรมชาติ')] },
  { id: 'banana', name: 'กล้วยหอม', serving: '1 ผล', kcal: 105, level: 1, emoji: '🍌', hue: '#F5E08A',
    nutrients: { protein: 1, fat: 0, carb: 27, iodine: 0 },
    reasons: [g('ให้พลังงานเร็ว ย่อยง่าย'), g('โพแทสเซียมช่วยการทำงานของกล้ามเนื้อ')] },
  { id: 'basil', name: 'ผัดกะเพราไก่', serving: 'ไม่รวมข้าว', kcal: 250, level: 2, emoji: '🍗', side: '🌶️', hue: '#B9774A',
    nutrients: { protein: 24, fat: 14, carb: 8, iodine: 4 },
    reasons: [g('โปรตีนจากไก่ดี'), w('โซเดียมจากซอสปรุงรสค่อนข้างสูง'), w('ใช้น้ำมันผัดมาก ควรสั่งแบบน้ำมันน้อย')] },
  { id: 'somtam', name: 'ส้มตำไทย', serving: '1 จาน', kcal: 200, level: 2, emoji: '🥗', hue: '#E8A46A',
    nutrients: { protein: 4, fat: 6, carb: 30, iodine: 6 },
    reasons: [g('มีผักและไฟเบอร์'), w('โซเดียมและน้ำตาลสูงจากน้ำปลาและน้ำตาลปี๊บ'), w('ความเผ็ดอาจระคายเคืองกระเพาะ')] },
  { id: 'broc', name: 'บรอกโคลีผัดกุ้ง', serving: '1 จาน', kcal: 160, level: 2, emoji: '🥦', side: '🦐', hue: '#6FAE5C',
    nutrients: { protein: 16, fat: 7, carb: 10, iodine: 22 },
    reasons: [g('วิตามินซีและไฟเบอร์สูง'), w('ผักตระกูลกะหล่ำมีสารกอยโตรเจน ควรปรุงสุกและกินพอประมาณ')] },
  { id: 'soy', name: 'นมถั่วเหลือง', serving: '1 แก้ว 250 มล.', kcal: 130, level: 2, emoji: '🥛', hue: '#EFE3C2',
    nutrients: { protein: 8, fat: 4, carb: 15, iodine: 2 },
    reasons: [g('โปรตีนจากพืช'), w('ถั่วเหลืองอาจลดการดูดซึมยา Levothyroxine')],
    medNote: 'ดื่มห่างจากเวลากินยาอย่างน้อย 4 ชั่วโมง' },
  { id: 'coffee', name: 'กาแฟดำ', serving: '1 แก้ว', kcal: 5, level: 2, emoji: '☕', hue: '#7A5236',
    nutrients: { protein: 0, fat: 0, carb: 1, iodine: 0 },
    reasons: [g('แคลอรี่ต่ำเมื่อไม่ใส่น้ำตาล'), w('กาแฟลดการดูดซึมยาไทรอยด์หากดื่มใกล้เวลากินยา')],
    medNote: 'ดื่มหลังกินยาอย่างน้อย 30–60 นาที' },
  { id: 'noodle', name: 'บะหมี่กึ่งสำเร็จรูป', serving: '1 ซอง', kcal: 420, level: 3, emoji: '🍜', hue: '#E9B85C',
    nutrients: { protein: 9, fat: 17, carb: 58, iodine: 5 },
    reasons: [b('โซเดียมสูงมาก เกินครึ่งของปริมาณที่ควรได้ต่อวัน'), b('ไขมันอิ่มตัวสูงจากเส้นทอด'), b('สารอาหารที่จำเป็นต่ำ')] },
  { id: 'fried', name: 'ไก่ทอด', serving: '2 ชิ้น', kcal: 520, level: 3, emoji: '🍗', hue: '#C98745',
    nutrients: { protein: 32, fat: 30, carb: 22, iodine: 6 },
    reasons: [b('ทอดน้ำมันท่วม ไขมันสูง'), b('อาหารทอดบ่อยๆ เพิ่มการอักเสบในร่างกาย')] },
  { id: 'boba', name: 'ชานมไข่มุก', serving: '1 แก้วใหญ่', kcal: 350, level: 3, emoji: '🧋', hue: '#B98A63',
    nutrients: { protein: 3, fat: 9, carb: 62, iodine: 1 },
    reasons: [b('น้ำตาลสูงมาก'), b('เพิ่มน้ำหนักง่าย ซึ่งเป็นปัญหาที่พบบ่อยในภาวะไทรอยด์ต่ำ')] },
];

const byId = new Map(FOODS.map((f) => [f.id, f]));
export const getFood = (id: string): Food | undefined => byId.get(id);

export const LEVEL_INFO: Record<Level, { title: string; label: string; desc: string }> = {
  1: { title: 'ระดับที่ 1', label: 'สามารถรับประทานได้', desc: 'เหมาะกับผู้ป่วยโรคไทรอยด์ รับประทานได้ตามปกติ' },
  2: { title: 'ระดับที่ 2', label: 'ควรรับประทานในปริมาณที่เหมาะสม', desc: 'มีสารอาหารบางชนิดที่อาจมีผลต่อไทรอยด์หรือการดูดซึมยา' },
  3: { title: 'ระดับที่ 3', label: 'ควรหลีกเลี่ยง', desc: 'อาจรบกวนการทำงานของไทรอยด์หรือส่งผลเสียต่อสุขภาพ' },
};

/** จานที่กล้องจำลอง "จำ" ได้ — สุ่มเมื่อผู้ใช้ไม่ได้เลือก */
export const SCAN_SAMPLES = ['salmon', 'basil', 'noodle', 'tofu', 'somtam', 'fish'];

/** AI จำลอง: หน่วงเวลาแล้วคืนเมนู */
export function mockAnalyze(preferId?: string): Promise<Food> {
  const id = preferId ?? SCAN_SAMPLES[Math.floor(Math.random() * SCAN_SAMPLES.length)];
  return new Promise((resolve) => setTimeout(() => resolve(getFood(id) ?? FOODS[0]), 1400));
}
