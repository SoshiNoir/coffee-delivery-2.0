export type CoffeeTag = 'tradicional' | 'especial' | 'com leite' | 'alcoólico' | 'gelado';

export type Coffee = {
  id: number;
  tags: CoffeeTag[];
  name: string;
  description: string;
  photo: string;
  priceCents: number;
};

export const coffees: Coffee[] = [
  {
    id: 1,
    tags: ['tradicional'],
    name: 'Expresso Tradicional',
    description: 'O tradicional café feito com água quente e grãos moídos',
    photo: 'tradicional.svg',
    priceCents: 990,
  },
  {
    id: 2,
    tags: ['tradicional'],
    name: 'Expresso Americano',
    description: 'Expresso diluído, menos intenso que o tradicional',
    photo: 'americano.svg',
    priceCents: 990,
  },
  {
    id: 3,
    tags: ['tradicional', 'gelado'],
    name: 'Expresso Cremoso',
    description: 'Café expresso tradicional com espuma cremosa',
    photo: 'cremoso.svg',
    priceCents: 990,
  },
  {
    id: 4,
    tags: ['tradicional', 'gelado'],
    name: 'Expresso Gelado',
    description: 'Bebida preparada com café expresso e cubos de gelo',
    photo: 'gelado.svg',
    priceCents: 990,
  },
  {
    id: 5,
    tags: ['tradicional', 'com leite'],
    name: 'Café com Leite',
    description: 'Meio a meio de expresso tradicional com leite vaporizado',
    photo: 'leite.svg',
    priceCents: 990,
  },
  {
    id: 6,
    tags: ['tradicional', 'com leite'],
    name: 'Latte',
    description: 'Uma dose de café expresso com o dobro de leite e espuma cremosa',
    photo: 'latte.svg',
    priceCents: 990,
  },
  {
    id: 7,
    tags: ['tradicional', 'com leite'],
    name: 'Capuccino',
    description: 'Bebida com canela feita de doses iguais de café, leite e espuma',
    photo: 'capuccino.svg',
    priceCents: 990,
  },
  {
    id: 8,
    tags: ['tradicional', 'com leite'],
    name: 'Macchiato',
    description: 'Café expresso misturado com um pouco de leite quente e espuma',
    photo: 'macchiato.svg',
    priceCents: 990,
  },
  {
    id: 9,
    tags: ['tradicional', 'com leite'],
    name: 'Mocaccino',
    description: 'Café expresso com calda de chocolate, pouco leite e espuma',
    photo: 'mocaccino.svg',
    priceCents: 990,
  },
  {
    id: 10,
    tags: ['especial', 'com leite'],
    name: 'Chocolate Quente',
    description: 'Bebida feita com chocolate dissolvido no leite quente e café',
    photo: 'chocolate.svg',
    priceCents: 990,
  },
  {
    id: 11,
    tags: ['especial', 'alcoólico', 'gelado'],
    name: 'Cubano',
    description: 'Drink gelado de café expresso com rum, creme de leite e hortelã',
    photo: 'cubano.svg',
    priceCents: 990,
  },
  {
    id: 12,
    tags: ['especial'],
    name: 'Havaiano',
    description: 'Bebida adocicada preparada com café e leite de coco',
    photo: 'havaiano.svg',
    priceCents: 990,
  },
  {
    id: 13,
    tags: ['especial'],
    name: 'Árabe',
    description: 'Bebida preparada com grãos de café árabe e especiarias',
    photo: 'arabe.svg',
    priceCents: 990,
  },
  {
    id: 14,
    tags: ['especial', 'alcoólico'],
    name: 'Irlandês',
    description: 'Bebida à base de café, uísque irlandês, açúcar e chantilly',
    photo: 'irlandes.svg',
    priceCents: 990,
  },
];

export function coffeeImageSrc(photo: string) {
  return `/coffees/${photo}`;
}
