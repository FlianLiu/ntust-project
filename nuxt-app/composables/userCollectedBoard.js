import { useAuthStore } from '~~/stores/authorization';
export async function useCollectedBoard(boardId, isCollected, boardTitle) {
  const { baseAPI, userToken, userId } = useAuthStore();
  await useFetch(`${baseAPI}/board/post-collect-board`, {
    method: 'POST',
    headers: {
      "Authorization": `Bearer ${userToken}`,
      "user-id": userId
    },
    body: {
      "board-id": boardId,
      "is-collected": isCollected,
      "board-title": boardTitle
    }
  });
}