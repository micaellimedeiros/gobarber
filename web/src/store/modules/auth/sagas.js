import { takeLatest, call, put, all } from 'redux-saga/effects';
import { toast } from 'react-toastify';

import { signInSucess, signFailure } from './actions';
import api from '~/services/api';
import history from '~/services/history';

export function* signIn({ payload }) {
  try {
    const { email, password } = payload;

    const response = yield call(api.post, 'sessions', {
      email,
      password,
    });
    const { token, user } = response.data;

    if (!user.provider) {
      toast.error('Este usuário não é prestador de serviço.');
      return;
    }
    yield put(signInSucess(token, user));
    history.push('/dashboard');
  } catch (err) {
    toast.error(
      'Ocorreu uma falha na autenticação. Verifique seus dados e tente novamente.'
    );
    yield put(signFailure());
  }
}
export function* signUp({ payload }) {
  try {
    const { name, email, password } = payload;
    yield call(api.post, 'users', {
      name,
      email,
      password,
      provider: true,
    });

    history.push('/');
  } catch (err) {
    toast.error('Falha no cadastro. Verifique seus dados e tente novamente.');

    yield put(signFailure());
  }
}

export default all([
  takeLatest('@auth/SIGN_IN_REQUEST', signIn),
  takeLatest('@auth/SIGN_UP_REQUEST', signUp),
]);
