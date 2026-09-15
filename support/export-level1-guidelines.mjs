import fs from "node:fs";
import path from "node:path";

const root = path.resolve(import.meta.dirname, "..");
const lessonSource = fs.readFileSync(path.join(root, "app", "voa-level1.generated.ts"), "utf8");
const pageSource = fs.readFileSync(path.join(root, "app", "page.tsx"), "utf8");
const lessonMatch = lessonSource.match(/export const voaLevel1Lessons = (\[[\s\S]*?\n\]) as const;\s*\nexport const/);
if (!lessonMatch) throw new Error("Could not read Level 1 lesson catalogue");
const lessons = JSON.parse(lessonMatch[1]);

const tokens = new Map();
for (const match of pageSource.matchAll(/"([a-z0-9]+)": \{ level: 1, week: (\d+), lessonIndex: \d+ \}/g)) {
  const week = Number(match[2]);
  if (!tokens.has(week)) tokens.set(week, match[1]);
}
// Keep the four links already issued to students.
tokens.set(1, "a7c9e2f4b6d1");
tokens.set(2, "e3b8d1a6f9c2");
tokens.set(3, "c5f2a9d7e1b4");
tokens.set(4, "f8a1c6e3d9b2");

if (lessons.length !== 50 || tokens.size < 50) throw new Error("Expected fifty Level 1 lessons and access tokens");
const rootUrl = "https://mstrangtrieueducation-droid.github.io/listening-lab-7q4m9x2k/";
const rows = lessons.map((lesson, index) => {
  const week = index + 1;
  const weekLabel = String(week).padStart(2, "0");
  const title = lesson.title.trim();
  const category = lesson.category.trim();
  const content = `Tự luyện · ${category} · ${title}\n25 cụm nghe chính tả + 10 câu paraphrase · B1+/B2`;
  const message = `🎧 FIGHTER LISTENING · LEVEL 1\nBài tự luyện · Tuần ${weekLabel}\n${category.toUpperCase()} · ${title.toUpperCase()}\n\nYêu cầu:\n(1) Nhập đúng họ tên và chọn lớp trước khi mở bài nghe.\n(2) Nghe bài ở đúng tốc độ 1.0x và điền đủ 25 cụm từ còn thiếu trong transcript.\n(3) Hoàn thành đủ 10 câu Paraphrase Practice.\n(4) Chỉ được nộp bài và xem đáp án sau khi đã trả lời đủ 35 câu.\n(5) Sau khi nộp, xem riêng điểm Nghe /25 và điểm Paraphrase /10; đọc phần giải thích từ vựng trong đáp án.\n\nBài không tính giờ; học sinh có thể tạm dừng, tua và nghe lại để tự phát hiện lỗi.\n🔗 Link: ${rootUrl}?access=${tokens.get(week)}\nHạn: ..., ngày .../.../20...`;
  return [week, content, message];
});

process.stdout.write(JSON.stringify(rows));
