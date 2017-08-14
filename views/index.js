import { h } from 'hyperapp';
import Home from './home';
import Query from './query';

export default [
    // local
    ['/', Home],
    ['/home', Home],
    ['/query', Query],
    // github pages
    ['/wiki-hops/', Home],
    ['/wiki-hops/home', Home],
    ['/wiki-hops/query', Query],
    // 404
    ['*', Home]
    // ['*', (state, actions) => {
    //   return (
    //     <b>{location.pathname}</b>
    //   );
    // }]
];
