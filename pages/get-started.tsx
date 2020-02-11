import * as React from 'react';
import { Navigation, WithLeftPaneNavigation, RightPaneAnchor } from '../components/Navigation';
import { NextPage, NextPageContext } from 'next';
import APIKeysList from '../components/snippets/APIKeys';
import { ProviderSnippet } from '../components/snippets/ProviderSnippet';
import { UseTheClientSnippet } from "../components/snippets/UseTheClient";
import useSWR from 'swr';
import { Organization, ORG_URL_KEY } from '../data/organizations';
import { getOrganizationId } from './helpers/getOrganization';
import { Box } from '@chakra-ui/core';

type Props = {
    organizationId: string;
};

const GetStartedPage: NextPage<Props> = ({ organizationId }) => {
    const { data: organization, error } = useSWR<Organization>(`${ORG_URL_KEY}/${organizationId}`, {
        refreshWhenHidden: true,
        revalidateOnFocus: false,
    });

    if (!organization) return <p>Loading</p>;
    if (error) return <p>ERROR: {error.message}</p>;

    return (<Navigation title="Getting Started">
        <WithLeftPaneNavigation>
            <RightPaneAnchor anchor="" title="Get your Client Keys" />

            <APIKeysList organizationId={organizationId} />
            <RightPaneAnchor anchor="using-the-client" title="Using the Client" />
            <Box marginBottom="1em">
                <p>
                    Before you get started with the javascript client, we support several frameworks out-of-the-box:
                    <ul>
                        <li>React</li>
                        <li>Redux</li>
                        <li>Redux Sagas</li>
                        <li>Node js - Express middleware</li>
                    </ul>
                </p>
            </Box>
            <UseTheClientSnippet />
        </WithLeftPaneNavigation>
    </Navigation>);
};

GetStartedPage.getInitialProps = async (ctx: NextPageContext): Promise<Props> => {
    const organizationId = await getOrganizationId(ctx);

    return { organizationId };
};


export default GetStartedPage;
