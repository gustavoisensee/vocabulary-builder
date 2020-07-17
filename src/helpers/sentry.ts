import * as Sentry from 'sentry-expo';
import config from '../../config/sentry.json';

export const DEFAULT_ERROR_MESSAGE: string =
  'Something went wrong, please try again later!';

export const init = (): void => {
  Sentry.init({
    dsn: config.dsn,
    enableInExpoDevelopment: true,
    debug: false,
    environment: process.env.NODE_ENV
  });
};

export const captureException = (err: object, message?: string): void => {
  if (message) Sentry.addBreadcrumb({ message });
  Sentry.captureException(err);
};
