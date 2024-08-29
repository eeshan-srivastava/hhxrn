import { useNavigation, useRoute } from '@react-navigation/native';
import React, { useCallback, useEffect, useState } from 'react';
import { BackHandler, ScrollView, StyleSheet, View } from 'react-native';
import SafeArea from '../widgets/SafeArea';
import colorCode from '../../../resources/colors/colorCode';
import normDimens from '../../../resources/dimens/normDimens';
import normFonts, { FontWeight } from '../../../resources/dimens/normFonts';
import ImageView from '../widgets/imageView/ImageView';
import imageFile from '../../../resources/images/imageFile';
import TextView from '../widgets/textView/TextView';
import strings from '../../../resources/strings/strings';
import BackPressUtils from '../../../utils/BackPressUtils';
import { TouchableOpacity } from 'react-native-gesture-handler';
import EditText from '../widgets/textInput/EditText';
import Button from '../widgets/button/Button';
import CheckboxStatement from '../widgets/checkbox/CheckboxStatement';
import mainJson from '../../../data/json/mainJson';
import { CheckboxItemBean } from '../widgets/checkbox/CheckboxBean';
import { modalMethods } from '../modals/ModalUtils';
import ReactModalSheet from '../modals/sheet/ReactModalSheet';
import WebLinkViewer from '../webView/WebLinkViewer';
import ColorUtils from '../../../resources/colors/ColorUtils';
import NavigationRoutes from '../../navigation/NavigationRoutes';
import { PageStateType } from '../widgets/pageState/PageStateUtils';
import { CompetitionItemBean } from '../bean/CompetitionItemBean';
import { authUseCase } from '../../../domain/usecase';
import appActions from '../../../redux/action/appActions';

interface Props {}

interface Route {
    params: {
        source?: string;
    };
}

