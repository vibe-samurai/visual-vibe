import {
  CreateActiveIcon,
  CreateIcon,
  FavoritesActiveIcon,
  FavoritesIcon,
  HomeActiveIcon,
  HomeIcon,
  LogOutActiveIcon,
  LogOutIcon,
  MessengerActiveIcon,
  MessengerIcon,
  MyProfileActiveIcon,
  MyProfileIcon,
  SearchActiveIcon,
  SearchIcon,
  StatisticsActiveIcon,
  StatisticsIcon,
} from '@vibe-samurai/visual-ui-kit'

import { PATH } from '@/shared/constants/PATH'

export const sidebarOptions = [
  {
    icon: HomeIcon,
    iconActive: HomeActiveIcon,
    title: 'Home',
    url: PATH.HOME as string,
    isDisabled: false,
  },
  {
    icon: CreateIcon,
    iconActive: CreateActiveIcon,
    title: 'Create',
    url: PATH.CREATE as string,
    isDisabled: false,
  },
  {
    icon: MyProfileIcon,
    iconActive: MyProfileActiveIcon,
    title: 'My Profile',
    url: PATH.PROFILE.PROFILE as string,
    isDisabled: false,
  },
  {
    icon: MessengerIcon,
    iconActive: MessengerActiveIcon,
    title: 'Messenger',
    url: '#',
    isDisabled: false,
  },
  {
    icon: SearchIcon,
    iconActive: SearchActiveIcon,
    title: 'Search',
    url: '#',
    isDisabled: false,
  },
  {
    icon: StatisticsIcon,
    iconActive: StatisticsActiveIcon,
    title: 'Statistics',
    url: '#',
    isDisabled: false,
  },
  {
    icon: FavoritesIcon,
    iconActive: FavoritesActiveIcon,
    title: 'Favorites',
    url: '#',
    isDisabled: false,
  },
  {
    icon: LogOutIcon,
    iconActive: LogOutActiveIcon,
    title: 'Log Out',
    url: PATH.AUTH.LOGIN as string,
    isDisabled: false,
  },
]
