const jwt = require('jsonwebtoken');

module.exports = {


  friendlyName: 'JWT Verify',


  description: 'JWT Verfying',


  inputs: {

    token: {
      description: 'The token',
      type: 'string',
      required: true
    }

  },


  exits: {

    success: {
      description: 'All done.',
      success: true
    },

  },


  fn: async function (inputs, exits) {

    var token = jwt.verify(inputs.token, 'h2HnAMU9NsnDS@bqhs&$rAYZ%&sNph6Q');

    return exits.success(token);

  }


};