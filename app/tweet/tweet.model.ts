import {User} from '../user/user.model';

export interface Tweet {
    id: number;
    content: string;
    created_at: string;
    updated_at: string;
    author: User;
}
