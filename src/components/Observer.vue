<template>
  <div ref="trigger">
  </div>
</template>

<script>
export default {
    emits: ['trigger-intersected'],
    data() {
        return {
            observer: null,
        }
    },
    mounted() {
        try {
            this.observer = new IntersectionObserver(entries => {
                entries.forEach(entry => {
                    if (entry.isIntersecting){
                        this.handleIntersect(entry)
                    }
                })
            }, {threshold: 0.1})
            this.observer.observe(this.$refs.trigger);
        } catch(e) {
            console.log(e);
        }
    },
    beforeUnmount() {
        this.observer.unobserve(this.$refs.trigger);
    },
    methods: {
        handleIntersect(entry) {
            if(entry.isIntersecting) {
                console.log(this.$store.state.result.totalData);
                console.log(this.$store.state.result.results);
                console.log(this.$store.state.result.results.length);
                if (this.$store.state.result.totalData > this.$store.state.result.results.length) {
                    this.$emit('trigger-intersected');
                }
            }
        }
    }
}
</script>
<style scoped lang="scss">
div {
    height: 10px;
}
</style>
