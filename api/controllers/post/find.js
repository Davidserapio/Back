module.exports = {


  friendlyName: 'Find Posts',


  description: 'Finds all of the posts.',


  inputs: {

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

    await Post.find()
      .then(foundPosts => {
        return exits.success(foundPosts);
      })
      .catch(err => {
        return exits.serverError(err);
      });

  }


};
