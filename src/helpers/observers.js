import { Subject } from 'rxjs';

export const languagesSubject = new Subject();
export const updateLanguages = () => languagesSubject.next();
