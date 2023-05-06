const axios = require('axios');
//const niceList = require('../utils/niceList.json');
const niceList = require('../utils/newlist.json');
const MerkleTree = require('../utils/MerkleTree');
const merkleTree = new MerkleTree(niceList);
const serverUrl = 'http://localhost:1225';

//console.log('index',process.argv[2]);
//const index = niceList.findIndex(n => n === process.argv[2]);
//const index = niceList.indexOf(process.argv[2]);
// if (!index || index < 0 || index > niceList.length || !process.argv[2]) {
//   console.log('Name not found in nice list!');
//   process.exit(1);
// }

const leaf = process.argv[2];
console.log('leaf',leaf);
const index = niceList.findIndex(n => n == leaf.toString());
//const index = process.argv[2];

console.log('index',index);
console.log('leaf',leaf);
const proof = merkleTree.getProof(index);
console.log('proof',proof);
async function main() {
  // TODO: how do we prove to the server we're on the nice list? 

  const { data: gift } = await axios.post(`${serverUrl}/gift`, {
    // TODO: add request body parameters here!
    leaf,proof
  });

  console.log({ gift });
  console.log('gift', {gift})
}

main();