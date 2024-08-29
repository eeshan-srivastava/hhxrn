import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { StyleSheet, TouchableOpacity, View, ViewStyle } from 'react-native';
import colorCode from '../../../../resources/colors/colorCode';
import ColorUtils from '../../../../resources/colors/ColorUtils';
import normDimens from '../../../../resources/dimens/normDimens';
import { modalMethods } from '../ModalUtils';

interface Props {
    onClose?: () => void;
    style?: ViewStyle;
    children?: React.FC;
    backgroundColor?: string;
}

const Dialog: any = (props: Props) => {
    const navigation = useNavigation();
    const {
        onClose = () => {},
        children,
        style,
        backgroundColor = ColorUtils.getAlphaColor({ colorCode: colorCode.black, opacityPercent: 50 }),
    } = props;

    const onCloseDialog = () => {
        onClose();
        modalMethods.hide({ navigation: navigation });
    };

    return (
        <View style={[styles.rootContainer, style]}>
            <TouchableOpacity
                style={[styles.debounceContainer, { backgroundColor: backgroundColor }]}
                onPress={onCloseDialog}
            />
            <>{children}</>
        </View>
    );
};

export default Dialog;

const styles = StyleSheet.create({
    rootContainer: {
        width: normDimens.SCREEN_WIDTH,
        height: normDimens.SCREEN_HEIGHT,
        flex: 1,
    },
    debounceContainer: {
        width: normDimens.SCREEN_WIDTH,
        height: normDimens.SCREEN_HEIGHT,
        position: 'absolute',
    },
});
