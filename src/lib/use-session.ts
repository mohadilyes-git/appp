import type { Session } from '@supabase/supabase-js';
import { useEffect, useState } from 'react';

import { supabase } from './supabase';

// the logged in user, for any screen that needs to show something about them
export function useSession() {
  const [session, setSession] = useState<Session | null>(null);

  useEffect(() => {
    supabase.auth
      .getSession()
      .then(({ data }) => setSession(data.session))
      .catch(() => {});

    const { data: sub } = supabase.auth.onAuthStateChange((_event, next) => {
      setSession(next);
    });
    return () => sub.subscription.unsubscribe();
  }, []);

  return session;
}

// "Adam Carter" -> AC, "Adam" -> A
export function initialsOf(name: string) {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  if (parts.length === 0) return '?';
  if (parts.length === 1) return parts[0].charAt(0).toUpperCase();
  return (parts[0].charAt(0) + parts[parts.length - 1].charAt(0)).toUpperCase();
}

// people who signed up before we asked for a name still need something to show
export function displayNameOf(session: Session | null) {
  const name = session?.user?.user_metadata?.name;
  if (typeof name === 'string' && name.trim()) return name.trim();

  const email = session?.user?.email;
  if (email) return email.split('@')[0];

  return 'there';
}
