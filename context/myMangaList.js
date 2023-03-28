import create from "zustand";
import { persist, devtools } from "zustand/middleware";

export const useMyMangaStore = create(
  devtools(
    persist(
      (set, get) => ({
        myMangaLists: [],
        addNewManga: (myBok) =>
          set((state) => ({ myMangaLists: [myBok, ...state.myMangaLists] })),
        removeManga: (myBok) =>
          set((state) => ({
            myMangaLists: state.myMangaLists.filter(
              (item) => item.slug !== myBok
            ),
          })),

        addReading: (id, read) =>
          set((state) => ({
            myMangaLists: state.myMangaLists.map((e) => {
              if (e.id === id) {
                return { ...e, reading: read };
              }
              return { ...e };
            }),
          })),
      }),
      {
        name: "myManga",
      }
    )
  )
);

export const useOrder = create((set) => ({
  orders:"0",
  orderValue:(value)=>set(({orders:value}))
})
);
