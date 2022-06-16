import { extendType, nonNull, objectType, stringArg } from 'nexus';

export const Flashcard = objectType({
  name: 'Flashcard',
  definition(t) {
    t.nonNull.int('id');
    t.nonNull.string('question');
    t.nonNull.string('answer');
    t.nonNull.boolean('isDone');
    t.field('postedBy', {
      type: 'User',
      resolve(parent, args, context) {
        return context.prisma.flashcard
          .findUnique({ where: { id: parent.id } })
          .postedBy();
      },
    });
  },
});

export const FlashcardQuery = extendType({
  type: 'Query',
  definition(t) {
    t.nonNull.list.nonNull.field('flashcards', {
      type: 'Flashcard',
      resolve(parent, args, context) {
        return context.prisma.flashcard.findMany();
      },
    });
  },
});

export const FlashcardMutation = extendType({
  type: 'Mutation',
  definition(t) {
    t.nonNull.field('createFlashcard', {
      type: 'Flashcard',
      args: {
        question:nonNull(stringArg()),
        answer:nonNull(stringArg()),
      },

      resolve(parent, args, context) {
        const { question, answer } = args;
        const { userId } = context;

        if (!userId) {
          throw new Error('Cannot create flashcard without logging in.');
        }

        const newFlashcard = context.prisma.flashcard.create({
          data: {
            question,
            answer,
            postedBy: { connect: { id: userId } },
          },
        });

        return newFlashcard;
      },
    });
  },
});