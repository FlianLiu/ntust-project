<script setup>
	import { useAuthStore } from '~~/stores/authorization';
	const { baseAPI, userToken, userId } = useAuthStore();

	const data = reactive({
		"signing-boards": [],
		"converted-signing-boards": [],
		"recently-achieved-boards": [],
	})
	async function fetchData() {
		const { data: res } = await useFetch(`${baseAPI}/petition/get-signing-achieved-board`, {
      method: 'GET',
      headers: {
        "Authorization": `Bearer ${userToken}`,
        "user-id": userId
      },
    });
    data['signing-boards'] = res.value['signing-boards'] === null? []: res.value['signing-boards'];
    data['recently-achieved-boards'] = res.value['recently-achieved-boards'] === null? []: res.value['recently-achieved-boards'];
	
		data['converted-signing-boards'] = [];
		for( let i=0; i<data['signing-boards'].length; i++) {
			data['converted-signing-boards'].push(reactive({
				'board-id': data['signing-boards'][i]['signing-board-id'],
				'board-title': data['signing-boards'][i]['signing-board-title'],
				'number-of-signers': data['signing-boards'][i]['number-of-signers'],
				'user-is-supported': data['signing-boards'][i]['is-user-supported'],
			}))
		}
	}
	provide('fetchData', fetchData);
	fetchData();

	function setUserSupported(index, isSupported) {
		data['converted-signing-boards'][index]['user-is-supported'] = isSupported;
		data['converted-signing-boards'][index]['number-of-signers'] += isSupported? 1: -1;
	}
	provide('setUserSupported', setUserSupported);

</script>
<template>
  <Petition 
    :signingBoards="data['converted-signing-boards']"
    :recentlyAchievedBoards="data['recently-achieved-boards']"
  />
</template>
<style></style>