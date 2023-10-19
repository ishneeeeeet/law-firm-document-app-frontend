import { Subject } from 'rxjs';

const subject = new Subject();

export const eventService = {
    sendEvent: message => subject.next({ res: message }),
    clearMessages: () => subject.next(),
    getEvent: () => subject.asObservable()
};
