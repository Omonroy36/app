import {
  Box,
  Flex,
  IconButton,
  Avatar,
  Stack,
  Collapse,
  useColorModeValue,
  useBreakpointValue,
  useDisclosure,
  useColorMode,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverArrow,
  Button,
} from '@chakra-ui/react';
import { useState, memo } from 'react';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import NextChakraLink from '../NextChakraLink';
import Icon from '../Icon';
import DesktopNav from '../../../js_modules/navbar/DesktopNav';
import MobileNav from '../../../js_modules/navbar/MobileNav';
import Heading from '../Heading';

import useAuth from '../../hooks/useAuth';
import navbarTR from '../../translations/navbar';

const NavbarWithSubNavigation = ({ haveSession }) => {
  const router = useRouter();

  const {
    loginText, ITEMS,
  } = navbarTR[router.locale];

  const { isOpen, onToggle } = useDisclosure();
  const { colorMode, toggleColorMode } = useColorMode();
  const commonColors = useColorModeValue('white', 'gray.800');
  const popoverContentBgColor = useColorModeValue('white', 'gray.800');
  const { user, logout } = useAuth();

  const [settingsOpen, setSettingsOpen] = useState(false);

  const closeSettings = () => {
    setSettingsOpen(false);
  };
  const toggleSettings = () => {
    setSettingsOpen(!settingsOpen);
  };

  const getImage = () => {
    if (user && user.github) {
      return user.github.avatar_url;
    }
    return '';
  };

  const getName = () => {
    if (user && user?.first_name) {
      return `${user?.first_name} ${user?.last_name}`;
    }
    return user?.github.name;
  };

  return (
    <Box>
      <Flex
        transition="all .2s ease"
        bg={useColorModeValue('white', 'gray.800')}
        color={useColorModeValue('gray.600', 'white')}
        // minH="60px"
        height="7vh"
        py={{ base: '8px' }}
        px={{ base: 4 }}
        borderBottom={1}
        borderStyle="solid"
        borderColor={useColorModeValue('gray.200', 'gray.900')}
        align="center"
      >
        <Flex
          flex={{ base: 1, md: 'auto' }}
          ml={{ base: -2 }}
          display={{ base: 'flex', md: 'none' }}
          gridGap="12px"
        >
          <IconButton
            onClick={onToggle}
            _hover={{
              background: commonColors,
            }}
            _active={{
              background: commonColors,
            }}
            background={commonColors}
            icon={
              isOpen ? (
                <Icon icon="close2" width="22px" height="22px" />
              ) : (
                <Icon icon="hamburger2" width="22px" height="22px" />
              )
            }
            variant="default"
            aria-label="Toggle Navigation"
          />
          <NextChakraLink href="/" alignSelf="center" display={{ base: 'flex', md: 'none' }}>
            <Icon icon="logoModern" width="90px" height="20px" />
          </NextChakraLink>
        </Flex>

        <Flex flex={{ base: 1 }} justify={{ base: 'center', md: 'start' }}>
          <NextChakraLink href="/" alignSelf="center" display={{ base: 'none', md: 'flex' }}>
            <Icon icon="logoModern" width="90px" height="20px" />
          </NextChakraLink>

          <Flex display={{ base: 'none', md: 'flex' }} ml={10}>
            <DesktopNav NAV_ITEMS={ITEMS} haveSession={haveSession} />
          </Flex>
        </Flex>

        <Stack flex={{ base: 1, md: 0 }} justify="flex-end" direction="row" spacing={6}>
          <IconButton
            display={useBreakpointValue({ base: 'none', md: 'flex' })}
            _hover={{
              background: commonColors,
            }}
            _active={{
              background: commonColors,
            }}
            background={commonColors}
            onClick={toggleColorMode}
            icon={
              colorMode === 'light' ? (
                <Icon icon="light" width="25px" height="23px" color="black" />
              ) : (
                <Icon icon="dark" width="20px" height="20px" />
              )
            }
          />

          {haveSession ? (
            <Popover
              id="Avatar-Hover"
              isOpen={settingsOpen}
              onClose={closeSettings}
              placement="bottom-start"
              trigger="click"
            >
              <PopoverTrigger>
                <Button
                  bg="rgba(0,0,0,0)"
                  alignSelf="center"
                  width="20px"
                  minWidth="20px"
                  maxWidth="20px"
                  height="30px"
                  borderRadius="30px"
                  onClick={() => toggleSettings()}
                >
                  <Avatar
                    // name={user?.first_name}
                    width="30px"
                    marginY="auto"
                    height="30px"
                    src={getImage()}
                  />
                </Button>
              </PopoverTrigger>

              <PopoverContent
                border={0}
                boxShadow="xl"
                bg={popoverContentBgColor}
                p={4}
                rounded="md"
                width={{ base: '100%', md: 'auto' }}
                minW={{ base: 'auto', md: 'md' }}
              >
                <PopoverArrow />
                <Stack gridGap="10px" pb="15px">
                  <Flex alignItems="center" gridGap="6px">
                    <Box as="span" fontSize="18px" lineHeight="18px">
                      Welcome
                    </Box>
                    <Heading as="p" size="18px">
                      {getName()}
                    </Heading>
                  </Flex>

                  <Flex alignItems="center" gridGap="6px">
                    <Box as="span" fontSize="18px" lineHeight="18px">
                      Current Role:
                    </Box>
                    <Heading as="p" size="18px">{`${user?.roles[0].role}`}</Heading>
                  </Flex>
                </Stack>

                <Flex padding="20px 0" alignItems="center">
                  <Button gridGap="10px" onClick={logout} width="100%" py="25px">
                    <Box as="span" fontSize="15px">
                      Logout
                    </Box>
                    <Icon icon="logout" width="20px" height="20px" />
                  </Button>
                </Flex>
              </PopoverContent>
            </Popover>
          ) : (
            <NextChakraLink
              href="/login"
              fontWeight="700"
              fontSize="13px"
              lineHeight="22px"
              _hover={{
                textDecoration: 'none',
              }}
              letterSpacing="0.05em"
            >
              <Button
                display={useBreakpointValue({ base: 'flex', md: 'flex' })}
                width="100px"
                fontWeight={700}
                lineHeight="0.05em"
                variant="default"
              >
                {loginText}
              </Button>
            </NextChakraLink>
          )}
        </Stack>
      </Flex>

      <Collapse in={isOpen} animateOpacity>
        <MobileNav NAV_ITEMS={ITEMS} haveSession={haveSession} />
      </Collapse>
    </Box>
  );
};

NavbarWithSubNavigation.propTypes = {
  haveSession: PropTypes.bool,
};
NavbarWithSubNavigation.defaultProps = {
  haveSession: false,
};

export default memo(NavbarWithSubNavigation);
