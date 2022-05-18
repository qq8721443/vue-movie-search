<template>
  <div
    class="modal-background"
    @click="$emit('close-modal')"
  >
    <div
      class="modal-container"
      @click.stop
    >
      <div
        class="close-button"
        @click="$emit('close-modal')"
      >
        <span class="material-symbols-outlined">
          close
        </span>
      </div>
      <div class="content">
        <div class="image">
          <img
            v-if="isLoaded"
            :src="detailInfo.Poster"
            :alt="detailInfo.Title"
          />
          <Skeleton v-else />
        </div>
        <div class="info">
          <div class="info-title">
            {{ detailInfo.Title }} <span>{{ detailInfo.Year }}</span>
          </div>
          <div class="info-released">
            {{ detailInfo.Released }}
          </div>
          <div class="info-runtime">
            {{ detailInfo.Runtime }}
          </div>
          <div class="info-director">
            {{ detailInfo.Director }}
          </div>
          <div class="info-actors">
            {{ detailInfo.Actors }}
          </div>
          <div class="info-plot">
            {{ detailInfo.Plot }}
          </div>
        </div>
      </div>
    </div>      
  </div>
</template>

<script>
import Skeleton from '~/components/Skeleton';

export default {
    components: {
        Skeleton
    },
    props: {
        info: {
            type: Object,
            default: function() {
                return {}
            }
        }
    },
    emits: ['close-modal'],
    computed: {
        detailInfo() {
            return this.info
        },
        isLoaded() {
            return JSON.stringify(this.info) !== '{}'
        }
    }
}
</script>

<style scoped lang="scss">
.modal-background {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background-color: rgba(100, 100, 100, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;

    .modal-container {
        width: 70vw;
        min-height: 440px;
        padding: 20px;
        border-radius: 0.5rem;
        background-color: $background-color;

        .content {
            display: flex;
            gap: 20px;
            .image {
                position: relative;
                border-radius: 0.5rem;
                background-color: $light-background-color;
                min-width: 300px;
                min-height: 440px;
                overflow: hidden;

                img {
                    width: 100%;
                    height: 100%;
                }
            }
            .info {
                flex: 1;
                display: flex;
                flex-direction: column;
                gap: 10px;
                &-title {
                    font-size: 1.5rem;
                    font-weight: 500;
                    span {
                        font-size: 1.5rem;
                        font-weight: 400;
                    }
                }
            }
        }
        
        .close-button {
            @include buttonHover();
            position: relative;
            display: flex;
            justify-content: center;
            align-items: center;
            width: 40px;
            height: 40px;
            float: right;
            cursor: pointer;
        }
    }
}
</style>
