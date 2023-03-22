<script setup>
  const data = reactive({
    'data': [
      {
        'board-id': 'board-id-1',
        'number-of-like': 573,
        'date': '2022-10-27',
        'title': '早餐應該要吃中式還是西式?',
        'tags': ['早餐', '中式', '西式',],
        'image-cloud': '/image-cloud.png',
        'keyworks-with-count': [
          {
            'keyword': '蛋餅',
            'count': 58,
          },
          {
            'keyword': '漢堡',
            'count': 52,
          },
          {
            'keyword': '饅頭',
            'count': 47,
          },
        ]
      },{
        'board-id': 'board-id-2',
        'number-of-like': 489,
        'date': '2022-11-12',
        'title': '今年天氣是不是比較冷啊?',
        'tags': ['氣候', '全球暖化'],
        'image-cloud': '/image-cloud.png',
        'keyworks-with-count': [
          {
            'keyword': '好冷',
            'count': 75,
          },
          {
            'keyword': '電暖器',
            'count': 57,
          },
          {
            'keyword': '冰棒',
            'count': 32,
          },
        ]
      },{
        'board-id': 'board-id-3',
        'number-of-like': 315,
        'date': '2022-12-25',
        'title': '聖誕節還是一個人過該怎麼辦?',
        'tags': ['魯蛇', '聖誕節', '伴侶', '女朋友'],
        'image-cloud': '/image-cloud.png',
        'keyworks-with-count': [
          {
            'keyword': '魯蛇',
            'count': 87,
          },
          {
            'keyword': '笑死',
            'count': 45,
          },
          {
            'keyword': '可悲',
            'count': 32,
          },
        ]
      },
    ]
  });

  onMounted(()=> {
    
    const keywordElements = document.querySelectorAll('.keyword .keyword-bar');
    for (let i=0; i<keywordElements.length; i++) {
      const el = keywordElements[i];
      const count = el.dataset.count;
      const maxCount = el.dataset.maxCount;
      el.style.width = `${ 25 + 100*(count/maxCount) }px`;
    }

  });

</script>

<template>
  <LayoutSearch />
  <div class="container">
    <LayoutAsideNavbar class="aside" />
    <main>
      <LobbyListItem
        v-for="board in data.data"
        :id="board['board-id']"
        :numberOfLike="board['number-of-like']"
        :date="board.date"
        :title="board.title"
        :tags="board.tags"
        :imageCloud="board['image-cloud']"
        :keywordWithCount="board['keyworks-with-count']"
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
</style>
