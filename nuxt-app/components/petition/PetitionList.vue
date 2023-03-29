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

  const buttonActiveEvent = inject('buttonActiveEvent');
  const buttonInactiveEvent = inject('buttonInactiveEvent');

  function computeBarLength() {
    const maxCount = 30;
    const signingBarElements = document.querySelectorAll('.signing-progress-bar .signing-bar');
    for (let i=0; i<signingBarElements.length; i++) {
      const el = signingBarElements[i];
      el.dataset.count = el.dataset.count < 0? 0: el.dataset.count;
      el.dataset.count = el.dataset.count > 30? 30: el.dataset.count;
      el.style.width = `${ 100 * (el.dataset.count/maxCount) }%`;
    }
  }

  onMounted(()=> {
    computeBarLength();
  });
  onUpdated(()=> {
    computeBarLength();
  })
</script>

<template>
  <div class="petitioning-container">
    <h3>{{ listTitle }}</h3>
    <div class="petitioning-boards" :class="[{'border': containerBorder}]">
      <ul :class="{'list-has-border': listBorder}">
        <li v-if="list.length == 0" class="isNull"><h3>暫無資料</h3></li>
        <li v-for="(board, index) in list" :data-board-id="board['board-id']" :key="board['board-id']" :class="[{'border': listBorder}]">
          <div class="signing-progress-bar" v-if="progressBar && board['number-of-signers'] !== undefined">
            <div class="signing-bar" :data-count="board['number-of-signers']"></div>
          </div>
          <div class="infos-container" :class="[{'haveProgressBar': progressBar}]">
            <div class="icon">
              <slot name="icon" :numberOfSigners="board['number-of-signers']" v-if="board['number-of-signers'] !== undefined"></slot>
              <slot name="icon" :boardId="board['board-id']" :boardTitle="board['board-title']" v-else></slot>
            </div>
            <div class="title" :style="'--max-line: '+titleMaxLine+';font-size: '+(1 + (titleMaxLine - 1)/4 )+'rem'">
              <slot name="title" :title="board['board-title']"></slot>
            </div>

            <template v-if="linkToBoard">
              <template v-if="(board['number-of-signers'] == undefined) || (board['number-of-signers'] >= 30)">
                <NuxtLink :to="'/board/'+board['board-id']">
                  <div class="button double-solid-border" :class="[{'active': colorReverse}]">
                    <slot name="buttonInactive"></slot>
                  </div>
                </NuxtLink>
              </template>
              <template v-else-if="board['user-is-supported']">
                <div class="button double-solid-border" :class="[{'active': !colorReverse}]" 
                  @click="buttonActiveEvent(index, board['board-id'])">
                  <slot name="buttonActive"></slot>
                </div>
              </template>
              <template v-else>
                <div class="button double-solid-border" :class="[{'active': colorReverse}]" 
                  @click="buttonInactiveEvent(index, board['board-id'])">
                  <slot name="buttonCanceled"></slot>
                </div>
              </template>
            </template>
            <template v-else-if="false">

            </template>
            <template v-else>
              <div v-if="board['user-is-supported']" class="button double-solid-border" :class="[{'active': !colorReverse}]" 
                @click="buttonActiveEvent(index, board['board-id'])">
                <slot name="buttonActive"></slot>
              </div>
              <div v-else class="button double-solid-border" :class="[{'active': colorReverse}]" 
                @click="buttonInactiveEvent(index, board['board-id'])">
                <slot name="buttonInactive"></slot>
              </div>
            </template>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<style scoped lang="scss">
  .petitioning-container {
    width: 50%;
    .petitioning-boards { 
      &.border {
        &::before {
          content: '';
          height: 100%;
          width: calc(100% - 30px);
          border: 3px solid var(--theme-black);
          border-radius: 5px;
          position: absolute;
          top: 0;
          left: 0;
          background-color: var(--theme-white);
        }
        &::after {
          content: '';
          height: 100%;
          width: calc(100% - 30px);
          border: 3px solid var(--theme-black);
          border-radius: 5px;
          position: absolute;
          top: 5px;
          left: 5px;
          z-index: -1;
        }
        ul {
          height: 260px;
          padding-left: 5px;
          li {
            height: 60px;
          }
        }
      }
      ul {
        height: 395px;
        display: flex;
        flex-direction: column;
        overflow-y: scroll;
        padding-right: 20px;
        &::-webkit-scrollbar {
          border: 2px solid var(--theme-black);
        }
        li {
          &.isNull{
            height: 100%;
            display: flex;
            align-items: center;
            h3 {
              margin: 0;
              text-align: center;
              transform: translateY(-5px);
            }
          }
          &.border {
            border-radius: 5px;
            border: 3px solid var(--theme-black);
            margin-bottom: 15px;
            background-color: var(--theme-white);
            &::before {
              content: '';
              height: calc(100% + 5px);
              width: calc(100% + 5px);
              border: 3px solid var(--theme-black);
              border-radius: 5px;
              position: absolute;
              top: 3px;
              left: 3px;
              z-index: -1;
            }
          }
          &:last-child {
            margin-bottom: 0;
          }
          > * {
            width: 100%;
          }
          .signing-progress-bar {
            height: 15px;
            overflow: hidden;
            border-bottom: 3px solid var(--theme-black);
            .signing-bar {
              height: 100%;
              background-color: var(--theme-black);
            }
          }
          .infos-container {
            height: 80px;
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding: 0 17.5px;
            padding-left: 20px;
            &.haveProgressBar {
              height: 65px;
              padding: 10px;
              padding-left: 20px;
            }
            .title {
              max-width: 350px;
              padding: 0px 20px;
              display: -webkit-box;
              -webkit-line-clamp: var(--max-line);
              -webkit-box-orient: vertical;
              overflow: hidden;
              text-overflow: ellipsis;
              text-align: center;
              h3 {
                color: red;
              }
            }
          }
        }
      }
    }
    h3 {
      margin: 20px;
      font-size: 1.25rem;
      letter-spacing: 0.5px;
      display: inline-block;
    }
    .button {
      --border-offset: 3px;
      --border-minus-offset: -3px;
      --border-hover-translate: 6px;
      width: 150px;
      display: flex;
      align-items: center;
      justify-content: space-around;
      padding: 7px 15px;
      border: 3px solid var(--theme-black);
      border-radius: 5px;
      cursor: pointer;
      user-select: none;
      &.active {
        background-color: var(--theme-black);
        color: var(--theme-white);
        &.double-solid-border {
          box-shadow: var(--border-offset) var(--border-offset) 0px var(--double-border-active-black);
          &:hover {
            box-shadow: var(--border-hover-translate) var(--border-hover-translate) 0px var(--double-border-active-black);
          }
        }
        > * {
          font-weight: normal;
        }
      }
    }
  }


  @media (max-width: 1350px){

  }
  @media (max-width: 1250px) {
    .petitioning-container {
      h3 {
        display: none;
      }
      .petitioning-boards {
        margin-top: 20px;
        ul {
          height: 300px !important;
          &.list-has-border {
            height: 400px !important;
          }
          li {
            .infos-container {
              .title {
                width: 400px;
              }
            }
          }
        }
      }
    }
  }
  @media (max-width: 800px) {
    .petitioning-container {
      .petitioning-boards {
        margin-top: 10px;
        &::before {
          display: none;
        }
        &::after {
          top: 0 !important;
          left: 0 !important;
          width: calc(100% - 25px) !important;
        }
        ul {
          height: 215px !important;
          padding-right: 15px;
          &.list-has-border {
            height: 325px !important;
          }
          li {
            display: flex;
            justify-content: center;
            align-items: center;
            .infos-container {
              height: 40px;
              padding: 0;
              padding-right: 10px;
              .icon {
                width: 40px;
                display: flex;
                justify-content: center;
                align-items: center;
              }
              .title {
                width: 175px;
                padding: 0;
              }
              .button {
                width: 90px;
                height: 30px;
                padding: 0 2px;
                border-radius: 3px;
                border: 2px solid var(--theme-black);
              }
            }
            &.border {
              height: 65px;
              flex-direction: column;
              margin-bottom: 10px;
              border-radius: 3px;
              &::before {
                display: none;
              }
              .infos-container {
                padding: 0 15px;
              }
            }
          }
        }
        &.border {
          ul li {
            height: 50px;
          }
        }
      }

    }
  }

</style>