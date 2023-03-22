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
    const keywordElements = document.querySelectorAll('.keyword-bar-container .keyword-bar');
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
      <div class="entire-keyword-with-count-container">
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
      </div>
      <img src="/image-cloud.png" height="300" alt="">
      <div class="keyword-bar-chart">
        <template v-for="(keywordObject, index) in data.keywordsWithCount">
          <div class="keyword" v-if="index <= 4">
            <div class="keyword-bar-container">
              <div class="keyword-bar" 
                :data-max-count = "calculateMaxKeywordCount(data.keywordsWithCount)"
                :data-count="keywordObject.count"
              >{{ keywordObject.keyword }}</div>
            </div>
            <span>{{ keywordObject.count }}</span>
          </div>
        </template>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
  .keyword-analysis-container {
    width: 100%;
    background-color: var(--theme-white);
    border-radius: 5px;
    &::before {
      content: '';
      display: block;
      position: absolute;
      left: 5px;
      top: 5px;
      z-index: -10;
      width: 100%;
      height: 100%;
      border: 3px solid var(--theme-black);
      border-radius: 7px;
    }
    .keyword-analysis {
      display: flex;
      align-items: center;
      justify-content: space-between;
      width: 100%;
      border: 3px solid var(--theme-black);
      border-radius: 7px;
      padding: 30px;
      > * {
        height: 230px;
      }
      .entire-keyword-with-count-container {
        &::before {
          content: '';
          display: block;
          position: absolute;
          left: 5px;
          top: 5px;
          width: 100%;
          height: calc(100% + 3px);
          border: 3px solid var(--theme-black);
          border-radius: 7px;
        }
        .entire-keyword-with-count {
          width: 250px;
          border: 3px solid var(--theme-black);
          border-radius: 5px;
          overflow: hidden;
          background-color: var(--theme-white);
          > div {
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
          h4 {
            width: 50%;
            text-align: center;
          }
          ul {
            height: 195px;
            overflow-y: scroll;
            margin-top: 31.6px;
            li {
              display: flex;
              margin: 15px 0;
            }
          }
        }
      }
      .keyword-bar-chart {
        padding-right: 50px;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        align-items: flex-start;
        .keyword {
          display: flex;
          align-items: center;
          .keyword-bar-container {
            &::before {
              content: '';
              display: block;
              width: 100%;
              height: 100%;
              border: 3px solid var(--theme-black);
              border-radius: 3px;
              position: absolute;
              z-index: 0;
              left: 5px;
              top: 5px;
            }
            .keyword-bar {
              width: 200px;
              height: 33px;
              border: 3px solid var(--theme-black);
              border-radius: 3px;
              font-size: .9rem;
              text-align: left;
              line-height: 29px;
              padding-left: 15px;
              background-color: var(--theme-white);
            }
          }
          span {
            margin-left: 15px;
          }
        }
      }
    }
  }

</style>