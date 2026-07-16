import { prisma } from './database';

export async function logAudit(action: string, userId?: string, details?: string, ipAddress?: string) {
  try {
    // Record the audit entry
    await prisma.auditLog.create({
      data: {
        userId: userId || null,
        action,
        details: details || null,
        ipAddress: ipAddress || null,
      },
    });

    // Enforce 12-month (365 days) retention policy by cleaning up older logs
    const twelveMonthsAgo = new Date();
    twelveMonthsAgo.setDate(twelveMonthsAgo.getDate() - 365);

    await prisma.auditLog.deleteMany({
      where: {
        createdAt: {
          lt: twelveMonthsAgo,
        },
      },
    });
  } catch (err) {
    console.error('Audit log error:', err);
  }
}
