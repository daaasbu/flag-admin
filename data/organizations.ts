import fetcher from '../lib/fetcher';
import { mutate } from 'swr';

export type Organization = {
    id: string;
    name?: string;
    key: string;
};

export const ORG_URL_KEY = '/v1/organizations';

export const getOrgKey = (organizationId: string) => {
    return `${ORG_URL_KEY}/${organizationId}`;
};
type Options = {
    shouldMutate?: boolean;
    shouldRevalidate?: boolean;
};

export const createOrganization = async (options?: Options) => {
    const data = await fetcher<{ organization: Organization }>(ORG_URL_KEY, {
        method: 'POST',
    });
    if (options?.shouldMutate) {
        mutate(getOrgKey(data.organization.id), options?.shouldRevalidate);
    }
    return data;
};
