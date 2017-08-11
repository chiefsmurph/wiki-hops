import { h } from 'hyperapp';

const Context = ({ firstLink }) => {

  const setInnerHTML = (el) => {
    const { context, text, url } = firstLink;
    el.innerHTML = context.replace(new RegExp(` (${text})`), ' <b>$1</b>');
  };

  return (
    <div oncreate={setInnerHTML} class="context" />
  );
};

export default Context;
