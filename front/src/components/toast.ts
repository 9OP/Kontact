import { createStandaloneToast } from '@chakra-ui/react';
import { IAuth, IChannel, IMember } from '../common/models';

type toastStatus = 'success' | 'error' | 'info' | 'warning' | undefined
interface IToast {
  title: string,
  description: string,
  status: toastStatus,
}

export enum Events {
  AUTH_SIGNOUT = 'auth_signout',
  AUTH_SIGNIN = 'auth_signin',
  AUTH_TOKEN_EXPIRED = 'auth_token_expired',
  CHANNEL_CREATED = 'channel_created',
  CHANNEL_DELETED = 'channel_deleted',
  MEMBER_CREATED = 'member_created',
  MEMBER_DELETED = 'member_deleted',
}

export const toast = {
  [Events.AUTH_SIGNOUT]: (): IToast => ({
    title: 'Signout',
    description: 'You are signed out',
    status: 'success' as toastStatus,
  }),
  [Events.AUTH_SIGNIN]: (user: IAuth): IToast => ({
    title: `Welcome back ${user.name}!`,
    description: 'You are logged in.',
    status: 'info' as toastStatus,
  }),
  [Events.AUTH_TOKEN_EXPIRED]: (): IToast => ({
    title: 'Session expired',
    description: 'Please log again.',
    status: 'warning' as toastStatus,
  }),
  [Events.CHANNEL_CREATED]: (channel: IChannel): IToast => ({
    title: `${channel.name} created`,
    description: 'The channel was succefully created',
    status: 'success' as toastStatus,
  }),
  [Events.CHANNEL_DELETED]: (channel: IChannel): IToast => ({
    title: `${channel.name} deleted`,
    description: 'The channel was succefully deleted',
    status: 'info' as toastStatus,
  }),
  [Events.MEMBER_CREATED]: (member: IMember): IToast => ({
    title: `${member.name}`,
    description: 'Member added to the channel',
    status: 'success' as toastStatus,
  }),
  [Events.MEMBER_DELETED]: (member: IMember): IToast => ({
    title: `${member.name} deleted`,
    description: 'Member goes YEET',
    status: 'info' as toastStatus,
  }),
};

const toastCreator = createStandaloneToast();

export const emit = (values: IToast): void => {
  toastCreator({
    ...values,
    duration: 4000,
    isClosable: true,
    position: 'top',
  });
};
