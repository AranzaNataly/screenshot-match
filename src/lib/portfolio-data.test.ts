import { describe, expect, it } from 'vitest';
import { deliveryLink, type Delivery } from './portfolio-data';

describe('Permissão de links das entregas', () => {
  const item: Delivery = { number: '01', title: 'Capa do Meu Álbum', date: '[PREENCHER]', learning: '[PREENCHER]', status: 'Em breve', art: 'album', url: 'https://github.com/AranzaNataly/portfolio' };
  it('não cria link para uma entrega Em breve', () => {
    expect(deliveryLink(item)).toBeUndefined();
  });
  it('permite abrir a pasta de uma entrega Concluída', () => {
    expect(deliveryLink({ ...item, status: 'Concluída' })).toBe('https://github.com/AranzaNataly/portfolio');
  });
});