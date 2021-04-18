<template>
  <tr class="wordinfo">
    <th class="">{{ word.word }}</th>
    <td>
        <list-pair v-for="pair in tldSep" :key="pair[1]" :pair="pair"/>
    </td>
  </tr>
</template>

<script>
import { mapState } from "vuex"
import ListPair from "@/components/ListPair.vue"
export default {
  components: {
      "list-pair": ListPair
  },
  props: ["word"],
  data() {
    return {
      domainStatus: {},
    };
  },
  computed: {
    ...mapState(["settings"]),
    tldSep() {
      let words = [];
      for (const tldid in this.word.tlds) {
        const tld = this.word.tlds[tldid];
        const remainder = this.word.word.substring(
          0,
          this.word.word.length - tld.length
        );
        words.push([
          remainder.trim().replace(/\s/g, this.settings.urlSeparator),
          tld.toLowerCase(),
        ]);
      }
      return words;
    },
  },
};
</script>

<style lang="scss">
.wordinfo {
    position: relative;
  border: none;
  
      border-collapse: collapse;
  height: calc(var(--grid-row-height) / 2);
  width: 100%;
  //display: block;
  position: relative;
  th {
    border: none;
    white-space: nowrap;
    padding: 0 0 0 0.75rem;
    text-align: right;
    font-family: var(--heading-font);
    font-weight: var(--heading-weight);
    font-style: var(--heading-style);
    &::after {
      content: "↝";
      padding: 0 0.65rem;
    }
  }
  td {
    border: none;
    //display: inline-block;
    padding: 0 0.75rem 0 0;
  }
//   background-color: var(--background-highlight);
  &:hover {
    background-color: var(--background);
  }
}
</style>