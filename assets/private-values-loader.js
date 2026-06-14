(function() {
  const script = document.currentScript;
  const secretSrc = script ? script.dataset.secretSrc : '';

  if (!secretSrc) {
    return;
  }

  function applyReplacements(text, replacements) {
    let updated = text;

    for (const pair of replacements) {
      if (!Array.isArray(pair) || pair.length !== 2) {
        continue;
      }

      const find = pair[0];
      const replace = pair[1];

      if (!find) {
        continue;
      }

      updated = updated.split(find).join(replace);
    }

    return updated;
  }

  function collectTextNodes(root) {
    const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, {
      acceptNode(node) {
        if (!node.nodeValue || !node.nodeValue.trim()) {
          return NodeFilter.FILTER_REJECT;
        }

        const parent = node.parentElement;
        if (parent && ['SCRIPT', 'STYLE', 'NOSCRIPT'].includes(parent.tagName)) {
          return NodeFilter.FILTER_REJECT;
        }

        return NodeFilter.FILTER_ACCEPT;
      }
    });

    const nodes = [];
    while (walker.nextNode()) {
      nodes.push(walker.currentNode);
    }

    return nodes;
  }

  fetch(secretSrc, { cache: 'no-store' })
    .then((response) => {
      if (!response.ok) {
        return null;
      }

      return response.json();
    })
    .then((data) => {
      if (!data || !Array.isArray(data.replacements) || !document.body) {
        return;
      }

      const replacements = [...data.replacements].sort((a, b) => {
        const aLen = Array.isArray(a) && a[0] ? a[0].length : 0;
        const bLen = Array.isArray(b) && b[0] ? b[0].length : 0;
        return bLen - aLen;
      });

      const textNodes = collectTextNodes(document.body);
      for (const node of textNodes) {
        node.nodeValue = applyReplacements(node.nodeValue, replacements);
      }

      document.title = applyReplacements(document.title, replacements);
    })
    .catch(() => {
      // Missing local secret file is expected on the public build.
    });
})();
