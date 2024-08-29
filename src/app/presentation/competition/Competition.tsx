import { useNavigation, useRoute } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { BackHandler, StyleSheet, TouchableOpacity, View } from 'react-native';
import SafeArea from '../widgets/SafeArea';
import colorCode from '../../../resources/colors/colorCode';
import normDimens from '../../../resources/dimens/normDimens';
import normFonts, { FontWeight } from '../../../resources/dimens/normFonts';
import BackPressUtils from '../../../utils/BackPressUtils';
import ImageView from '../widgets/imageView/ImageView';
import imageFile from '../../../resources/images/imageFile';
import EditText from '../widgets/textInput/EditText';
import strings from '../../../resources/strings/strings';
import TextView from '../widgets/textView/TextView';
import { FlashList } from '@shopify/flash-list';
import { CompetitionItemBean } from '../bean/CompetitionItemBean';
import { SearchCompetitionsRC } from '../../../domain/model/competition/SearchCompetitionsRC';
import { competitionUseCase } from '../../../domain/usecase';
import { CompetitionItemContent } from '../../../domain/model/competition/SearchCompetitionsContent';
import { getApiErrorMessageFromError } from '../../../utils/AppUtils';
import CompetitionItemView from './CompetitionItemView';

interface Props {}

interface Route {
    params: {
        source?: string;
        onSelectCompetition: (item: CompetitionItemBean) => {};
    };
}

const Competition = (props: Props) => {
    const navigation: any = useNavigation();
    const route = useRoute() as Route;
    const onSelectCompetition = route.params?.onSelectCompetition;

    const [searchText, setSearchText] = useState<string>('');

    const [competitions, setCompetitions] = useState<Array<CompetitionItemBean>>([]);

    const searchPhotosData = async (request: SearchCompetitionsRC) => {
        competitionUseCase
            .searchCompetitions({ requestContent: request })
            .then((response) => {
                const newData =
                    response?.results.map((item: CompetitionItemContent) => {
                        return item as CompetitionItemBean;
                    }) || [];

                setCompetitions(newData);
            })
            .catch((err) => {
                const message = getApiErrorMessageFromError({ error: err });
            });
    };

    const init = async () => {};

    useEffect(() => {
        init();
    }, []);

    const onClickItem = (item: CompetitionItemBean) => {
        onSelectCompetition(item);
        onBackPresssed();
    };

    const renderItem = ({ item, index }: { item: CompetitionItemBean; index: number }) => {
        return <CompetitionItemView item={item} onClickItem={onClickItem} isFavourite={false} />;
    };

    const keyExtractor = (item: CompetitionItemBean, index: any) => {
        return item.id.toString();
    };

    const onChangeText = (text: string) => {
        if (text.trim() !== '') {
            setSearchText(text.trim());
        } else {
            setSearchText('');
            setCompetitions([]);
        }
    };

    const onClickSearch = () => {
        if (searchText.trim() !== '') {
            searchPhotosData({
                query: searchText,
            });
        }
    };

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

    return (
        <SafeArea>
            <View style={styles.container1}>
                <View style={styles.container2}>
                    <View style={styles.container3}>
                        <TouchableOpacity style={styles.container5} onPress={onBackPresssed}>
                            <ImageView source={imageFile.IC_ARROW_LEFT_2} style={styles.container4} />
                        </TouchableOpacity>
                    </View>

                    <View style={styles.container14}>
                        <EditText
                            textStyle={{
                                fontSize: normFonts.FONT_16,
                                backgroundColor: colorCode.transparent,
                                flex: 1,
                            }}
                            placeholder={'Search competitions...'}
                            maxLength={100}
                            cursorColor={'#667085'}
                            textColor={'#667085'}
                            placeholderTextColor="#667085"
                            onTextChanged={onChangeText}
                        />
                        <TouchableOpacity style={styles.container10} onPress={onClickSearch}>
                            <ImageView
                                source={imageFile.IC_SEARCH}
                                style={styles.container9}
                                tintColor="#101828"
                            />
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={styles.container12}>
                    <TextView style={styles.text1} fontWeight={FontWeight._800}>
                        {strings.Competition}
                    </TextView>
                    <TextView style={styles.text2} fontWeight={FontWeight._400}>
                        {strings.CompetitionDescription}
                    </TextView>
                    <View style={styles.container11}>
                        <FlashList
                            data={competitions}
                            renderItem={renderItem}
                            numColumns={1}
                            showsHorizontalScrollIndicator={false}
                            keyExtractor={keyExtractor}
                            estimatedItemSize={normDimens.DIMEN_260}
                        />
                    </View>
                </View>
            </View>
        </SafeArea>
    );
};

export default Competition;

const styles = StyleSheet.create({
    container1: {
        display: 'flex',
        width: '100%',
        height: '100%',
        flexDirection: 'column',
        backgroundColor: colorCode.white,
        flex: 1,
    },
    text1: {
        color: '#101828',
        fontSize: normFonts.FONT_24,
        lineHeight: normFonts.FONT_30,
        textAlign: 'left',
        marginLeft: normDimens.DIMEN_16,
        marginRight: normDimens.DIMEN_16,
        marginTop: normDimens.DIMEN_24,
    },
    container2: {
        display: 'flex',
        flexDirection: 'row',
        width: '100%',
        height: normDimens.DIMEN_56,
        //backgroundColor:'red',
        marginTop: normDimens.DIMEN_16,
        //marginRight: normDimens.DIMEN_160
    },
    container3: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: normDimens.DIMEN_52,
        //borderWidth: normDimens.DIMEN_1,
        //borderColor: '#D0D5DD',
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
        //borderWidth: normDimens.DIMEN_1,
        //borderColor: '#D0D5DD',
        width: normDimens.DIMEN_48,
        height: normDimens.DIMEN_48,
        alignSelf: 'center',
        backgroundColor: '#F9FAFB',
    },
    container14: {
        display: 'flex',
        flexDirection: 'row',
        //width: '100%',
        flex: 1,
        height: normDimens.DIMEN_52,
        justifyContent: 'space-between',
        backgroundColor: '#F9FAFB',
        marginLeft: normDimens.DIMEN_12,
        alignSelf: 'center',
        marginRight: normDimens.DIMEN_16,
        borderRadius: normDimens.DIMEN_16,
    },
    container9: {
        width: normDimens.DIMEN_24,
        height: normDimens.DIMEN_24,
        alignSelf: 'center',
        //marginRight: normDimens.DIMEN_16,
    },
    container10: {
        width: normDimens.DIMEN_24,
        height: normDimens.DIMEN_24,
        alignSelf: 'center',
        marginRight: normDimens.DIMEN_16,
    },
    text2: {
        color: '#344054',
        fontSize: normFonts.FONT_14,
        lineHeight: normFonts.FONT_21,
        textAlign: 'left',
        marginLeft: normDimens.DIMEN_16,
        marginRight: normDimens.DIMEN_16,
        marginTop: normDimens.DIMEN_8,
    },
    container11: {
        display: 'flex',
        width: '100%',
        flex: 1,
        //backgroundColor:'pink',
        marginTop: normDimens.DIMEN_24,
    },
    container12: {
        display: 'flex',
        width: '100%',
        flex: 1,
        //backgroundColor:'red'
    },
});
