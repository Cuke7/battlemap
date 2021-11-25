export const state = () => ({
  tokens: [],
  background: null,
  width: 100,
  height: 100,
});

export const mutations = {
  addToken(state, token) {
    state.tokens.push(token);
  },
  addBackground(state, background) {
    state.background = background;
  },
  setDimensions(state, dimensions) {
    state.width = dimensions.width;
    state.height = dimensions.height;
  },
};
