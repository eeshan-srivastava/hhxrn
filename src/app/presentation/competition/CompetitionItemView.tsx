import React from 'react';
import { StyleSheet, TouchableOpacity, View, ViewStyle } from 'react-native';
import colorCode from '../../../resources/colors/colorCode';
import ColorUtils from '../../../resources/colors/ColorUtils';
import normDimens from '../../../resources/dimens/normDimens';
import normFonts, { FontWeight } from '../../../resources/dimens/normFonts';
import { ImageResizeMode } from '../widgets/imageView/ImageUtils';
import ImageView from '../widgets/imageView/ImageView';
import TextView from '../widgets/textView/TextView';
import { CompetitionItemBean } from '../bean/CompetitionItemBean';
import imageFile from '../../../resources/images/imageFile';

interface Props {
    item: CompetitionItemBean;
    style?: ViewStyle;
    onClickItem?: (item: CompetitionItemBean) => void;
    isFavourite?: boolean;
}

const CompetitionItemView = (props: Props) => {
    const { item, style, onClickItem = () => {}, isFavourite = false } = props;

    return (
        <TouchableOpacity
            style={[styles.container1, style]}
            onPress={() => {
                onClickItem(item);
            }}
            activeOpacity={0.7}>
            <View style={styles.container4} pointerEvents={'none'}>
                <ImageView
                    source={imageFile.IMG_FLOWERS}
                    style={{ ...styles.container2 }}
                    resizeMode={ImageResizeMode.cover}
                />
                <View style={styles.container5}>
                    <TextView
                        style={styles.text1}
                        fontWeight={FontWeight._700}
                        //ellipsizeMode="tail"
                        numberOfLines={2}>
                        {item.title}
                    </TextView>
                    <TextView
                        style={styles.text2}
                        fontWeight={FontWeight._400}
                        //ellipsizeMode="tail"
                        numberOfLines={1}
                        extraLineHeight={normFonts.FONT_2}>
                        {item.period}
                    </TextView>
                    <TextView
                        style={styles.text3}
                        fontWeight={FontWeight._400}
                        //ellipsizeMode="tail"
                        numberOfLines={1}
                        extraLineHeight={normFonts.FONT_2}>
                        {item.place}
                    </TextView>
                </View>
            </View>
        </TouchableOpacity>
    );
};

export default CompetitionItemView;

const styles = StyleSheet.create({
    container1: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        height: normDimens.DIMEN_152,
        backgroundColor: colorCode.transparent,
        marginBottom: normDimens.DIMEN_8,
        marginTop: normDimens.DIMEN_8,
        paddingHorizontal: normDimens.DIMEN_20,
    },
    container2: {
        borderRadius: normDimens.DIMEN_0,
        width: '100%',
        height: '100%',
        position: 'absolute',
    },
    text1: {
        fontSize: normFonts.FONT_18,
        color: ColorUtils.getAlphaColor({ colorCode: colorCode.white, opacityPercent: 100 }),
        lineHeight: normFonts.FONT_28,
        marginTop: normDimens.DIMEN_8,
        //maxWidth: normDimens.SCREEN_WIDTH / 2 - normDimens.DIMEN_16,
    },
    text2: {
        fontSize: normFonts.FONT_14,
        lineHeight: normFonts.FONT_14,
        color: ColorUtils.getAlphaColor({ colorCode: colorCode.white, opacityPercent: 100 }),
        marginTop: normDimens.DIMEN_16,
        //maxWidth: normDimens.SCREEN_WIDTH / 2 - normDimens.DIMEN_16,
    },
    text3: {
        fontSize: normFonts.FONT_14,
        lineHeight: normFonts.FONT_14,
        color: ColorUtils.getAlphaColor({ colorCode: '#B8BFFF', opacityPercent: 100 }),
        marginTop: normDimens.DIMEN_8,
        //maxWidth: normDimens.SCREEN_WIDTH / 2 - normDimens.DIMEN_16,
    },
    container4: {
        flexDirection: 'column',
        alignItems: 'center',
        //width: '96%',
        borderRadius: normDimens.DIMEN_8,
        //backgroundColor: ColorUtils.getAlphaColor({ colorCode: colorCode.grey_363636, opacityPercent: 60 }),
        overflow: 'hidden',
        marginBottom: normDimens.DIMEN_8,
        width: '100%',
        height: normDimens.DIMEN_152,
        backgroundColor: colorCode.primary,
        //marginBottom: normDimens.DIMEN_16,
    },
    container5: {
        flexDirection: 'column',
        //alignItems: 'center',
        width: '100%',
        height: '100%',
        borderRadius: normDimens.DIMEN_0,
        paddingBottom: normDimens.DIMEN_8,
        //backgroundColor: colorCode.primary,
        //alignItems:'center'
        justifyContent: 'center',
        paddingLeft: normDimens.DIMEN_16,
    },
});
