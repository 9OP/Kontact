import React from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { RootState, DispThunk } from '../../../store';
import { authDataManager } from '../../../services';
import FooterView from './footer.view';

const mapState = (state: RootState) => ({
  user: authDataManager.selectUser(state),
});

const mapDispatch = (dispatch: DispThunk) => ({
  signout: () => dispatch(authDataManager.signout()),
});

const connector = connect(
  mapState,
  mapDispatch,
);

type PropsFromRedux = ConnectedProps<typeof connector>

type Props = PropsFromRedux

const Footer = (props: Props): JSX.Element => {
  const { user, signout } = props;

  return (
    <FooterView signout={signout} />
  );
};

export default connector(Footer);
