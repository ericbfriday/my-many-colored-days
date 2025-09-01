import { create } from "zustand";

// Define the total number of pages/scenes in the experience.
// We have 13 distinct scenes (Intro, Red, Blue, Brown, Yellow, Gray, Orange, Green, Purple, Pink, Black, Mixed-Up, Finale).
const TOTAL_PAGES = 13;

export const usePageStore = create((set) => ({
  // The currentPage is a zero-based index. We start at the first page (index 0).
  currentPage: 0,

  /**
   * Navigates to the next page.
   * If the current page is the last page, it loops back to the beginning.
   */
  nextPage: () =>
    set((state) => ({
      currentPage: (state.currentPage + 1) % TOTAL_PAGES,
    })),

  /**
   * Navigates to the previous page.
   * If the current page is the first page, it loops around to the end.
   */
  previousPage: () =>
    set((state) => ({
      currentPage: (state.currentPage - 1 + TOTAL_PAGES) % TOTAL_PAGES,
    })),

  /**
   * Jumps to a specific page index.
   * @param {number} pageIndex - The index of the page to navigate to.
   */
  goToPage: (pageIndex) =>
    set(() => {
      if (pageIndex >= 0 && pageIndex < TOTAL_PAGES) {
        return { currentPage: pageIndex };
      }
      // If the index is out of bounds, do not change the state.
      return {};
    }),
}));
