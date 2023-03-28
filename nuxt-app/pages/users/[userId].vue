<script setup>
  import { useAuthStore } from '~~/stores/authorization';
  const { baseAPI, userToken, userId } = useAuthStore();

  const data = reactive({
    'user-established-date': '',
    'personal-operate-history': {},
    'collected-boards':[],
    'supported-signing-boards': [],
    'converted-supported-signing-boards': []
  });

  async function fetchSupportedSigningBoardData(boardId) {
    const { data:res } = await useFetch(`${baseAPI}/petition/get-signing-board-infos/${boardId}`, {
      method: 'GET',
      headers: {
        "Authorization": `Bearer ${userToken}`,
        "user-id": userId
      },
    });

    return {
      "board-title": res.value['board-title'], 
      "number-of-signers": res.value['number-of-signers']
    }
  }
  async function fetchData() {
    const { data:res } = await useFetch(`${baseAPI}/auth/post-query-personal-infos`, {
      method: 'POST',
      headers: {
        "Authorization": `Bearer ${userToken}`,
        "user-id": userId
      },
      pick: ['user-established-date', 'personal-operate-history', 'collected-boards', 'supported-signing-boards']
    });
    data['user-established-date'] = res.value['user-established-date'];
    data['personal-operate-history'] = res.value['personal-operate-history'];
    data['collected-boards'] = res.value['collected-boards'];
    data['supported-signing-boards'] = res.value['supported-signing-boards'];

    data['converted-supported-signing-boards'] = [];
		for( let i=0; i<data['supported-signing-boards'].length; i++) {
      const res = await fetchSupportedSigningBoardData(data['supported-signing-boards'][i]['signing-board-id']);
      data['converted-supported-signing-boards'].push(reactive({
				'board-id': data['supported-signing-boards'][i]['signing-board-id'],
				'board-title': res['board-title'],
				'number-of-signers': res['number-of-signers'],
				'user-is-supported': true
			}));
		}
  }
  provide('fetchData', fetchData);
  fetchData();

  function setUserSupported(index, isSupported) {
    data['converted-supported-signing-boards'][index]['user-is-supported'] = isSupported;
    data['converted-supported-signing-boards'][index]['number-of-signers'] += isSupported? 1: -1;
    data['personal-operate-history']['number-of-support-signing-boards'] += isSupported? 1: -1;
  }
  provide('setUserSupported', setUserSupported);

</script>

<template>
  <PersonalInfos
    :userEstablishedDate="data['user-established-date']"
    :personalOperateHistory="data['personal-operate-history']"
    :collectedBoards="data['collected-boards']"
    :supportedSigningBoards="data['converted-supported-signing-boards']"
  />
</template>

<style>

</style>