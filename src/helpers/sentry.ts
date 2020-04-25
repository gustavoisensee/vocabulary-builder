import * as Sentry from '@sentry/react-native';
import config from '../../config/sentry.json';

export const init = (): void => {
  Sentry.init({
    dsn: config.dsn
  });
};
