<template>
  <div class="wordlist">
    <!-- <div class="info"></div> -->
    <table>
        <word-info v-for="word in sortedWords" :key="word.word || 0" :word="word"/>
    </table>
    
      <!-- {{ word.word }}
      <tld-label v-for="tld in word.tlds" :key="tld">{{ tld }}</tld-label>
    </li> -->
  </div>
</template>

<script>
import { mapState } from "vuex";
// import TldLabel from "@/components/TldLabel.vue";
import WordInfo from "@/components/WordInfo.vue";
export default {
  components: {
//     "tld-label": TldLabel,
    "word-info": WordInfo,
  },
  computed: {
    ...mapState(["words"]),
    ...mapState(["tlds"]),
    sortedWords() {
      let toSort = [...this.words];
      return toSort
        .sort((word) => word.tlds[0])
        .filter((word) => word.tlds.length > 0);
    },
  },
  watch: {
      sortedWords:{
          deep: true,
          initial: true,
          handler(){
document.documentElement.style.setProperty('--num-rows', Math.ceil(this.sortedWords.length/2))
          }
        //   console.log( Math.ceil(this.sortedWords.length/2))
          
      }
  }
};
</script>

<style lang="scss">
.wordlist {
    margin: 0;
    position: relative;
    display: block;
    padding: calc(var(--grid-row-height-corrected) / 2) 0;
  position: relative;
  background: var(--background-highlight);
  grid-column-start: 2;
  grid-column-end: var(--main-right-column);
  --grid-startval: calc(2 + var(--head-height) + var(--search-height));
  grid-row-start: var(--grid-startval);
  grid-row-end: Max(calc(var(--grid-startval) + var(--num-rows) - 2), var(--grid-startval));// Max(calc(var(--grid-startval) + var(--num-rows)), calc(6 + var(--grid-startval))); // use css case-insensitive to calm SASS
  height: Max(auto, 100%);
  table{
      position: relative;
      margin-left: 50%;
        transform: translateX(-50%);
      width: 100%;
      border: none;
      border-collapse: collapse;
  }
  .info{
      height: calc(var(--grid-row-height-corrected) / 2);
  }
}
</style>