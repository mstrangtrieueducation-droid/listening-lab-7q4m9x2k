const fs=require('fs'),vm=require('vm'),assert=require('assert/strict'),{webcrypto}=require('crypto');
const changes=JSON.parse(fs.readFileSync(__dirname+'/contract.json','utf8')).pages[0].expected.slice(0,2).map(x=>({name:x.file}));
const source=fs.readFileSync(__dirname+'/../../'+changes[0].name,'utf8');
const durable=fs.readFileSync(__dirname+'/../../'+changes[1].name,'utf8');
const stable=v=>JSON.stringify(function sort(x){return Array.isArray(x)?x.map(sort):x&&typeof x==='object'?Object.fromEntries(Object.keys(x).sort().map(k=>[k,sort(x[k])])):x;}(v));
function env(seed=[]){
 const map=new Map(seed),events={};let requests=0;
 const storage={getItem:k=>map.get(k)??null,setItem:(k,v)=>map.set(k,v),removeItem:k=>map.delete(k),key:i=>[...map.keys()][i],get length(){return map.size}};
 const window={crypto:webcrypto,localStorage:storage,sessionStorage:storage,navigator:{onLine:true},addEventListener:(k,f)=>events[k]=f,dispatchEvent:()=>{}};
 const ctx=vm.createContext({window,console,Map,Set,Date,JSON,Number,String,Error,TypeError,Promise,Uint8Array,URLSearchParams,AbortController,location:{origin:'https://mstrangtrieueducation-droid.github.io'},CustomEvent:class{},setTimeout:()=>1,clearTimeout:()=>{},fetch:async(_url,opts)=>{requests++;const p=JSON.parse(opts.body.get('payload'));return {ok:true,json:async()=>({ok:true,requestId:p.requestId,nonce:p.nonce,data:{persisted:true,submitted:true,submissionId:p.submissionId,score:Number(p.fields['entry.1458483854'])+Number(p.fields['entry.1462331495']),total:p.fields['entry.274579751'].startsWith('FL2-R')?50:35}})}}});
 // Export the actual private validator only in this VM; production stays unchanged.
 vm.runInContext(source.replace('root.IELTSSubmission={','root.__receipt=validateReceipt;root.IELTSSubmission={'),ctx);
 return{window,ctx,map,requests:()=>requests};
}
function payload(code){return{version:1,source:'fighter-listening-submit',action:'submitFighterListening',submissionId:'fighter-regression-123456789',fields:{'entry.274579751':code,'entry.1458483854':code.startsWith('FL2-R')?'40':'25','entry.1462331495':'10'}}}
(async()=>{
 for(const [code,total] of [['FL1-R01 · REAL HUMAN LISTENING',35],['FL2-R01 · REAL HUMAN LISTENING',50],['FL2-R50 · REAL HUMAN LISTENING',50],['FL2-P01 · SCIENCE',35]]){
  const e=env(),p=payload(code);await e.window.IELTSSubmission.ready;assert.equal(e.requests(),0);
  vm.runInContext(durable,e.ctx);const rec={submissionId:p.submissionId,payload:p,scores:{listening:total-10,paraphrase:10},receipt:false};
  const result=await e.window.IELTSFighterDurable.send('key',rec);assert.equal(result.receipt,true);assert.equal(e.requests(),1);
  await e.window.IELTSFighterDurable.send('key',rec);assert.equal(e.requests(),1);
  const good={persisted:true,submitted:true,submissionId:p.submissionId,score:total,total};assert.equal(e.window.__receipt(p,good).total,total);
  for(const wrong of [{total:total===50?35:50},{score:total-1},{submissionId:'another-student'},{persisted:false}])assert.throws(()=>e.window.__receipt(p,{...good,...wrong}),{code:'INVALID_RECEIPT'});
 }
 for(const code of ['FL2-R01 · REAL HUMAN LISTENING','FL1-R50 · REAL HUMAN LISTENING','FL2-R51 · REAL HUMAN LISTENING']){
  const p=payload(code),record={version:2,submissionId:p.submissionId,payload:p,canonical:stable(p),status:'blocked',revision:1,error:{code:'INVALID_ASSIGNMENT'},dismissed:true};
  const e=env([['mtt-submission-v2:'+p.submissionId,JSON.stringify(record)]]);await e.window.IELTSSubmission.ready;const r=await e.window.IELTSSubmission.lookup(p.submissionId);
  assert.equal(r.status,code.includes('R51')?'blocked':'pending');assert.equal(stable(r.payload),stable(p));assert.equal(e.requests(),0);
 }
 const e=env();await e.window.IELTSSubmission.ready;
 const p={action:'submitListening',submissionId:'listening-regression-1234',scores:[20,10,20,10]};
 assert.equal(e.window.__receipt(p,{submitted:true,persisted:true,submissionId:p.submissionId,score:60,total:60}).total,60);
 assert.throws(()=>e.window.__receipt(p,{submitted:true,persisted:true,submissionId:p.submissionId,score:50,total:50}),{code:'INVALID_RECEIPT'});
 console.log('PASS: 35/50-point receipts, duplicate submit, immutable recovery, wrong receipt rejection, legacy and IELTS compatibility. No live submissions.');
})().catch(e=>{console.error(e);process.exitCode=1});
