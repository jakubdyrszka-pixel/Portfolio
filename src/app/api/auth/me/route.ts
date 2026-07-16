import { getUserProfile, deleteUserProfile } from '@/lib/userController';

export async function GET(request: Request) {
  return getUserProfile(request);
}

export async function DELETE(request: Request) {
  return deleteUserProfile(request);
}
