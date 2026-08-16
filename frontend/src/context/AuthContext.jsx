import React, { createContext, useContext, useState, useEffect } from 'react';
import { fetchApi } from '../utils/api';

const DEFAULT_CITIZEN = {
  id: 'usr_citizen_1',
  name: 'Pranjal Sharma',
  email: 'pranjal@citizen.gov.in',
  role: 'CITIZEN',
  phone: '+91 98765 43210',
  avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
  wardId: 'ward_62',
  address: 'Sector 62, Noida, Uttar Pradesh'
};

const DEFAULT_AUTHORITY = {
  id: 'usr_authority_road',
  name: 'Rajesh Kumar',
  email: 'rajesh.kumar@city.gov',
  role: 'AUTHORITY',
  departmentId: 'road_maintenance',
  title: 'Senior Executive Engineer (Roads)',
  phone: '+91 120 245 8890',
  avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
  wardId: 'ward_62'
};

const DEFAULT_ADMIN = {
  id: 'usr_admin',
  name: 'Dr. S. K. Sharma',
  email: 'admin@city.gov',
  role: 'ADMIN',
  title: 'Chief Municipal Commissioner',
  phone: '+91 120 250 0001',
  avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80'
};

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('civic_user');
    return saved ? JSON.parse(saved) : DEFAULT_CITIZEN;
  });
  const [token, setToken] = useState(() => localStorage.getItem('civic_token') || 'demo_token');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user) {
      localStorage.setItem('civic_user', JSON.stringify(user));
      localStorage.setItem('civic_user_id', user.id);
    } else {
      localStorage.removeItem('civic_user');
      localStorage.removeItem('civic_user_id');
    }
  }, [user]);

  const login = async (email, password) => {
    setLoading(true);
    try {
      const res = await fetchApi('/auth/login', {
        method: 'POST',
        body: JSON.stringify({ email, password }),
      });
      setUser(res.user);
      setToken(res.token);
      localStorage.setItem('civic_token', res.token);
      return res.user;
    } catch (err) {
      console.warn('API login failed, falling back to local demo switch:', err);
      let targetUser = DEFAULT_CITIZEN;
      if (email.includes('admin')) targetUser = DEFAULT_ADMIN;
      else if (email.includes('city.gov') || email.includes('authority') || email.includes('road')) targetUser = DEFAULT_AUTHORITY;
      setUser(targetUser);
      return targetUser;
    } finally {
      setLoading(false);
    }
  };

  const register = async (userData) => {
    setLoading(true);
    try {
      const res = await fetchApi('/auth/register', {
        method: 'POST',
        body: JSON.stringify(userData),
      });
      setUser(res.user);
      setToken(res.token);
      return res.user;
    } catch (err) {
      console.warn('API register fallback:', err);
      const newUser = {
        id: `usr_${Date.now()}`,
        name: userData.name,
        email: userData.email,
        role: userData.role || 'CITIZEN',
        avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80'
      };
      setUser(newUser);
      return newUser;
    } finally {
      setLoading(false);
    }
  };

  const switchRole = (role) => {
    let target = DEFAULT_CITIZEN;
    if (role === 'AUTHORITY') target = DEFAULT_AUTHORITY;
    else if (role === 'ADMIN') target = DEFAULT_ADMIN;
    setUser(target);
    localStorage.setItem('civic_user', JSON.stringify(target));
    localStorage.setItem('civic_user_id', target.id);
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem('civic_user');
    localStorage.removeItem('civic_token');
    localStorage.removeItem('civic_user_id');
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        loading,
        login,
        register,
        logout,
        switchRole,
        isCitizen: user?.role === 'CITIZEN',
        isAuthority: user?.role === 'AUTHORITY',
        isAdmin: user?.role === 'ADMIN',
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
