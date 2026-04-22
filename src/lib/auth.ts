export interface User {
  username: string;
  email: string;
  phone: string;
  password: string;
}

const USERS_KEY = "sgrs_users";
const SESSION_KEY = "sgrs_session";

export function getUsers(): User[] {
  const data = localStorage.getItem(USERS_KEY);
  return data ? JSON.parse(data) : [];
}

export function registerUser(user: User): { success: boolean; message: string } {
  const users = getUsers();
  if (users.find((u) => u.email === user.email)) {
    return { success: false, message: "Email already registered" };
  }
  if (users.find((u) => u.username === user.username)) {
    return { success: false, message: "Username already taken" };
  }
  users.push(user);
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
  return { success: true, message: "Registration successful!" };
}

export function loginUser(email: string, password: string): { success: boolean; user?: User; message: string } {
  const users = getUsers();
  const user = users.find((u) => u.email === email && u.password === password);
  if (user) {
    localStorage.setItem(SESSION_KEY, JSON.stringify(user));
    return { success: true, user, message: "Login successful!" };
  }
  return { success: false, message: "Invalid email or password" };
}

export function getSession(): User | null {
  const data = localStorage.getItem(SESSION_KEY);
  return data ? JSON.parse(data) : null;
}

export function logout(): void {
  localStorage.removeItem(SESSION_KEY);
}
