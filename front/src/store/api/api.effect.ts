import { DispThunk } from '..';
import { apiActions } from './api.actions';

export default async (
  dispatch: DispThunk,
  actions: apiActions,
  successCb: () => Promise<void>,
  failureCb: () => Promise<void>,
): Promise<void> => {
  const { request, success, failure } = actions;
  dispatch(request());
  try {
    await successCb();
    dispatch(success());
  } catch (err) {
    await failureCb();
    dispatch(failure(err.message));
  }
};
