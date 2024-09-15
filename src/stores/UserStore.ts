import { defineStore } from 'pinia';
import { ResponseUser } from 'src/services/api';

const getInitialUser = (): ResponseUser => ({
  uid: '',
  username: '',
  email: '',
  fullName: '',
  role: '',
  disabled: false,
});

export const useUserStore = defineStore('userStore', {
  state: (): { currentUser: ResponseUser } => ({
    currentUser: getInitialUser(),
  }),
  actions: {
    setCurrentUser(user: ResponseUser): void {
      this.currentUser = { ...user };
    },
    clearCurrentUser(): void {
      this.currentUser = getInitialUser();
    },
  },
});
