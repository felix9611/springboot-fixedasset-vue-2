export interface AuthState {
  token: string | null
}

export const state: AuthState = {
  token: localStorage.getItem('token')
}