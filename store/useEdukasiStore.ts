import { create } from 'zustand';

export type ContentType = 'Semua' | 'Artikel' | 'Video' | 'Infografis' | 'Kuis';
export type SortOption = 'Terbaru' | 'Terpopuler' | 'A-Z';

interface EdukasiState {
  searchQuery: string;
  activeCategory: string;
  contentTypes: ContentType[];
  sortOption: SortOption;
  setSearchQuery: (query: string) => void;
  setActiveCategory: (category: string) => void;
  toggleContentType: (type: ContentType) => void;
  setSortOption: (option: SortOption) => void;
}

export const useEdukasiStore = create<EdukasiState>((set) => ({
  searchQuery: '',
  activeCategory: 'Semua',
  contentTypes: ['Semua'],
  sortOption: 'Terbaru',
  
  setSearchQuery: (query) => set({ searchQuery: query }),
  
  setActiveCategory: (category) => set({ activeCategory: category }),
  
  toggleContentType: (type) => set((state) => {
    // If 'Semua' is clicked, reset to just 'Semua'
    if (type === 'Semua') return { contentTypes: ['Semua'] };
    
    // If a specific type is clicked, remove 'Semua' if it exists
    let newTypes: ContentType[] = state.contentTypes.filter((t) => t !== 'Semua');
    
    if (newTypes.includes(type)) {
      // Remove it if already selected
      newTypes = newTypes.filter((t) => t !== type);
    } else {
      // Add it
      newTypes = [...newTypes, type];
    }
    
    // If nothing is selected after toggle, fallback to 'Semua'
    if (newTypes.length === 0) {
      newTypes = ['Semua'];
    }
    
    return { contentTypes: newTypes };
  }),
  
  setSortOption: (option) => set({ sortOption: option }),
}));
