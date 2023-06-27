const
  db = require('./../models'),
  jwt = require('jsonwebtoken');
  userController = {};

userController.signUp = (req, res) => {
  const { username, password } = req.body;

  const user = new db.User({
    username,
    password
  });

  user
    .save()
    .then((newUser) => {
      return res.status(200).json({
        success: true,
        data: newUser
      })
    })
    .catch((error) => {
      return res.status(500).json({
        success: false,
        error
      })
    });
}

userController.signIn = (req, res) => {
  db.User
  .findOne({ username: req.body.username })
  .exec()
  .then((user) => {
    if (!user) res.status(401).json({
      success: false,
      error: {
        message: 'Authentication failed. User not found.'
      }});
    else {
      user.comparePassword(req.body.password, function (err, isMatch) {
        if (isMatch && !err) {
          const token = jwt.sign(user.toJSON(), process.env.SECRET);
          return res.status(200).json({ 
            success: true,
            data: {
              token: token, 
              userId: user._id,
              username: user.username
            },
          });
        } else {
          return res.status(401).json({
            success: false, 
            error: { message: 'Authentication failed. Wrong password.'} 
          });
        }
      });
    }
  })
  .catch(error => res.status(500).json({ 
    success: false, 
    error 
  }));
};

module.exports = userController