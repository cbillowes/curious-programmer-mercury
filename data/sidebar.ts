import { getScribbleYears } from '@/lib/scribbles';

export const sidebarItems = [
  { to: '/', name: 'Home' },
  { to: '/resume', name: 'Resume' },
  {
    name: 'Blog',
    items: [
      { to: '/blog', name: 'All' },
      ...new Array(new Date().getFullYear() + 1 - 2015)
        .fill(0)
        .map((_, i) => ({ to: `/blog/${2015 + i}`, name: 2015 + i }))
        .sort((a, b) => b.name - a.name)
        .map((item) => ({ ...item, name: item.name.toString() })),
    ],
  },
  {
    name: 'Scribbles',
    items: [
      { to: '/scribbles', name: 'All' },
      ...getScribbleYears().map((year) => ({
        to: `/scribbles/${year}`,
        name: year.toString(),
      })),
    ],
  },
  { to: '/courses', name: 'Courses' },
  { to: '/tags', name: 'Tags' },
  {
    name: 'Connect with me',
    items: [
      { to: 'https://www.linkedin.com/in/cbouwer/', name: 'LinkedIn' },
      { to: 'https://github.com/cbillowes', name: 'GitHub' },
    ],
  },
  {
    name: 'Legalities',
    items: [
      { to: '/privacy', name: 'Privacy' },
      { to: '/community', name: 'Community guidelines' },
    ],
  },
];

export function getGroup(path: string) {
  return sidebarItems.filter(
    (item) =>
      item.items &&
      item.items.length > 0 &&
      item.items.some((subItem) => path.startsWith(subItem.to)),
  )?.[0];
}
