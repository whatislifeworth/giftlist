const express = require('express');
const verifyProof = require('../utils/verifyProof');
const merkletree = require('../utils/MerkleTree');
//const giftlist = require('../utils/niceList.json');
const giftlist = require('../utils/newlist.json');
const port = 1225;

const app = express();
app.use(express.json());

// TODO: hardcode a merkle root here representing the whole nice list
// paste the hex string in here, without the 0x prefix
const merkleTree = new merkletree(giftlist);
const MERKLE_ROOT = merkleTree.getRoot();
console.log(MERKLE_ROOT);




app.post('/gift', (req, res) => {
  // grab the parameters from the front-end here
  const {proof,leaf} = req.body;

  // TODO: prove that a name is in the list 
  let isInTheList = false;

  isInTheList = verifyProof(proof,leaf,MERKLE_ROOT);
  console.log('isIntheList',isInTheList);
  if(isInTheList) {
    res.send("You got a toy robot!");
  }
  else {
    res.send("You are not on the list :(");
  }
});

app.listen(port, () => {
  console.log(`Listening on port ${port}!`);
});
