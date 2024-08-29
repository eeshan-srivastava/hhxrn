import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { TextStyle } from 'react-native';
import {
    Image,
    Platform,
    Pressable,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
    ViewStyle,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import colorCode from '../../../../resources/colors/colorCode';
import normDimens from '../../../../resources/dimens/normDimens';
import normFonts, { FontWeight } from '../../../../resources/dimens/normFonts';
import imageFile from '../../../../resources/images/imageFile';
import ImageView from '../imageView/ImageView';
import TextView from '../textView/TextView';
import { CheckboxBean, CheckboxItemBean } from './CheckboxBean';

interface Props {
    checkboxBean: CheckboxBean;
    isChecked: boolean;
    onClick: () => void;
    onClickLink?: (item: CheckboxItemBean) => void;
    style?: ViewStyle;
    checkedGrdient?: Array<string>;
    unCheckedGrdient?: Array<string>;
    gradient?: boolean;
    textStyle?: TextStyle;
}

const CheckboxStatement = (props: Props) => {
    const {
        checkboxBean,
        isChecked,
        onClick,
        style,
        onClickLink = (item: CheckboxItemBean) => {},
        gradient = true,
        checkedGrdient = ['#401818', '#231111', '#0d0d0d'],
        unCheckedGrdient = ['#18402C', '#142f22', '#0d0d0d'],
        textStyle = {},
    } = props;
    const transparentGradient = [colorCode.transparent, colorCode.transparent, colorCode.transparent];
    return (
        <View style={[styles.tncRoot, style]}>
            <LinearGradient
                colors={gradient ? (isChecked ? checkedGrdient : unCheckedGrdient) : transparentGradient}
                locations={[0, 0.3, 1]}
                style={[styles.tncLinearGrad, { width: style?.width, flex: 1 }]}
            />
            <TouchableOpacity
                onPress={onClick}
                activeOpacity={0.9}
                style={[
                    styles.tncLinearGrad,
                    {
                        height: style?.height,
                        width: style?.width,
                        marginTop: normDimens.DIMEN_16,
                        marginBottom: normDimens.DIMEN_16,
                        position: 'absolute',
                    },
                ]}>
                <View style={styles.tncMainView}>
                    <View style={{ alignItems: 'center' }}>
                        <ImageView
                            source={isChecked ? imageFile.IC_CHECK : imageFile.IC_UNCHECK}
                            style={[styles.tickStyle]}
                            tintColor="#475467"
                        />
                    </View>
                    <View style={{ marginLeft: normDimens.DIMEN_8, width: '85%' }}>
                        <TextView
                            style={{ ...styles.otherTextStyle, ...textStyle }}
                            fontWeight={FontWeight._400}>
                            {checkboxBean.text}
                        </TextView>
                        <View style={[styles.container1, textStyle]}>
                            {checkboxBean?.items ? (
                                checkboxBean.items.map((item, index) => {
                                    return (
                                        <View style={styles.container2} key={index.toString()}>
                                            <TextView
                                                onClick={() => {
                                                    onClickLink(item);
                                                }}
                                                fontWeight={FontWeight._500}
                                                style={{ ...styles.privacyPolicy, ...textStyle }}>
                                                {item.text}
                                            </TextView>
                                            {index <= (checkboxBean?.items?.length || 0) - 2 ? (
                                                <TextView
                                                    style={{ ...styles.inBtwCommaStyle, ...textStyle }}
                                                    fontWeight={FontWeight._500}>
                                                    {' , '}
                                                </TextView>
                                            ) : null}
                                        </View>
                                    );
                                })
                            ) : (
                                <></>
                            )}
                        </View>
                    </View>
                </View>
            </TouchableOpacity>
        </View>
    );
};

export default CheckboxStatement;

const styles = StyleSheet.create({
    tncRoot: {
        justifyContent: 'center',
        alignItems: 'center',
        overflow: 'hidden',
        height: normDimens.DIMEN_60,
        width: normDimens.DIMEN_328,
        // paddingTop: normDimens.DIMEN_16,
        // paddingBottom: normDimens.DIMEN_16
    },
    tncLinearGrad: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    tncMainView: {
        flexDirection: 'row',
        justifyContent: 'center',
        //backgroundColor:'red',
        marginTop: -normDimens.DIMEN_2,
    },
    tncBox: {
        width: normDimens.DIMEN_24,
        height: normDimens.DIMEN_24,
        borderRadius: normDimens.DIMEN_4,
        marginRight: normDimens.DIMEN_8,
        marginTop: normDimens.DIMEN_3,
        marginStart: normDimens.DIMEN_16,
        justifyContent: 'center',
        alignItems: 'center',
        flex: 2,
    },
    tickStyle: {
        width: normDimens.DIMEN_24,
        height: normDimens.DIMEN_24,
        marginTop: normDimens.DIMEN_1,
        //backgroundColor:'purple'
    },
    otherTextStyle: {
        //fontFamily: normFonts.CUSTOM_FONT.en.LEXEND_DECA_FONT[300],
        fontSize: normFonts.FONT_9,
        //lineHeight: normFonts.FONT_16,
        //width: normDimens.DIMEN_250,
        marginTop: normDimens.DIMEN_0,
        color: '#475467',
    },
    privacyPolicy: {
        //fontFamily: normFonts.CUSTOM_FONT.en.LEXEND_DECA_FONT[500],
        fontSize: normFonts.FONT_9,
        //lineHeight: normFonts.FONT_16,
        //width: normDimens.DIMEN_250,
        //marginTop: -normDimens.DIMEN_2,
        color: '#475467',
        textDecorationLine: 'underline',
    },
    inBtwCommaStyle: {
        //fontFamily: normFonts.CUSTOM_FONT.en.LEXEND_DECA_FONT[500],
        fontSize: normFonts.FONT_9,
        //lineHeight: normFonts.FONT_16,
        color: '#475467',
    },
    container1: {
        flexDirection: 'row',
        marginTop: normDimens.DIMEN_4,
    },
    container2: {
        flexDirection: 'row',
    },
});
