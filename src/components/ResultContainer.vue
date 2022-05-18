<template>
  <template v-if="isFirstLoading">
    <div class="loading">
      <Spinner />
    </div>
  </template>
  <template v-else>
    <h2>검색 결과 {{ totalData }}건</h2>
    <div
      class="grid-container"
    >
      <template
        v-for="movie in movieList"
        :key="movie.imdbID"
      >
        <div
          class="grid-container-item"
          :movieID="movie.imdbID"
          @click="clickItem(movie.imdbID)"
        >
          <div class="thumbnail">
            <img
              draggable="false"
              class="thumbnail-image"
              :src="movie.Poster"
              :alt="movie.Title"
            />
          </div>
          <div class="info">
            <div class="title">
              {{ movie.Title }}
            </div>
            <div class="year">
              {{ movie.Year }}
            </div>
          </div>
        </div>
      </template>
    </div>
    <Observer @trigger-intersected="trigger" />
    <template v-if="isSecondLoading">
      <scrollSpinner />
    </template>
  </template>
  <Modal
    v-if="isModalOpen"
    :info="selectedMovie"
    @close-modal="close"
  />
</template>
<script>
import Spinner from '~/components/Spinner';
import scrollSpinner from '~/components/scrollSpinner';
import Modal from '~/components/Modal';
import Observer from '~/components/Observer';
import { request } from '~/api/request';

export default {
    components: {
        Spinner,
        scrollSpinner,
        Modal,
        Observer
    },
    data() {
        return {
            movieList: [],
            totalData: 0,
            isModalOpen: false,
            selectedMovie: {},
            page: 1
        }
    },
    computed: {
        results() {
            return this.$store.state.result.results;
        },
        totalMovies() {
            return this.$store.state.result.totalData;
        },
        keyword() {
            return this.$route.params.keyword;
        },
        isFirstLoading() {
            return this.$store.state.result.isFirstLoading;
        },
        isSecondLoading() {
            return this.$store.state.result.isSecondLoading;
        }
    },
    watch: {
        results(value) {
            this.movieList = value;
        },
        totalMovies(value) {
            this.totalData = value;
        }
    },
    mounted() {
        console.log(this.keyword);
        const cachedData = JSON.parse(localStorage.getItem('cached-data'));
        if (cachedData){
            this.$store.commit('result/addFirstData', cachedData)
        }
    },
    methods: {
        async getDetailInfo(id){
            const info = await request(`?i=${id}&plot=full`)
            this.selectedMovie = info;
        },
        scrollHandler(e) {
            e.preventDefault();
        },
        keydownHandler(e) {
            if (e.key === "Escape"){
                this.close();
            }
        },
        clickItem(id) {
            this.getDetailInfo(id)
            this.isModalOpen = true;
            document.body.style.overflow = 'hidden';
            window.addEventListener('keydown', this.keydownHandler);
        },
        close() {
            this.selectedMovie = {};
            this.isModalOpen = false;
            document.body.style.overflow = 'auto';
            window.removeEventListener('keydown', this.keydownHandler);
        },
        trigger() {
            if (!this.$store.state.result.isSecondLoading){
                this.getAdditionalData(this.page+1);
            }
        },
        async getAdditionalData(page) {
            this.$store.commit('result/changeSecondLoadingState');
            const data = await request(`?s=${this.keyword}&page=${page}`);
            this.page += 1;
            this.$store.dispatch('result/updateResults', data);
            localStorage.setItem('cached-data', JSON.stringify({
                Search: this.$store.state.result.results,
                totalResults: this.$store.state.result.totalData
            }))
            this.$store.commit('result/changeSecondLoadingState');
        }
    }
}
</script>
<style scoped lang="scss">
.loading {
    @include container();
    display: flex;
    justify-content: center;
    align-items: center;
}

h2 {
    padding: 20px 0;
}

.grid-container {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    grid-template-rows: repeat(auto-fit, 1fr);
    grid-auto-rows: 1fr;
    gap: 20px;

    &-item {
        display: flex;
        flex-direction: column;
        background-color: $light-background-color;
        border-radius: 0.5rem;
        overflow: hidden;
        transition: transform .3s;
        cursor: pointer;
        &:hover {
            transform: translateY(-10px);
        }
        .thumbnail {
            width: 100%;
            height: 100%;
            min-height: 400px;
            background-color: $thumbnail-background-color;
            &-image {
                width: 100%;
                height: 100%;
            }
        }
        .info {
            padding: 10px;
            .title {
                font-size: 1.2rem;
                font-weight: 500;
            }
            .year {
                font-size: 0.875rem;
            }
        }
    }
}
</style>
