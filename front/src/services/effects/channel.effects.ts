/* eslint-disable import/prefer-default-export */
import { AppThunk } from '../../store';
import { setChannelAction, resetChannelAction, fetchChannelActions } from '../../store/channel/channel.actions';
import { resetMessagesAction } from '../../store/channel/messages/messages.actions';
import * as httpService from './http/channel.http';

export const fetchChannel = (
  cid: string,
): AppThunk => async (dispatch) => {
  const { request, success, failure } = fetchChannelActions;

  dispatch(request());
  try {
    const channel = await httpService.fetchChannel(cid);
    dispatch(setChannelAction(channel));
    dispatch(resetMessagesAction());
    dispatch(success());
  } catch (err) {
    dispatch(resetChannelAction());
    dispatch(failure(err.message));
  }
};

// export const fetchChannel = (
//   cid: string,
// ): AppThunk => async (dispatch) => {
//   const successCb = async () => {
//     const channel = await httpService.fetchChannel(cid);
//     dispatch(setChannelAction(channel));
//   };

//   const failureCb = async () => {
//     dispatch(resetChannelAction());
//   };

//   await effect(dispatch, fetchChannelActions, successCb, failureCb);
// };
