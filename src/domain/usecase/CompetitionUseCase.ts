import { competitionRepository } from '../../data/repository';
import { SearchCompetitionsContent } from '../model/competition/SearchCompetitionsContent';
import { SearchCompetitionsRC } from '../model/competition/SearchCompetitionsRC';

const searchCompetitions = async (params: {
    requestContent: SearchCompetitionsRC;
}): Promise<SearchCompetitionsContent> => {
    return new Promise((resolve, reject) => {
        competitionRepository
            .searchCompetitionsApiCall(params)
            .then((response) => {
                resolve(response);
            })
            .catch((err) => {
                reject(err);
            });
    });
};

export default {
    searchCompetitions,
};
