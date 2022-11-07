import { unsealData } from 'iron-session';
import { cookies } from 'next/headers';

import User from '@cubeartisan/next/models/user';
import type { ProtectedUser } from '@cubeartisan/next/types/user';

const useUser = async (): Promise<ProtectedUser | null> => {
  const nextCookies = cookies();
  const sessionCookie = nextCookies.get(process.env.SESSION ?? '')?.value ?? null;
  if (sessionCookie) {
    const { id } = await unsealData<{ id: string }>(sessionCookie, { password: process.env.SESSION_SECRET ?? '' });
    if (id) {
      const user = await User.findById(id);
      if (user) {
        const userObj: ProtectedUser & { password?: string } = user.toObject();
        delete userObj.password;
      }
    }
  }
  return null;
};

export default useUser;
