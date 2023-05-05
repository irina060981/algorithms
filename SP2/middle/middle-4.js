/*
Comment it before submitting
class Node {  
  constructor(value = null, next = null) {  
    this.value = value;  
    this.next = next;  
  }  
}
*/
function solution(node, elem) {
  let currentNode = node
  let idx = -1
  let resultIdx = -1
  let finished = false

  while (!finished && currentNode) {
    idx++
    if (currentNode.value === elem) {
      resultIdx = idx
      finished = true
    } else {
      currentNode = currentNode.next
    }
  }
  
  return resultIdx
}

function test() {
  var node3 = new Node("node3");
  var node2 = new Node("node2", node3);
  var node1 = new Node("node1", node2);
  var node0 = new Node("node0", node1);
  var idx = solution(node0, "node4");
  // result is idx === 2
}
