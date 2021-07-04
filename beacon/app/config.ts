/* eslint-disable import/prefer-default-export */
import path from 'path';
import dotenv from 'dotenv';

dotenv.config({ path: path.resolve(__dirname, '../.env') });

export const { BACKEND_API, BEARER_API } = process.env;
