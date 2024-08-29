import { Linking } from 'react-native';

enum AppLinkType {
    deepLink = 'deepLink',
    externalLink = 'externalLink',
    webLink = 'webLink',
}

interface AppLink {
    url: string;
    type: AppLinkType;
}

const getLinkData = (link: string) => {
    const dataString: string = link?.split('?')[1];
    const data: any = {};
    if (dataString) {
        const dataArray: Array<string> = dataString.split('&');
        dataArray.forEach((element) => {
            const param: Array<string> = element.split('=');
            const key: string = param[0]?.trim();
            const value: string = param[1]?.trim();
            data[key] = value;
        });
    }
    return data;
};

const openDeepLink = (link: string) => {};

const openExternalLink = (link: string) => {
    if (link) {
        Linking.openURL(link);
    }
};

const openWebLink = (link: string) => {};

const openAppLink = (appLink: AppLink) => {
    const { url, type } = appLink;
    switch (type) {
        case AppLinkType.deepLink:
            openDeepLink(url);
            break;
        case AppLinkType.externalLink:
            openExternalLink(url);
            break;
        case AppLinkType.webLink:
            openWebLink(url);
            break;
    }
};

export { AppLinkType, type AppLink, getLinkData, openDeepLink, openExternalLink };
