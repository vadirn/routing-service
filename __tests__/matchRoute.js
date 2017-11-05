import { matchRoute } from '../index';

describe('matchRoute', () => {
  it('returns params and query if path matches route', () => {
    const route = '/a/:b/c';
    const location = { pathname: '/a/b/c', search: '?d=d&e' };
    const data = matchRoute(route, location);
    expect(data).toEqual({ params: { b: 'b' }, query: { d: 'd', e: 'e' } });
  });
  it('returns null if path doesn\'t match route', () => {
    const route = '/a/b/c';
    const location = { pathname: '/b/a/c', search: '' };
    const data = matchRoute(route, location);
    expect(data).toEqual(null);
  });
});
