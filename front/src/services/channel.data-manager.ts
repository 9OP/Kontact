import {
  fetchChannels,
  createChannel,
  deleteChannel,
} from './effects/channel.effects';
import {
  selectChannels,
  selectOpenedChannel,
} from '../store/entities/channels/channels.selectors';
import { openChannelAction as openChannel } from '../store/entities/channels/channels.actions';

export default {
  // actions
  fetchChannels,
  createChannel,
  deleteChannel,
  openChannel,
  // selectors
  selectChannels,
  selectOpenedChannel,
};
