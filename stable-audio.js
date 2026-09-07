(() => {
  const mapping = window.__LISTENING_AUDIO_MAP__ || {};
  const synth = window.speechSynthesis;
  if (!synth) return;

  const native = {
    speak: synth.speak.bind(synth),
    cancel: synth.cancel.bind(synth),
    pause: synth.pause.bind(synth),
    resume: synth.resume.bind(synth),
  };
  let audio = null;
  let utterance = null;
  const diagnostics = { source: 'fixed-en-GB-audio', plays: [], errors: [] };
  window.__stableListeningAudioDiagnostics = diagnostics;

  function notify(name, detail) {
    const handler = utterance?.[`on${name}`];
    if (typeof handler === 'function') handler(new CustomEvent(name, { detail }));
  }
  function stop() {
    if (!audio) return;
    audio.onended = null;
    audio.onerror = null;
    audio.pause();
    audio.removeAttribute('src');
    audio.load();
    audio = null;
    utterance = null;
  }
  function speak(next) {
    stop();
    const relative = mapping[next?.text];
    if (!relative) {
      diagnostics.errors.push({ type: 'unmapped-text', text: next?.text || '' });
      utterance = next;
      notify('error', { error: 'unmapped-text' });
      utterance = null;
      return;
    }
    utterance = next;
    audio = new Audio(new URL(relative, document.baseURI).href);
    const instance = audio;
    audio.preload = 'auto';
    audio.playbackRate = Math.min(1, Math.max(0.78, Number(next.rate) || 0.9));
    diagnostics.plays.push({ src: audio.src, rate: audio.playbackRate, text: next.text });
    audio.onended = () => {
      notify('end');
      audio = null;
      utterance = null;
    };
    audio.onerror = () => {
      const src = audio?.src;
      diagnostics.errors.push({ type: 'audio-error', src });
      notify('error', { error: 'audio-error', src });
      audio = null;
      utterance = null;
    };
    audio.play().catch(error => {
      if (audio !== instance) return;
      diagnostics.errors.push({ type: 'play-rejected', message: String(error) });
      notify('error', { error: 'play-rejected' });
      audio = null;
      utterance = null;
    });
  }
  function pause() { if (audio && !audio.paused) audio.pause(); }
  function resume() { if (audio?.paused) audio.play().catch(error => diagnostics.errors.push({ type: 'resume-rejected', message: String(error) })); }

  try {
    synth.speak = speak;
    synth.cancel = stop;
    synth.pause = pause;
    synth.resume = resume;
    diagnostics.overrideActive = synth.speak === speak;
  } catch (error) {
    diagnostics.errors.push({ type: 'override-failed', message: String(error) });
    Object.assign(synth, native);
  }
})();
