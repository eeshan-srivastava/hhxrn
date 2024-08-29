import { parseProtection } from '../../../utils/AppUtils';

interface SignUpContent {
    token: string;
}

const toSignUpContent = (data: any): SignUpContent => {
    return parseProtection(() => {
        return data as SignUpContent;
    });
};

export { type SignUpContent, toSignUpContent };
