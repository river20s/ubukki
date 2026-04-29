export const SITE_TITLE = 'ubukki';
export const SITE_URL = 'https://ubukki.com';
export const SITE_DESCRIPTION =
  '만드는 사람 강은빈(ubukki)의 블로그. 생활과 밀접한 앱을 기획하고 개발하며 마주친 것들을 기록합니다.';
export const SITE_AUTHOR = '강은빈';
export const SITE_MOTTO = '천천히, 그러나 멀리';

export const CATEGORIES = [
  { id: 'retrospective', label: '회고' },
  { id: 'cs-notes',      label: 'CS노트' },
  { id: 'projects',      label: '프로젝트' },
  { id: 'thoughts',      label: '생각' },
  { id: 'tutorials',     label: '튜토리얼' },
] as const;

export type CategoryId = typeof CATEGORIES[number]['id'];

export function getCategoryLabel(id: CategoryId): string {
  return CATEGORIES.find(c => c.id === id)?.label ?? id;
}
