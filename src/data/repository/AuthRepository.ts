import { SignUpContent, toSignUpContent } from '../../domain/model/auth/AuthContent';
import { SignUpRequestContent } from '../../domain/model/auth/AuthRC';
import {
    SearchCompetitionsContent,
    toSearchCompetitionsContent,
} from '../../domain/model/competition/SearchCompetitionsContent';
import { authApi } from '../network/apis';

const signUpApiCall = async (params: { requestContent: SignUpRequestContent }): Promise<SignUpContent> => {
    return new Promise((resolve, reject) => {
        authApi
            .signUpApi(params)
            .then((response) => {
                resolve(toSignUpContent(response));
            })
            .catch((err) => {
                reject(err);
            });
    });
};

export default {
    signUpApiCall,
};
