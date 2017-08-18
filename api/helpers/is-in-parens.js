const sumArrayOfObjs = arr => {
  return arr.reduce((acc, individualObj) => {
    Object.keys(individualObj).forEach(key => {
      acc[key] = (acc[key] || 0) + individualObj[key];
    });
    return acc;
  }, {});;
};

const countParens = node => {
  if (node.type === "text") {
    const text = node.data;
    return {
      open: text.split('(').length - 1,
      close: text.split(')').length - 1
    };
  } else if (node.type === "tag") {
    return sumArrayOfObjs(
      node.children.map(countParens)
    );
  }
};

const isLink = (node, $link) => {
  // compares a given node to the $link
  return $link.is(node);
  // return node && node.type === "tag" &&
  //     node.name === 'a' &&
  //     node.attribs.href === $link.attr('href') &&
  //     node.children && node.children[0].data === $link.text();
};

const isInParens = ($link) => {

  const linkText = $link.text();
  const $parent = $link.parent();

  const contents = $parent.contents();

  const textContent = $parent.text();
  console.log('is in parens? ', linkText);

  let i = 0;
  const parenCounts = [];
  while (!isLink(contents[i], $link)) {
    parenCounts.push(
      countParens(contents[i])
    );
    i++;
  }

  // totals = sum paren count of all nodes before the $link
  const totals = sumArrayOfObjs(parenCounts);
  return totals.open !== totals.close;

};
export default isInParens;
