const express = require('express');

const router = express.Router();



router.use((req, res, next)=>{
    console.log('Time: ', Date.now());
    next();
})

router.get("/", (req, res, next) => {
  res.json({message: 'Hello from server!'});
});

module.exports = router;