import React from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { DispThunk } from '../../../../store';
import { authDataManager } from '../../../../services';
import FooterView from './footer.view';

const mapState = null;

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
  const { signout } = props;

  return (
    <FooterView signout={signout} />
  );
};

export default connector(Footer);
