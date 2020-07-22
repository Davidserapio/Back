module.exports = {


  friendlyName: 'Update Post',


  description: 'Updates a specific post by its id',


  inputs: {

    id: {
      description: 'The id of the post.',
      type: 'string',
      required: true
    },
    post: {
      description: 'The post\' data.',
      type: 'json',
      required: true
    }

  },


  exits: {

    success: {
      description: 'Posts updated.',
      statusCode: 200
    },
    error: {
      description: 'There was an error in the server.',
      statusCode: 500
    }

  },


  fn: async function (inputs, exits) {

    await Post.updateOne({
        id: inputs.id
      })
      .set(inputs.post)
      .then(updatedPost => {
        let payload = {
          code: 'Ok',
          message: 'Post updated successfully.',
          post: updatedPost
        };
        return exits.success(payload);
      })
      .catch(err => { return exits.error(err) });

  }


};