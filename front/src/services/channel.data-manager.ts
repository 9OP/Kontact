import { fetchChannels, createChannel } from './effects/channel.effects';
import { selectChannels } from '../store/entities/channels/channels.selectors';
import { openChannelAction as openChannel } from '../store/ui/channel/actions';
import { selectChannel } from '../store/ui/channel/selectors';

export {
  fetchChannels,
  createChannel,
  selectChannels,
  openChannel,
  selectChannel,
};

export default {
  fetchChannels,
  createChannel,
  selectChannels,
  openChannel,
  selectChannel,
};
