module.exports = {


  friendlyName: 'Create user',


  description: 'Creates a user.',


  inputs: {

    username: {
      description: 'The user\'s username',
      type: 'string',
      required: true
    },
    email: {
      description: 'The user\'s email',
      type: 'string',
      isEmail: true,
      required: true
    },
    gender: {
      description: 'The user\'s gender',
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
      description: 'User created.',
      statusCode: 200
    },
    uniqueError: {
      description: 'The user email is already in the data base.',
      statusCode: 509
    },
    serverError: {
      description: 'There was an error in the server.',
      statusCode: 500
    },
    badRequest: {
      description: 'There was an error in the registering process.',
      badRequest: true
    }

  },


  fn: async function (inputs, exits) {

    await User.create({
        username: inputs.username,
        email: inputs.email,
        gender: inputs.gender,
        password: inputs.password
      })
      .fetch()
      .then(userCreated => {
        delete userCreated.password;
        return exits.success(userCreated);
      })
      .catch({ code: 'E_UNIQUE' }, error => {
        let errorPayload = {
          code: 'E_UNIQUE',
          problems: [
            error.message
          ],
          message: 'The email exits already.'
        }
        return exits.uniqueError(errorPayload);
      })
      .catch({ name: 'UsageError' }, error => {
        let errorPayload = {
          code: 'USAGE_ERROR',
          problems: [
            error.message
          ],
          message: 'Usage error.'
        }
        return exits.serverError(errorPayload);
      })
      .catch(error => {
        let errorPayload = {
          code: 'UNEXPECTED_ERROR',
          problems: [
            error.message
          ],
          message: 'Unexpected error.'
        }
        return exits.badRequest(errorPayload);
      });

  }


};
