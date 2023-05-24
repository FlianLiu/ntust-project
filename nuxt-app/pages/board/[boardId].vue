<script setup>
  import { useAuthStore } from '~~/stores/authorization';
  const { baseAPI, userToken, userId } = useAuthStore();

  const data = reactive({ board: {}});
  const route = useRoute();
  async function fetchData() {
    const { data: res } = await useFetch(`${baseAPI}/board/get-read-board/${route.params.boardId}`, {
      method: 'GET',
      headers: {
        "Authorization": `Bearer ${userToken}`,
        "user-id": userId
      },
    });
    data.board = res.value.board;
  }
  provide('fetchData', fetchData);
  fetchData();

  async function likeComment(index, commentId, position) {
    const delta = data.board.positions[position].comments[index]['is-user-liked']? -1: 1;
    data.board.positions[position].comments[index]['number-of-like'] += delta;
    data.board.positions[position].comments[index]['is-user-liked'] = !data.board.positions[position].comments[index]['is-user-liked'];
    
    await useFetch(`${baseAPI}/board/post-like-comment`, {
      method: 'POST',
      headers: {
        "Authorization": `Bearer ${userToken}`,
        "user-id": userId
      },
      body: {
        "like-comment-id": commentId,
        "is-like": data.board.positions[position].comments[index]['is-user-liked']
      }
    });
  }
  provide('likeComment', likeComment);

</script>
<template>
  <Board
    :id="data.board.id"
    :date="data.board.date" 
    :title="data.board.title" 
    :tags="data.board.tags" 
    :sourceLinkList="data.board['source-link-list']" 
    :isUserCollected="data.board['is-user-collected']" 
    :isUserLike="data.board['is-user-like']"
    :numberOfLike="data.board['number-of-like']" 
    :keywordsWithCount="data.board['keywords-with-count']" 
    :positions="data.board.positions"
  />
</template>
<style>

</style>