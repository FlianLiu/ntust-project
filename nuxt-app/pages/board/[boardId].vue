<script setup>
  const data = reactive({
    'date': '2022-10-27',
    'title': '早餐應該要吃中式還是西式?',
    'tags': ['早餐', '中式', '西式',],
    'source-link-list': [
      {
        'ref-article-title-in-other-website': 'title1',
        'ref-article-link-in-other-website': 'https://www.google.com'
      },{
        'ref-article-title-in-other-website': 'title2',
        'ref-article-link-in-other-website': 'https://www.google.com'
      },{
        'ref-article-title-in-other-website': 'title3',
        'ref-article-link-in-other-website': 'https://www.google.com'
      },{
        'ref-article-title-in-other-website': 'title4',
        'ref-article-link-in-other-website': 'https://www.google.com'
      },{
        'ref-article-title-in-other-website': 'title4',
        'ref-article-link-in-other-website': 'https://www.google.com'
      },
    ],
    'is-user-collected': false,
    'is-user-like': false,
    'image-cloud': '/image-cloud.png',
    'number-of-like': 573,
    'keywords-with-count': [
      {
        'keyword': '蛋餅',
        'count': 257,
      },
      {
        'keyword': '漢堡',
        'count': 189,
      },
      {
        'keyword': '饅頭',
        'count': 147,
      },
      {
        'keyword': '吐司',
        'count': 85,
      },
      {
        'keyword': '煎餃',
        'count': 57,
      },
      {
        'keyword': '饅頭',
        'count': 32,
      },
      {
        'keyword': '饅頭',
        'count': 27,
      },
    ],
    'positions': [
      {
        'position-name': '立場1',
        'position-id': 'position-uuid',
        'comments': [
          {
            'comment-id': 'comment-uuid',
            'commented-user-id': 'user-uuid',
            'commented-user-name': '留言者名稱1',
            'commented-user-mug-shot-number': 0,
            'commented-date': '2022/12/01  18:51',
            'is-user-liked': true,
            'is-user-reported': true,
            'number-of-like': 175,
            'content': 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.Morbi ac tempor neque. Maecenas sodales nunc et mauris porttitor rutrum.'
          },
          {
            'comment-id': 'comment-uuid',
            'commented-user-id': 'user-uuid',
            'commented-user-name': '留言者名稱2',
            'commented-user-mug-shot-number': 0,
            'commented-date': '2022/12/01  18:51',
            'is-user-liked': true,
            'is-user-reported': true,
            'number-of-like': 168,
            'content': 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.Morbi ac tempor neque. Maecenas sodales nunc et mauris porttitor rutrum.'
          },
          {
            'comment-id': 'comment-uuid',
            'commented-user-id': 'user-uuid',
            'commented-user-name': '留言者名稱3',
            'commented-user-mug-shot-number': 0,
            'commented-date': '2022/12/01  18:51',
            'is-user-liked': true,
            'is-user-reported': true,
            'number-of-like': 128,
            'content': 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.Morbi ac tempor neque. Maecenas sodales nunc et mauris porttitor rutrum.'
          },
          {
            'comment-id': 'comment-uuid',
            'commented-user-id': 'user-uuid',
            'commented-user-name': '留言者名稱4',
            'commented-user-mug-shot-number': 0,
            'commented-date': '2022/12/01  18:51',
            'is-user-liked': true,
            'is-user-reported': true,
            'number-of-like': 119,
            'content': 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.Morbi ac tempor neque. Maecenas sodales nunc et mauris porttitor rutrum.'
          },
        ]
      },
      {
        'position-name': '立場2',
        'position-id': 'position-uuid',
        'comments': [
          {
            'comment-id': 'comment-uuid',
            'commented-user-id': 'user-uuid',
            'commented-user-name': 'user name',
            'commented-user-mug-shot-number': 0,
            'commented-date': '2022/12/01  18:51',
            'is-user-liked': true,
            'is-user-reported': true,
            'number-of-like': 175,
            'content': 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.Morbi ac tempor neque. Maecenas sodales nunc et mauris porttitor rutrum.'
          },
          {
            'comment-id': 'comment-uuid',
            'commented-user-id': 'user-uuid',
            'commented-user-name': '留言者名稱4',
            'commented-user-mug-shot-number': 0,
            'commented-date': '2022/12/01  18:51',
            'is-user-liked': true,
            'is-user-reported': true,
            'number-of-like': 168,
            'content': 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.Morbi ac tempor neque. Maecenas sodales nunc et mauris porttitor rutrum.'
          },
          {
            'comment-id': 'comment-uuid',
            'commented-user-id': 'user-uuid',
            'commented-user-name': '留言者名稱5',
            'commented-user-mug-shot-number': 0,
            'commented-date': '2022/12/01  18:51',
            'is-user-liked': true,
            'is-user-reported': true,
            'number-of-like': 128,
            'content': 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.Morbi ac tempor neque. Maecenas sodales nunc et mauris porttitor rutrum.'
          },
          {
            'comment-id': 'comment-uuid',
            'commented-user-id': 'user-uuid',
            'commented-user-name': '留言者名稱6',
            'commented-user-mug-shot-number': 0,
            'commented-date': '2022/12/01  18:51',
            'is-user-liked': true,
            'is-user-reported': true,
            'number-of-like': 119,
            'content': 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.Morbi ac tempor neque. Maecenas sodales nunc et mauris porttitor rutrum.'
          },
        ]
      },
      {
        'position-name': '立場3',
        'position-id': 'position-uuid',
        'comments': [
          {
            'comment-id': 'comment-uuid',
            'commented-user-id': 'user-uuid',
            'commented-user-name': 'user name7',
            'commented-user-mug-shot-number': 0,
            'commented-date': '2022/12/01  18:51',
            'is-user-liked': true,
            'is-user-reported': true,
            'number-of-like': 175,
            'content': 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.Morbi ac tempor neque. Maecenas sodales nunc et mauris porttitor rutrum.'
          },
          {
            'comment-id': 'comment-uuid',
            'commented-user-id': 'user-uuid',
            'commented-user-name': '留言者名稱8',
            'commented-user-mug-shot-number': 0,
            'commented-date': '2022/12/01  18:51',
            'is-user-liked': true,
            'is-user-reported': true,
            'number-of-like': 168,
            'content': 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.Morbi ac tempor neque. Maecenas sodales nunc et mauris porttitor rutrum.'
          },
          {
            'comment-id': 'comment-uuid',
            'commented-user-id': 'user-uuid',
            'commented-user-name': '留言者名稱9',
            'commented-user-mug-shot-number': 0,
            'commented-date': '2022/12/01  18:51',
            'is-user-liked': true,
            'is-user-reported': true,
            'number-of-like': 128,
            'content': 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.Morbi ac tempor neque. Maecenas sodales nunc et mauris porttitor rutrum.'
          },
          {
            'comment-id': 'comment-uuid',
            'commented-user-id': 'user-uuid',
            'commented-user-name': '留言者名稱',
            'commented-user-mug-shot-number': 0,
            'commented-date': '2022/12/01  18:51',
            'is-user-liked': true,
            'is-user-reported': true,
            'number-of-like': 119,
            'content': 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.Morbi ac tempor neque. Maecenas sodales nunc et mauris porttitor rutrum.'
          },
        ]
      },
    ]
  });
</script>
<template>
  <Board 
    :date="data.date" 
    :title="data.title" 
    :tags="data.tags" 
    :sourceLinkList="data['source-link-list']" 
    :isUserCollected="data['is-user-collected']" 
    :isUserLike="data['is-user-like']" 
    :imageCloud="data['image-cloud']" 
    :numberOfLike="data['number-of-like']" 
    :keywordsWithCount="data['keywords-with-count']" 
    :positions="data.positions"
  />
</template>
<style>

</style>