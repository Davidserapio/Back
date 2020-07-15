module.exports = {


  friendlyName: 'Create Post',


  description: 'Creates a single post.',


  inputs: {

    author: {
      description: 'The author of the post.',
      type: 'string',
      required: true
    },
    title: {
      description: 'The title of the post.',
      type: 'string',
      required: true
    },
    thumbnail: {
      description: 'The picture of the post',
      type: 'string',
      required: true
    },
    content: {
      description: 'The content of the post.',
      type: 'string',
      required: true
    },
    previewText: {
      description: 'The preview text of the picture of the post.',
      type: 'string',
      required: true
    }

  },


  exits: {

    success: {
      description: 'Post created.',
      statusCode: 200
    },
    serverError: {
      description: 'There was an error in the server.',
      statusCode: 500
    }

  },


  fn: async function (inputs, exits) {

    let post = {
      author: inputs.author,
      title: inputs.title,
      thumbnail: inputs.thumbnail,
      content: inputs.content,
      previewText: inputs.previewText
    };

    await Post.create(post)
      .fetch()
      .then(createdPost => {
        return exits.success(createdPost);
      })
      .catch(err => {
        return exits.serverError(err);
      });

  }


};
