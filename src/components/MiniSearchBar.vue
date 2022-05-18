<template>
  <form @submit.prevent="submit">
    <input
      v-model="searchingKeyword"
      type="text"
      placeholder="영화를 검색해보세요."
    />
    <button>검색</button>
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
input {
    width: 300px;
    height: 40px;
    outline: none;
    border: none;
    padding-left: 10px;
    border-radius: 0.5rem;
    background-color: $light-background-color;
    color: #fff;
}
button {
    width: 40px;
    height: 40px;
    margin-left: 10px;
    outline: none;
    border: none;
    cursor: pointer;
    background-color: $highlight-color;
    color: #fff;
    border-radius: 0.5rem;
    font-size: 0.875rem;
    &:hover {
        filter: saturate(0.9);
    }
}
</style>
