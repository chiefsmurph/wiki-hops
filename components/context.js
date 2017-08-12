import { h } from 'hyperapp';

const Context = ({ firstLink }) => {

  const setInnerHTML = (el) => {
    const { context, text, url } = firstLink;
    const isFirstWordOfContext = context.substring(0, text.length) === text;
    const escapedText = text.replace(/(?=[() ])/g, '\\');
    const regexp = isFirstWordOfContext ? `(${escapedText})` : ` (${escapedText})`;
    const replaceWith = isFirstWordOfContext ? '<b>$1</b>' : ' <b>$1</b>';
    el.innerHTML = context.replace(new RegExp(regexp), replaceWith);
  };

  return (
    <div oncreate={setInnerHTML} class="context" />
  );
};

export default Context;
