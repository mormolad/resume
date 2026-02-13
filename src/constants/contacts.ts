export type ContactCard = {
  id: string;
  icon: string;
  title: string;
  value: string;
  href: string;
  hint: string;
  external?: boolean;
};

export const contactCards: ContactCard[] = [
  {
    id: 'telegram',
    icon: '💬',
    title: 'Telegram',
    value: '@mormolad',
    href: 'https://t.me/mormolad',
    hint: 'Основная связь',
    external: true,
  },
  {
    id: 'email',
    icon: '📧',
    title: 'Email',
    value: 'paspean@mail.ru',
    href: 'mailto:paspean@mail.ru',
    hint: 'Личная почта',
  },
  {
    id: 'github',
    icon: '🐙',
    title: 'GitHub',
    value: 'github.com/mormolad',
    href: 'https://github.com/mormolad',
    hint: 'Код и проекты',
    external: true,
  },
];

export const contactTopics = [
  'Участие в разработке и проектах',
  'Фриланс / удалённая работа',
  'Совместные pet‑проекты',
  'Open-source инициативы',
  'Обсуждение технических идей',
];
