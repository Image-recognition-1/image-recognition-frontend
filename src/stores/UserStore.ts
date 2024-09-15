import { defineStore } from 'pinia';
import { UserResponse } from 'src/services/api';

const getInitialUser = (): UserResponse => ({
  id: 0,
  username: '',
  email: '',
  fullName: '',
  role: '',
  disabled: false,
});

export const useUserStore = defineStore('userStore', {
  state: (): { currentUser: UserResponse } => ({
    currentUser: getInitialUser(),
  }),
  actions: {
    setCurrentUser(user: UserResponse): void {
      this.currentUser = { ...user };
    },
    clearCurrentUser(): void {
      this.currentUser = getInitialUser();
    },
  },
});
