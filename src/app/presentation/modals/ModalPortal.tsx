import { useNavigation, useRoute } from '@react-navigation/native';
import React, { useEffect, useImperativeHandle, useRef, useState } from 'react';
import { Animated, BackHandler, StyleSheet, View } from 'react-native';
import colorCode from '../../../resources/colors/colorCode';
import normDimens from '../../../resources/dimens/normDimens';
import BackPressUtils from '../../../utils/BackPressUtils';
import SafeArea from '../widgets/SafeArea';
import { modalMethods } from './ModalUtils';

interface Props {}

interface Route {
    params: {
        modal: React.ReactNode;
        onClose?: () => void;
    };
}

const ModalPortal = (props: Props) => {
    const {} = props;
    const navigation = useNavigation();
    const route = useRoute() as Route;
    const { modal, onClose = () => {} } = route?.params || {};

    const onBackPress = () => {
        onClose();
        modalMethods.hide({ navigation: navigation });
        return true;
    };

    useEffect(() => {
        BackHandler.addEventListener(BackPressUtils.HARDWARE_BACKPRESS, onBackPress);
        return () => BackHandler.removeEventListener(BackPressUtils.HARDWARE_BACKPRESS, onBackPress);
    }, []);

    return (
        <SafeArea>
            <View style={styles.rootContainer}>{modal}</View>
        </SafeArea>
    );
};

const styles = StyleSheet.create({
    rootContainer: {
        width: normDimens.SCREEN_WIDTH,
        height: normDimens.SCREEN_HEIGHT,
        flex: 1,
        backgroundColor: colorCode.transparent,
    },
});

export default ModalPortal;
