import routingService from '../index';

describe('routingService', () => {
  it('onLocationChange calls relevant onVisit callback with path and query params', () => {
    let page = null;
    let pageData = null;
    routingService.clearRoutes();
    routingService.add('index', '/', data => {
      page = 'index';
      pageData = data;
    });
    routingService.onLocationChange({ pathname: '/', search: '' });
    expect(page).toEqual('index');
    expect(pageData).toEqual({ params: {}, query: {} });
    routingService.addFallback(() => {
      page = '404';
      pageData = null;
    });
    routingService.onLocationChange({ pathname: '/404', search: '' });
    expect(page).toEqual('404');
    expect(pageData).toEqual(null);
    routingService.add('exampleWithParams', '/example/:example', data => {
      page = 'example';
      pageData = data;
    });
    routingService.onLocationChange({ pathname: '/example/test', search: '' });
    expect(page).toEqual('example');
    expect(pageData).toEqual({ params: { example: 'test' }, query: {} });
  });
  it('returns composed url', () => {
    routingService.clearRoutes();
    routingService.add('index', '/', () => {}).add('test', '/test/:test/:a/b', () => {});
    expect(routingService.composeURL('index')).toEqual('/');
    expect(routingService.composeURL('index', { query: { a: 'a', b: 'b' } })).toEqual('/?a=a&b=b');
    expect(routingService.composeURL('test')).toEqual('/test///b');
    expect(routingService.composeURL('test', { params: { test: '1', a: '2' } })).toEqual('/test/1/2/b');
    expect(routingService.composeURL('test', { params: { test: '1', a: '2' }, query: { a: 'a', b: 'b' } })).toEqual(
      '/test/1/2/b?a=a&b=b'
    );
  });
});
