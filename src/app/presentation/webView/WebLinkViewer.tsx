import { useNavigation, useRoute } from '@react-navigation/native';
import React, { useEffect } from 'react';
import { BackHandler, StatusBar, StyleSheet, Text, TouchableOpacity, View, ViewStyle } from 'react-native';
import { WebView } from 'react-native-webview';
import colorCode from '../../../resources/colors/colorCode';
import normDimens from '../../../resources/dimens/normDimens';
import normFonts from '../../../resources/dimens/normFonts';
import imageFile from '../../../resources/images/imageFile';
import BackPressUtils from '../../../utils/BackPressUtils';
import ImageView from '../widgets/imageView/ImageView';
import SafeArea from '../widgets/SafeArea';
import { ActivityIndicator } from 'react-native-paper';

interface Props {
    title?: string;
    url?: string;
    style?: ViewStyle;
}

interface Route {
    params: {
        title?: string;
        url: string;
    };
}

const WebLinkViewer = (props: Props) => {
    const { title: pTitle, url: pUrl, style: pStyle } = props;
    const route = useRoute() as Route;
    const navigation = useNavigation();
    const { title: rTitle, url: rUrl } = route?.params || {};
    const title = pTitle || rTitle;
    const url = pUrl || rUrl;
    const pHeader = pTitle;

    const onBackPress = () => {
        navigation.goBack();
        return true;
    };

    if (rUrl) {
        useEffect(() => {
            BackHandler.addEventListener(BackPressUtils.HARDWARE_BACKPRESS, onBackPress);
            return () => BackHandler.removeEventListener(BackPressUtils.HARDWARE_BACKPRESS, onBackPress);
        }, []);
    }

    if (pUrl) {
        return (
            <View style={pStyle}>
                {pHeader ? (
                    <View style={styles.container1}>
                        <View style={styles.container2}>
                            <View style={styles.container5}>
                                <TouchableOpacity onPress={onBackPress}>
                                    <ImageView style={styles.image1} source={imageFile.IC_ARROW_LEFT} />
                                </TouchableOpacity>
                            </View>
                            <Text style={styles.text1}>{title}</Text>
                        </View>
                        <View style={styles.container4} />
                    </View>
                ) : null}
                <View
                    style={[
                        pStyle,
                        pHeader ? { height: (pStyle as any).height - normDimens.DIMEN_56 } : {},
                        { backgroundColor: colorCode.black, justifyContent: 'center', alignItems: 'center' },
                    ]}>
                    <ActivityIndicator
                        animating={true}
                        color={colorCode.blue_00B8FF}
                        size={'large'}
                        style={{ position: 'absolute' }}
                    />
                    <WebView
                        source={{
                            uri: url,
                        }}
                        style={[
                            pStyle,
                            pHeader ? { height: (pStyle as any).height - normDimens.DIMEN_56 } : {},
                            { backgroundColor: colorCode.transparent },
                        ]}
                        showsVerticalScrollIndicator={false}
                    />
                </View>
            </View>
        );
    } else {
        return (
            <SafeArea>
                <View style={{ flex: 1 }}>
                    <StatusBar backgroundColor={colorCode.white_F5F5F5} barStyle="dark-content" />
                    {title ? (
                        <View style={styles.container1}>
                            <View style={styles.container2}>
                                <View style={styles.container5}>
                                    <TouchableOpacity onPress={onBackPress}>
                                        <ImageView style={styles.image1} source={imageFile.IC_ARROW_LEFT} />
                                    </TouchableOpacity>
                                </View>
                                <Text style={styles.text1}>{title}</Text>
                            </View>
                            <View style={styles.container4} />
                        </View>
                    ) : null}
                    <View
                        style={[
                            {
                                backgroundColor: colorCode.black,
                                justifyContent: 'center',
                                alignItems: 'center',
                                flex: 1,
                            },
                        ]}>
                        <ActivityIndicator
                            animating={true}
                            color={colorCode.blue_00B8FF}
                            size={'large'}
                            style={{ position: 'absolute' }}
                        />
                        <WebView
                            source={{
                                uri: url,
                            }}
                            style={{
                                flex: 1,
                                width: normDimens.SCREEN_WIDTH,
                                backgroundColor: colorCode.transparent,
                            }}
                            showsVerticalScrollIndicator={false}
                        />
                    </View>
                </View>
            </SafeArea>
        );
    }
};

export default WebLinkViewer;

const styles = StyleSheet.create({
    container1: {
        height: normDimens.DIMEN_56,
        justifyContent: 'space-between',
        backgroundColor: colorCode.white,
        flexDirection: 'row',
    },
    container2: {
        flexDirection: 'row',
        //backgroundColor:'red',
        alignSelf: 'center',
        justifyContent: 'center',
    },
    container3: {
        flexDirection: 'row',
        position: 'absolute',
        right: 0,
    },
    container4: {
        //backgroundColor:'pink',
        width: normDimens.DIMEN_40,
        height: normDimens.DIMEN_40,
        alignSelf: 'center',
    },
    image1: {
        height: normDimens.DIMEN_32,
        width: normDimens.DIMEN_32,
        marginLeft: normDimens.DIMEN_12,
    },
    image2: {
        height: normDimens.DIMEN_32,
        width: normDimens.DIMEN_32,
        marginRight: normDimens.DIMEN_12,
    },
    image3: {
        height: normDimens.DIMEN_32,
        width: normDimens.DIMEN_32,
        marginRight: normDimens.DIMEN_12,
    },
    text1: {
        fontFamily: normFonts.CUSTOM_FONT.en.DEFAULT[500],
        fontSize: normFonts.FONT_18,
        lineHeight: normFonts.FONT_24,
        color: colorCode.black,
        alignSelf: 'center',
        marginStart: normDimens.DIMEN_12,
    },
    container5: {
        alignSelf: 'center',
    },
});
