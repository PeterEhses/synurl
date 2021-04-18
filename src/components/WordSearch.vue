<template>
  <div class="searchbar bordergradient">
      <button @click="submit">Get some fresh synonyms!</button>
      <input type="text" :placeholder=placeholder v-model="query" @keyup.enter=submit>
  </div>
</template>

<script>
import {mapState} from "vuex";

export default {
    props: {
        placeholder: {default: "Search..."}
    },
    data: function(){
        return{
            query:""
        }
    },
    computed: {
        ...mapState(['words']),
    },
    methods: {
        submit(){
            this.$store.dispatch('loadWords', this.query);
        }
    }
}
</script>

<style lang="scss">
    .searchbar{
        position: relative;
        grid-column-start: 6;
        grid-column-end: var(--search-right-column);
        grid-row-start: calc(2 + var(--head-height));
        grid-row-end: calc(2 + var(--head-height) + var(--search-height));

        input[type=text]{
            background: var(--background);
            border: none;
            margin: var(--margin-partial) var(--margin-partial) var(--margin-partial) 0;
            padding: 0 .75em;
            height: calc(100% - var(--margin-partial) - var(--margin-partial));
            width: calc(100% - var(--margin-partial));
            color: var(--text-color);
            &::placeholder{
                color: var(--text-color);
                opacity: .5;
            }
        }
        button{
            position: absolute;
            height: calc(100% - 1.5rem);
            width: 70%;
            top: .75rem;
            right: 100%; //calc(100% + .75rem);
            
            //@warnfont-weight: var(--text-weight-bold);
            color: var(--text-color-highlight);
            background: none;
            border: none;
            &::after{
                content: "→";
                margin: 1rem;
            }
        }
    }
</style>