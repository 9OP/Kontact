import { useEffect } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { useToast } from '@chakra-ui/react';
import { RootState } from '../store';
import { signinSelectors } from '../store/authentication/auth.selectors';

const mapState = (state: RootState) => ({
  error: signinSelectors.error(state),
});

const mapDispatch = null;

const connector = connect(
  mapState,
  mapDispatch,
);

type PropsFromRedux = ConnectedProps<typeof connector>

type Props = PropsFromRedux

const Toast = (props: Props): JSX.Element => {
  const { error } = props;
  const toast = useToast();

  useEffect(() => {
    if (error) {
      toast({
        title: error,
        description: "We've created your account for you.",
        status: 'success',
        duration: 9000,
        isClosable: true,
      });
    }
  }, [error]);

  return (null as unknown as JSX.Element);
};

export default connector(Toast);
