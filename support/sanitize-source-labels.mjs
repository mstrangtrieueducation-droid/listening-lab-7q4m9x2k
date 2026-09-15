import fs from "node:fs";
import path from "node:path";

const root = path.resolve(import.meta.dirname, "..");
const cleanGenerated = (relativePath) => {
  const file = path.join(root, relativePath);
  let text = fs.readFileSync(file, "utf8");
  text = text
    .replace(/!\[[^\]]*\]\(https?:\/\/[^)]+\)/g, "")
    .replace(/\[([^\]]+)\]\(https?:\/\/[^)]+\)/g, "$1")
    .replace(/"sourceUrl":\s*"[^"]*"/g, '"sourceUrl": ""')
    .replace(/A real BBC World Service feature/gi, "A real-human feature")
    .replace(/A real BBC Ideas feature/gi, "A real-human feature")
    .replace(/A real TED-Ed feature/gi, "A real-human feature")
    .replace(/A real VOA[^".]*report/gi, "A real-human report")
    .replace(/BBC World Service\s*·\s*/gi, "")
    .replace(/BBC Ideas\s*·\s*/gi, "")
    .replace(/TED-Ed\s*·\s*/gi, "")
    .replace(/VOA Learning English/gi, "the original report")
    .replace(/VOA Special English/gi, "the original programme")
    .replace(/\bVOA\b/gi, "the report")
    .replace(/Cụm từ học thuật được dùng trong ngữ cảnh của bản tin the report này\./g, "Cụm từ học thuật được dùng trong ngữ cảnh của bài nghe này.");
  fs.writeFileSync(file, text);
};

cleanGenerated("app/voa-level1.generated.ts");
cleanGenerated("app/real-course.generated.ts");

const pageFile = path.join(root, "app", "page.tsx");
let page = fs.readFileSync(pageFile, "utf8");
const marker = page.indexOf("const hideSourceNames");
const dataStart = page.indexOf("const realSourceLessons");
const prefix = page.slice(0, dataStart);
const head = page.slice(dataStart, marker)
  .replace(/sourceUrl:\s*"[^"]*"/g, 'sourceUrl: ""')
  .replace(/A real VOA[^".]*report/gi, "A real-human report")
  .replace(/A fast-paced BBC World Service feature/gi, "A fast-paced real-human feature")
  .replace(/VOA Learning English\s*·\s*/gi, "")
  .replace(/BBC World Service\s*·\s*/gi, "")
  .replace(/VOA Special English/gi, "the original programme")
  .replace(/\bVOA\b|\bBBC\b/gi, "the programme");
fs.writeFileSync(pageFile, prefix + head + page.slice(marker));
