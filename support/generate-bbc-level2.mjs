import fs from "node:fs";
import path from "node:path";

const root = path.resolve(import.meta.dirname, "..");
const sourceDir = path.join(root, "source-media-work", "bbc40");
const manifest = JSON.parse(fs.readFileSync(path.join(sourceDir, "manifest.json"), "utf8"));

const entityMap = {
  amp: "&", quot: '"', apos: "'", nbsp: " ", ndash: "–", mdash: "—",
  lsquo: "‘", rsquo: "’", ldquo: "“", rdquo: "”", hellip: "…", pound: "£",
};
const decodeHtml = (text) => text.replace(/&(#x[0-9a-f]+|#\d+|[a-z]+);/gi, (_, entity) => {
  if (entity[0] === "#") {
    const value = entity[1].toLowerCase() === "x" ? parseInt(entity.slice(2), 16) : parseInt(entity.slice(1), 10);
    return Number.isFinite(value) ? String.fromCodePoint(value) : " ";
  }
  return entityMap[entity.toLowerCase()] ?? " ";
});

const sentenceSplit = (text) => (text.match(/[^.!?]+(?:[.!?]+[”’']?|$)/g) || [text])
  .map((part) => part.replace(/\s+/g, " ").trim())
  .filter((part) => part.length > 18);

function cleanTranscript(html) {
  const noteAt = html.indexOf("Note: This is not a word-for-word transcript");
  if (noteAt < 0) throw new Error("Transcript marker missing");
  const start = html.indexOf("</p>", noteAt) + 4;
  let end = html.indexOf("<h3>Next</h3>", start);
  if (end < 0) end = html.indexOf('<div class="widget widget-list', start);
  let fragment = html.slice(start, end);
  fragment = fragment
    .replace(/<p><a[^>]*>[\s\S]*?<img[\s\S]*?<\/p>/gi, " ")
    .replace(/<strong[^>]*>([^<>]{1,60})<\/strong>\s*<br\s*\/?>/gi, "\n\n$1:\n")
    .replace(/<br\s*\/?>/gi, "\n")
    .replace(/<\/(?:p|div|h\d)>/gi, "\n")
    .replace(/<[^>]+>/g, " ");
  const lines = decodeHtml(fragment).split(/\r?\n/).map((line) => line.replace(/\s+/g, " ").trim()).filter(Boolean);
  const spoken = lines.filter((line) => !/^[A-Z][A-Za-zÀ-ž .'-]{0,55}:$/.test(line)).join(" ");
  const sentences = sentenceSplit(spoken).filter((sentence) => {
    return !/worksheet|our website|bbclearningenglish|transcript of this episode|subscribe|six minutes are up|bye for now|goodbye|test what you(?:'|’)ve learned|hello and welcome|let's recap the vocabulary|link in the notes below/i.test(sentence);
  });
  return sentences.join(" ")
    .replace(/BBC Radio 4 programme\s+[A-Z][A-Za-z ]+/g, "a radio programme")
    .replace(/BBC World Service/g, "the programme")
    .replace(/BBC Learning English/g, "the programme")
    .replace(/BBC Radio 4/g, "a radio programme")
    .replace(/BBC/g, "the programme")
    .replace(/6 Minute English/g, "this programme")
    .replace(/\s+/g, " ")
    .trim();
}

const stopwords = new Set("a an the and or but if so to of in on at for from with by as is are was were be been being it its this that these those i you we they he she my your our their do does did have has had can could will would should may might not very more most some any all one two about into over after before than then also just really how what which who when where why".split(" "));
const wordRegex = /(?:\d+(?:[.,]\d+)*(?:%|st|nd|rd|th)?|[A-Za-z]+(?:[’'-][A-Za-z]+)*)/g;

function chooseGaps(text, count = 40) {
  const tokens = [...text.matchAll(wordRegex)].map((match) => ({ start: match.index, end: match.index + match[0].length, word: match[0] }));
  const candidates = [];
  for (let start = 0; start < tokens.length - 5; start += 1) {
    for (let length = 5; length <= 7 && start + length <= tokens.length; length += 1) {
      const first = tokens[start];
      const last = tokens[start + length - 1];
      const phrase = text.slice(first.start, last.end);
      if (/[.!?;:\n]/.test(phrase)) continue;
      const words = tokens.slice(start, start + length);
      const content = words.filter((token) => !stopwords.has(token.word.toLowerCase())).length;
      const numeric = words.some((token) => /\d/.test(token.word));
      if (stopwords.has(words[0].word.toLowerCase()) || /^(well|right|yes|okay|ok|indeed)$/i.test(words[0].word)) continue;
      if (first.start < text.length * .07 || last.end > text.length * .87) continue;
      const score = content * 7 + length + (numeric ? 20 : 0);
      candidates.push({ start: first.start, end: last.end, phrase, center: (first.start + last.end) / 2, score, numeric });
    }
  }

  const selected = [];
  const overlaps = (candidate) => selected.some((item) => candidate.start < item.end + 18 && candidate.end + 18 > item.start);
  for (let slot = 0; slot < count; slot += 1) {
    const target = text.length * (.075 + .79 * ((slot + .5) / count));
    const halfBin = text.length * .79 / count * .65;
    const nearby = candidates
      .filter((candidate) => !overlaps(candidate))
      .sort((a, b) => {
        const aLocalNumber = a.numeric && Math.abs(a.center - target) < halfBin ? 60 : 0;
        const bLocalNumber = b.numeric && Math.abs(b.center - target) < halfBin ? 60 : 0;
        const aRank = a.score + aLocalNumber - Math.abs(a.center - target) / halfBin * 18;
        const bRank = b.score + bLocalNumber - Math.abs(b.center - target) / halfBin * 18;
        return bRank - aRank;
      })[0];
    if (nearby) selected.push(nearby);
  }
  while (selected.length < count) {
    const next = candidates.filter((candidate) => !overlaps(candidate)).sort((a, b) => b.score - a.score)[0];
    if (!next) break;
    selected.push(next);
  }
  if (selected.length < count) throw new Error(`Only ${selected.length} non-overlapping gaps available`);
  return selected.sort((a, b) => a.start - b.start).slice(0, count);
}

function splitBalanced(text, parts = 6) {
  const groups = [];
  let cursor = 0;
  for (let part = 1; part < parts; part += 1) {
    const target = Math.round(text.length * part / parts);
    const tail = text.slice(target);
    const match = tail.match(/[.!?][”’']?\s+/);
    const split = match ? target + match.index + match[0].length : target;
    groups.push(text.slice(cursor, split).trim());
    cursor = split;
  }
  groups.push(text.slice(cursor).trim());
  return groups.filter(Boolean);
}

const synonymRules = [
  [/\bpeople\b/gi, "individuals"], [/\bchildren\b/gi, "young people"], [/\bhelp\b/gi, "assist"],
  [/\bshows?\b/gi, "demonstrates"], [/\bfound\b/gi, "identified"], [/\bimportant\b/gi, "significant"],
  [/\buse\b/gi, "employ"], [/\bmake\b/gi, "produce"], [/\bchange\b/gi, "alter"],
  [/\bmore\b/gi, "a greater amount"], [/\bless\b/gi, "a smaller amount"], [/\bbig\b/gi, "substantial"],
  [/\bproblem\b/gi, "difficulty"], [/\bway\b/gi, "method"], [/\bthink\b/gi, "consider"],
  [/\bstart\b/gi, "begin"], [/\bneed\b/gi, "require"], [/\bget\b/gi, "obtain"],
  [/\blook at\b/gi, "examine"], [/\bfind out\b/gi, "discover"], [/\ba lot of\b/gi, "a considerable number of"],
];
function paraphrase(phrase) {
  let changed = phrase;
  for (const [pattern, replacement] of synonymRules) changed = changed.replace(pattern, replacement);
  if (changed.toLowerCase() === phrase.toLowerCase()) changed = `the idea that ${phrase.charAt(0).toLowerCase()}${phrase.slice(1)}`;
  return changed;
}

function categoryFor(title) {
  const value = title.toLowerCase();
  if (/climate|planet|cold|cities|chocolate|food|pepper/.test(value)) return "SCIENCE & ENVIRONMENT";
  if (/brain|dyslexia|stress|sauna|drug|heal|screen/.test(value)) return "HEALTH & PSYCHOLOGY";
  if (/language|poetry|english|social media|email|advertis/.test(value)) return "LANGUAGE & MEDIA";
  if (/war|politic|debt|billionaire|driverless|cycle/.test(value)) return "SOCIETY & CHANGE";
  return "PEOPLE & IDEAS";
}

const lessons = [];
const academics = [];
const vocabularies = [];

for (const [offset, item] of manifest.entries()) {
  const html = fs.readFileSync(path.resolve(root, item.html), "utf8");
  const transcript = cleanTranscript(html);
  const gaps = chooseGaps(transcript, 40);
  let gapped = transcript;
  gaps.slice().reverse().forEach((gap, reverseIndex) => {
    const number = gaps.length - reverseIndex;
    gapped = `${gapped.slice(0, gap.start)}[${number}]${gapped.slice(gap.end)}`;
  });
  const paragraphs = splitBalanced(gapped, 6);
  const audioMatch = html.match(/bbcle-download-extension-mp3" href="([^"]+\.mp3)"/i);
  const audio = audioMatch ? decodeHtml(audioMatch[1]) : item.audio;
  const duration = Number(item.duration) || 397;
  const lessonNumber = offset + 11;
  const date = new Date(item.date);
  const monthYear = date.toLocaleDateString("en-GB", { month: "short", year: "numeric", timeZone: "UTC" }).toUpperCase();
  lessons.push({
    day: `LISTENING ${String(lessonNumber).padStart(2, "0")}`,
    category: categoryFor(item.title),
    title: item.title,
    kicker: "A focused discussion with real presenters, research evidence and expert viewpoints.",
    level: `B2+/C1 · ${Math.floor(duration / 60)}:${String(duration % 60).padStart(2, "0")} · ${monthYear}`,
    answers: gaps.map((gap) => gap.phrase),
    paragraphs,
    essay: { question: "", plan: [], language: [] },
    media: {
      kind: "audio",
      videoSrc: audio,
      posterSrc: "",
      duration,
      segments: Array.from({ length: 6 }, (_, index) => [Number((duration * index / 6).toFixed(2)), Number((duration * (index + 1) / 6).toFixed(2))]),
      sourceTitle: item.title,
      sourceUrl: "",
      credit: item.title,
      aspectRatio: "16 / 7",
    },
  });

  const paraIndexes = [2, 6, 10, 14, 18, 22, 26, 30, 34, 38];
  academics.push({
    code: `FL2-R${String(lessonNumber).padStart(2, "0")}`,
    style: "PARAPHRASE PRACTICE · ACADEMIC DISCUSSION",
    focus: "Track evidence, examples, qualifications and consequences across natural British speech.",
    signals: ["The discussion develops…", "The evidence suggests…", "A contrasting view is…", "The speakers conclude…"],
    paraphrases: paraIndexes.map((gapIndex) => {
      const gap = gaps[gapIndex];
      const start = Math.max(0, duration * gap.start / transcript.length - 1);
      return [gap.phrase, paraphrase(gap.phrase), "Recast the original phrase with a synonym or a more formal structure.", Number(start.toFixed(2)), Number(Math.min(duration, start + 9).toFixed(2))];
    }),
  });
  vocabularies.push(gaps.filter((_, index) => index % 4 === 0).slice(0, 10).map((gap) => ({
    term: gap.phrase,
    meaning: "cụm từ trọng tâm trong bài nghe",
    note: "Review this phrase in the surrounding sentence and notice how the words connect in natural speech.",
  })));
}

const output = `// Generated from forty recent, real-human British English discussions.\n` +
  `export const bbcLevel2ExtraLessons = ${JSON.stringify(lessons, null, 2)};\n\n` +
  `export const bbcLevel2ExtraAcademic = ${JSON.stringify(academics, null, 2)};\n\n` +
  `export const bbcLevel2ExtraVocabulary = ${JSON.stringify(vocabularies, null, 2)};\n`;
fs.writeFileSync(path.join(root, "app", "bbc-level2-extra.generated.ts"), output);
console.log(JSON.stringify({ lessons: lessons.length, gaps: lessons.reduce((sum, lesson) => sum + lesson.answers.length, 0), minDuration: Math.min(...lessons.map((lesson) => lesson.media.duration)), maxDuration: Math.max(...lessons.map((lesson) => lesson.media.duration)) }, null, 2));
