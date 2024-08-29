import { useNavigation, useRoute } from '@react-navigation/native';
import React, { useEffect } from 'react';
import { StyleSheet, Touchable, View } from 'react-native';
import SafeArea from '../widgets/SafeArea';
import colorCode from '../../../resources/colors/colorCode';
import { modalMethods } from '../modals/ModalUtils';
import Dialog from '../modals/dialog/Dialog';
import normDimens from '../../../resources/dimens/normDimens';
import ImageView from '../widgets/imageView/ImageView';
import imageFile from '../../../resources/images/imageFile';
import normFonts, { FontWeight } from '../../../resources/dimens/normFonts';
import strings from '../../../resources/strings/strings';
import TextView from '../widgets/textView/TextView';
import Button from '../widgets/button/Button';
import appActions from '../../../redux/action/appActions';
import NavigationRoutes from '../../navigation/NavigationRoutes';
import { TouchableOpacity } from 'react-native-gesture-handler';

interface Props {}

interface Route {
    params: {
        source?: string;
    };
}

const Main = (props: Props) => {
    const navigation: any = useNavigation();
    const route = useRoute() as Route;

    const onClickGotIt = () => {
        modalMethods.hide({ navigation });
    };

    const onClickLogout = () => {
        appActions.resetAppPreferences();
        setTimeout(() => {
            navigation.reset({
                index: 0,
                routes: [{ name: NavigationRoutes.login }],
            });
        }, 500);
    };

    const showWelcomeDialog = () => {
        modalMethods.show({
            navigation: navigation,
            component: (
                <Dialog style={styles.conatainer2}>
                    <View style={styles.container3}>
                        <View style={styles.container4}>
                            <View style={styles.container5}>
                                <ImageView source={imageFile.IC_SHINE} style={styles.container6} />
                            </View>
                            <View style={styles.container7}>
                                <TouchableOpacity style={styles.container7} onPress={onClickGotIt}>
                                    <ImageView source={imageFile.IC_CLOSE} style={styles.container8} />
                                </TouchableOpacity>
                            </View>
                        </View>
                        <TextView style={styles.text3} fontWeight={FontWeight._800}>
                            {strings.Welcome}
                        </TextView>
                        <TextView style={styles.text4} fontWeight={FontWeight._400}>
                            {strings.GreatToHaveYouWithUs}
                        </TextView>
                        <Button
                            onClick={onClickGotIt}
                            dropShadow={false}
                            enabled={true}
                            style={styles.container9}
                            buttonActiveStyle={{
                                width: normDimens.DIMEN_300,
                                height: normDimens.DIMEN_52,
                                borderRadius: normDimens.DIMEN_60,
                            }}
                            buttonActiveTextStyle={styles.text1}
                            buttonActiveTextFontWeight={FontWeight._700}
                            buttonText={strings.GotIt}
                        />
                    </View>
                </Dialog>
            ),
        });
    };

    useEffect(() => {
        showWelcomeDialog();
    }, []);

    return (
        <SafeArea>
            <View style={styles.container1}>
                <TextView style={styles.text2} fontWeight={FontWeight._700}>
                    {'Welcome ' + appActions.getUsername() + '!'}
                </TextView>
                <Button
                    onClick={onClickLogout}
                    dropShadow={false}
                    enabled={true}
                    style={styles.container10}
                    buttonActiveStyle={{
                        width: normDimens.DIMEN_160,
                        height: normDimens.DIMEN_52,
                        borderRadius: normDimens.DIMEN_60,
                    }}
                    buttonActiveTextStyle={styles.text1}
                    buttonActiveTextFontWeight={FontWeight._700}
                    buttonText={strings.LogOut}
                />
            </View>
        </SafeArea>
    );
};

export default Main;

const styles = StyleSheet.create({
    container1: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: colorCode.white,
        flex: 1,
    },
    conatainer2: {
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: normDimens.DIMEN_16,
    },
    container3: {
        display: 'flex',
        flexDirection: 'column',
        height: normDimens.DIMEN_328,
        width: '100%',
        backgroundColor: colorCode.white,
        borderRadius: normDimens.DIMEN_24,
        padding: normDimens.DIMEN_16,
    },
    container4: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    container5: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: colorCode.primary,
        width: normDimens.DIMEN_52,
        height: normDimens.DIMEN_52,
        borderRadius: normDimens.DIMEN_52,
    },
    container7: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        width: normDimens.DIMEN_52,
        height: normDimens.DIMEN_52,
        borderRadius: normDimens.DIMEN_52,
        borderWidth: normDimens.DIMEN_1,
        borderColor: '#D0D5DD',
    },
    container6: {
        width: normDimens.DIMEN_24,
        height: normDimens.DIMEN_24,
    },
    container8: {
        width: normDimens.DIMEN_20,
        height: normDimens.DIMEN_20,
    },
    container9: {
        //marginTop: normDimens.DIMEN_16,
        marginBottom: normDimens.DIMEN_24,
        marginTop: normDimens.DIMEN_56,
        marginHorizontal: normDimens.DIMEN_16,
    },
    text1: {
        color: colorCode.white,
        fontSize: normFonts.FONT_14,
        lineHeight: normFonts.FONT_14,
        //textAlign:'left',
        //marginLeft: normDimens.DIMEN_16,
        alignSelf: 'center',
    },
    text2: {
        color: colorCode.primary_dark,
        fontSize: normFonts.FONT_14,
        lineHeight: normFonts.FONT_14,
        //textAlign:'left',
        //marginLeft: normDimens.DIMEN_16,
    },
    text3: {
        color: '#101828',
        fontSize: normFonts.FONT_24,
        lineHeight: normFonts.FONT_30,
        marginTop: normDimens.DIMEN_56,
        //textAlign:'left',
        marginLeft: normDimens.DIMEN_4,
    },
    text4: {
        color: '#101828',
        fontSize: normFonts.FONT_18,
        lineHeight: normFonts.FONT_28,
        marginTop: normDimens.DIMEN_24,
        //textAlign:'left',
        marginLeft: normDimens.DIMEN_4,
    },
    container10: {
        //marginTop: normDimens.DIMEN_16,
        marginBottom: normDimens.DIMEN_24,
        marginTop: normDimens.DIMEN_100,
        marginHorizontal: normDimens.DIMEN_16,
    },
});
