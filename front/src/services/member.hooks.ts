import { useState, useEffect, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { channelsHttpService } from './effects/http';
import useAction from './useAction';
import { emit, toast } from '../components/toast';
import { ERole, IChannel } from '../common/models';
import {
  createChannelAction, deleteChannelAction, fetchChannelsAction, openChannelAction,
} from '../store/entities/channels/channels.actions';
import { selectChannels, selectOpenedChannel } from '../store/entities/channels/channels.selectors';
import { selectRole } from '../store/authentication/auth.selectors';

export function useMembers() {

}

export function useCreateMember() {

}

export function useDeleteMember() {

}

export function useUpdateMember() {

}

export function useSearchUser() {

}
