import { SearchCompetitionsRC } from '../../../domain/model/competition/SearchCompetitionsRC';
import mainJson from '../../json/mainJson';
import Api from '../Api';
import ApiRoutes from '../ApiRoutes';
import { getRequest } from '../ApiUtils';

const searchCompetitionsApi = async (params: { requestContent: SearchCompetitionsRC }): Promise<any> => {
    const apiRoute = `${ApiRoutes.searchCompetitions}?query=${params.requestContent.query}`;
    return new Promise((resolve, reject) => {
        getRequest({
            route: apiRoute,
            axiosClient: Api.authorized_axios_client_v3,
        })
            .then((response) => {
                resolve(response);
            })
            .catch((errorMessage: string) => {
                //reject(errorMessage);
                resolve({
                    total: 7,
                    total_pages: 1,
                    results: mainJson.competitions,
                });
            });
    });
};

export default {
    searchCompetitionsApi,
};
