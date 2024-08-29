import { parseProtection } from '../../../utils/AppUtils';

interface CompetitionItemContent {
    id: string;
    title: string;
    period: string;
    place: string;
}

interface SearchCompetitionsContent {
    total: number;
    total_pages: number;
    results: Array<CompetitionItemContent>;
}

const toSearchCompetitionsContent = (data: any): SearchCompetitionsContent => {
    return parseProtection(() => {
        return data as SearchCompetitionsContent;
    });
};

export { type SearchCompetitionsContent, toSearchCompetitionsContent, type CompetitionItemContent };
