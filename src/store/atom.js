// atoms.js
import { atom } from 'recoil';

export const userState = atom({
  key: 'userState',
  default: {
    fullname: '',
    coverImage:'',
    email: '',
    avatar: '',
    username: '',
    _id:null
  },
});
