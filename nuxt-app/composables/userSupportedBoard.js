import { useAuthStore } from '~~/stores/authorization';
export async function useSupportedBoard(boardId, isSupported) {
  const { baseAPI, userToken, userId } = useAuthStore();
  const { data, error } = await useFetch(`${baseAPI}/petition/post-support-signing-board`, {
    method: 'POST',
    headers: {
      "Authorization": `Bearer ${userToken}`,
      "user-id": userId
    },
    body: {
      "signing-board-id": boardId,
      "is-supported": isSupported
    }
  });
  if (isSupported && data.value.status === 'success') window.alert('支持連署成功!');
}