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

export const getSidebarOptions = (userId: string | null) => [
  {
    icon: HomeIcon,
    iconActive: HomeActiveIcon,
    title: 'Home',
    url: PATH.HOME,
    isDisabled: false,
  },
  {
    icon: CreateIcon,
    iconActive: CreateActiveIcon,
    title: 'Create',
    url: PATH.CREATE,
    isDisabled: false,
  },
  {
    icon: MyProfileIcon,
    iconActive: MyProfileActiveIcon,
    title: 'My Profile',
    url: userId ? `${PATH.PROFILE.PROFILE}/${userId}` : PATH.PROFILE.PROFILE,
    isDisabled: false,
  },
  {
    icon: MessengerIcon,
    iconActive: MessengerActiveIcon,
    title: 'Messenger',
    url: PATH.MESSENGER,
    isDisabled: false,
  },
  {
    icon: SearchIcon,
    iconActive: SearchActiveIcon,
    title: 'Search',
    url: PATH.SEARCH,
    isDisabled: false,
  },
  {
    icon: StatisticsIcon,
    iconActive: StatisticsActiveIcon,
    title: 'Statistics',
    url: PATH.STATISTICS,
    isDisabled: false,
  },
  {
    icon: FavoritesIcon,
    iconActive: FavoritesActiveIcon,
    title: 'Favorites',
    url: PATH.FAVORITES,
    isDisabled: false,
  },
  {
    icon: LogOutIcon,
    iconActive: LogOutActiveIcon,
    title: 'Log Out',
    url: '#' as string,
    isDisabled: false,
  },
]
