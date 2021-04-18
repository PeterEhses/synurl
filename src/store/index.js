import Vue from 'vue'
import Vuex from 'vuex'
import apis from '@/apis.js'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    words: [],
    tlds: [],
    settings: {
      urlSeparator: "-",
    },
    theme: {
      active: {
        // numResults: 0,
        // halfResults: 0,

        remMin: "16px",
        remMax: "24px",
        mainWidth: "45em",

        nrOfGridColums: 12,
        gridRatioA: 1,
        gridRatioB: 1,
        gridGutter: '.75rem',

        dotsPerCell: 5,
        ambientAnimationSpeed: '20s',
        fastAnimationSpeed: '.3s',
        borderWidth: '.2em',
        borderRadius: 0,

        background: '#0c0e0f',
        backgroundHighlight: '#1e1d1e',
        // backgroundSemiLight: '#b6b4b6',
        // backgroundSemiHighlight: '#bcbaba',

        textColor: '#feece9',
        textColorHighlight: '#fef6f6',


        successColor: '#d4c98d',
        warnColor: '#fcd59a',
        errorColor: '#f26e6a',
        highlightColor: '#f7a09e',

        textFont: '"Work Sans", sans-serif',
        textWeight: 400,
        textStyle: '',
        textStyleEmphasis: 'italic',
        textWeightBold: 700,

        headingFont: '"Space Mono", monospace',
        headingWeight: 400,
        headingStyle: 'italic',

      },
      default: {
        light: {

        },
        dark: {
          background: '#01090D',
          textColor: '#A7C6D9',

        }
      }
    }
  },
  mutations: {
    SET_WORDS(state, words) {
      state.words = words;
    },
    SET_TLDS(state, tlds) {
      state.tlds = tlds;
    },
    // SET_NUM_RESULTS(state, numResults){
    //   state.theme.active.numResults = numResults;
    //   state.theme.active.halfResults = Math.ceil(numResults/2);
    //   console.log( state.theme.active.numResults)
    // },

  },
  actions: {
    // setNumResults(context, numRes){
    //   context.commit('SET_NUM_RESULTS', numRes)
    // },
    async loadWords(context, query) {
      // console.dir(context)
      const res = await apis.wordSearch.getSyn(query)
      // console.log(res);
      res.unshift({
        word: query,
        score: 1000000,
        tags: [
          'f:1000'
        ]
      });
      res.forEach((word, index) => {
        const freq = parseFloat((word.tags[word.tags.length-1] || "").substring(2)) || 0;
        const tldEnds = (context.state.tlds || []).filter(tld => word.word.toUpperCase().endsWith(tld.toUpperCase()) == true)//.filter(el => el != null && el != false)
        res[index] = {
          word: word.word,
          score: word.score,
          frequency: freq,
          tlds: tldEnds,
          syllables: word.numSyllables,
        }
      });
      context.commit('SET_WORDS', res)
      // context.commit('SET_NUM_RESULTS', Object.keys(res).length)
    },
    async loadTlds(context) {
      const res = await apis.tldList.getList()
      let resList = res.split(/\r\n|\r|\n/).filter(tld => tld != "")
      resList.shift()
      context.commit('SET_TLDS', resList)
    }
    // TODO: ADD LOADER FOR TLDS
  },
  modules: {
  }
})
