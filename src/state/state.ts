"use client";
import { atom } from 'recoil';

export const emailState = atom({
  key: 'email',
  default: '', 
});

export const passwordState = atom({
  key: 'password',
  default: '', 
});

