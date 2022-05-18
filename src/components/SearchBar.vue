<template>
  <form @submit.prevent="submit">
    <div>
      <input
        v-model="searchingKeyword"
        placeholder="찾고 싶은 영화 제목을 입력해보세요."
      />
      <button>검색</button>
    </div>
  </form>
</template>

<script>
import { request } from '~/api/request';

export default {
    data() {
        return {
            searchingKeyword: ''
        }
    },
    methods: {
        async submit() {
            if (this.searchingKeyword.trim()){
                this.changeLoadingState();
                this.$router.push(`/result/${this.searchingKeyword}`);
                const res = await request(`?s=${this.searchingKeyword}&page=1`);
                if (res.Response === "False"){
                    this.$store.commit('result/setResponseState', false);
                    alert('오류가 발생했습니다. 검색 페이지로 돌아갑니다.');
                    this.$router.push('/');
                    return;
                }
                this.$store.commit('result/addFirstData', res);
                localStorage.setItem('cached-data', JSON.stringify({
                    Search: res.Search,
                    totalResults: res.totalResults
                }))
                this.changeLoadingState();
            }
        },
        changeLoadingState() {
            this.$store.commit('result/changeLoadingState');
        }
    }
}
</script>

<style scoped lang="scss">
div {
    position: relative;
    display: flex;
    align-items: center;
    gap: 10px;
}

input {
    width: 500px;
    height: 40px;
    padding-left: 10px;
    font-size: 1.2rem;
    border: none;
    outline: none;
    border-radius: 0.5rem;
}

button {
    width: 100px;
    height: 40px;
    border: none;
    border-radius: 0.5rem;
    background-color: $highlight-color;
    font-size: 1.2rem;
    color: $font-color;
    cursor: pointer;
    &:hover {
        filter: saturate(0.9);
    }
}
</style>
