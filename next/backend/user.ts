import path from 'path';

import { genSalt, hash } from 'bcryptjs';
import Email from 'email-templates';
import type { HydratedDocument } from 'mongoose';
import mailer from 'nodemailer';

import User from '@cubeartisan/next/models/user';
import { getDefaultProtectedUser } from '@cubeartisan/next/shared/userUtils';
import type { MongoUser } from '@cubeartisan/next/types/user';

export const sendConfirmationEmail = async (user: HydratedDocument<MongoUser>): Promise<void> => {
  const smtpTransport = mailer.createTransport({
    name: process.env.SITE_HOSTNAME,
    secure: true,
    service: 'Gmail',
    auth: {
      user: process.env.EMAIL_CONFIG_USERNAME,
      pass: process.env.EMAIL_CONFIG_PASSWORD,
    },
  });
  const confirmEmail = new Email({
    message: {
      from: process.env.SUPPORT_EMAIL_FROM,
      to: user.email,
      subject: 'Confirm Account',
    },
    send: true,
    juiceResources: {
      webResources: {
        relativeTo: path.join(__dirname, '..', 'public'),
        images: true,
      },
    },
    transport: smtpTransport,
  });

  return confirmEmail.send({
    template: 'confirm_email',
    locals: {
      id: user._id,
    },
  });
};

export const createUser = async (
  username: string,
  password: string,
  email: string,
): Promise<HydratedDocument<MongoUser>> => {
  const usernameLower = username.toLowerCase();
  const existingUser = await User.findOne({
    $or: [{ email }, { username_lower: usernameLower }],
  });
  if (existingUser) {
    if (existingUser.username_lower === usernameLower) {
      throw new Error(`Username ${usernameLower} is already taken.`);
    }
    if (existingUser.email === email) {
      throw new Error(`Email ${email} is already associated with an account.`);
    }
  }
  const salt = await genSalt(10);
  const hashedPassword = await hash(password, salt);
  const user = new User({
    ...getDefaultProtectedUser(),
    username,
    username_lower: username.toLowerCase(),
    password: hashedPassword,
    email,
    edit_token: '',
  });
  await user.save();
  await sendConfirmationEmail(user);
  return user;
};

export const findUser = async (usernameOrEmail: string): Promise<HydratedDocument<MongoUser>> => {
  let queryKey = 'username_lower';
  if (usernameOrEmail.includes('@')) queryKey = 'email';
  else usernameOrEmail = usernameOrEmail.toLowerCase();
  const user = await User.findOne({ [queryKey]: usernameOrEmail });
  if (!user) {
    throw new Error(`User ${usernameOrEmail} not found.`);
  }
  return user;
};
