import request from '../service';

describe('request', () => {
    // Before each test, stub the fetch function
    beforeEach(() => {
        window.fetch = jest.fn();
    });
    describe('stubbing 204 response', () => {
        // Before each test, pretend we got a successful response
        beforeEach(() => {
            const res = new Response('', {
                status: 204,
                statusText: 'No Content',
            });

            window.fetch.mockReturnValue(Promise.resolve(res));
        });

        it('should return null on 204 response', (done) => {
            request('/thisurliscorrect')
                .catch(done)
                .then((json) => {
                    expect(json).toBeNull();
                    done();
                });
        });
    });
    describe('stubbing error response', () => {
        // Before each test, pretend we got an unsuccessful response
        beforeEach(() => {
            const res = new Response('{ "test": "123" }', {
                status: 404,
                statusText: 'Not Found',
                headers: {
                    'Content-type': 'application/json',
                },
            });

            window.fetch.mockReturnValue(Promise.resolve(res));
        });

        it('should catch errors', (done) => {
            request('/thisurlisincorrect')
                .catch((err) => {
                    expect(err.error.test).toBe('123');
                    done();
                });
        });
    });
    describe('stubbing error response', () => {
        // Before each test, pretend we got an unsuccessful response
        beforeEach(() => {
            const res = new Response('{ "error": "123" }', {
                status: 401,
                statusText: 'Not Found',
                headers: {
                    'Content-type': 'application/json',
                },
            });

            window.fetch.mockReturnValue(Promise.resolve(res));
        });

        xit('should redirect to /login', (done) => {
            window.location.assign = jest.fn();

            request('/thisurlisincorrect')
                .catch(done)
                .then(() => {
                    expect(window.location.assign).toBeCalledWith('/login');
                    done();
                });
        });
    });
});