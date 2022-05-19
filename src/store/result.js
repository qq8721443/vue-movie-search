export default {
    namespaced: true,
    state() {
        return {
            results: [],
            totalData: 0,
            responseState: null,
            isFirstLoading: false,
            isSecondLoading: false,
        }
    },
    mutations: {
        resetResults(state) {
            state.results = [];
            state.totalData = 0;
        },
        addFirstData(state, nextState) {
            state.results = nextState.Search;
            state.totalData = nextState.totalResults;
        },
        updateResults(state, nextState){
            state.results = [...state.results, ...nextState.Search]
            state.totalData = nextState.totalResults;
        },
        getResults(state) {
            console.log(state.result);
        },
        changeLoadingState(state) {
            state.isFirstLoading = !state.isFirstLoading;
        },
        changeSecondLoadingState(state) {
            state.isSecondLoading = !state.isSecondLoading;
        },
        setResponseState(state, nextState) {
            state.responseState = nextState;
        }
    },
    actions: {
        updateResults(context, nextState) {
            context.commit('updateResults', nextState);
        },
        getResults(context) {
            context.commit('getResults');
        }
    }
}
