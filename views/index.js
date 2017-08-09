import { h } from 'hyperapp';
import home from './home';
import query from './query';

const views = module.exports = [
    ['/', home],
    ['/home', home],
    ['/query/:query', query],
    ['*', query]
    // ['*', (state, actions) => {
    //   return (
    //     <b>{location.pathname}</b>
    //   );
    // }]
];