const CreateAccount = (props: Props) => {
    const navigation: any = useNavigation();
    const route = useRoute() as Route;

    const [securePassword, setSecurePassword] = useState<boolean>(true);
    const [secureConfirmPassword, setSecureConfirmPassword] = useState<boolean>(true);
    const [passwordValidated, setPasswordValidated] = useState<boolean>(false);
    const [selectedCompetition, updateSelectedCompetition] = useState<CompetitionItemBean | null>(null);
    const [compErrorVisble, setCompErrorVisible] = useState<boolean>(true);
    const [email, updateEmail] = useState<string>('');
    const [emailErrorVisble, setEmailErrorVisible] = useState<boolean>(true);
    const [password, updatePassword] = useState<string>('');
    const [confirmPassword, updateConfirmPassword] = useState<string>('');
    const [p1ErrorVisble, setP1ErrorVisible] = useState<boolean>(true);
    const [p2ErrorVisble, setP2ErrorVisible] = useState<boolean>(true);
    const [fnErrorVisble, setFnErrorVisible] = useState<boolean>(true);
    const [lnErrorVisble, setLnErrorVisible] = useState<boolean>(true);
    const [firstName, updateFirstName] = useState<string>('');
    const [lastName, updateLastName] = useState<string>('');
    const [fullPageState, setFullPageState] = useState<PageStateType>(PageStateType.SUCCESS);
    const [fullPageErrorText, setFullPageErrorText] = useState<string>(strings.something_went_wrong);
    useEffect(() => {}, []);

    const [isChecboxStatementChecked, setIsChecboxStatementChecked] = useState<boolean>(false);
    const [signUpEnabled, setSignUpEnabled] = useState<boolean>(false);

    function isValidEmail(email: string): boolean {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    function isValidPassword(password: string): boolean {
        if (password.length < 8) {
            return false;
        }
        const uppercaseRegex = /[A-Z]/g;
        const lowercaseRegex = /[a-z]/g;
        const numberRegex = /[0-9]/g;
        const specialCharRegex = /[~`!@#$%^&*()_\-+=?]/g;
        const uppercaseMatches = password.match(uppercaseRegex) || [];
        const lowercaseMatches = password.match(lowercaseRegex) || [];
        const numberMatches = password.match(numberRegex) || [];
        const specialCharMatches = password.match(specialCharRegex) || [];
        const totalValidCharacters =
            uppercaseMatches.length +
            lowercaseMatches.length +
            numberMatches.length +
            specialCharMatches.length;
        return totalValidCharacters >= 3;
    }

    const onClickSignUp = useCallback(() => {
        if (selectedCompetition?.id) {
            appActions.logIn();
            appActions.updateUsername(`${firstName} ${lastName}`);
            //authUseCase.signUp({requestContent:{firstName, lastName, email, competitionId: selectedCompetition?.id, password}})
            setTimeout(() => {
                navigation.reset({
                    index: 0,
                    routes: [{ name: NavigationRoutes.main }],
                });
            }, 500);
        }
    }, [firstName, lastName]);

    const onClickCompetition = (item: CompetitionItemBean) => {
        if (item?.id) {
            updateSelectedCompetition(item);
            setCompErrorVisible(false);
        } else {
            setCompErrorVisible(true);
        }
    };

    const onSelectCompetition = () => {
        navigation.navigate(NavigationRoutes.competition, { onSelectCompetition: onClickCompetition });
    };

    const validateSignUpCredentials = (params: {
        email: string;
        competitionItem: CompetitionItemBean | null;
        password: string;
        confirmPassword: string;
        firstName: string;
        lastName: string;
        passwordValidated: boolean;
    }) => {
        const { email, competitionItem, password, confirmPassword, firstName, lastName } = params;
        if (
            competitionItem?.id &&
            email &&
            firstName &&
            lastName &&
            password &&
            confirmPassword &&
            isChecboxStatementChecked &&
            passwordValidated
        ) {
            setSignUpEnabled(true);
        } else {
            setSignUpEnabled(false);
        }
    };

    useEffect(() => {
        validateSignUpCredentials({
            email: email,
            competitionItem: selectedCompetition,
            firstName,
            lastName,
            password,
            confirmPassword,
            passwordValidated,
        });
    }, [
        selectedCompetition,
        email,
        firstName,
        lastName,
        password,
        confirmPassword,
        passwordValidated,
        isChecboxStatementChecked,
    ]);

    const onBackPress = () => {
        if (navigation.canGoBack()) {
            navigation.goBack();
        }
        return true;
    };

    useEffect(() => {
        BackHandler.addEventListener(BackPressUtils.HARDWARE_BACKPRESS, onBackPress);
        return () => BackHandler.removeEventListener(BackPressUtils.HARDWARE_BACKPRESS, onBackPress);
    }, []);

    const onBackPresssed = () => {
        onBackPress();
    };

    const onClickCheckbox = () => {
        setIsChecboxStatementChecked(!isChecboxStatementChecked);
    };

    const openWebViewSheet = (item: CheckboxItemBean) => {
        modalMethods.show({
            navigation: navigation,
            component: (
                <ReactModalSheet
                    sheetHeight={normDimens.SCREEN_HEIGHT * 0.8}
                    cornerRadius={normDimens.DIMEN_24}
                    backdropColor={colorCode.transparent}
                    handleStyle={{ backgroundColor: colorCode.grey_737373 }}>
                    <WebLinkViewer
                        url={item.appLink.url}
                        style={{ height: normDimens.SCREEN_HEIGHT * 0.8, width: normDimens.SCREEN_WIDTH }}
                        title={item.text}
                    />
                </ReactModalSheet>
            ),
        });
    };

    const onClickLink = (item: CheckboxItemBean) => {
        openWebViewSheet(item);
        //navigation.navigate(NavigationRoutes.web_link_viewer, {url:item.appLink.url, title:item.text})
    };

    const onChangeEmail = (text: string) => {
        updateEmail(text.trim());
        if (text.trim() !== '' && isValidEmail(text)) {
            setEmailErrorVisible(false);
        } else {
            updateEmail('');
            setEmailErrorVisible(true);
        }
    };

    const onChangeFirstName = (text: string) => {
        updateFirstName(text.trim());
        if (text.trim() !== '') {
            setFnErrorVisible(false);
        } else {
            setFnErrorVisible(true);
        }
    };

    const onChangeLastName = (text: string) => {
        updateLastName(text.trim());
        if (text.trim() !== '') {
            setLnErrorVisible(false);
        } else {
            setLnErrorVisible(true);
        }
    };

    const checkPasswordAndConfirmPassword = (params: { password: string; confirmPassword: string }) => {
        const { password, confirmPassword } = params;
        if (password.trim() !== '' && isValidPassword(password)) {
            if (password === confirmPassword) {
                setPasswordValidated(true);
                setP1ErrorVisible(false);
                setP2ErrorVisible(false);
            } else {
                setP2ErrorVisible(true);
                setPasswordValidated(false);
            }
        } else {
            if (password != confirmPassword) {
                setP2ErrorVisible(true);
            } else {
                setP2ErrorVisible(false);
            }
            setP1ErrorVisible(true);
            setPasswordValidated(false);
        }
    };

    const onChangePassword = (text: string) => {
        updatePassword(text.trim());
        checkPasswordAndConfirmPassword({ password: text.trim(), confirmPassword: confirmPassword });
    };

    const onChangeConfirmPassword = (text: string) => {
        updateConfirmPassword(text.trim());
        checkPasswordAndConfirmPassword({ password: password, confirmPassword: text.trim() });
    };

    const onSecureConfirmPassword = () => {
        setSecureConfirmPassword(!secureConfirmPassword);
    };

    const onSecurePassword = () => {
        setSecurePassword(!securePassword);
    };

    return (
        <SafeArea>
            <View style={styles.container1}>
                <View style={styles.container2}>
                    <View style={styles.container3}>
                        <TouchableOpacity style={styles.container5} onPress={onBackPresssed}>
                            <ImageView source={imageFile.IC_ARROW_LEFT} style={styles.container4} />
                        </TouchableOpacity>
                    </View>

                    <TextView style={styles.text1} fontWeight={FontWeight._800}>
                        {strings.CreateAccount}
                    </TextView>
                </View>
                <ScrollView style={styles.container6}>
                    <View style={styles.container7}>
                        <TouchableOpacity
                            style={styles.container8}
                            activeOpacity={0.8}
                            onPress={onSelectCompetition}>
                            <TextView style={styles.text2} fontWeight={FontWeight._400} numberOfLines={1}>
                                {selectedCompetition?.title || strings.CompetitionToSignUp}
                            </TextView>
                            <ImageView source={imageFile.IC_DROPDOWN} style={styles.container9} />
                        </TouchableOpacity>
                        {compErrorVisble ? (
                            <TextView style={styles.text3} fontWeight={FontWeight._400}>
                                {strings.YouMustPickACompetitionToRegister}
                            </TextView>
                        ) : null}
                    </View>
                    <View style={styles.container10}>
                        <View style={styles.container11}>
                            <EditText
                                textStyle={{
                                    fontSize: normFonts.FONT_16,
                                    backgroundColor: colorCode.transparent,
                                    flex: 1,
                                }}
                                placeholder={'Enter Email'}
                                maxLength={100}
                                cursorColor={'#667085'}
                                textColor={'#667085'}
                                placeholderTextColor="#667085"
                                onTextChanged={onChangeEmail}
                            />
                        </View>
                        {emailErrorVisble ? (
                            <TextView style={styles.text3} fontWeight={FontWeight._400}>
                                {strings.EmailFormatIsInvalid}
                            </TextView>
                        ) : null}
                    </View>
                    <View style={styles.container12}>
                        <View style={styles.container13}>
                            <View style={styles.container14}>
                                <EditText
                                    textStyle={{
                                        fontSize: normFonts.FONT_16,
                                        backgroundColor: colorCode.transparent,
                                        flex: 1,
                                    }}
                                    placeholder={'Enter Password'}
                                    maxLength={100}
                                    cursorColor={'#667085'}
                                    textColor={'#667085'}
                                    placeholderTextColor="#667085"
                                    secureTextEntry={securePassword}
                                    onTextChanged={onChangePassword}
                                />
                                <TouchableOpacity onPress={onSecurePassword} style={styles.container90}>
                                    <ImageView
                                        source={
                                            securePassword ? imageFile.IC_EYE_CLOSE : imageFile.IC_EYE_OPEN
                                        }
                                        style={styles.container91}
                                        tintColor="#101828"
                                    />
                                </TouchableOpacity>
                            </View>
                            <View style={styles.container15} />
                            <View style={styles.container14}>
                                <EditText
                                    textStyle={{
                                        fontSize: normFonts.FONT_16,
                                        backgroundColor: colorCode.transparent,
                                        flex: 1,
                                    }}
                                    placeholder={'Confirm Password'}
                                    maxLength={100}
                                    cursorColor={'#667085'}
                                    textColor={'#667085'}
                                    placeholderTextColor="#667085"
                                    secureTextEntry={secureConfirmPassword}
                                    onTextChanged={onChangeConfirmPassword}
                                />
                                <TouchableOpacity
                                    onPress={onSecureConfirmPassword}
                                    style={styles.container90}>
                                    <ImageView
                                        source={
                                            secureConfirmPassword
                                                ? imageFile.IC_EYE_CLOSE
                                                : imageFile.IC_EYE_OPEN
                                        }
                                        style={styles.container91}
                                        tintColor="#101828"
                                    />
                                </TouchableOpacity>
                            </View>
                        </View>
                        {p1ErrorVisble ? (
                            <TextView style={styles.text3} fontWeight={FontWeight._400}>
                                {strings.AtLeast8Letters}
                            </TextView>
                        ) : null}
                        {p1ErrorVisble ? (
                            <TextView style={styles.text3} fontWeight={FontWeight._400}>
                                {
                                    strings.IncludeAtLeast3UppercaseLettersLowercaseLettersNumberOrSpecialLetters
                                }
                            </TextView>
                        ) : null}
                        {p1ErrorVisble ? (
                            <TextView style={styles.text3} fontWeight={FontWeight._400}>
                                {strings.SpecialChars}
                            </TextView>
                        ) : null}
                        {p2ErrorVisble ? (
                            <TextView style={styles.text3} fontWeight={FontWeight._400}>
                                {strings.PasswordNotMatch}
                            </TextView>
                        ) : null}
                    </View>
                    <View style={styles.container10}>
                        <View style={styles.container11}>
                            <EditText
                                textStyle={{
                                    fontSize: normFonts.FONT_16,
                                    backgroundColor: colorCode.transparent,
                                    flex: 1,
                                }}
                                placeholder={strings.FirstName}
                                maxLength={100}
                                cursorColor={'#667085'}
                                textColor={'#667085'}
                                placeholderTextColor="#667085"
                                onTextChanged={onChangeFirstName}
                            />
                        </View>
                        {fnErrorVisble ? (
                            <TextView style={styles.text3} fontWeight={FontWeight._400}>
                                {strings.FieldRequired}
                            </TextView>
                        ) : null}
                    </View>
                    <View style={styles.container18}>
                        <View style={styles.container11}>
                            <EditText
                                textStyle={{
                                    fontSize: normFonts.FONT_16,
                                    backgroundColor: colorCode.transparent,
                                    flex: 1,
                                }}
                                placeholder={strings.LastName}
                                maxLength={100}
                                cursorColor={'#667085'}
                                textColor={'#667085'}
                                placeholderTextColor="#667085"
                                onTextChanged={onChangeLastName}
                            />
                        </View>
                        {lnErrorVisble ? (
                            <TextView style={styles.text3} fontWeight={FontWeight._400}>
                                {strings.FieldRequired}
                            </TextView>
                        ) : null}
                    </View>
                </ScrollView>
                <View style={styles.container16}>
                    <CheckboxStatement
                        checkboxBean={mainJson.checkboxBean}
                        isChecked={isChecboxStatementChecked}
                        onClick={onClickCheckbox}
                        onClickLink={onClickLink}
                        style={styles.checkBoxStyle}
                        textStyle={styles.text5}
                        gradient={false}
                    />
                    <Button
                        onClick={onClickSignUp}
                        dropShadow={false}
                        enabled={signUpEnabled}
                        style={styles.container17}
                        buttonActiveStyle={{
                            width: normDimens.DIMEN_327,
                            height: normDimens.DIMEN_52,
                            borderRadius: normDimens.DIMEN_60,
                        }}
                        buttonInActiveStyle={{
                            width: normDimens.DIMEN_327,
                            height: normDimens.DIMEN_52,
                            borderRadius: normDimens.DIMEN_60,
                        }}
                        buttonActiveTextStyle={styles.text4}
                        buttonInActiveTextStyle={styles.text4}
                        buttonActiveTextFontWeight={FontWeight._700}
                        buttonInActiveTextFontWeight={FontWeight._700}
                        buttonText={strings.SignUp}
                    />
                </View>
            </View>
        </SafeArea>
    );
};

export default CreateAccount;

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
        flexDirection: 'row',
        width: '100%',
        height: normDimens.DIMEN_56,
        //backgroundColor:'red',
        marginTop: normDimens.DIMEN_16,
    },
    container3: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: normDimens.DIMEN_52,
        borderWidth: normDimens.DIMEN_1,
        borderColor: '#D0D5DD',
        width: normDimens.DIMEN_48,
        height: normDimens.DIMEN_48,
        alignSelf: 'center',
        marginLeft: normDimens.DIMEN_16,
    },
    container4: {
        width: normDimens.DIMEN_20,
        height: normDimens.DIMEN_20,
    },
    container5: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: normDimens.DIMEN_52,
        borderWidth: normDimens.DIMEN_1,
        borderColor: '#D0D5DD',
        width: normDimens.DIMEN_48,
        height: normDimens.DIMEN_48,
        alignSelf: 'center',
    },
    container6: {
        display: 'flex',
        flexDirection: 'column',
        flex: 1,
        //backgroundColor:'blue',
        paddingHorizontal: normDimens.DIMEN_16,
        marginTop: normDimens.DIMEN_20,
    },
    text1: {
        color: '#101828',
        fontSize: normFonts.FONT_24,
        lineHeight: normFonts.FONT_30,
        textAlign: 'left',
        marginLeft: normDimens.DIMEN_16,
        alignSelf: 'center',
    },
    container7: {
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
    },
    container8: {
        display: 'flex',
        flexDirection: 'row',
        backgroundColor: '#F9FAFB',
        borderRadius: normDimens.DIMEN_16,
        justifyContent: 'space-between',
        width: '100%',
        height: normDimens.DIMEN_52,
    },
    container9: {
        width: normDimens.DIMEN_24,
        height: normDimens.DIMEN_24,
        alignSelf: 'center',
        marginRight: normDimens.DIMEN_16,
        backgroundColor: '#F9FAFB',
    },
    container91: {
        width: normDimens.DIMEN_24,
        height: normDimens.DIMEN_24,
        alignSelf: 'center',
        //marginRight: normDimens.DIMEN_16,
        backgroundColor: '#F9FAFB',
    },
    container90: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        width: normDimens.DIMEN_24,
        //height: normDimens.DIMEN_24,
        height: '100%',
        alignSelf: 'center',
        marginRight: normDimens.DIMEN_16,
        backgroundColor: '#F9FAFB',
        //backgroundColor:'red'
    },
    text2: {
        color: '#667085',
        fontSize: normFonts.FONT_16,
        lineHeight: normFonts.FONT_16,
        textAlign: 'left',
        marginLeft: normDimens.DIMEN_16,
        alignSelf: 'center',
        maxWidth: '80%',
    },
    text3: {
        color: colorCode.warning,
        fontSize: normFonts.FONT_14,
        lineHeight: normFonts.FONT_14,
        textAlign: 'left',
        marginLeft: normDimens.DIMEN_8,
        //alignSelf:'center',
        marginTop: normDimens.DIMEN_8,
    },
    container10: {
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        marginTop: normDimens.DIMEN_8,
    },
    container11: {
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: '#F9FAFB',
        borderRadius: normDimens.DIMEN_16,
        justifyContent: 'space-between',
        width: '100%',
        height: normDimens.DIMEN_52,
    },
    container12: {
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        marginTop: normDimens.DIMEN_8,
    },
    container13: {
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: '#F9FAFB',
        borderRadius: normDimens.DIMEN_16,
        justifyContent: 'space-between',
        width: '100%',
        // height: normDimens.DIMEN_52
    },
    container14: {
        display: 'flex',
        flexDirection: 'row',
        width: '100%',
        height: normDimens.DIMEN_52,
        justifyContent: 'space-between',
    },
    container15: {
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        height: normDimens.DIMEN_1,
        backgroundColor: '#F2F4F7',
    },
    container16: {
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: colorCode.white,
        position: 'absolute',
        width: '100%',
        bottom: normDimens.DIMEN_0,
        alignItems: 'center',
    },
    container17: {
        marginTop: normDimens.DIMEN_16,
        marginBottom: normDimens.DIMEN_24,
    },
    container18: {
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        marginTop: normDimens.DIMEN_8,
        marginBottom: normDimens.DIMEN_200,
    },
    text4: {
        color: colorCode.white,
        fontSize: normFonts.FONT_14,
        lineHeight: normFonts.FONT_14,
        //textAlign:'left',
        //marginLeft: normDimens.DIMEN_16,
        alignSelf: 'center',
    },
    checkBoxStyle: {
        marginTop: normDimens.DIMEN_16,
        //height: normDimens.DIMEN_100,
        width: normDimens.DIMEN_328,
        borderRadius: normDimens.DIMEN_8,
        //backgroundColor:'pink',
        borderColor: ColorUtils.getAlphaColor({ colorCode: colorCode.black, opacityPercent: 40 }),
        borderWidth: 1,
        borderStyle: 'dotted',
    },
    text5: {
        color: ColorUtils.getAlphaColor({ colorCode: '#475467', opacityPercent: 100 }),
        fontSize: normFonts.FONT_14,
        lineHeight: normFonts.FONT_21,
    },
});
