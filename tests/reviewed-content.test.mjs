import test from 'node:test';
import assert from 'node:assert/strict';
import {isCorrectAnswer} from '../app/answer-matching.ts';
import {reviewedContent} from '../app/reviewed-content.generated.ts';
import fs from 'node:fs';

test('numeric grading preserves decimal values while allowing explicit equivalents', () => {
  assert.equal(isCorrectAnswer('31 percent', '3.1 percent'), false);
  assert.equal(isCorrectAnswer('3.1%', '3.1 percent', ['3.1%']), true);
  assert.equal(isCorrectAnswer('much better equipped', 'much better-equipped'), true);
  assert.equal(isCorrectAnswer('seventy years', 'seven years'), false);
  assert.equal(isCorrectAnswer('', ''), false);
});
test('every revised lesson has sequential unique gaps and usable replay clips', () => {
  for (const [index, lesson] of Object.entries(reviewedContent)) {
    const expected = Number(index) < 50 ? 25 : 40;
    const numbers = [...lesson.paragraphs.join(' ').matchAll(/\[(\d+)\]/g)].map(m => Number(m[1]));
    assert.deepEqual(numbers, Array.from({length: expected}, (_, i) => i+1));
    assert.equal(lesson.answers.length, expected);
    assert(!/https?:\/\/|!\[|\]\(|Image \d+:/.test(lesson.paragraphs.join(' ')));
    assert.equal(lesson.paraphrases.length, 10);
    assert.equal(new Set(lesson.paraphrases.map(p => p[1])).size, 10);
    for (const pair of lesson.paraphrases) assert(pair[4] > pair[3]);
    for (const [i, answer] of lesson.answers.entries()) {
      assert(isCorrectAnswer(answer, answer));
      for (const variant of lesson.acceptedVariants[i]) assert(isCorrectAnswer(variant, answer, lesson.acceptedVariants[i]));
    }
  }
});
test('revision scopes saved answers while preserving existing routing/form identity', () => {
  const source = fs.readFileSync(new URL('../app/page.tsx', import.meta.url), 'utf8');
  assert(source.includes(':content-${lesson.contentRevision}'));
  assert(source.includes('"entry.274579751": formLessonCodes[lessonIndex]'));
  const old = JSON.parse(fs.readFileSync(new URL('../support/review-baseline.json',import.meta.url),'utf8'));
  for (const token of Object.keys(old.routes)) assert(source.includes(`"${token}"`), `Lost route ${token}`);
});
