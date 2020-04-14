import { Subject } from 'rxjs';

interface subType {
  unsubscribe(a?: any): void
};

interface rxType {
  next(a?: any): void,
  subscribe(a?: any): subType
};

export const languagesSubject: rxType = new Subject();
export const updateLanguages = (): void => languagesSubject.next();

export const languageModalSubject: rxType = new Subject();
export const updateLanguageModalSubject = (item?: object): void =>
  languageModalSubject.next(item);