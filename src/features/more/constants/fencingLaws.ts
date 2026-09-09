import type { FencingLawFilter, FencingLawSection } from '../types';

export const FENCING_LAW_FILTERS: FencingLawFilter[] = [
  'all',
  'basics',
  'weapons',
  'match',
  'refereeing',
];

export const DUMMY_FENCING_LAW_SECTIONS: FencingLawSection[] = [
  {
    id: 'basics',
    titleKey: 'more.fencingLaws.sections.basics.title',
    articles: [
      {
        kind: 'explanation',
        id: 'howMatchStarts',
        titleKey: 'more.fencingLaws.sections.basics.articles.howMatchStarts.title',
        bodyKey: 'more.fencingLaws.sections.basics.articles.howMatchStarts.body',
      },
    ],
  },
  {
    id: 'weapons',
    titleKey: 'more.fencingLaws.sections.weapons.title',
    articles: [
      {
        kind: 'explanation',
        id: 'foil',
        titleKey: 'more.fencingLaws.sections.weapons.articles.foil.title',
        bodyKey: 'more.fencingLaws.sections.weapons.articles.foil.body',
      },
      {
        kind: 'explanation',
        id: 'epee',
        titleKey: 'more.fencingLaws.sections.weapons.articles.epee.title',
        bodyKey: 'more.fencingLaws.sections.weapons.articles.epee.body',
      },
      {
        kind: 'explanation',
        id: 'sabre',
        titleKey: 'more.fencingLaws.sections.weapons.articles.sabre.title',
        bodyKey: 'more.fencingLaws.sections.weapons.articles.sabre.body',
      },
    ],
  },
  {
    id: 'match',
    titleKey: 'more.fencingLaws.sections.match.title',
    articles: [
      {
        kind: 'penalties',
        id: 'cards',
        items: [
          {
            titleKey: 'more.fencingLaws.sections.match.penalties.yellow.title',
            bodyKey: 'more.fencingLaws.sections.match.penalties.yellow.body',
          },
          {
            titleKey: 'more.fencingLaws.sections.match.penalties.red.title',
            bodyKey: 'more.fencingLaws.sections.match.penalties.red.body',
          },
          {
            titleKey: 'more.fencingLaws.sections.match.penalties.black.title',
            bodyKey: 'more.fencingLaws.sections.match.penalties.black.body',
          },
        ],
      },
    ],
  },
  {
    id: 'refereeing',
    titleKey: 'more.fencingLaws.sections.refereeing.title',
    articles: [
      {
        kind: 'bullets',
        id: 'refereePowers',
        titleKey: 'more.fencingLaws.sections.refereeing.articles.refereePowers.title',
        bulletKeys: [
          'more.fencingLaws.sections.refereeing.articles.refereePowers.bullets.startStop',
          'more.fencingLaws.sections.refereeing.articles.refereePowers.bullets.scoreTouches',
          'more.fencingLaws.sections.refereeing.articles.refereePowers.bullets.warnings',
          'more.fencingLaws.sections.refereeing.articles.refereePowers.bullets.video',
          'more.fencingLaws.sections.refereeing.articles.refereePowers.bullets.announce',
        ],
      },
    ],
  },
];
