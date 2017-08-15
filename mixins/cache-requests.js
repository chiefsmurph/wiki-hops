export default () => ({
  state: {
    wikiCache: JSON.parse(localStorage.getItem('wikiCache')) || {},
    cacheCapable: typeof(Storage) !== "undefined"
  },
  actions: {
    saveToCache(state, actions, { page, data }) {
      if (!state.cacheCapable) return;
      const newCache = {
        ...state.wikiCache,
        [page]: data
      };
      console.log(newCache, 'newCache');
      localStorage.setItem('wikiCache', JSON.stringify(newCache));
      return { wikiCache: newCache };
    }
  }
});
