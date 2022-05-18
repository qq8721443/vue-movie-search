<template>
  <span
    class="skeleton-box"
    style="width: 100%;height: 100%;"
  ></span>
</template>

<style scoped lang="scss">
.skeleton-box {
    display: inline-block;
    position: relative;
    overflow: hidden;
    background-color: $light-background-color;

    &::after {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        transform: translateX(-150%);
        background-image: linear-gradient(
            90deg, 
            rgba(#555, 0) 0, 
            rgba(#555, 0.2) 40%,
            rgba(#555, 0.5) 60%,
            rgba(#555, 0),
        );
        animation: shimmer 2s infinite;
    }

    @keyframes shimmer {
        100% {
            transform: translateX(150%);
        }
    }
}
</style>
