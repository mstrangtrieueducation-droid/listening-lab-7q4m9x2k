/* Safe immutable caller state. The shared transport owns durable network retries. */
(function(root){
  'use strict';
  const memory=new Map(),inflight=new Map(),preparing=new Map();
  const copy=value=>JSON.parse(JSON.stringify(value));
  let dbPromise;
  function database(){if(dbPromise)return dbPromise;return dbPromise=new Promise(resolve=>{try{const req=root.indexedDB.open('ielts-fighter-durable-v1',1);req.onupgradeneeded=()=>req.result.createObjectStore('records');req.onsuccess=()=>resolve(req.result);req.onerror=req.onblocked=()=>resolve(null);}catch(_){resolve(null);}});}
  async function dbCall(mode,operation){const db=await database();if(!db)return null;return new Promise(resolve=>{try{const tx=db.transaction('records',mode),req=operation(tx.objectStore('records'));let value;req.onsuccess=()=>{value=req.result;};tx.oncomplete=()=>resolve(value);tx.onerror=tx.onabort=()=>resolve(null);}catch(_){resolve(null);}});}
  function read(key){
    if(memory.has(key))return copy(memory.get(key));
    for(const name of ['localStorage','sessionStorage'])try{const raw=root[name].getItem(key);if(raw){const value=JSON.parse(raw);memory.set(key,value);return copy(value);}}catch(_){}
    return null;
  }
  function write(key,value){memory.set(key,copy(value));for(const name of ['localStorage','sessionStorage'])try{if(name==='localStorage'&&value.receipt)root[name].removeItem(key);else root[name].setItem(key,JSON.stringify(value));}catch(_){}return dbCall('readwrite',store=>value.receipt?store.delete(key):store.put(copy(value),key));}
  async function readAsync(key){return read(key)||await dbCall('readonly',store=>store.get(key));}
  root.IELTSFighterDurable={read,readAsync,write,
    prepare(key,factory){if(preparing.has(key))return preparing.get(key);const promise=(async()=>{const record=factory(await readAsync(key));await write(key,record);return copy(record);})();preparing.set(key,promise);promise.then(()=>preparing.delete(key),()=>preparing.delete(key));return promise;},
    send(key,record){
      const saved=read(key);if(saved?.submissionId===record.submissionId&&saved.receipt)return Promise.resolve(saved);
      record=copy(saved?.submissionId===record.submissionId?saved:record);
      if(inflight.has(record.submissionId))return inflight.get(record.submissionId);
      const pending=(async()=>{
        await write(key,record);
        const result=await root.IELTSSubmission.send(copy(record.payload));
        if(!result?.persisted||!result?.submitted||result.submissionId!==record.submissionId||result.score!==record.scores.listening+record.scores.paraphrase||result.total!==35)throw Error('INVALID_RECEIPT');
        record.receipt=true;await write(key,record);return copy(record);
      })();
      inflight.set(record.submissionId,pending);pending.then(()=>inflight.delete(record.submissionId),()=>inflight.delete(record.submissionId));return pending;
    },
    subscribe(key,callback){
      let disposed=false;
      const receive=async event=>{const record=await readAsync(key);if(disposed||!record?.payload||event.submissionId!==record.submissionId||event.status!=='confirmed')return;const result=event.result;if(!result?.persisted||!result?.submitted||result.submissionId!==record.submissionId||result.score!==record.scores.listening+record.scores.paraphrase||result.total!==35)return;record.receipt=true;await write(key,record);if(!disposed)callback(copy(record));};
      const unsubscribe=root.IELTSSubmission.subscribe?.(receive)||(()=>{});
      readAsync(key).then(async record=>{if(!record?.payload||disposed)return;const event=await root.IELTSSubmission.lookup?.(record.submissionId);if(event)await receive(event);});
      return()=>{disposed=true;unsubscribe();};
    }
  };
})(window);
