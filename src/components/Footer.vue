<template>
  <footer>
      <p>Made with ↭ by <a href="www.peter-ehses.de">Peter Ehses</a>.</p>
      <p>Thanks for the data to <a href="https://www.datamuse.com/">datamuse</a>.</p>
      <p>Something not working? Probably. Shoot me a bug report or fix it yourself on <a href="https://github.com/PeterEhses/synurl">GitHub</a>!</p>
  </footer>
</template>

<script>
export default {};
</script>

<style lang="scss">
footer {
    padding: .75rem;
    font-size: .8rem;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
    position: relative;
  grid-column-start: 2;
  grid-column-end: 12;
  --grid-startval: max(
    calc(2 + var(--head-height) + var(--search-height) + var(--num-rows) - 2),
    calc(2 + var(--head-height) + var(--search-height) + 1)
  );
  grid-row-start: var(--grid-startval);
  grid-row-end: calc(var(--grid-startval) + 2);
  a {
      color: var(--highlight-color);
      text-decoration: none;
  }
}
</style>