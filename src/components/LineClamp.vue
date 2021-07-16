<template>
  <div class="line-clamp">
    <input type="checkbox" id="more">
    <div class="line-clamp-inner">
      <label for="more" class="more"></label>
      <span><slot></slot></span>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.line-clamp {
  margin: auto;
  width: 500px;
  border: 1px solid #ccc;
  resize: horizontal;
  margin-bottom: 24px;
  background: #fafafa;
  /* 以上示例容器样式 */

  display: flex;
}

#more {
  display: none;
}

.line-clamp-inner {
  overflow: hidden;
  line-height: 1.5;
  text-align: justify;
  max-height: 4.5em;
  position: relative;
}
#more:checked + .line-clamp-inner {
  max-height: none;
}

.line-clamp-inner::before {
  content: '';
  float: right;
  height: 100%;
  margin-top: -1.5em;
}

.line-clamp-inner::after {
  content: '';
  width: 100%;
  height: 100%;
  position: absolute;
  background: #fff;
}
#more:checked + .line-clamp-inner::after {
  visibility: hidden;
}

.more {
  float: right;
  clear: both;
  color: #4D91F7;
  position: relative;
  padding-left: 1.5em;
}

.more::before {
  content: '…';
  position: absolute;
  left: 0;
  color: initial;
}
#more:checked + .line-clamp-inner .more::before {
  visibility: hidden;
}

.more::after {
  content: '展开';
}
#more:checked + .line-clamp-inner .more::after {
  content: '收起';
}
</style>
