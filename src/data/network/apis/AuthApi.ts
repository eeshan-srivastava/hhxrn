import { SignUpRequestContent } from '../../../domain/model/auth/AuthRC';
import Api from '../Api';
import ApiRoutes from '../ApiRoutes';
import { postRequest } from '../ApiUtils';

const signUpApi = async (params: { requestContent: SignUpRequestContent }): Promise<any> => {
    const apiRoute = `${ApiRoutes.signUp}`;
    return new Promise((resolve, reject) => {
        postRequest({
            route: apiRoute,
            axiosClient: Api.authorized_axios_client_v3,
            data: params.requestContent,
        })
            .then((response) => {
                resolve(response);
            })
            .catch((errorMessage: string) => {
                reject(errorMessage);
            });
    });
};

export default {
    signUpApi,
};
