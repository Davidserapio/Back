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
      description: 'Post not found',
      statusCode: 404
    }   

  },


  fn: async function (inputs, exits) {

    const createdPost = await Post.findOne({id: inputs.id});

      if(!createdPost) {
        let error = {
          code: 'E_RESOURCE_NOT_FOUND',
          message: 'Post not found'
        };
        return exits.notFound(error);
      }

      return exits.success(createdPost);

  }


};
