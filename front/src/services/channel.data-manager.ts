import { fetchChannels, createChannel, deleteChannel } from './effects/channel.effects';
import { selectChannels } from '../store/entities/channels/channels.selectors';
import { openChannelAction as openChannel } from '../store/ui/channel/actions';
import { selectChannel, selectRole } from '../store/ui/channel/selectors';

export {
  fetchChannels,
  createChannel,
  deleteChannel,
  selectChannels,
  openChannel,
  selectChannel,
  selectRole,
};

export default {
  fetchChannels,
  createChannel,
  deleteChannel,
  selectChannels,
  openChannel,
  selectChannel,
  selectRole,
};
