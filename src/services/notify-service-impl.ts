import {toast} from 'react-toastify';
import {INotifyService} from '@/domain/services/notifier-service.ts';

export default class NotifyServiceImpl implements INotifyService {
    notify(text: string) {
        toast(text);
    }

    error(text: string): void {
        toast(text, {type: 'error'});
    }

    success(text: string): void {
        toast(text, {type: 'success'});
    }
}
