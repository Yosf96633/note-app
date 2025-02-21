import { create } from "zustand";
import axios from "axios";
interface Notes {
  _id: string;
  userId: string;
  title: string;
  content: string;
  createdAt: string;
}
interface useNotesInterface {
  notes: Notes[];
  loading: boolean;
  resetLoading: () => void;
  error: string;
  addData: (
    data: {
      title: string;
      content: string;
    },
    id: string
  ) => Promise<void>;
  getData: (id: string) => Promise<void>;
  deleteNote : (id : string) => void;
}
export const useNotes = create<useNotesInterface>((set) => ({
  notes: [] ,
  loading: true,
  error: ``,
  resetLoading() {
    set(() => ({
      loading: false,
    }));
  },
  async addData(data, id) {
    const response = await axios.post(`/api/add-data/${id}`, data);
    if(response.data?.success){
        const { _id , title , content , userId , createdAt } = response.data.note;
        set((state)=>({
            notes : [...state.notes , {_id , title , content , userId , createdAt}],
        }))
    }
    set(()=>({
      loading : false,
    }))
  },
  async getData(id) {
    const response = await axios.get(`/api/get-data/${id}`);
    if (response.data?.success) {
      set(() => ({
        notes: response.data?.notes,
      }));
    }
    set(()=>({
      loading : false,
    }))
  },
   deleteNote(id) {
      set((state)=>({
         notes : state.notes.filter((note)=>note._id!==id),
      }))
   },
}));
