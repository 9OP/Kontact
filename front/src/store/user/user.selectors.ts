/* eslint-disable import/prefer-default-export */
import { RootState } from '..';
import { IUser } from '../../common/models/user.model';

export const selectUser = (state: RootState): IUser => state.user;
