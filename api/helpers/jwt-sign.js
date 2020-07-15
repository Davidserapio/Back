const jwt = require('jsonwebtoken');

module.exports = {


  friendlyName: 'JWT Sign',


  description: 'JWT Signing',


  inputs: {

    user: {
      description: 'The user\'s token data',
      type: 'ref',
      required: true
    }

  },


  exits: {

    success: {
      description: 'All done.',
    },

  },


  fn: async function (inputs, exits) {
    
    var token = jwt.sign(inputs.user, 'h2HnAMU9NsnDS@bqhs&$rAYZ%&sNph6Q', {
      expiresIn: 60 * 60 * 24 // expires in 24 hours
    });

    return exits.success(token);

  }


};