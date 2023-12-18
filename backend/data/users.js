import bycrypt from 'bcryptjs'

const users =[
  {
    name: 'Admin User',
    email: 'admin@email.com',
    password: bycrypt.hashSync('123456', 10),
    isAdmin: true,
  },
  {
    name: 'Yonghee',
    email: 'yonghee@email.com',
    password: bycrypt.hashSync('123456', 10),
    isAdmin: false,
  },
  {
    name: 'John Doe',
    email: 'john@email.com',
    password: bycrypt.hashSync('123456', 10),
    isAdmin: false,
  }
]

export default users