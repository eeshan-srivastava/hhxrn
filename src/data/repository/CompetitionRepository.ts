import {
    SearchCompetitionsContent,
    toSearchCompetitionsContent,
} from '../../domain/model/competition/SearchCompetitionsContent';
import { SearchCompetitionsRC } from '../../domain/model/competition/SearchCompetitionsRC';
import { competitionApi } from '../network/apis';

const searchCompetitionsApiCall = async (params: {
    requestContent: SearchCompetitionsRC;
}): Promise<SearchCompetitionsContent> => {
    return new Promise((resolve, reject) => {
        competitionApi
            .searchCompetitionsApi(params)
            .then((response) => {
                resolve(toSearchCompetitionsContent(response));
            })
            .catch((err) => {
                reject(err);
            });
    });
};

export default {
    searchCompetitionsApiCall,
};
