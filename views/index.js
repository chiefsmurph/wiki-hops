import { h } from 'hyperapp';
import Home from './home';
import Query from './query';

export default [
    ['/', Home],
    ['/home', Home],
    ['/query', Query],
    ['*', Query]
    // ['*', (state, actions) => {
    //   return (
    //     <b>{location.pathname}</b>
    //   );
    // }]
];
