import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const newFlashcard = await prisma.flashcard.create({
    data: {
      question:
        'Which occupation did John Tanner, the main protagonist for Driver and Driver 2, had before turning into an undercover cop?',
      answer: 'Racing Driver',
    },
  });
  const allFlashcards = await prisma.flashcard.findMany();
  console.log(allFlashcards);
}

main()
  .catch((e) => {
    throw e;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
