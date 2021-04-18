<template>
  <i><slot/></i>
</template>

<script>
export default {
    name: "TldLabel"
}
</script>

<style>
i{
    position: relative;
    color: var(--highlight-color);
    margin: .1em;
    padding: 0 .2em;
    border: 1px solid black;
    text-transform: lowercase;
    font-style: var(--text-style);
}
</style>