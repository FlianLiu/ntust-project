<script setup>
  const data = defineProps({
    imageCloud: {
      type: String,
      default: '/image-cloud.png'
    },
    keywordsWithCount: {
      type: Array[Object],
      default: [{
        'keyword': 'keyword',
        'count': 0,
      },]
    },

  });

  function calculateMaxKeywordCount(keywords) {
    let max = 0;
    for (let i=0; i<keywords.length; i++) {
      if ( keywords[i].count > max ) max = keywords[i].count;
    }
    return max;
  }

  onMounted(()=> {
    const keywordElements = document.querySelectorAll('.keyword .keyword-bar');
    for (let i=0; i<keywordElements.length; i++) {
      const el = keywordElements[i];
      const count = el.dataset.count;
      const maxCount = el.dataset.maxCount;
      el.style.width = `${ 50 + 150*(count/maxCount) }px`;
    }
  });

</script>

<template>
  <div class="keyword-analysis-container">
    <div class="keyword-analysis">
      <div class="entire-keyword-with-count">
        <div>
          <h4>關鍵詞</h4>
          <h4>次數</h4>
        </div>
        <ul>
          <li v-for="keywordObject in data.keywordsWithCount">
            <h4>{{ keywordObject.keyword }}</h4>
            <h4>{{ keywordObject.count }}</h4>
          </li>

        </ul>
      </div>
      <img src="/image-cloud.png" height="300" alt="">
      <div class="keyword-bar-chart">
        <template v-for="(keywordObject, index) in data.keywordsWithCount">
          <div class="keyword" v-if="index <= 4">
            <div class="keyword-bar" 
              :data-max-count = "calculateMaxKeywordCount(data.keywordsWithCount)"
              :data-count="keywordObject.count"
            >{{ keywordObject.keyword }}</div>
            <span>{{ keywordObject.count }}</span>
          </div>
        </template>
      </div>
    </div>
  </div>
</template>

<style>
  .keyword-analysis-container {
    width: 100%;
  }
  .keyword-analysis {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    border: 3px solid var(--theme-black);
    border-radius: 7px;
    padding: 30px;
  }
  .keyword-analysis > * {
    height: 200px;
  }
  .keyword-analysis .entire-keyword-with-count {
    width: 250px;
    border: 3px solid var(--theme-black);
    border-radius: 5px;
    overflow: hidden;
  }
  .keyword-analysis .entire-keyword-with-count > div {
    width: 100%;
    display: flex;
    justify-content: space-around;
    padding: 5px 0;
    padding-right: 13px;
    background-color: var(--theme-white);
    border-bottom: 3px solid #000;
    position: absolute;
    top: 0;
    z-index: 1;
  }
  .keyword-analysis .entire-keyword-with-count h4 {
    width: 50%;
    text-align: center;
  }
  .keyword-analysis .entire-keyword-with-count ul {
    height: 168.4px;
    overflow-y: scroll;
    margin-top: 31.6px;
  }
  .keyword-analysis .entire-keyword-with-count ul li {
    display: flex;
    margin: 10px 0;
  }
  .keyword-analysis .keyword-bar-chart {
    padding-right: 50px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: flex-start;
  }
  .keyword-analysis .keyword-bar-chart .keyword {
    display: flex;
    align-items: center;
  }
  .keyword-analysis .keyword-bar-chart .keyword .keyword-bar {
    width: 200px;
    height: 33px;
    border: 3px solid var(--theme-black);
    border-radius: 3px;
    font-size: .9rem;
    text-align: left;
    line-height: 29px;
    padding-left: 15px;
  }
  .keyword-analysis .keyword-bar-chart .keyword span {
    margin-left: 15px;
  }
</style>