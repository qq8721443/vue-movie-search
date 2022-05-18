<template>
  <header>
    <div
      v-if="!isRoot"
      class="gnb-left"
    >
      <div
        class="back"
        @click="back"
      >
        <span
          class="material-symbols-outlined"
        >
          chevron_left
        </span>
      </div>
      <MiniSearchBar />
    </div>
    <div v-else></div>
    <div class="control">
      <div
        class="control-item"
        @click="toggleTooltip"
      >
        <span class="material-symbols-outlined">
          help
        </span>
        <div
          v-if="isTooltipOpen"
          class="info-tooltip"
        >
          <h3>영화 검색 하는 법</h3>
          <p>검색창에 찾고 싶은 영화 제목을 입력하고 엔터나 검색 버튼을 누르세요! 한글로 된 영화는 검색할 수 없습니다.</p>
        </div>
      </div>
    </div>
  </header>
</template>

<script>
import MiniSearchBar from '~/components/MiniSearchBar';

export default {
    components: {
        MiniSearchBar
    },
    data() {
        return {
            isTooltipOpen: false
        }
    },
    computed: {
        isRoot() {
            return this.$route.path === '/';
        }
    },
    methods: {
        back() {
            if (this.$route.path.includes('/result')){
                this.$router.push('/');
                this.$store.commit('result/resetResults');
                localStorage.removeItem('cached-data');
            }
        },
        toggleTooltip() {
            this.isTooltipOpen = !this.isTooltipOpen
        }
    }
}
</script>

<style scoped lang="scss">
header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    height: 60px;
    padding: 0 20px;
    background-color: $background-color;
    color: $font-color;

    .gnb-left {
        display: flex;
        align-items: center;
        gap: 10px;
        .back {
            @include buttonHover();
            flex-shrink: 0;
            position: relative;
            width: 40px;
            height: 40px;
            display: flex;
            justify-content: center;
            align-items: center;
            cursor: pointer;
        }
    }

    .control {
        &-item {
            @include buttonHover();
            position: relative;
            cursor: pointer;
            width: 40px;
            height: 40px;
            display: flex;
            justify-content: center;
            align-items: center;
            .info-tooltip {
                position: absolute;
                top: 100%;
                right: 0;
                width: 300px;
                background-color: #fff;
                border-radius: 0.5rem;
                padding: 20px;
                color: #222;
                p {
                    margin-top: 20px;
                    word-break: keep-all;
                }
            }
        }
    }
}
</style>
