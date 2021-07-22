<template>
  <div :class="['drag-drawer', { 'is-trans': isTrans }]" :style="{ transform: `translateY(${translateY}px)` }">
    <div class="drag-bar" @touchstart="touchstart" @touchmove.prevent="touchmove" @touchend="touchend"></div>
    <div><slot></slot></div>
  </div>
</template>

<script>
export default {
  props: {
    points: {
      type: Array,
      default: () => [-100, -660]
    }
  },
  data() {
    return {
      isTrans: false,
      translateY: undefined
    }
  },
  computed: {
    sortedPoints() {
      return [...this.points].sort((a, b) => b - a)
    }
  },
  created() {
    this.translateY = this.sortedPoints[0]
  },
  methods: {
    touchstart(e) {
      this.isTrans = false
      this.startY = e.targetTouches[0].pageY
    },

    touchmove(e) {
      this.movedY = e.targetTouches[0].pageY - this.startY
      const max = this.sortedPoints[0]
      const min = this.sortedPoints[this.sortedPoints.length - 1]
      const translateY = (this.lastTranslateY || max) + this.movedY
      if (translateY > min && translateY < max) {
        this.translateY = translateY
      } else if (translateY <= min) {
        this.translateY = min
      } else {
        this.translateY = max
      }
    },

    touchend() {
      this.isTrans = true
      const i = this.sortedPoints.findIndex(item => item <= this.translateY)
      if (this.movedY < 0) {
        this.translateY = this.sortedPoints[i]
      } else if (this.movedY > 0) {
        this.translateY = this.sortedPoints[i - 1]
      }
      this.lastTranslateY = this.translateY
    }
  }
}
</script>

<style lang="scss" scoped>
.drag-drawer {
  border-radius: 16px 16px 0 0;
  overflow: hidden;
  background: #cff;
  height: 660px;
  position: fixed;
  left: 0;
  right: 0;
  top: 100%;
  &.is-trans {
    transition: transform linear .2s;
  }
  .drag-bar {
    height: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
    &::before {
      content: '';
      display: block;
      width: 40px;
      height: 5px;
      background: #CCCED1;
      border-radius: 10px;
    }
  }
}
</style>
