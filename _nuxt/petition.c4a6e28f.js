import{a as m}from"./LayoutSearch.68fe6718.js";import{_ as v,a as f}from"./signing-true.1f8a74cd.js";import{a as y,m as p,o as h,b as B,C as c,e as i,y as n,u,F as x,H as L,t as g,p as A,k as S,c as I}from"./entry.d91b6b74.js";import{_ as T}from"./send.debd9592.js";const k=""+globalThis.__publicAssetsURL("signing-false.png"),P=""+globalThis.__publicAssetsURL("create-signing.png");const t=o=>(A("data-v-67ae552c"),o=o(),S(),o),N={class:"container"},V={class:"petition-container"},$={class:"icon"},j=t(()=>i("h4",null,"已參與連署",-1)),w=t(()=>i("img",{src:f,height:"28",alt:""},null,-1)),C=t(()=>i("h4",null,"支持連署",-1)),F=t(()=>i("img",{src:k,height:"28",alt:""},null,-1)),M=t(()=>i("div",{class:"spacing"},null,-1)),O=t(()=>i("span",null,"已達標",-1)),R=t(()=>i("h4",null,"前往看板",-1)),U=t(()=>i("img",{src:T,height:"28",alt:""},null,-1)),D=L('<div class="launch-petition" data-v-67ae552c><div class="launch-title" data-v-67ae552c><h3 data-v-67ae552c>發起連署</h3><p data-v-67ae552c>#注意: 每個用戶每個月最多只能發起3次連署！</p></div><div class="launch-container" data-v-67ae552c><input type="text" placeholder="請輸入欲連署的看板名稱..." class="title" data-v-67ae552c><input type="text" placeholder="請輸入開版動機..." class="launch-reason" data-v-67ae552c><div class="button" data-v-67ae552c><h4 data-v-67ae552c>發起連署！</h4><img src="'+P+'" height="28" alt="" data-v-67ae552c></div></div></div>',1),E={__name:"Petition",props:{signingBoards:{type:Array[Object],default:[{"signing-board-id":"uuid-board-id","signing-board-title":"board-title","number-of-signers":0,"user-is-supported":!1}]},recentlyAchievedBoards:{type:Array[Object],default:[{"board-id":"board-uuid","board-title":"board-title"}]}},setup(o){const a=o,b=p(_());function _(){const d=a.signingBoards,l=[];for(let r=0;r<d.length;r++){const e=d[r],s={"board-id":e["signing-board-id"],"board-title":e["signing-board-title"],"number-of-signers":e["number-of-signers"],"user-is-supported":e["user-is-supported"]};l.push(s)}return l}return(d,l)=>{const r=m,e=v;return h(),B(x,null,[c(r),i("div",N,[i("div",V,[c(e,{listTitle:"參與連署投票 !",progressBar:!0,list:u(b),titleMaxLine:2},{icon:n(({numberOfSigners:s})=>[i("div",$,[i("h4",null,g(s)+"/30",1)])]),title:n(({title:s})=>[i("h4",null,g(s),1)]),buttonActive:n(()=>[j,w]),buttonInactive:n(()=>[C,F]),_:1},8,["list"]),M,c(e,{listTitle:"近期連署看板：",linkToBoard:!0,list:a.recentlyAchievedBoards,titleMaxLine:2},{icon:n(()=>[O]),title:n(({title:s})=>[i("h4",null,g(s),1)]),buttonInactive:n(()=>[R,U]),_:1},8,["list"])]),D])],64)}}},H=y(E,[["__scopeId","data-v-67ae552c"]]),K={__name:"petition",setup(o){const a=p({"signing-boards":[{"signing-board-id":"uuid-signing-board-1","signing-board-title":"signing-board-title-1","number-of-signers":27,"user-is-supported":!0},{"signing-board-id":"uuid-signing-board-2","signing-board-title":"signing-board-title-2","number-of-signers":25,"user-is-supported":!1},{"signing-board-id":"uuid-signing-board-3","signing-board-title":"signing-board-title-3 signing-board-title-3 signing-board-title-3 signing-board-title-3","number-of-signers":23,"user-is-supported":!1},{"signing-board-id":"uuid-signing-board-4","signing-board-title":"signing-board-title-4","number-of-signers":21,"user-is-supported":!0},{"signing-board-id":"uuid-signing-board-5","signing-board-title":"signing-board-title-5","number-of-signers":19,"user-is-supported":!1},{"signing-board-id":"uuid-signing-board-6","signing-board-title":"signing-board-title-6","number-of-signers":7,"user-is-supported":!0}],"recently-achieved-boards":[{"board-id":"uuid-board-id-1","board-title":"board-title-1"},{"board-id":"uuid-board-id-2","board-title":"board-title-2"},{"board-id":"uuid-board-id-3","board-title":"board-title-3 board-title-3 board-title-3 board-title-3 board-title-3"},{"board-id":"uuid-board-id-4","board-title":"board-title-4"},{"board-id":"uuid-board-id-5","board-title":"board-title-5"},{"board-id":"uuid-board-id-6","board-title":"board-title-6"},{"board-id":"uuid-board-id-7","board-title":"board-title-7"}]});return(b,_)=>{const d=H;return h(),I(d,{signingBoards:u(a)["signing-boards"],recentlyAchievedBoards:u(a)["recently-achieved-boards"]},null,8,["signingBoards","recentlyAchievedBoards"])}}};export{K as default};
