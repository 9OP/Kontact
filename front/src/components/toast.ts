import { createStandaloneToast } from '@chakra-ui/react';
import { IChannel } from '../common/models';

type toastStatus = 'success' | 'error' | 'info' | 'warning' | undefined
interface IToast {
  title: string,
  description: string,
  status: toastStatus,
}

export enum Events {
  AUTH_SIGNOUT = 'auth_signout',
  CHANNEL_CREATED = 'channel_created',
  CHANNEL_DELETED = 'channel_deleted',
  MEMBER_CREATED = 'member_created',
  MEMBER_DELETED = 'member_deleted',
}

export const toast = {
  [Events.CHANNEL_DELETED]: (channel: IChannel): IToast => ({
    title: `${channel.name} deleted.`,
    description: 'The channel was succefully deleted',
    status: 'success' as toastStatus,
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
