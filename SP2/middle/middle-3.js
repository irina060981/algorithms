/*
Comment it before submitting

class Node {  
  constructor(value = null, next = null) {  
    this.value = value;  
    this.next = next;  
  }  
}
*/

function getByIndex(node, idx) {
  let currentNode = node
  for(let i=0; i<idx; i++) {
    currentNode = currentNode.next
  }
  return currentNode
}

function solution(node, idx) {
  if (idx===0) {
    return node.next
  }
  const prevNode = getByIndex(node, idx-1)
  prevNode.next = prevNode.next.next
  return node
}

function test() {
  var node3 = new Node("node3");
  var node2 = new Node("node2", node3);
  var node1 = new Node("node1", node2);
  var node0 = new Node("node0", node1);
  var newHead = solution(node0, 0);
  // result is node0 -> node2 -> node3
}
