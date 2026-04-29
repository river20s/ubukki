import satori from 'satori';
import { Resvg } from '@resvg/resvg-js';
import { getCategoryLabel, SITE_TITLE, type CategoryId } from '../consts';
import fs from 'fs';
import { createRequire } from 'module';

const require = createRequire(import.meta.url);

// @fontsource/noto-sans-kr 패키지의 woff 파일을 빌드 시 로드
function loadNotoSansKr(): ArrayBuffer {
  const fontPath = require.resolve('@fontsource/noto-sans-kr/files/noto-sans-kr-korean-400-normal.woff');
  const buffer = fs.readFileSync(fontPath);
  return buffer.buffer.slice(buffer.byteOffset, buffer.byteOffset + buffer.byteLength) as ArrayBuffer;
}

export async function generateOgImage(options: {
  title: string;
  category?: CategoryId;
  type?: 'post' | 'site';
}): Promise<Buffer> {
  const { title, category, type = 'post' } = options;
  const categoryLabel = category ? getCategoryLabel(category) : undefined;

  const fonts = [
    { name: 'NotoSansKR', data: loadNotoSansKr(), weight: 400 as const, style: 'normal' as const },
  ];

  const svg = await satori(
    {
      type: 'div',
      props: {
        style: {
          width: '1200px',
          height: '630px',
          display: 'flex',
          alignItems: 'stretch',
          backgroundColor: '#8AA079', // --color-page-bg
          padding: '40px',
          fontFamily: 'NotoSansKR',
        },
        children: [
          {
            type: 'div',
            props: {
              style: {
                flex: 1,
                backgroundColor: '#FBF9F4', // --color-paper-bg
                borderRadius: '6px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                padding: '56px 64px',
              },
              children: [
                // 상단: 카테고리 뱃지 (포스트일 때)
                {
                  type: 'div',
                  props: {
                    style: { display: 'flex', alignItems: 'center', gap: '12px' },
                    children: categoryLabel
                      ? [
                          {
                            type: 'span',
                            props: {
                              style: {
                                fontSize: '14px',
                                backgroundColor: '#DDE5D2',
                                color: '#5F6B53',
                                padding: '4px 12px',
                                borderRadius: '3px',
                              },
                              children: categoryLabel,
                            },
                          },
                        ]
                      : [{ type: 'span', props: { style: { fontSize: '14px', color: '#6B6560' }, children: SITE_TITLE } }],
                  },
                },
                // 중앙: 제목
                {
                  type: 'div',
                  props: {
                    style: {
                      fontSize: title.length > 30 ? '36px' : '44px',
                      fontWeight: '500',
                      color: '#2A2724',
                      lineHeight: 1.4,
                      letterSpacing: '-0.015em',
                    },
                    children: title,
                  },
                },
                // 하단: 사이트명
                {
                  type: 'div',
                  props: {
                    style: {
                      display: 'flex',
                      justifyContent: 'flex-end',
                      fontSize: '16px',
                      color: '#6B6560',
                    },
                    children: 'ubukki.com',
                  },
                },
              ],
            },
          },
        ],
      },
    },
    {
      width: 1200,
      height: 630,
      fonts,
    }
  );

  const resvg = new Resvg(svg, { fitTo: { mode: 'width', value: 1200 } });
  return Buffer.from(resvg.render().asPng());
}
