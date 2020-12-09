/* eslint-disable import/prefer-default-export */
import { apiSelectorsCreator } from '../api/api.selectors';
import { SIGNIN } from './auth.actions';

export const signinSelectors = apiSelectorsCreator(SIGNIN);
