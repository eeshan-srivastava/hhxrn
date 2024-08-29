import { useNavigation, useRoute } from '@react-navigation/native';
import React, { useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import SafeArea from '../widgets/SafeArea';
import colorCode from '../../../resources/colors/colorCode';
import imageFile from '../../../resources/images/imageFile';
import normDimens from '../../../resources/dimens/normDimens';
import ColorUtils from '../../../resources/colors/ColorUtils';
import Video from 'react-native-video';
import videoFile from '../../../resources/videos/videoFile';
import TextView from '../widgets/textView/TextView';
import normFonts, { FontWeight } from '../../../resources/dimens/normFonts';
import LinearGradient from 'react-native-linear-gradient';
import strings from '../../../resources/strings/strings';
import Button from '../widgets/button/Button';
import ImageView from '../widgets/imageView/ImageView';
import NavigationRoutes from '../../navigation/NavigationRoutes';
import appActions from '../../../redux/action/appActions';

interface Props {}

interface Route {
    params: {
        source?: string;
    };
}

const Login = (props: Props) => {
    const navigation: any = useNavigation();
    const route = useRoute() as Route;

    useEffect(() => {
        if (appActions.isLoggedIn()) {
            navigation.reset({
                index: 0,
                routes: [{ name: NavigationRoutes.main }],
            });
        }
    }, []);

    const onClickSignUpForFree = () => {
        navigation.navigate(NavigationRoutes.createAccount);
    };

    const onClickContinueWithEmail = () => {};

    return (
        <SafeArea>
            <View style={styles.container1}>
                <Video
                    source={videoFile.VID_LOGIN_BACKGROUND}
                    style={styles.container2}
                    muted
                    resizeMode="cover"
                    repeat
                />
                <View style={styles.container3}>
                    <TextView style={styles.text1} fontWeight={FontWeight._700}>
                        {strings.HyperhireAssignment}
                    </TextView>
                    <View style={styles.container4}>
                        <LinearGradient
                            colors={[
                                ColorUtils.getAlphaColor({
                                    colorCode: colorCode.grey_dark,
                                    opacityPercent: 0,
                                }),
                                ColorUtils.getAlphaColor({
                                    colorCode: colorCode.grey_dark,
                                    opacityPercent: 100,
                                }),
                            ]}
                            style={styles.container5}
                            locations={[0, 0.69]}
                        />
                        <View style={styles.container6}>
                            <Button
                                onClick={onClickSignUpForFree}
                                dropShadow={false}
                                enabled={true}
                                style={styles.container7}
                                buttonActiveStyle={{
                                    width: normDimens.DIMEN_327,
                                    height: normDimens.DIMEN_52,
                                    borderRadius: normDimens.DIMEN_60,
                                }}>
                                <View style={styles.container9}>
                                    <View style={styles.container10}>
                                        <ImageView source={imageFile.IC_LOGIN} style={styles.container11} />
                                        <TextView style={styles.text2} fontWeight={FontWeight._700}>
                                            {strings.SignUpForFree}
                                        </TextView>
                                    </View>
                                    <View style={styles.container12}>
                                        <ImageView
                                            source={imageFile.IC_ARROW_RIGHT}
                                            style={styles.container13}
                                        />
                                    </View>
                                </View>
                            </Button>
                            <Button
                                onClick={onClickContinueWithEmail}
                                dropShadow={false}
                                enabled={true}
                                style={styles.container8}
                                buttonActiveStyle={{
                                    width: normDimens.DIMEN_327,
                                    height: normDimens.DIMEN_52,
                                    borderRadius: normDimens.DIMEN_60,
                                }}
                                activeGradient={[
                                    colorCode.primary_dark,
                                    colorCode.primary_dark,
                                    colorCode.primary_dark,
                                ]}>
                                <View style={styles.container9}>
                                    <View style={styles.container10}>
                                        <ImageView source={imageFile.IC_MAIL} style={styles.container11} />
                                        <TextView style={styles.text2} fontWeight={FontWeight._700}>
                                            {strings.ContinueWithEmail}
                                        </TextView>
                                    </View>
                                    <View style={styles.container12}>
                                        <ImageView
                                            source={imageFile.IC_ARROW_RIGHT}
                                            style={styles.container13}
                                        />
                                    </View>
                                </View>
                            </Button>
                        </View>
                    </View>
                </View>
            </View>
        </SafeArea>
    );
};

export default Login;

const styles = StyleSheet.create({
    container1: {
        display: 'flex',
        width: '100%',
        height: '100%',
        flexDirection: 'column',
        backgroundColor: colorCode.white,
        flex: 1,
    },
    container2: {
        display: 'flex',
        position: 'absolute',
        width: '100%',
        height: '100%',
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
    },
    container3: {
        display: 'flex',
        width: '100%',
        height: '100%',
        flexDirection: 'column',
    },
    text1: {
        color: colorCode.white,
        fontSize: normFonts.FONT_36,
        marginTop: normDimens.DIMEN_72,
        marginLeft: normDimens.DIMEN_24,
    },
    container4: {
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        height: normDimens.DIMEN_374,
        position: 'absolute',
        bottom: 0,
    },
    container5: {
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        height: normDimens.DIMEN_374,
        position: 'absolute',
    },
    container6: {
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
    },
    container7: {
        marginTop: normDimens.DIMEN_200,
    },
    container8: {
        marginTop: normDimens.DIMEN_16,
    },
    container9: {
        display: 'flex',
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'space-between',
    },
    container10: {
        display: 'flex',
        flexDirection: 'row',
        alignSelf: 'center',
        marginLeft: normDimens.DIMEN_16,
    },
    container11: {
        width: normDimens.DIMEN_20,
        height: normDimens.DIMEN_20,
        alignSelf: 'center',
    },
    container12: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: normDimens.DIMEN_44,
        borderWidth: normDimens.DIMEN_1,
        borderColor: colorCode.white,
        width: normDimens.DIMEN_44,
        height: normDimens.DIMEN_44,
        alignSelf: 'center',
        marginRight: normDimens.DIMEN_4,
    },
    container13: {
        width: normDimens.DIMEN_20,
        height: normDimens.DIMEN_20,
    },
    text2: {
        color: colorCode.white,
        fontSize: normFonts.FONT_14,
        textAlign: 'left',
        fontFamily: normFonts.CUSTOM_FONT.en.DEFAULT[700],
        marginLeft: normDimens.DIMEN_16,
        alignSelf: 'center',
    },
});
