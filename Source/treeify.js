export function treeify(data) {
  var dataMap = data.reduce(function(map, node) {
  map[node.id] = node;
  return map;
}, {});

// create the tree array
var tree = [];
data.forEach(function(node) {
  // add to parent
  var parent = dataMap[node.parentId];
  if (parent) {
      // create child array if it doesn't exist
      (parent.children || (parent.children = []))
          // add node to child array
          tree.push(node);
  } else {
      // parent is null or missing
      tree.push(node);
  }
});
return tree;
};
