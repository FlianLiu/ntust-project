<script setup>
  const data = reactive({
    'user-established-date': '2023/02/15',
    'personal-operate-history': {
      'number-of-received-likes': 127,
      'number-of-released-comments': 31,
      'number-of-collect-boards': 63,
      'number-of-like-comments': 256,
      'number-of-launch-petition-boards': 3,
      'number-of-support-signing-boards': 16,
    },
    'colleted-boards': [
      {
        'board-id': 'uuid-board-id-1',
        'board-title': 'board-title-1 board-title-1 board-title-1 board-title-1 board-title-1',
      },
      {
        'board-id': 'uuid-board-id-2',
        'board-title': 'board-title-2',
      },
      {
        'board-id': 'uuid-board-id-3',
        'board-title': 'board-title-3',
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
    ],
    'supported-signing-boards': [
      'board-id-1','board-id-2','board-id-3','board-id-4','board-id-5','board-id-6','board-id-7'
    ],
  })
</script>

<template>
  <PersonalInfos 
    :userEstablishedDate="data['user-established-date']"
    :userHeadshotNumber="data['user-header-icon']"
    :personalOperateHistory="data['personal-operate-history']"
    :colletedBoards="data['colleted-boards']"
    :supportedSigningBoards="data['supported-signing-boards']"
  />
</template>

<style>

</style>