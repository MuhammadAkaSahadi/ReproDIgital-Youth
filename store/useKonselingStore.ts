import { create } from 'zustand';

interface KonselingState {
  activeSessionId: string | null;
  setActiveSession: (id: string | null) => void;
}

export const useKonselingStore = create<KonselingState>((set) => ({
  activeSessionId: null,
  setActiveSession: (id) => set({ activeSessionId: id }),
}));
