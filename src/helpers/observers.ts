import { Subject } from 'rxjs';

export const languagesSubject = new Subject();
export const updateLanguages = () => languagesSubject.next();

export const languageModalSubject = new Subject();
export const updateLanguageModalSubject = (item: object) =>
  languageModalSubject.next(item);