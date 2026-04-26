import axios from 'axios';
import type { Note } from '@/types/note';

interface NoteResponse {
  notes: Note[];
  totalPages: number;
}

interface NewNote {
  title: string;
  content: string;
  tag: string;
}

const API_TOKEN = process.env.NEXT_PUBLIC_NOTEHUB_TOKEN;


const api = axios.create({
  baseURL: "https://notehub-public.goit.study/api",
  headers: {
    Authorization: `Bearer ${API_TOKEN}`,
  },
});

export const getNotes = async (
  page: number,
  search: string,
  tag: string
): Promise<NoteResponse> => {
  const response = await api.get<NoteResponse>(`/notes`, {
    params: {
      page,
      perPage: 12,
      search,
      tag: tag === 'all' ? undefined : tag,
    },
  });
  return response.data;
};

export const createNote = async (newNote: NewNote) => {
  const response = await api.post<Note>(`/notes`, newNote);
  return response.data;
};

export const deleteNote = async (id: string) => {
  const response = await api.delete<Note>(`/notes/${id}`);
  return response.data;
};

export const fetchNoteById = async (id: string) => {
  const response = await api.get<Note>(`/notes/${id}`);
  return response.data;
};
