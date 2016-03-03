require("babel-polyfill");
import 'es6-promise';
import {drawTree} from './tree';

let arr = [];
const socket = io();

let createView = (node) => {
  arr.push(node);
  Array.isArray(node.children) && node.children.map(child => createView(child))
}

let updateView = (result, left, right) => {
  [result[left].name, result[right].name] = [result[right].name, result[left].name];
  return result;
}

socket.on('notification', (treeData) => {
  createView(treeData);
  drawTree(treeData);
  let updated_data = updateView(arr, 0, 1);

  socket.emit('update', updated_data);
});