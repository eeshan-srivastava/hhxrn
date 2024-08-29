import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useRef } from 'react';
import { Animated, BackHandler, StyleSheet, TouchableOpacity, View, ViewStyle } from 'react-native';
import { Modalize } from 'react-native-modalize';
import colorCode from '../../../../resources/colors/colorCode';
import ColorUtils from '../../../../resources/colors/ColorUtils';
import normDimens from '../../../../resources/dimens/normDimens';
import { modalMethods } from '../ModalUtils';

interface Props {
    sheetHeight: number;
    handleStyle?: ViewStyle;
    backdropColor?: string;
    sheetBackgroundColor?: string;
    cornerRadius?: number;
    children?: React.ReactNode;
    onClose?: () => void;
    modalizeStyle?: ViewStyle;
}

const ReactModalSheet = (props: Props) => {
    const navigation = useNavigation();
    const {
        sheetHeight,
        handleStyle,
        backdropColor = ColorUtils.getAlphaColor({ colorCode: colorCode.black, opacityPercent: 50 as any }),
        sheetBackgroundColor = colorCode.white,
        cornerRadius = normDimens.DIMEN_8,
        children,
        onClose = () => {},
        modalizeStyle = {},
    } = props;

    const modalizeRef: any = useRef(null);

    useEffect(() => {
        modalizeRef.current?.open();
    }, [modalizeRef]);

    const onCloseSheet = () => {
        onClose();
        modalMethods.hide({ navigation: navigation });
    };

    const getModalizeStyle = (): ViewStyle => {
        const style: ViewStyle = {
            backgroundColor: sheetBackgroundColor,
            borderTopLeftRadius: cornerRadius,
            borderTopRightRadius: cornerRadius,
            overflow: 'hidden',
            flex: 1,
        };
        return style;
    };

    return (
        <View style={styles.rootContainer}>
            <TouchableOpacity
                style={[styles.debounceContainer, { backgroundColor: backdropColor }]}
                onPress={onCloseSheet}
            />
            <View style={[styles.sheetContainer, { height: sheetHeight }]}>
                <Modalize
                    ref={modalizeRef}
                    modalStyle={[getModalizeStyle(), modalizeStyle]}
                    handleStyle={[styles.handleStyle, handleStyle]}
                    onClose={onCloseSheet}
                    withReactModal
                    reactModalProps={{ hardwareAccelerated: true }}
                    panGestureEnabled
                    modalHeight={sheetHeight}
                    customRenderer={
                        <View style={{ height: sheetHeight, overflow: 'hidden' }}>{children}</View>
                    }
                    withOverlay={false}></Modalize>
            </View>
        </View>
    );
};

export default ReactModalSheet;

const styles = StyleSheet.create({
    handleStyle: {
        marginTop: normDimens.DIMEN_24,
        backgroundColor: 'black',
    },
    rootContainer: {
        width: normDimens.SCREEN_WIDTH,
        height: normDimens.SCREEN_HEIGHT,
        flex: 1,
        justifyContent: 'flex-end',
    },
    debounceContainer: {
        width: normDimens.SCREEN_WIDTH,
        height: normDimens.SCREEN_HEIGHT,
        position: 'absolute',
        flex: 1,
    },
    sheetContainer: {
        overflow: 'hidden',
    },
});
