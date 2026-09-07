import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const email = 'jakub.dyrszka@gmail.com';
  
  const user = await prisma.user.findUnique({
    where: { email },
    include: { licenses: true },
  });

  if (!user) {
    console.log(`User with email ${email} not found.`);
    return;
  }

  console.log(`User found: ${user.id}`);

  const activeLicenses = user.licenses.filter(l => l.status === 'ACTIVE');

  if (activeLicenses.length === 0) {
    console.log('No active licenses found.');
  }

  for (const license of activeLicenses) {
    console.log(`Cancelling license ${license.id}...`);
    await prisma.license.update({
      where: { id: license.id },
      data: { status: 'CANCELLED' },
    });
    console.log(`License ${license.id} cancelled successfully.`);
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
