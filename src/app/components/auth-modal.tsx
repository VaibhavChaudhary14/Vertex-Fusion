'use client';

import { useState } from 'react';
<<<<<<< HEAD
import { useRouter } from 'next/navigation';
import { Loader2 } from 'lucide-react';

type AuthModalProps = {
  open: boolean;
  onClose?: () => void;
};

export default function AuthModal({ open, onClose }: AuthModalProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  if (!open) return null;

  const handleAccess = async () => {
    setLoading(true);
    // In our new SaaS flow, we send user to NextAuth pages instead of Firebase
    router.push('/sign-in');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm">
      <div className="w-full max-w-md rounded-2xl border border-white/10 bg-[#050b14] p-6 shadow-xl">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-white font-mono">
            ACCESS SECURE TERMINAL
          </h2>
          {onClose && (
            <button
              onClick={onClose}
              className="text-xs text-slate-400 hover:text-slate-200"
            >
              CLOSE
            </button>
          )}
        </div>

        <p className="text-xs text-slate-400 mb-6 font-mono">
          Authenticate to enter the Vertex Fusion Mission Control.  
          You will be redirected to the secure sign-in page.
        </p>

        <button
          onClick={handleAccess}
          disabled={loading}
          className="w-full flex items-center justify-center gap-2 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-black font-mono text-xs py-2.5 transition disabled:opacity-60"
        >
          {loading && <Loader2 className="h-4 w-4 animate-spin" />}
          {loading ? 'Routing to sign-in…' : 'PROCEED TO SIGN-IN'}
        </button>
      </div>
    </div>
  );
}
=======
import { auth } from '@/lib/firebase';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';
import { useRouter } from 'next/navigation';
import { Loader2 } from 'lucide-react';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function AuthModal({ isOpen, onClose }: AuthModalProps) {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();

  if (!isOpen) return null;

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      if (isLogin) {
        await signInWithEmailAndPassword(auth, email, password);
      } else {
        await createUserWithEmailAndPassword(auth, email, password);
      }
      // Simulate system boot sequence
      setTimeout(() => {
        onClose();
        router.push('/dashboard');
      }, 1000);
    } catch (err: any) {
      setError(err.message.replace('Firebase:', '').replace('auth/', ''));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm">
      <div className="glass-panel w-full max-w-md p-8 relative border-t-2 border-neon-cyan">
        {/* Holographic Corners */}
        <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-neon-cyan" />
        <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-neon-pink" />

        <h2 className="text-3xl font-bold text-center mb-6 font-mono tracking-widest text-neon-cyan">
          {isLogin ? 'SYSTEM ACCESS' : 'NEW OPERATOR'}
        </h2>

        {error && (
          <div className="bg-red-500/20 border border-red-500 text-red-200 p-3 mb-4 text-xs font-mono">
            ⚠ ERROR: {error.toUpperCase()}
          </div>
        )}

        <form onSubmit={handleAuth} className="space-y-6">
          <div>
            <label className="block text-xs text-neon-blue mb-1 font-mono">IDENTIFIER (EMAIL)</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-black/50 border border-slate-700 p-3 text-white focus:border-neon-cyan focus:outline-none transition-colors font-mono"
              placeholder="operator@vertex.grid"
              required
            />
          </div>
          <div>
            <label className="block text-xs text-neon-blue mb-1 font-mono">ACCESS KEY (PASSWORD)</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-black/50 border border-slate-700 p-3 text-white focus:border-neon-cyan focus:outline-none transition-colors font-mono"
              placeholder="••••••••"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-neon-cyan/10 border border-neon-cyan text-neon-cyan py-3 hover:bg-neon-cyan hover:text-black transition-all font-bold tracking-widest flex justify-center items-center gap-2"
          >
            {loading ? <Loader2 className="animate-spin" /> : (isLogin ? 'INITIALIZE LINK' : 'REGISTER UNIT')}
          </button>
        </form>

        <div className="mt-6 text-center text-xs font-mono text-slate-400">
          {isLogin ? "NO CREDENTIALS FOUND? " : "ALREADY REGISTERED? "}
          <button
            onClick={() => setIsLogin(!isLogin)}
            className="text-neon-pink hover:underline"
          >
            {isLogin ? "REQUEST CLEARANCE" : "ACCESS TERMINAL"}
          </button>
        </div>
      </div>
    </div>
  );
}
>>>>>>> 1c5187f46b2fcb733c4dd32ea6296f1881a706fd
