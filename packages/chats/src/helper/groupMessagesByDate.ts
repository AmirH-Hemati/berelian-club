interface Message {
  _id: string;
  createdAt: string;
  [key: string]: any;
}

interface MessageGroup<T> {
  date: string;
  messages: T[];
}

export function groupMessagesByDate<T extends Message>(
  messages: T[],
): MessageGroup<T>[] {
  const groups = new Map<string, T[]>();

  for (const message of messages) {
    const date = new Date(message.createdAt).toLocaleDateString("fa-IR");

    const existingGroup = groups.get(date);

    if (existingGroup) {
      existingGroup.push(message);
    } else {
      groups.set(date, [message]);
    }
  }

  return Array.from(groups, ([date, messages]) => ({
    date,
    messages,
  }));
}
