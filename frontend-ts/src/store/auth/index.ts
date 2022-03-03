import { Module } from 'vuex'
import { RootState } from '../state'
import { state, AuthState } from './state'

export const auth: Module<AuthState, RootState> = {
  state
}