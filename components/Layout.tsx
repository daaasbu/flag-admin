import * as React from 'react';
import Head from 'next/head';
import { Box, Heading, Flex, Text, Button, useDisclosure } from '@chakra-ui/core';
import AuthModal from './AuthModal';
import { useAuth } from '../lib/auth';

const MenuItems: React.FC = ({ children }) => (
    <Text mt={{ base: 4, md: 0 }} mr={6} display="block">
        {children}
    </Text>
);

const Header: React.FC = props => {
    const [show, setShow] = React.useState(true);

    const handleToggle = () => setShow(!show);
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [isLogin, setIsLogin] = React.useState(false);
    const openLogin = () => {
        setIsLogin(true);
        onOpen();
    };

    const openSignUp = () => {
        setIsLogin(false);
        onOpen();
    };

    const auth = useAuth();

    return (
        <Flex
            as="nav"
            align="center"
            justify="space-between"
            wrap="wrap"
            padding="1.5rem"
            bg="gray.600"
            mb="30px"
            color="white"
            {...props}
        >
            <Flex align="center" mr={5}>
                <Heading as="h1" size="lg" letterSpacing={'-.1rem'}>
                    Lightswitch
                </Heading>
            </Flex>

            <Box display={{ sm: 'auto', md: 'none' }} onClick={handleToggle}>
                <svg fill="white" width="12px" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <title>Menu</title>
                    <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
                </svg>
            </Box>

            <Box
                display={{ sm: show ? 'block' : 'none', md: 'flex' }}
                width={{ sm: 'full', md: 'auto' }}
                alignItems="center"
                flexGrow={1}
            >
                <MenuItems>Docs</MenuItems>
                <MenuItems>Examples</MenuItems>
                <MenuItems>Blog</MenuItems>
            </Box>
            <AuthModal isLogin={isLogin} onClose={onClose} isOpen={isOpen}></AuthModal>
            <Box display={{ sm: show ? 'block' : 'none', md: 'block' }} mt={{ base: 4, md: 0 }}>
                {auth?.user ? (
                    <Button ml="5px" width="100px" variant="outline" onClick={auth?.signout}>
                        Logout
                    </Button>
                ) : (
                    <>
                        <Button variant="solid" width="100px" borderColor="gray.400" color="black" onClick={openSignUp}>
                            Get Started
                        </Button>
                        <Button ml="5px" width="100px" variant="outline" onClick={openLogin}>
                            Login
                        </Button>
                    </>
                )}
            </Box>
        </Flex>
    );
};
type Props = {
    title?: string;
};

const Layout: React.FunctionComponent<Props> = ({ children, title = 'This is the default title' }) => (
    <div>
        <Head>
            <title>{title}</title>
            <meta charSet="utf-8" />
            <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        </Head>
        {children}
        <footer></footer>
    </div>
);

export { Layout, Header };
