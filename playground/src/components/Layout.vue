<template>
  <div class='flex'>
    <div class=' flex-shrink-0 w-250px'>
      <slot name='sidebar' />
    </div>
    <div class=' flex-shrink-0 w-full'>
      <slot name='main' />
    </div>
  </div>
</template>
