<template>
  <span class="pair" 
    >
    <div :class="['tooltip', 'status-' + this.status]">
      {{ tooltipText[this.status] }}
    </div>
    {{ pair[0] }}.<span :class="['tld', 'status-' + this.status]">{{
      pair[1]
    }}</span>
    
  </span>
</template>

<script>
//  @click="copyToClipboard(pair[0]+'.'+pair[1])"
export default {
  props: ["pair"],
  data() {
    return {
      tooltipText: [
        "This one seems to be free to take.",
        "That's just the tld. Try to put something in front!",
        "This one seems to be taken. Try to add something in front.",
      ],
      domainStatus: {},
      status: "2", // 0: available, 1: tld only, 2: taken
    };
  },
  computed: {},
  watch: {
    pair: {
      deep: true,
      immediate: true,
      async handler() {
        if (this.pair.length <= 0) {
          return;
        }
        var resp = {};
        if (this.pair[0].length == 0) {
          resp[this.pair[1]] = { isNull: true };
        } else {
          try {
            const query =
              "https://dns.google/resolve?name=" +
              this.pair[0] +
              "." +
              this.pair[1];
            const response = await fetch(query);
            const json = await response.json();
            //   console.dir({ query, json });
            resp[this.pair[1]] = json;
          } catch (error) {
            resp[this.pair[1]] = { isNull: error };
          }
        }
        this.domainStatus = resp;
        this.updateStatus();
      },
    },
  },
  methods: {
    updateStatus() {
      if (this.pair[0].length <= 0) {
        this.status = 1;
        return;
      } else if (
        this.domainStatus[this.pair[1]] &&
        this.domainStatus[this.pair[1]].Answer
      ) {
        this.status = 2;
        return;
      } else {
        this.status = 0;
        return;
      }
    },
    copyToClipboard(text) {
      var dummy = document.createElement("textarea");
      document.body.appendChild(dummy);
      dummy.value = text;
      dummy.select();
      document.execCommand("copy");
      document.body.removeChild(dummy);
    },
  },
  mounted() {
    this.updateStatus();
  },
};
</script>

<style lang="scss">
.pair {
  position: relative;
  white-space: nowrap;
  padding: 0 0.75rem 0 0;
  .tld {
    &.status-0 {
      color: var(--success-color);
    }

    &.status-1 {
      color: var(--warn-color);
    }
    color: var(--error-color);
  }
  .tooltip {
    &.status-0 {
      background: var(--success-color);
      &:after {
        border-color: transparent transparent var(--success-color) transparent;
      }
    }
    &.status-1 {
      background: var(--warn-color);
      &:after {
        border-color: transparent transparent var(--warn-color) transparent;
      }
    }
    position: absolute;
    user-select: none;
    padding: 0 0.5rem;
    right: calc(50% + 0.375rem);
    top: 150%;
    transform: translate(50%, 0);
    opacity: 0;
    pointer-events: none;
    background: var(--highlight-color);
    color: var(--background);
    z-index: 1000;
    transition: opacity var(--fast-animation-speed);
    &::after {
      content: "";
      position: absolute;
      bottom: 100%;
      left: 50%;
      margin-left: -5px;
      border-width: 5px;
      border-style: solid;
      border-color: transparent transparent var(--highlight-color) transparent;
    }
  }
  &:hover .tooltip {
    opacity: 1;
    pointer-events: all;
  }
}
</style>