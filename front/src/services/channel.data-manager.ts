import { fetchChannels } from './effects/channel.effects';
import { sendMessage, fetchMessages } from './effects/messages.effects';
import { selectChannels } from '../store/entities/channels/channels.selectors';
import { openChannelAction as openChannel } from '../store/ui/channel/actions';
import { selectChannel, selectMessages } from '../store/ui/channel/selectors';

export default {
  sendMessage,
  fetchMessages,
  selectMessages,
  //
  fetchChannels,
  selectChannels,
  openChannel,
  selectChannel,
};
