module.exports = {


  friendlyName: 'Login',


  description: 'Login user.',


  inputs: {

    username: {
      description: 'The user\'s username',
      type: 'string',
      required: true
    },
    password: {
      description: 'The user\'s password',
      type: 'string',
      required: true
    }

  },


  exits: {

    success: {
      description: 'All done.',
      statusCode: 200
    },
    forbidden: {
      description: 'The user has access denied to the system.',
      statusCode: 403
    },
    notFound:{
      description: 'The user was not found.',
      statusCode: 404
    },
    badRequest: {
      description: 'There was an internal error in the server.',
      badRequest: true,
      statusCode: 500
    }

  },


  fn: async function (inputs, exits) {

    const user = await User.findOne({
      or: [
        { username: inputs.username },
        { email: inputs.username }
      ]
      }).decrypt();

    if(!user) {
      let errorPayload = {
        code: 'NOT_FOUND',
        message: 'The user was not found.',
      };
      return exits.notFound(errorPayload)
    }

    if(user.password != inputs.password) {
      let errorPayload = {
        code: 'PASSWORD_NOT_MATCH',
        message: 'The user cannot access to the system, wrong password.',
      };
      return exits.forbidden(errorPayload)
    }

    const accessToken = await sails.helpers.jwtSign(user);
    user.token = accessToken;
    user.expiresIn = 60 * 60 * 24;
    delete user.password;

    return exits.success(user);

  }


};