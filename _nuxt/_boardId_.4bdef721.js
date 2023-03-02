import{u as $,_ as M,a as R}from"./LayoutSearch.68fe6718.js";import{a as U,r as f,w as N,o as n,b as r,e,t as c,F as m,f as k,u as o,h as v,i as g,v as b,j as O,p as x,k as B,l as A,m as S,q as V,s as P,x as z,c as q,y as D,z as E,A as F,B as K,C as L}from"./entry.d91b6b74.js";import{_ as G}from"./collect-true.04f69402.js";import{_ as H}from"./send.debd9592.js";const J=""+globalThis.__publicAssetsURL("arrow.png"),Q=""+globalThis.__publicAssetsURL("arrow-down.png"),T=""+globalThis.__publicAssetsURL("like-true.png"),I=""+globalThis.__publicAssetsURL("like-false.png"),X=""+globalThis.__publicAssetsURL("collect-false.png"),Y=""+globalThis.__publicAssetsURL("share.png");const W=a=>(x("data-v-9c766e2f"),a=a(),B(),a),Z={class:"board-infos-container"},j={class:"date"},ee={class:"tags"},te=["onClick"],oe={class:"links-container"},se=W(()=>e("span",null,"查看原文鏈結清單",-1)),ie={key:0,src:J,alt:"",height:"12"},ne={key:1,src:Q,alt:"",height:"12"},re={key:0,class:"links"},ue={class:"link"},ce=["href"],le={class:"user-controls"},ae={src:T,height:"24",alt:""},de={src:I,height:"24",alt:""},me={src:G,height:"24",alt:""},_e={src:X,height:"24",alt:""},pe=W(()=>e("img",{src:Y,height:"24",alt:""},null,-1)),he={__name:"BoardInfos",props:{date:{type:String,default:"date"},title:{type:String,default:"title"},tags:{type:Array[String],default:["tag"]},sourceLinkList:{type:Array[Object],default:[{"ref-article-title-in-other-website":"ref title","ref-article-link-in-other-website":"ref link"}]},isUserCollected:{type:Boolean,default:!1},isUserLike:{type:Boolean,default:!1},numberOfLike:{type:Number,default:0}},setup(a){const t=a,{searchTag:p}=$(),l=f(t.isUserLike),u=f(t.numberOfLike);N(l,()=>{const h=t.isUserLike?-1:0,_=t.numberOfLike+h,s=l.value?1:0;u.value=_+s});const i=f(t.isUserCollected),d=f(!1);return(h,_)=>(n(),r("div",Z,[e("h5",j,"#"+c(t.date),1),e("h1",null,c(t.title),1),e("ul",ee,[(n(!0),r(m,null,k(t.tags,s=>(n(),r("li",{onClick:y=>o(p)(s),class:"tag"},c(s),9,te))),256))]),e("div",oe,[e("div",{class:"link-title",onClick:_[0]||(_[0]=s=>d.value=!o(d))},[se,o(d)?v("",!0):(n(),r("img",ie)),o(d)?(n(),r("img",ne)):v("",!0)]),o(d)?(n(),r("ul",re,[(n(!0),r(m,null,k(t.sourceLinkList,s=>(n(),r("li",ue,[e("a",{href:s["ref-article-link-in-other-website"]},[e("span",null,c(s["ref-article-title-in-other-website"])+":",1),O(c(s["ref-article-link-in-other-website"]),1)],8,ce)]))),256))])):v("",!0)]),e("div",le,[e("div",{class:"like-container",onClick:_[1]||(_[1]=s=>l.value=!o(l))},[g(e("img",ae,null,512),[[b,o(l)]]),g(e("img",de,null,512),[[b,!o(l)]]),e("h5",null,c(o(u)),1)]),e("div",{class:"collect-container",onClick:_[2]||(_[2]=s=>i.value=!o(i))},[g(e("img",me,null,512),[[b,o(i)]]),g(e("img",_e,null,512),[[b,!o(i)]])]),pe])]))}},ke=U(he,[["__scopeId","data-v-9c766e2f"]]),ge=""+globalThis.__publicAssetsURL("image-cloud.png");const fe={class:"keyword-analysis-container"},be={class:"keyword-analysis"},we={class:"entire-keyword-with-count"},ye=e("div",null,[e("h4",null,"關鍵詞"),e("h4",null,"次數")],-1),ve=e("img",{src:ge,height:"300",alt:""},null,-1),Le={class:"keyword-bar-chart"},Ce={key:0,class:"keyword"},$e=["data-max-count","data-count"],Me={__name:"BoardAnalysis",props:{imageCloud:{type:String,default:"/image-cloud.png"},keywordsWithCount:{type:Array[Object],default:[{keyword:"keyword",count:0}]}},setup(a){const t=a;function p(l){let u=0;for(let i=0;i<l.length;i++)l[i].count>u&&(u=l[i].count);return u}return A(()=>{const l=document.querySelectorAll(".keyword .keyword-bar");for(let u=0;u<l.length;u++){const i=l[u],d=i.dataset.count,h=i.dataset.maxCount;i.style.width=`${50+150*(d/h)}px`}}),(l,u)=>(n(),r("div",fe,[e("div",be,[e("div",we,[ye,e("ul",null,[(n(!0),r(m,null,k(t.keywordsWithCount,i=>(n(),r("li",null,[e("h4",null,c(i.keyword),1),e("h4",null,c(i.count),1)]))),256))])]),ve,e("div",Le,[(n(!0),r(m,null,k(t.keywordsWithCount,(i,d)=>(n(),r(m,null,[d<=4?(n(),r("div",Ce,[e("div",{class:"keyword-bar","data-max-count":p(t.keywordsWithCount),"data-count":i.count},c(i.keyword),9,$e),e("span",null,c(i.count),1)])):v("",!0)],64))),256))])])]))}},Ue=""+globalThis.__publicAssetsURL("report.png");const w=a=>(x("data-v-4c37e953"),a=a(),B(),a),xe={class:"position-container"},Be={class:"position-bar"},Ae=["onClick"],Se={class:"comment-container"},qe={class:"comments"},Te={class:"comment"},Ie=w(()=>e("img",{class:"headshot",src:M,alt:"",height:"50"},null,-1)),We={class:"date"},Re={class:"like-container"},Ne={src:T,height:"16",alt:""},Oe={src:I,height:"16",alt:""},Ve=w(()=>e("img",{class:"report",src:Ue,alt:"",height:"24"},null,-1)),Pe={class:"leave-comment-container"},ze={class:"leave-comment"},De=w(()=>e("h3",null,"留下您的想法吧！",-1)),Ee={class:"leave-comment-input-container"},Fe=w(()=>e("img",{src:M,height:"50",alt:""},null,-1)),Ke={class:"input-container"},Ge=w(()=>e("img",{src:H,height:"24",alt:""},null,-1)),He={class:"suggest-boards"},Je=w(()=>e("h3",null,"更多類似看板：",-1)),Qe={class:"infos"},Xe={class:"date"},Ye=["onClick"],Ze={class:"title"},je={__name:"BoardPosition",props:{positions:{type:Array[Object],defulat:[{"position-name":"position","position-id":"position-uuid",comments:[{"comment-id":"comment-uuid","commented-user-id":"user-uuid","commented-user-name":"user name","commented-user-headshot-number":0,"commented-date":"commented date","is-user-liked":!1,"is-user-reported":!1,"number-of-liker":0,content:"comments"}]}]}},setup(a){const t=a,{searchTag:p}=$(),l=S({data:[{"board-id":"board-id-1","number-of-like":573,date:"2022-10-27",title:"早餐應該要吃中式還是西式?",tags:["早餐","中式","西式"],"image-cloud":"/image-cloud.png","keyworks-with-count":[{keyword:"蛋餅",count:58},{keyword:"漢堡",count:52},{keyword:"饅頭",count:47}]},{"board-id":"board-id-2","number-of-like":489,date:"2022-11-12",title:"今年天氣是不是比較冷啊?",tags:["氣候","全球暖化"],"image-cloud":"/image-cloud.png","keyworks-with-count":[{keyword:"好冷",count:75},{keyword:"電暖器",count:57},{keyword:"冰棒",count:32}]},{"board-id":"board-id-3","number-of-like":315,date:"2022-12-25",title:"聖誕節還是一個人過該怎麼辦?",tags:["魯蛇","聖誕節","伴侶","女朋友"],"image-cloud":"/image-cloud.png","keyworks-with-count":[{keyword:"魯蛇",count:87},{keyword:"笑死",count:45},{keyword:"可悲",count:32}]},{"board-id":"board-id-4","number-of-like":279,date:"2023-1-1",title:"今年的元旦依舊在家睡到飽，真的有人會去參加元旦升旗典禮嗎?",tags:["升旗","元旦","睡飽","跨年"],"image-cloud":"/image-cloud.png","keyworks-with-count":[{keyword:"升旗",count:87},{keyword:"元旦",count:45},{keyword:"睡飽",count:32},{keyword:"跨年",count:25}]}]}),u=f(0),i=f("");return(d,h)=>{const _=F;return n(),r("div",xe,[e("div",Be,[(n(!0),r(m,null,k(t.positions,(s,y)=>(n(),r("div",{class:z(["position",[o(u)==y?"active":""]]),onClick:C=>u.value=y},[e("h4",null,c(s["position-name"]),1)],10,Ae))),256))]),e("div",Se,[e("div",qe,[e("ul",null,[(n(!0),r(m,null,k(t.positions[o(u)].comments,s=>(n(),r("li",Te,[Ie,e("div",null,[e("h5",We,"# "+c(s["commented-date"]),1),e("div",null,[e("h4",null,c(s["commented-user-name"]),1),e("div",Re,[g(e("img",Ne,null,512),[[b,s["is-user-liked"]]]),g(e("img",Oe,null,512),[[b,!s["is-user-liked"]]]),e("h5",null,c(s["number-of-like"]),1)])]),e("p",null,c(s.content),1)]),Ve]))),256))])]),e("div",Pe,[e("div",ze,[e("div",null,[De,e("span",null,"in "+c(t.positions[o(u)]["position-name"]),1)]),e("div",Ee,[Fe,e("div",Ke,[g(e("input",{type:"text",placeholder:"請輸入留言內容...","onUpdate:modelValue":h[0]||(h[0]=s=>P(i)?i.value=s:null)},null,512),[[V,o(i)]]),Ge])])]),e("div",He,[Je,e("ul",null,[(n(!0),r(m,null,k(o(l).data,(s,y)=>(n(),r(m,null,[y<=3?(n(),q(_,{key:0,to:"/board/"+s["board-id"]},{default:D(()=>[e("li",null,[e("div",Qe,[e("h5",Xe,c(s.date),1),e("ul",null,[(n(!0),r(m,null,k(s.tags,C=>(n(),r("li",{onClick:E(st=>o(p)(C),["prevent"])},"#"+c(C),9,Ye))),256))])]),e("h3",Ze,c(s.title),1)])]),_:2},1032,["to"])):v("",!0)],64))),256))])])])])])}}},et=U(je,[["__scopeId","data-v-4c37e953"]]);const tt={class:"container"},ot={__name:"Board",props:{date:{type:String,default:"date"},title:{type:String,default:"title"},tags:{type:Array[String],default:["tag"]},sourceLinkList:{type:Array[Object],default:[{"ref-article-title-in-other-website":"ref title","ref-article-link-in-other-website":"ref link"}]},isUserCollected:{type:Boolean,default:!1},isUserLike:{type:Boolean,default:!1},imageCloud:{type:String,default:"/image-cloud.png"},numberOfLike:{type:Number,default:0},keywordsWithCount:{type:Array[Object],default:[{keyword:"keyword",count:0}]},positions:{type:Array[Object],defulat:[{"position-name":"position","position-id":"position-uuid",comments:[{"comment-id":"comment-uuid","commented-user-id":"user-uuid","commented-user-name":"user name","commented-user-mughead-number":0,"commented-date":"commented date","is-user-liked":!1,"is-user-reported":!1,"number-of-liker":0,content:"comments"}]}]}},setup(a){const t=a;return A(()=>{const p=K("search-bar",()=>"");p.value=""}),(p,l)=>{const u=R,i=ke,d=Me,h=et;return n(),r(m,null,[L(u),e("div",tt,[L(i,{date:t.date,title:t.title,tags:t.tags,sourceLinkList:t.sourceLinkList,isUserCollected:t.isUserCollected,isUserLike:t.isUserLike,numberOfLike:t.numberOfLike},null,8,["date","title","tags","sourceLinkList","isUserCollected","isUserLike","numberOfLike"]),L(d,{imageCloud:t.imageCloud,keywordsWithCount:t.keywordsWithCount},null,8,["imageCloud","keywordsWithCount"]),L(h,{positions:t.positions},null,8,["positions"])])],64)}}},ct={__name:"[boardId]",setup(a){const t=S({date:"2022-10-27",title:"早餐應該要吃中式還是西式?",tags:["早餐","中式","西式"],"source-link-list":[{"ref-article-title-in-other-website":"title1","ref-article-link-in-other-website":"https://www.google.com"},{"ref-article-title-in-other-website":"title2","ref-article-link-in-other-website":"https://www.google.com"},{"ref-article-title-in-other-website":"title3","ref-article-link-in-other-website":"https://www.google.com"},{"ref-article-title-in-other-website":"title4","ref-article-link-in-other-website":"https://www.google.com"},{"ref-article-title-in-other-website":"title4","ref-article-link-in-other-website":"https://www.google.com"}],"is-user-collected":!1,"is-user-like":!1,"image-cloud":"/image-cloud.png","number-of-like":573,"keywords-with-count":[{keyword:"蛋餅",count:257},{keyword:"漢堡",count:189},{keyword:"饅頭",count:147},{keyword:"吐司",count:85},{keyword:"煎餃",count:57},{keyword:"饅頭",count:32},{keyword:"饅頭",count:27}],positions:[{"position-name":"立場1","position-id":"position-uuid",comments:[{"comment-id":"comment-uuid","commented-user-id":"user-uuid","commented-user-name":"留言者名稱1","commented-user-mug-shot-number":0,"commented-date":"2022/12/01  18:51","is-user-liked":!0,"is-user-reported":!0,"number-of-like":175,content:"Lorem ipsum dolor sit amet, consectetur adipiscing elit.Morbi ac tempor neque. Maecenas sodales nunc et mauris porttitor rutrum."},{"comment-id":"comment-uuid","commented-user-id":"user-uuid","commented-user-name":"留言者名稱2","commented-user-mug-shot-number":0,"commented-date":"2022/12/01  18:51","is-user-liked":!0,"is-user-reported":!0,"number-of-like":168,content:"Lorem ipsum dolor sit amet, consectetur adipiscing elit.Morbi ac tempor neque. Maecenas sodales nunc et mauris porttitor rutrum."},{"comment-id":"comment-uuid","commented-user-id":"user-uuid","commented-user-name":"留言者名稱3","commented-user-mug-shot-number":0,"commented-date":"2022/12/01  18:51","is-user-liked":!0,"is-user-reported":!0,"number-of-like":128,content:"Lorem ipsum dolor sit amet, consectetur adipiscing elit.Morbi ac tempor neque. Maecenas sodales nunc et mauris porttitor rutrum."},{"comment-id":"comment-uuid","commented-user-id":"user-uuid","commented-user-name":"留言者名稱4","commented-user-mug-shot-number":0,"commented-date":"2022/12/01  18:51","is-user-liked":!0,"is-user-reported":!0,"number-of-like":119,content:"Lorem ipsum dolor sit amet, consectetur adipiscing elit.Morbi ac tempor neque. Maecenas sodales nunc et mauris porttitor rutrum."}]},{"position-name":"立場2","position-id":"position-uuid",comments:[{"comment-id":"comment-uuid","commented-user-id":"user-uuid","commented-user-name":"user name","commented-user-mug-shot-number":0,"commented-date":"2022/12/01  18:51","is-user-liked":!0,"is-user-reported":!0,"number-of-like":175,content:"Lorem ipsum dolor sit amet, consectetur adipiscing elit.Morbi ac tempor neque. Maecenas sodales nunc et mauris porttitor rutrum."},{"comment-id":"comment-uuid","commented-user-id":"user-uuid","commented-user-name":"留言者名稱4","commented-user-mug-shot-number":0,"commented-date":"2022/12/01  18:51","is-user-liked":!0,"is-user-reported":!0,"number-of-like":168,content:"Lorem ipsum dolor sit amet, consectetur adipiscing elit.Morbi ac tempor neque. Maecenas sodales nunc et mauris porttitor rutrum."},{"comment-id":"comment-uuid","commented-user-id":"user-uuid","commented-user-name":"留言者名稱5","commented-user-mug-shot-number":0,"commented-date":"2022/12/01  18:51","is-user-liked":!0,"is-user-reported":!0,"number-of-like":128,content:"Lorem ipsum dolor sit amet, consectetur adipiscing elit.Morbi ac tempor neque. Maecenas sodales nunc et mauris porttitor rutrum."},{"comment-id":"comment-uuid","commented-user-id":"user-uuid","commented-user-name":"留言者名稱6","commented-user-mug-shot-number":0,"commented-date":"2022/12/01  18:51","is-user-liked":!0,"is-user-reported":!0,"number-of-like":119,content:"Lorem ipsum dolor sit amet, consectetur adipiscing elit.Morbi ac tempor neque. Maecenas sodales nunc et mauris porttitor rutrum."}]},{"position-name":"立場3","position-id":"position-uuid",comments:[{"comment-id":"comment-uuid","commented-user-id":"user-uuid","commented-user-name":"user name7","commented-user-mug-shot-number":0,"commented-date":"2022/12/01  18:51","is-user-liked":!0,"is-user-reported":!0,"number-of-like":175,content:"Lorem ipsum dolor sit amet, consectetur adipiscing elit.Morbi ac tempor neque. Maecenas sodales nunc et mauris porttitor rutrum."},{"comment-id":"comment-uuid","commented-user-id":"user-uuid","commented-user-name":"留言者名稱8","commented-user-mug-shot-number":0,"commented-date":"2022/12/01  18:51","is-user-liked":!0,"is-user-reported":!0,"number-of-like":168,content:"Lorem ipsum dolor sit amet, consectetur adipiscing elit.Morbi ac tempor neque. Maecenas sodales nunc et mauris porttitor rutrum."},{"comment-id":"comment-uuid","commented-user-id":"user-uuid","commented-user-name":"留言者名稱9","commented-user-mug-shot-number":0,"commented-date":"2022/12/01  18:51","is-user-liked":!0,"is-user-reported":!0,"number-of-like":128,content:"Lorem ipsum dolor sit amet, consectetur adipiscing elit.Morbi ac tempor neque. Maecenas sodales nunc et mauris porttitor rutrum."},{"comment-id":"comment-uuid","commented-user-id":"user-uuid","commented-user-name":"留言者名稱","commented-user-mug-shot-number":0,"commented-date":"2022/12/01  18:51","is-user-liked":!0,"is-user-reported":!0,"number-of-like":119,content:"Lorem ipsum dolor sit amet, consectetur adipiscing elit.Morbi ac tempor neque. Maecenas sodales nunc et mauris porttitor rutrum."}]}]});return(p,l)=>{const u=ot;return n(),q(u,{date:o(t).date,title:o(t).title,tags:o(t).tags,sourceLinkList:o(t)["source-link-list"],isUserCollected:o(t)["is-user-collected"],isUserLike:o(t)["is-user-like"],imageCloud:o(t)["image-cloud"],numberOfLike:o(t)["number-of-like"],keywordsWithCount:o(t)["keywords-with-count"],positions:o(t).positions},null,8,["date","title","tags","sourceLinkList","isUserCollected","isUserLike","imageCloud","numberOfLike","keywordsWithCount","positions"])}}};export{ct as default};
