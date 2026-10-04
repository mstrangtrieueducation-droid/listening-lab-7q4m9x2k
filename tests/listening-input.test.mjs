import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';
import ts from 'typescript';

// Exercise the actual worksheet JSX and event handlers without media/network IO.
const page = fs.readFileSync(new URL('../app/page.tsx', import.meta.url), 'utf8');
const start = page.indexOf('  const renderText = ');
const end = page.indexOf('\n  return <main>', start);
assert(start >= 0 && end > start);
const source = `function field(values, lessonIndex, submitted, setValues) {
  const currentValues = values[lessonIndex];
  const lesson = { answers: ['two words', 'another answer'] };
  const isCorrectAnswer = () => false;
  ${page.slice(start, end)}
  return renderText('[1]').find(node => node.props.className === 'blank-wrap').props.children[1];
}`;
const output = ts.transpileModule(source, {compilerOptions: {
  jsx: ts.JsxEmit.React, target: ts.ScriptTarget.ES2022,
}}).outputText;
const context = vm.createContext({React: {createElement: (type, props, ...children) => ({type, props: {...props, children}})}});
vm.runInContext(output, context);

test('mobile draft preserves spaces/composition through repeated audio rerenders', () => {
  let answers = [['', 'untouched'], ['other lesson']];
  const save = updater => { answers = updater(answers); };
  let previousKey;
  for (const draft of ['one', 'one ', 'one two', 'one  two ', 'one big two', 'một từ ']) {
    const input = context.field(answers, 0, false, save);
    assert.equal(input.type, 'input');
    assert(!Object.hasOwn(input.props, 'value'), 'audio rerenders must not control the native draft');
    if (previousKey) assert.equal(input.props.key, previousKey, 'do not remount while typing');
    previousKey = input.props.key;
    input.props.onInput({currentTarget: {value: draft}});
    assert.equal(answers[0][0], draft);
    for (let tick = 0; tick < 4; tick++) {
      const rerender = context.field(answers, 0, false, save);
      assert.equal(rerender.props.defaultValue, draft);
      assert.equal(rerender.props.key, previousKey);
      assert(!Object.hasOwn(rerender.props, 'value'));
    }
    assert.equal(answers[0][1], 'untouched');
    assert.equal(answers[1][0], 'other lesson');
  }
  context.field(answers, 0, false, save).props.onCompositionEnd({currentTarget: {value: 'finished phrase '}});
  assert.equal(answers[0][0], 'finished phrase ');
  context.field(answers, 0, false, save).props.onBlur({currentTarget: {value: 'final edit '}});
  assert.equal(answers[0][0], 'final edit ');
});

test('restoring a submitted attempt remounts the disabled field with saved text', () => {
  const draft = context.field([['draft']], 0, false, () => {});
  const restored = context.field([['saved answer']], 0, true, () => {});
  assert.notEqual(restored.props.key, draft.props.key);
  assert.equal(restored.props.defaultValue, 'saved answer');
  assert.equal(restored.props.disabled, true);
  const otherLesson = context.field([['draft'], ['next lesson']], 1, false, () => {});
  assert.notEqual(otherLesson.props.key, draft.props.key);
});
