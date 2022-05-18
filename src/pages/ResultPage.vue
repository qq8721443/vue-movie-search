<template>
  <div class="container">
    <ResultContainer />
  </div>
</template>

<script>
import ResultContainer from '~/components/ResultContainer';

export default {
    components: {
        ResultContainer,
    },
}
</script>

<style scoped lang="scss">
.container {
    @include container();
    padding: 0 40px;
}
</style>
