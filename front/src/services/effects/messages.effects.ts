// /* eslint-disable import/prefer-default-export */
// import { store, AppThunk } from '../../store';
// import { receiveMessagesAction } from '../../store/entities/messages/messages.actions';
// import * as message from './socket/message.socket';

// export const sendMessage = (cid: string, mess: string): AppThunk => async (
//   dispatch,
// ) => {
//   try {
//     await message.send({ channel: cid, message: mess });
//   } catch (err) {
//     // dispatch(failure(err.message));
//   }
// };

// message.receive((data: message.response) => {
//   store.dispatch(
//     receiveMessagesAction([
//       {
//         id: data.id,
//         authorId: data.author,
//         channelId: data.channel,
//         content: data.message,
//         date: new Date(),
//       },
//     ]),
//   );
// });
export default {};
