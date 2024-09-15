import { useUserStore } from 'src/stores/UserStore';
import { NavigationGuardNext, RouteLocationNormalized } from 'vue-router';
import { authApi, ResponseUser } from 'src/services/api';

export const forbidUnauthenticated = async (to: RouteLocationNormalized) => {
  const userStore = useUserStore();

  if (!userStore.currentUser.email) {
    try {
      const user = await authApi.getMe();
      userStore.setCurrentUser(user as ResponseUser);
    } catch (err) {
      return { name: 'LoginPage' } as NavigationGuardNext | boolean;
    }
  }

  if (userStore.currentUser.role !== 'ADMIN' && to.path === '/users') {
    return { name: 'ErrorPage' } as NavigationGuardNext | boolean;
  }

  return true;
};

export const forbidAuthenticated = async (
  to: RouteLocationNormalized,
  from: RouteLocationNormalized,
) => {
  const userStore = useUserStore();

  if (userStore.currentUser.username) return from.name ? false : ({ name: 'HomePage' } as NavigationGuardNext | boolean);

  try {
    const user = await authApi.getMe();
    userStore.setCurrentUser(user as ResponseUser);
    return from.name ? false : ({ name: 'HomePage' } as NavigationGuardNext | boolean);
  } catch (err) {
    return true;
  }
};
