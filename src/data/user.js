export const users = [
  {
    id: 1,
    name: 'Administrador',
    username: 'admin',
    password: '1234',
    role: 'admin'
  },
  {
    id: 2,
    name: 'Maximo',
    username: 'maxi',
    password: '1234',
    role: 'user'
  }
];

export const loginUser = (username, password) => {
  const user = users.find(
    u => u.username === username && u.password === password
  );

  if (user) {
    localStorage.setItem('currentUser', JSON.stringify(user));
    return { success: true, user };
  } else {
    return { success: false, message: 'Usuario o contraseña incorrectos' };
  }
};

export const logoutUser = () => {
  localStorage.removeItem('currentUser');
};
