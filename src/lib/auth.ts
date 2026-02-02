


import { SignJWT } from 'jose';

interface User {
  id: string;
  email: string;
  password: string;
  createdAt: string;
  role?: string;
}

interface AuthState {
  isAuthenticated: boolean;
  currentUser: User | null;
}

const USERS_KEY = 'ai_tools_users';
const AUTH_KEY = 'ai_tools_auth';
const ADMIN_EMAIL = 'admin@adeptaitools';
const ADMIN_PASSWORD = 'Pamusha@34';
const ADMIN_ROLE = 'app20260201200132errnxcxiac_v1_admin_user';
const USER_ROLE = 'app20260201200132errnxcxiac_v1_user';

// JWT secret for signing tokens (in production, this should be in environment variables)
const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key-change-in-production';

export function initializeAuth(): void {
  if (typeof window === 'undefined') return;
  
  const users = localStorage.getItem(USERS_KEY);
  if (!users) {
    const adminUser: User = {
      id: '1',
      email: ADMIN_EMAIL,
      password: ADMIN_PASSWORD,
      role: ADMIN_ROLE,
      createdAt: new Date().toISOString(),
    };
    localStorage.setItem(USERS_KEY, JSON.stringify([adminUser]));
  } else {
    // Update existing users to include the new admin if not present
    const existingUsers: User[] = JSON.parse(users);
    const adminExists = existingUsers.find(u => u.email === ADMIN_EMAIL);
    
    if (!adminExists) {
      const adminUser: User = {
        id: Date.now().toString(),
        email: ADMIN_EMAIL,
        password: ADMIN_PASSWORD,
        role: ADMIN_ROLE,
        createdAt: new Date().toISOString(),
      };
      existingUsers.push(adminUser);
      localStorage.setItem(USERS_KEY, JSON.stringify(existingUsers));
    } else {
      // Update existing admin user password and role
      adminExists.password = ADMIN_PASSWORD;
      adminExists.role = ADMIN_ROLE;
      localStorage.setItem(USERS_KEY, JSON.stringify(existingUsers));
    }
  }
}

export function login(email: string, password: string): { success: boolean; error?: string; user?: User } {
  if (typeof window === 'undefined') return { success: false, error: 'Not in browser' };
  
  const usersData = localStorage.getItem(USERS_KEY);
  if (!usersData) return { success: false, error: 'No users found' };
  
  const users: User[] = JSON.parse(usersData);
  const user = users.find(u => u.email === email && u.password === password);
  
  if (!user) {
    return { success: false, error: 'Invalid email or password' };
  }
  
  // Ensure admin user has admin role
  if (user.email === ADMIN_EMAIL && (!user.role || user.role !== ADMIN_ROLE)) {
    user.role = ADMIN_ROLE;
    localStorage.setItem(USERS_KEY, JSON.stringify(users));
  }
  
  const authState: AuthState = {
    isAuthenticated: true,
    currentUser: user,
  };
  
  localStorage.setItem(AUTH_KEY, JSON.stringify(authState));
  return { success: true, user };
}

export function logout(): void {
  if (typeof window === 'undefined') return;
  localStorage.removeItem(AUTH_KEY);
  
  // Trigger a storage event to notify other components
  window.dispatchEvent(new Event('auth-change'));
}

export function isAuthenticated(): boolean {
  if (typeof window === 'undefined') return false;
  
  const authData = localStorage.getItem(AUTH_KEY);
  if (!authData) return false;
  
  const authState: AuthState = JSON.parse(authData);
  return authState.isAuthenticated;
}

export function getCurrentUser(): User | null {
  if (typeof window === 'undefined') return null;
  
  const authData = localStorage.getItem(AUTH_KEY);
  if (!authData) return null;
  
  const authState: AuthState = JSON.parse(authData);
  return authState.currentUser;
}

export function isAdmin(): boolean {
  const user = getCurrentUser();
  return user?.email === ADMIN_EMAIL || user?.role === ADMIN_ROLE;
}

export function getAllUsers(): User[] {
  if (typeof window === 'undefined') return [];
  
  const usersData = localStorage.getItem(USERS_KEY);
  if (!usersData) return [];
  
  return JSON.parse(usersData);
}

export function createUser(email: string, password: string): { success: boolean; error?: string } {
  if (typeof window === 'undefined') return { success: false, error: 'Not in browser' };
  
  const users = getAllUsers();
  
  if (users.find(u => u.email === email)) {
    return { success: false, error: 'User already exists' };
  }
  
  const newUser: User = {
    id: Date.now().toString(),
    email,
    password,
    role: USER_ROLE,
    createdAt: new Date().toISOString(),
  };
  
  users.push(newUser);
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
  
  return { success: true };
}

export function updateUser(id: string, email: string, password: string): { success: boolean; error?: string } {
  if (typeof window === 'undefined') return { success: false, error: 'Not in browser' };
  
  const users = getAllUsers();
  const userIndex = users.findIndex(u => u.id === id);
  
  if (userIndex === -1) {
    return { success: false, error: 'User not found' };
  }
  
  const emailExists = users.find(u => u.email === email && u.id !== id);
  if (emailExists) {
    return { success: false, error: 'Email already in use' };
  }
  
  users[userIndex] = {
    ...users[userIndex],
    email,
    password,
  };
  
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
  return { success: true };
}

export function deleteUser(id: string): { success: boolean; error?: string } {
  if (typeof window === 'undefined') return { success: false, error: 'Not in browser' };
  
  const users = getAllUsers();
  const user = users.find(u => u.id === id);
  
  if (user?.email === ADMIN_EMAIL) {
    return { success: false, error: 'Cannot delete admin user' };
  }
  
  const filteredUsers = users.filter(u => u.id !== id);
  localStorage.setItem(USERS_KEY, JSON.stringify(filteredUsers));
  
  return { success: true };
}

/**
 * Generate a JWT token for admin user to bypass RLS policies
 * This is used server-side only for system operations
 */
export async function generateAdminToken(): Promise<string> {
  const secret = new TextEncoder().encode(JWT_SECRET);
  
  const token = await new SignJWT({ 
    sub: '1', // Admin user ID
    email: ADMIN_EMAIL,
    role: ADMIN_ROLE
  })
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('1h')
    .sign(secret);
  
  return token;
}

/**
 * Generate a JWT token for a specific user
 * This is used server-side for user-specific operations
 */
export async function generateUserToken(userId: string, email: string, role?: string): Promise<string> {
  const secret = new TextEncoder().encode(JWT_SECRET);
  
  const token = await new SignJWT({ 
    sub: userId,
    email: email,
    role: role || USER_ROLE
  })
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('1h')
    .sign(secret);
  
  return token;
}
