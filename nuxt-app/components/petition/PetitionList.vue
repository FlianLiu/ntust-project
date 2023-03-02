<script setup>
  const { listTitle, progressBar, linkToBoard, list, colorReverse, titleMaxLine, listBorder, containerBorder} = defineProps({
    listTitle: {
      type: String,
      default: ''
    },
    progressBar: {
      type: Boolean,
      default: false
    },
    linkToBoard: {
      type: Boolean,
      default: false
    },
    list: {
      type: Array[Object],
      default: [{
        'board-id': '',
        'board-title': '',
        'number-of-signers': 0,
        'user-is-supported': false,
      }]
    },
    colorReverse: {
      type: Boolean,
      default: false
    },
    titleMaxLine: {
      type: Number,
      default: 1
    },
    listBorder: {
      type: Boolean,
      default: true
    },
    containerBorder: {
      type: Boolean,
      default: false
    }
  })

  onMounted(()=> {
    const maxCount = 30;
    const signingBarElements = document.querySelectorAll('.signing-progress-bar .signing-bar');
    for (let i=0; i<signingBarElements.length; i++) {
      const el = signingBarElements[i];
      const count = el.dataset.count;
      el.style.width = `${ 100 * (count/maxCount) }%`;
    }
  });
</script>

<template>
  <div class="petitioning-container">
    <h3>{{ listTitle }}</h3>
    <div class="petitioning-boards" :class="[{'border': containerBorder}]">
      <ul>
        <li v-for="board in list" :data-board-id="board['board-id']" :key="board['board-id']" :class="[{'border': listBorder}]">
          <div class="signing-progress-bar" v-if="progressBar && board['number-of-signers']">
            <div class="signing-bar" :data-count="board['number-of-signers']"></div>
          </div>
          <div class="infos-container" :class="[{'haveProgressBar': progressBar}]">
            <div class="icon">
              <slot name="icon" :numberOfSigners="board['number-of-signers']" v-if="board['number-of-signers']"></slot>
              <slot name="icon" v-if="!board['number-of-signers']"></slot>
            </div>
            <div class="title" :style="'--max-line: '+titleMaxLine+';font-size: '+(1 + (titleMaxLine - 1)/4 )+'rem'">
              <slot name="title" :title="board['board-title']"></slot>
            </div>

            <template v-if="linkToBoard">
                <template v-if="(board['number-of-signers'] == undefined) || (board['number-of-signers'] >= 30)">
                  <NuxtLink :to="'/board/'+board['board-id']">
                    <div class="button" :class="[{'active': colorReverse}]">
                      <slot name="buttonInactive"></slot>
                    </div>
                  </NuxtLink>
                </template>
                <template v-else>
                  <div class="button" :class="[{'active': !colorReverse}]">
                    <slot name="buttonActive"></slot>
                  </div>
                </template>
            </template>
            <template v-else-if="false">

            </template>
            <template v-else>
              <div v-if="board['user-is-supported']" class="button" :class="[{'active': !colorReverse}]">
                <slot name="buttonActive"></slot>
              </div>
              <div v-else class="button" :class="[{'active': colorReverse}]">
                <slot name="buttonInactive"></slot>
              </div>
            </template>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<style scoped>
  h3 {
    font-size: 1.25rem;
    letter-spacing: 0.5px;
    display: inline-block;
  }
  .button {
    width: 150px;
    display: flex;
    align-items: center;
    justify-content: space-around;
    padding: 5px 15px;
    border: 3px solid var(--theme-black);
    border-radius: 5px;
    cursor: pointer;
    user-select: none;
  }
  .button.active {
    background-color: var(--theme-black);
    color: var(--theme-white);
  }
  .button.active > *{
    font-weight: normal;
  }
  .petitioning-container {
    width: 50%;
  }
  .petitioning-container .petitioning-boards.border::before {
    content: '';
    display: flex;
    height: 100%;
    width: calc(100% - 30px);
    position: absolute;
    top: 0;
    left: 0;
    border: 3px solid var(--theme-black);
    border-radius: 5px;
  }
  .petitioning-container .petitioning-boards ul {
    height: 387px;
    display: flex;
    flex-direction: column;
    overflow-y: scroll;
    padding-right: 20px;
  }
  .petitioning-container .petitioning-boards.border ul {
    height: 260px;
    padding-left: 5px;
  }
  .petitioning-container .petitioning-boards.border li {
    height: 60px;
  }
  .petitioning-container ul::-webkit-scrollbar {
    border: 2px solid var(--theme-black);
  }
  .petitioning-container ul li {
    margin-bottom: 0;
  }
  .petitioning-container ul li.border {
    border-radius: 5px;
    border: 3px solid var(--theme-black);
    margin-bottom: 15px;
  }
  .petitioning-container ul li:last-child {
    margin-bottom: 0;
  }
  .petitioning-container ul li > * {
    width: 100%;
  }
  .petitioning-container ul li .signing-progress-bar {
    height: 15px;
    overflow: hidden;
    border-bottom: 3px solid var(--theme-black);
  }
  .petitioning-container ul li .signing-progress-bar .signing-bar {
    width: 75%;
    height: 100%;
    background-color: var(--theme-black);
  }
  .petitioning-container ul li .infos-container {
    height: 80px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 17.5px;
    padding-left: 20px;
  }
  .petitioning-container ul li .infos-container.haveProgressBar {
    height: 65px;
    padding: 10px;
    padding-left: 20px;
  }
  .petitioning-container ul li .infos-container .title {
    max-width: 280px;
    padding: 0px 20px;
    display: -webkit-box;
    -webkit-line-clamp: var(--max-line);
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;
    text-align: center;
  }
  .petitioning-container ul li .infos-container .title h3 {
    color: red;
  }
  .petitioning-container > h3 {
    margin: 20px;
  }
</style>