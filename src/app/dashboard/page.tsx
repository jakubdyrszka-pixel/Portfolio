'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Activity,
  ShieldCheck,
  Laptop,
  Trash2,
  LogOut,
  Calendar,
  CheckCircle2,
  AlertTriangle,
  RefreshCw,
  User as UserIcon,
  HardDrive,
  Clock,
  Key,
} from 'lucide-react';

interface Device {
  id: string;
  deviceId: string;
  deviceName: string;
  os: string;
  appVersion: string;
  lastActiveAt: string;
  isActive: boolean;
}

interface License {
  id: string;
  tier: string;
  status: string;
  expiresAt: string;
  gracePeriodDays: number;
  maxDevices: number;
  features: string[];
  signedProof?: string;
}

interface UserProfile {
  id: string;
  email: string;
  name: string | null;
  role: string;
}

export default function DashboardPage() {
  const router = useRouter();
  const [user, setUser] = useState<UserProfile | null>(null);
  const [license, setLicense] = useState<License | null>(null);
  const [devices, setDevices] = useState<Device[]>([]);
  const [loading, setLoading] = useState(true);
  const [revokingId, setRevokingId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const fetchProfileAndDevices = React.useCallback(async (token: string) => {
    try {
      const [meRes, devRes] = await Promise.all([
        fetch('/api/auth/me', { headers: { Authorization: `Bearer ${token}` } }),
        fetch('/api/devices', { headers: { Authorization: `Bearer ${token}` } }),
      ]);

      if (meRes.status === 401 || devRes.status === 401) {
        // Attempt token refresh
        const refreshToken = localStorage.getItem('refreshToken');
        if (!refreshToken) {
          router.push('/login');
          return;
        }

        const refreshRes = await fetch('/api/auth/refresh', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ refreshToken }),
        });

        const refreshData = await refreshRes.json();
        if (refreshRes.ok && refreshData.tokens) {
          localStorage.setItem('accessToken', refreshData.tokens.accessToken);
          localStorage.setItem('refreshToken', refreshData.tokens.refreshToken);
          await fetchProfileAndDevices(refreshData.tokens.accessToken);
          return;
        } else {
          localStorage.clear();
          router.push('/login');
          return;
        }
      }

      const meData = await meRes.json();
      const devData = await devRes.json();

      if (meData.user) setUser(meData.user);
      if (meData.license) setLicense(meData.license);
      if (devData.devices) setDevices(devData.devices.filter((d: Device) => d.isActive));
      setLoading(false);
    } catch {
      setError('Failed to fetch data from cloud portal. Please check your connection.');
      setLoading(false);
    }
  }, [router]);

  useEffect(() => {
    const token = localStorage.getItem('accessToken');
    if (!token) {
      router.push('/login');
      return;
    }
    fetchProfileAndDevices(token);
  }, [router, fetchProfileAndDevices]);

  const handleRevokeDevice = async (id: string, deviceName: string) => {
    if (!confirm(`Are you sure you want to revoke access for "${deviceName}"? The device will be immediately signed out.`)) {
      return;
    }

    setRevokingId(id);
    const token = localStorage.getItem('accessToken');
    try {
      const res = await fetch(`/api/devices?id=${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` },
      });

      if (res.ok) {
        setDevices((prev) => prev.filter((d) => d.id !== id));
      } else {
        alert('Failed to revoke device. Please try again.');
      }
    } catch {
      alert('Network error occurred while revoking device.');
    } finally {
      setRevokingId(null);
    }
  };

  const handleLogout = async () => {
    const token = localStorage.getItem('accessToken');
    const refreshToken = localStorage.getItem('refreshToken');
    if (token && refreshToken) {
      await fetch('/api/auth/logout', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ refreshToken }),
      }).catch(() => {});
    }
    localStorage.clear();
    router.push('/login');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-950 flex flex-col justify-center items-center font-sans text-white">
        <RefreshCw className="w-10 h-10 animate-spin text-emerald-400 mb-4" />
        <p className="text-slate-400 text-sm tracking-wide">Loading practitioner profile & license state...</p>
      </div>
    );
  }

  const daysRemaining = license?.expiresAt
    ? Math.max(0, Math.ceil((new Date(license.expiresAt).getTime() - Date.now()) / (1000 * 60 * 60 * 24)))
    : 0;

  const tierColors: Record<string, { badge: string; border: string; glow: string }> = {
    TRIAL: {
      badge: 'bg-amber-500/20 text-amber-300 border border-amber-500/30',
      border: 'border-amber-500/30',
      glow: 'shadow-amber-500/10',
    },
    STANDARD: {
      badge: 'bg-blue-500/20 text-blue-300 border border-blue-500/30',
      border: 'border-blue-500/30',
      glow: 'shadow-blue-500/10',
    },
    PROFESSIONAL: {
      badge: 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30',
      border: 'border-emerald-500/30',
      glow: 'shadow-emerald-500/10',
    },
    ENTERPRISE: {
      badge: 'bg-purple-500/20 text-purple-300 border border-purple-500/30',
      border: 'border-purple-500/30',
      glow: 'shadow-purple-500/10',
    },
  };

  const currentTierTheme = tierColors[license?.tier || 'TRIAL'] || tierColors.TRIAL;

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans p-6 md:p-10 relative overflow-hidden">
      {/* Ambient background lights */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-emerald-500/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-cyan-500/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Top Navbar */}
        <header className="flex flex-col md:flex-row items-start md:items-center justify-between pb-8 border-b border-slate-800/80 mb-10 gap-4">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-emerald-500 to-cyan-500 flex items-center justify-center text-white shadow-lg shadow-emerald-500/20">
              <Activity className="w-7 h-7" />
            </div>
            <div>
              <h1 className="text-2xl font-extrabold text-white tracking-tight">
                PhysioNotes <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400">Cloud Portal</span>
              </h1>
              <p className="text-slate-400 text-xs mt-0.5 flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" /> Zero-Knowledge Local Clinical Data Guaranteed
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <div className="bg-slate-900/80 border border-slate-800 px-4 py-2 rounded-xl flex items-center space-x-3 text-sm">
              <UserIcon className="w-4 h-4 text-emerald-400" />
              <div>
                <p className="font-semibold text-white leading-tight">{user?.name || 'Practitioner'}</p>
                <p className="text-xs text-slate-400 leading-tight">{user?.email}</p>
              </div>
            </div>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleLogout}
              className="bg-slate-900 hover:bg-red-500/10 border border-slate-800 hover:border-red-500/30 text-slate-300 hover:text-red-400 font-semibold px-4 py-2.5 rounded-xl text-sm flex items-center space-x-2 transition duration-200"
            >
              <LogOut className="w-4 h-4" />
              <span>Sign Out</span>
            </motion.button>
          </div>
        </header>

        {error && (
          <div className="bg-red-500/10 border border-red-500/30 text-red-400 p-4 rounded-2xl mb-8 flex items-center space-x-3">
            <AlertTriangle className="w-5 h-5 flex-shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {/* Dashboard Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Column 1 & 2: Active License details */}
          <div className="lg:col-span-2 space-y-8">
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              className={`bg-slate-900/70 backdrop-blur-xl border ${currentTierTheme.border} rounded-3xl p-8 shadow-2xl ${currentTierTheme.glow} relative overflow-hidden`}
            >
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-slate-800/80">
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Subscription Status</span>
                  <div className="flex items-center space-x-3 mt-1">
                    <h2 className="text-3xl font-black text-white tracking-tight">{license?.tier || 'NO LICENSE'}</h2>
                    <span className={`px-3 py-1 rounded-full text-xs font-bold tracking-wide uppercase ${currentTierTheme.badge}`}>
                      {license?.status || 'INACTIVE'}
                    </span>
                  </div>
                </div>

                <div className="bg-slate-950/60 border border-slate-800 px-5 py-3 rounded-2xl text-right">
                  <span className="text-xs text-slate-400 block">Days Remaining</span>
                  <span className="text-2xl font-black text-emerald-400">{daysRemaining}</span>
                </div>
              </div>

              {/* Expiration and Grace Period info */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 my-6">
                <div className="bg-slate-950/40 border border-slate-800/80 rounded-2xl p-4 flex items-center space-x-3">
                  <Calendar className="w-5 h-5 text-emerald-400" />
                  <div>
                    <span className="text-xs text-slate-400 block">Expiration Date</span>
                    <span className="text-sm font-semibold text-white">
                      {license?.expiresAt ? new Date(license.expiresAt).toLocaleDateString() : 'N/A'}
                    </span>
                  </div>
                </div>

                <div className="bg-slate-950/40 border border-slate-800/80 rounded-2xl p-4 flex items-center space-x-3">
                  <Clock className="w-5 h-5 text-cyan-400" />
                  <div>
                    <span className="text-xs text-slate-400 block">Offline Grace Period</span>
                    <span className="text-sm font-semibold text-white">{license?.gracePeriodDays ?? 30} Days</span>
                  </div>
                </div>

                <div className="bg-slate-950/40 border border-slate-800/80 rounded-2xl p-4 flex items-center space-x-3">
                  <Laptop className="w-5 h-5 text-purple-400" />
                  <div>
                    <span className="text-xs text-slate-400 block">Device Concurrency</span>
                    <span className="text-sm font-semibold text-white">
                      {devices.length} / {license?.maxDevices ?? 3} Active
                    </span>
                  </div>
                </div>
              </div>

              {/* Features Checklist */}
              <div>
                <h3 className="text-sm font-bold uppercase tracking-wider text-slate-300 mb-4 flex items-center gap-2">
                  <Key className="w-4 h-4 text-emerald-400" /> Included License Features
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {license?.features.map((feat) => (
                    <div
                      key={feat}
                      className="bg-slate-950/40 border border-slate-800/60 rounded-xl px-4 py-3 flex items-center space-x-3 text-sm text-slate-300"
                    >
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                      <span className="capitalize">{feat.replace(/_/g, ' ')}</span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>

          {/* Column 3: Active Device Management */}
          <div className="space-y-8">
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-slate-900/70 backdrop-blur-xl border border-slate-800/80 rounded-3xl p-6 shadow-2xl"
            >
              <div className="flex items-center justify-between pb-4 border-b border-slate-800/80 mb-6">
                <div>
                  <h3 className="font-bold text-white text-lg flex items-center gap-2">
                    <HardDrive className="w-5 h-5 text-cyan-400" /> Active Devices
                  </h3>
                  <p className="text-xs text-slate-400 mt-0.5">
                    {devices.length} of {license?.maxDevices || 3} device slots in use
                  </p>
                </div>
              </div>

              {devices.length === 0 ? (
                <div className="text-center py-10 text-slate-500 text-sm">
                  No hardware devices currently registered under this license.
                </div>
              ) : (
                <div className="space-y-4">
                  <AnimatePresence>
                    {devices.map((device) => (
                      <motion.div
                        key={device.id}
                        layout
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        className="bg-slate-950/60 border border-slate-800/90 rounded-2xl p-4 flex flex-col space-y-3 hover:border-slate-700 transition duration-200"
                      >
                        <div className="flex items-start justify-between">
                          <div className="flex items-center space-x-3">
                            <div className="w-10 h-10 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-300">
                              <Laptop className="w-5 h-5 text-emerald-400" />
                            </div>
                            <div>
                              <p className="font-bold text-white text-sm leading-tight">{device.deviceName}</p>
                              <p className="text-xs text-slate-400 leading-tight mt-0.5">{device.os}</p>
                            </div>
                          </div>
                          <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 uppercase tracking-wider">
                            v{device.appVersion}
                          </span>
                        </div>

                        <div className="flex items-center justify-between pt-2 border-t border-slate-900 text-xs text-slate-400">
                          <span>Last active: {new Date(device.lastActiveAt).toLocaleDateString()}</span>
                          <button
                            onClick={() => handleRevokeDevice(device.id, device.deviceName)}
                            disabled={revokingId === device.id}
                            className="text-red-400 hover:text-red-300 font-semibold flex items-center space-x-1.5 transition disabled:opacity-50"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                            <span>{revokingId === device.id ? 'Revoking...' : 'Revoke'}</span>
                          </button>
                        </div>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>
              )}

              <div className="mt-6 pt-4 border-t border-slate-800/80 text-xs text-slate-400 leading-relaxed">
                <p>
                  Revoking a device will instantly invalidate its refresh token and require the physiotherapist to re-authenticate when they next open the desktop application online.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
