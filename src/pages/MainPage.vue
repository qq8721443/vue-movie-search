<template>
  <div class="container">
    <h1>
      간편하게 영화를 검색해보세요.<br />
      찾는 영화가 <strong>우수수</strong> 나온답니다.
    </h1>
    <SearchBar />
  </div>
</template>
<script>
import SearchBar from '~/components/SearchBar';

export default {
    components: {
        SearchBar
    }
}
</script>
<style scoped lang="scss">
.container {
    @include container();
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 30px;

    h1 {
        font-size: 2.5rem;
    }

    strong {
        font-weight: bold;
        color: $highlight-color;
    }
}
</style>
