<script setup>
  const { data } = defineProps({
    data: {
      type: Object,
      default: { data:[] }
    }
  })

  function reRender() {
    const keywordElements = document.querySelectorAll('.keyword .keyword-bar');
    for (let i=0; i<keywordElements.length; i++) {
      const el = keywordElements[i];
      const count = el.dataset.count;
      const maxCount = el.dataset.maxCount;
      el.style.width = `${ 25 + 100*(count/maxCount) }px`;
    }
  }

  onMounted(()=> {
    reRender()
  });
  
  onUpdated(()=> {
    reRender()
  })

</script>

<template>
  <LayoutSearch />
  <div class="container">
    <LayoutAsideNavbar class="aside" />
    <main>
      <LobbyListItem
        v-for="board in data.data"
        :key="board['id']"
        :id="board['id']"
        :numberOfLike="board['number-of-like']"
        :date="board.date"
        :title="board.title"
        :tags="board.tags"
        :imageCloud="board['image-cloud']"
        :keywordWithCount="board['keywords-with-count']"
      />
    </main>
  </div>
</template>

<style scoped lang="scss">
  .container {
    align-items: flex-start;
    flex-direction: row;
    .aside {
      width: 200px;
      position: fixed;
    }
    main {
      margin-left: 300px;
      width: 1020px;
    }
  }

  @media (max-width: 1350px){
    .container {
      main {
        margin-top: 20px;
        margin-left: 250px;
      }
    }
  }
  @media (max-width: 1250px) {
    .container {
      .aside {
        display: none;
      }
      main {
        width: 760px;
        margin-left: 0;
      }
    }
  }
  @media (max-width: 800px) {
    .container {
      main {
        margin-top: 5px;
        width: 375px;
      }
    }
  }
</style>
