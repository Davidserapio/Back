module.exports = {


  friendlyName: 'Find Posts',


  description: 'Finds a specific post by its id',


  inputs: {

    id: {
      description: 'The id of the post.',
      type: 'string',
      required: true
    }

  },


  exits: {

    success: {
      description: 'Posts found.',
      statusCode: 200
    },
    notFound: {
      description: 'There was an error in the server.',
      statusCode: 404
    }

  },


  fn: async function (inputs, exits) {

    await Post.findOne({id: inputs.id})
      .then(foundPost => {
        return exits.success(foundPost);
      })
      .catch(err => {
        return exits.notFound(err);
      });

  }


};
