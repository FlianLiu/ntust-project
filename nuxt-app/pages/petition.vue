<script setup>
  const data = reactive({
	'signing-boards': [
		{
			'signing-board-id': 'uuid-signing-board-1',
			'signing-board-title': 'signing-board-title-1',
			'number-of-signers': 27,
			'user-is-supported': true,
		},
    {
			'signing-board-id': 'uuid-signing-board-2',
			'signing-board-title': 'signing-board-title-2',
			'number-of-signers': 25,
			'user-is-supported': false,
		},
    {
			'signing-board-id': 'uuid-signing-board-3',
			'signing-board-title': 'signing-board-title-3 signing-board-title-3 signing-board-title-3 signing-board-title-3',
			'number-of-signers': 23,
			'user-is-supported': false,
		},
    {
			'signing-board-id': 'uuid-signing-board-4',
			'signing-board-title': 'signing-board-title-4',
			'number-of-signers': 21,
			'user-is-supported': true,
		},
    {
			'signing-board-id': 'uuid-signing-board-5',
			'signing-board-title': 'signing-board-title-5',
			'number-of-signers': 19,
			'user-is-supported': false,
		},
    {
			'signing-board-id': 'uuid-signing-board-6',
			'signing-board-title': 'signing-board-title-6',
			'number-of-signers': 7,
			'user-is-supported': true,
		},
	],
	'recently-achieved-boards': [
		{
			'board-id': 'uuid-board-id-1',
			'board-title': 'board-title-1',
		},
		{
			'board-id': 'uuid-board-id-2',
			'board-title': 'board-title-2',
		},
		{
			'board-id': 'uuid-board-id-3',
			'board-title': 'board-title-3 board-title-3 board-title-3 board-title-3 board-title-3',
		},
		{
			'board-id': 'uuid-board-id-4',
			'board-title': 'board-title-4',
		},
		{
			'board-id': 'uuid-board-id-5',
			'board-title': 'board-title-5',
		},
		{
			'board-id': 'uuid-board-id-6',
			'board-title': 'board-title-6',
		},
		{
			'board-id': 'uuid-board-id-7',
			'board-title': 'board-title-7',
		},
	]});

</script>
<template>
  <Petition 
    :signingBoards="data['signing-boards']"
    :recentlyAchievedBoards="data['recently-achieved-boards']"
  />
</template>
<style></style>