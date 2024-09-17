import { defineStore } from 'pinia';
import { UserRead } from 'src/services/api';

const getInitialUser = (): UserRead => ({
  uid: '',
  username: '',
  email: '',
  fullName: '',
  role: '',
  disabled: false,
});

export const useUserStore = defineStore('userStore', {
  state: (): { currentUser: UserRead } => ({
    currentUser: getInitialUser(),
  }),
  actions: {
    setCurrentUser(user: UserRead): void {
      this.currentUser = { ...user };
    },
    clearCurrentUser(): void {
      this.currentUser = getInitialUser();
    },
  },
});
