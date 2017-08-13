import homeActions from './home';
import queryActions from './query';

const actions = Object.assign({},
  {
    init: () => {
      alert('initting');
    }
  },
  homeActions,
  queryActions
);

export default actions;
