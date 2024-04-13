<template>
  <div class='flex'>
    <div class=' flex-shrink-0 w-250px'>
      <slot name='sidebar' />
    </div>
    <Splitter class=' w-full'>
      <SplitterPanel :min-size='50'>
        <slot name='main' />
      </SplitterPanel>
      <SplitterPanel
        :min-size='10'
        :size='30'
      >
        <slot name='code' />
      </SplitterPanel>
    </Splitter>
  </div>
</template>
