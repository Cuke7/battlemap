export const state = () => ({
  tokens: [],
  background: null,
});

export const mutations = {
  addToken(state, token) {
    state.tokens.push(token);
  },
  addBackground(state, background) {
    state.background = background;
  },
};
