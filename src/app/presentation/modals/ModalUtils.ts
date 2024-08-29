import NavigationRoutes from '../../navigation/NavigationRoutes';

const show = (params: { navigation: any; component: React.ReactNode; onClose?: () => void }) => {
    params.navigation.push(NavigationRoutes.portals.modal_portal, {
        modal: params.component,
        onClose: params.onClose,
    });
};

const hide = (params: { navigation: any }) => {
    params.navigation.goBack();
};

const modalMethods = {
    show,
    hide,
};

enum ModalHideTypes {
    hardware_backpress = 'hardware_backpress',
    backdrop_press = 'backdrop_press',
}

export { modalMethods, ModalHideTypes };
