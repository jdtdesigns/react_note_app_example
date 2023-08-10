const { User, Note } = require('../models');
const { GraphQLError } = require('graphql');
const { createToken } = require('../auth');

const resolvers = {
  Query: {
    async authenticate(_, __, { user_id }) {
      if (!user_id) return {
        user: null
      }

      try {
        const user = await User.findById(user_id).populate('notes');

        return { user };
      } catch (err) {
        console.log(err);
        throw new GraphQLError(err.message);
      }
    },
    async getNotes() {
      const notes = await Note.find().populate('author');

      return notes;
    }
  },
  Mutation: {
    async register(_, args, { user_id, res }) {
      if (user_id) throw new GraphQLError('Already logged in');

      try {
        const user = await User.create(args);

        const token = await createToken(user._id);

        res.cookie('token', token, { httpOnly: true });

        return { user };
      } catch (err) {
        throw new GraphQLError(err.message);
      }
    },
    async login(_, args, { user_id, res }) {
      if (user_id) throw new GraphQLError('Already logged in');

      try {
        const user = await User.findOne({
          email: args.email
        }).populate('notes');

        if (!user) throw new GraphQLError('A user with that email address does not exist');

        const valid_pass = await user.validatePass(args.password);

        if (!valid_pass) throw new GraphQLError('Password is incorrect');

        const token = await createToken(user._id);

        res.cookie('token', token, { httpOnly: true });

        return { user };
      } catch (err) {
        throw new GraphQLError(err.message);
      }
    },
    async createNote(_, args, { user_id }) {
      if (!user_id) throw new GraphQLError('You are not authorized to perform that action');

      const note = await Note.create({
        text: args.text,
        author: user_id
      });

      const user = await User.findByIdAndUpdate(user_id, {
        $push: {
          notes: note._id
        }
      }, { new: true }).populate('notes');

      return { user }
    }
  }
}

module.exports = resolvers;