<template>
  <div class="container">
    <div>
      <h1>페이지를 찾을 수 없습니다.</h1>
      <p>{{ count }}초 후 이전 페이지로 자동으로 돌아갑니다.</p>
      <button
        class="button"
        @click="goBack"
      >
        이전으로
      </button>
    </div>
  </div>
</template>

<script>
export default {
    data() {
        return {
            count: 5
        }
    },
    watch: {
        count() {
            if (this.count === 0) {
                this.$router.back()
            }
        }
    },
    mounted() {
        setInterval(() => {
            this.count -= 1;
        }, 1000)
    },
    methods: {
        goBack() {
            this.$router.back()
        }
    }
}

</script>

<style scoped lang="scss">
.container {
    @include container();
    display: flex;
    justify-content: center;
    align-items: center;
    
    h1 {
        margin-bottom: 40px;
    }

    p {
        font-size: 1.2rem;
        margin-bottom: 40px;
    }

    .button {
        width: 100px;
        padding: 10px;
        background-color: $highlight-color;
        outline: none;
        border: none;
        border-radius: 0.5rem;
        cursor: pointer;
        color: #fff;
        font-size: 1.2rem;
    }
}
</style>
