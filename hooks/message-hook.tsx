import { create } from "zustand";

interface useMessageStore {
  message: [string, string][];
  addMessage: (from: string, newMessage: string) => void;
}

export const useMessage = create<useMessageStore>((set) => ({
  message: [
    ["user", "const [messages, setMessages] = useState<[string, string][]>(["],
    [
      "gemini",
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
    ],
    ["user", "const [messages, setMessages] = useState<[string, string][]>(["],
    [
      "gemini",
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
    ],
  ],
  addMessage: (from: string, newMessage: string) =>
    set((state) => ({
      ...state,
      message: [...state.message, [from, newMessage]],
    })),
}));
