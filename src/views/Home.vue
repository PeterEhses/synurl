<template>
  <div class="home softpage grid">
    <v-header/>
    <WordSearch placeholder="Search . . ."/>
    <WordList/>
    <v-footer/>
  </div>
</template>

<script>
// @ is an alias to /src
import WordSearch from '@/components/WordSearch.vue'
import WordList from '@/components/WordList.vue'
import vHeader from '@/components/Header.vue'
import vFooter from "@/components/Footer.vue"
export default {
  name: 'Home',
  components: {
    WordSearch,
    WordList,
    "v-header": vHeader,
    'v-footer': vFooter
  }
}
</script>

<style lang="scss">
</style>
