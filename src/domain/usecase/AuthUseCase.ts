import { authRepository, competitionRepository } from '../../data/repository';
import { SignUpContent } from '../model/auth/AuthContent';
import { SignUpRequestContent } from '../model/auth/AuthRC';
import { SearchCompetitionsContent } from '../model/competition/SearchCompetitionsContent';
import { SearchCompetitionsRC } from '../model/competition/SearchCompetitionsRC';

const signUp = async (params: { requestContent: SignUpRequestContent }): Promise<SignUpContent> => {
    return new Promise((resolve, reject) => {
        authRepository
            .signUpApiCall(params)
            .then((response) => {
                resolve(response);
            })
            .catch((err) => {
                reject(err);
            });
    });
};

export default {
    signUp,
};
