import React from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { RootState, DispThunk } from '../../../../../../store';
import { channelDataManager, membersDataManager } from '../../../../../../services';
import SearchView from './search.view';

const mapState = (state: RootState) => ({
  channel: channelDataManager.selectOpenedChannel(state),
});

const mapDispatch = (dispatch: DispThunk) => ({
  createMember: (cid: string, uid: string) => dispatch(membersDataManager.createMember(cid, uid)),
});

const connector = connect(mapState, mapDispatch);

type PropsFromRedux = ConnectedProps<typeof connector>;

type Props = PropsFromRedux & {
  isOpen: boolean,
  onClose: () => void
};

const Search = (props: Props): JSX.Element => {
  const {
    channel, createMember, isOpen, onClose,
  } = props;

  return (
    <SearchView
      isOpen={isOpen}
      onClose={onClose}
      createMember={(uid: string) => createMember(channel.id, uid)}
    />
  );
};

export default connector(Search);
