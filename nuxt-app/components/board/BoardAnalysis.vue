<script setup>
  import VueWordCloud from 'vuewordcloud';
  import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js'
  import { Pie } from 'vue-chartjs';

  const { keywordsWithCount, positions } = defineProps({
    keywordsWithCount: {
      type: Array[Object],
      default: [{
        'keyword': '',
        'count': 0,
      },]
    },
    positions: {
      type: Array[Object],
      default: [{
        'position-name': '',
        'position-id': '',
        'position-count': 0,
        'comments': [
          {
            'comment-id': '',
            'commented-user-id': '',
            'commented-user-name': '',
            'commented-user-headshot-number': 0,
            'commented-date': '',
            'is-user-liked': false,
            'is-user-reported': false,
            'number-of-liker': 0,
            'content': ''
          }
        ]
      }]
    }
  });

  ChartJS.register(ArcElement, Tooltip, Legend)
  function generateColor(arr) {
    let colorArray = [];
    const offset = 50;
    const delta = (255 - offset) / arr.length; 
    for (let i =0; i<arr.length; i++) {
      const newColor = (delta * i + offset);
      colorArray[i] = `rgb(${newColor}, ${newColor}, ${newColor})`;
    }
    return colorArray;
  }
  const sortedByPositionCount = computed(
    ()=> positions.sort((a, b)=> b['position-count'] - a['position-count'])
  );
  const pieData = {
    labels: sortedByPositionCount.value.map((el)=> el['position-name']),
    datasets: [
      {
        backgroundColor: generateColor(positions),
        data: sortedByPositionCount.value.map((el)=> el['position-count'])
      }
    ]
  }
  const pieOptions = {
    responsive: true,
    maintainAspectRatio: false
  }

  function calculateMaxKeywordCount(keywords) {
    let max = 0;
    for (let i=0; i<keywords.length; i++) {
      if ( keywords[i].count > max ) max = keywords[i].count;
    }
    return max;
  }
  function sortWithCount(keywords) {
    return keywords.sort((a, b)=> b.count - a.count);
  }
  const imageWordCloud = sortWithCount(keywordsWithCount).map((el)=> {
    return [ el.keyword, el.count ];
  });

  onMounted(()=> {
    const keywordElements = document.querySelectorAll('.keyword-bar-container .keyword-bar');
    for (let i=0; i<keywordElements.length; i++) {
      const el = keywordElements[i];
      const count = el.dataset.count;
      const maxCount = el.dataset.maxCount;
      el.style.width = `${ 50 + 150*(count/maxCount) }px`;
    }
  });

  // RWD event
  const switchGraphState = ref(false);

</script>

<template>
  <div class="keyword-analysis-container">
    <div class="keyword-analysis">
      <Pie class="pie" :data="pieData" :options="pieOptions" 
        :class="{'show': !switchGraphState}"
      />
      <vue-word-cloud
        class="image-cloud"
        style="height: 230px; width: 300px;"
        :words="imageWordCloud"
        color="#333333"
        :animation-duration="0"
        :spacing="0.2"
      />
      <div class="keyword-bar-chart" :class="{'show': switchGraphState}">
        <template v-for="(keywordObject, index) in keywordsWithCount">
          <div class="keyword" v-if="index <= 4">
            <div class="keyword-bar-container">
              <div class="keyword-bar" 
                :data-max-count = "calculateMaxKeywordCount(keywordsWithCount)"
                :data-count="keywordObject.count"
              >{{ keywordObject.keyword }}</div>
            </div>
            <span>{{ keywordObject.count }}</span>
          </div>
        </template>
      </div>
      <img src="/switch.png" alt="" height="16" class="switch-graph" @click="switchGraphState = !switchGraphState">
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
      .pie {
        max-height: 230px;
        max-width: 300px;
      }
      
      .image-cloud {
        max-height: 230px;
        max-width: 250px;
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
      img.switch-graph {
        height: 16px;
        margin-right: 30px;
        display: none;
        cursor: pointer;
      }
    }
  }


  @media (max-width: 1350px){

  }
  @media (max-width: 1250px) {
    .keyword-analysis-container {
      .keyword-analysis {
        .pie {
          display: none !important;
          &.show {
            display: block !important;
          }
        }
        .image-cloud {
          display: none;
        }
        .keyword-bar-chart {
          .keyword {
            .keyword-bar-container {
              &::before {
                display: none;
              }
            }
          }
        }
      }
    }
  }
  @media (max-width: 800px) {
    .keyword-analysis-container {
      margin-bottom: 30px;
      &::before {
        display: none;
      }
      .keyword-analysis {
        padding: 0;
        border: none;
        > div {
          display: none !important;
          &.show {
            display: flex !important;
          }
          &.image-cloud.show {
            display: none !important;
          }
        }
        
        .keyword-bar-chart {
          height: 200px;
        }
        img.switch-graph {
          display: block;
        }
      }
    }
  }
</style>