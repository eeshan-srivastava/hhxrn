import { AppLink } from '../../../utils/AppLinkUtils';

interface CheckboxItemBean {
    text: string;
    appLink: AppLink;
}

interface CheckboxBean {
    text: string;
    items?: Array<CheckboxItemBean>;
}

export { type CheckboxBean, type CheckboxItemBean };
