export interface Account {
  username: string
  password: string
  role: 'user' | 'admin'
}

export interface FormData {
  username: Account['username']
  password: Account['password']
}

export interface Agent {
  _id: string
  name: string
  email: string
  mobilenumber: string
}
