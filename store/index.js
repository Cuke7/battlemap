export const state = () => ({
  tokens: [],
  background: null,
  width: 100,
  height: 100,
  tokenScale: 0.25,
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
  changeTokenScale(state, newScale) {
    state.tokenScale = newScale;

    for (const token of state.tokens) {
      let w = token.data.config.width;
      let h = token.data.config.height;
      let x = token.data.config.x;
      let y = token.data.config.y;
      let oldCenterX = x + w / 2;
      let oldCenterY = y + h / 2;

      token.data.config.width = state.width * newScale;
      token.data.config.height =
        token.data.config.height * (token.data.config.width / w);

      let newCenterX = x + token.data.config.width / 2;
      let newCenterY = y + token.data.config.height / 2;
      let transformationX = newCenterX - oldCenterX;
      let transformationY = newCenterY - oldCenterY;

      token.data.config.x -= transformationX;
      token.data.config.y -= transformationY;
    }
  },
};
