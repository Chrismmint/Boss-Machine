

const checkMillionDollarIdea = (req, res, next) => {
  if (typeof req.body.numWeeks === 'number' && typeof req.body.weeklyRevenue === 'number') {
    const yield = req.body.numWeeks * req.body.weeklyRevenue;
    if (yield < 1000000) {
      res.status(400).send();
    } else {
      next();
    }
  } else {
    res.status(400).send();
  }
};

// Leave this exports assignment so that the function can be used elsewhere
module.exports = checkMillionDollarIdea;
