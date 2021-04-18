<template>
  <header class="polkadot gradient">
      <h1 class="heading">
          <!-- funky-na.me -->
          like-th.at
      </h1>
      <h2>generate funky urls that use their <abbr title="top levle domain">tld</abbr> as part of a word, just like that ↑</h2>
  </header>
</template>

<script>
export default {
name: "v-header"
}
</script>

<style lang="scss">
    header{
        grid-column-start: 2;
        grid-column-end: var(--main-right-column);
        grid-row-start: 2;
        grid-row-end: calc(2 + var(--head-height));
    }
</style>