export default {
    '/session/:sessionId/sauce/ondemand/log': {
        POST: {
            command: 'getPageLogs',
            description:
                'Get webpage specific log information based on the last page load.',
            ref: 'https://docs.saucelabs.com/insights/debug/#network-logs',
            examples: [
                [
                    '// Get Network Logs',
                    "console.log(browser.getPageLogs('sauce:network'));",
                    '/**',
                    ' * outputs:',
                    ' * [{',
                    ' *   "url": "https://app.saucelabs.com/dashboard",',
                    ' *   "statusCode": 200,',
                    ' *   "method": "GET",',
                    ' *   "requestHeaders": {',
                    ' *     ...',
                    ' *   },',
                    ' *   "responseHeaders": {',
                    ' *     ...',
                    ' *   },',
                    ' *   "timing": {',
                    ' *     ...',
                    ' *   }',
                    ' * }, {,',
                    ' *   ...',
                    ' * }]',
                    ' */',
                ],
                [
                    '// Get Performance Logs (needs capturePerformance capability see: https://docs.saucelabs.com/performance/transitions/#setting-performance-capabilities',
                    "console.log(browser.getPageLogs('sauce:performance'));",
                    '/**',
                    ' * outputs:',
                    ' * {',
                    ' *   "speedIndex": 1472.023,',
                    ' *   "timeToFirstInteractive": 1243.214,',
                    ' *   "firstMeaningfulPaint": 892.643,',
                    ' *   ...',
                    ' * }',
                    ' */',
                ],
            ],
            parameters: [
                {
                    name: 'type',
                    type: 'string',
                    description:
                        "log type (e.g. sauce:network', 'sauce:performance')",
                    required: true,
                },
            ],
            returns: {
                type: 'object',
                name: 'log',
                description: 'log output of desired type (see example)',
            },
        },
    },
    '/session/:sessionId/sauce/ondemand/throttle/network': {
        POST: {
            command: 'sauceThrottleNetwork',
            description:
                'With network conditioning you can test your site on a variety of network connections, including Edge, 3G, and even offline. You can throttle the data throughput, including the maximum download and upload throughput, and use latency manipulation to enforce a minimum delay in connection round-trip time (RTT).',
            ref: 'https://docs.saucelabs.com/insights/debug/#saucethrottlenetwork',
            examples: [
                [
                    '// predefined network condition',
                    "browser.sauceThrottleNetwork('offline')",
                ],
                [
                    '// custom network condition',
                    'browser.sauceThrottleNetwork({',
                    '  download: 1000,',
                    '  upload: 500,',
                    "  latency: 40'",
                    '})',
                ],
            ],
            parameters: [
                {
                    name: 'condition',
                    type: '(string|object)',
                    description:
                        "network condition to set (e.g. 'online', 'offline', 'GPRS', 'Regular 2G', 'Good 2G', 'Regular 3G', 'Good 3G', 'Regular 4G', 'DSL', 'Wifi')",
                    required: true,
                },
            ],
        },
    },
    '/session/:sessionId/sauce/ondemand/throttle/cpu': {
        POST: {
            command: 'throttleCPU',
            description:
                'You can throttle the CPU in DevTools to understand how your page performs under that constraint.',
            ref: 'https://docs.saucelabs.com/insights/debug/#saucethrottlecpu',
            examples: [
                [
                    '// throttle CPU and make it run 4x slower',
                    'browser.throttleCPU(4)',
                ],
                ['// reset CPU throttling', 'browser.throttleCPU(0)'],
            ],
            parameters: [
                {
                    name: 'rate',
                    type: 'number',
                    description:
                        'Rate on how much the CPU should get throttled.',
                    required: true,
                },
            ],
        },
    },
    '/session/:sessionId/sauce/ondemand/intercept': {
        POST: {
            command: 'interceptRequest',
            description:
                'Allows modifying any request made by the browser. You can blacklist, modify, or redirect these as required for your tests.',
            ref: 'https://docs.saucelabs.com/insights/debug/#intercept-network-requests',
            examples: [
                [
                    '// redirect a request',
                    'browser.interceptRequest({',
                    "  url: 'https://saucelabs.com',",
                    "  redirect: 'https://google.com'",
                    '})',
                ],
                [
                    '// Blacklist requests to 3rd party vendors',
                    'browser.interceptRequest({',
                    "  url: 'https://api.segment.io/v1/p',",
                    "  error: 'Failed'",
                    '})',
                ],
                [
                    '// Modify requests to REST API (Mock REST API response)',
                    'browser.interceptRequest({',
                    "  url: 'http://sampleapp.appspot.com/api/todos',",
                    '  response: {',
                    '    headers: {',
                    "      'x-custom-headers': 'foobar'",
                    '    },',
                    '    body: [{',
                    "      title: 'My custom todo',",
                    '      order: 1,',
                    '      completed: false,',
                    "      url: 'http://todo-backend-express.herokuapp.com/15727'",
                    '    }]',
                    '  }',
                    '})',
                ],
            ],
            parameters: [
                {
                    name: 'rule',
                    type: 'object',
                    description: 'A rule describing the request interception.',
                    required: true,
                },
            ],
        },
    },
    '/session/:sessionId/sauce/ondemand/performance': {
        POST: {
            command: 'assertPerformance',
            description: 'Assert against the performance baseline of your app.',
            ref: 'https://docs.saucelabs.com/performance/transitions/#setting-performance-capabilities',
            examples: [
                [
                    '// test performance for a page',
                    "browser.url('https://webdriver.io')",
                    'const hasRegression = browser.assertPerformance({',
                    "  name: 'my performance test', // make sure that the name is also set in the sauce options in your capabilities",
                    "  metrics: ['score', 'firstPaint']",
                    '})',
                ],
            ],
            parameters: [
                {
                    name: 'name',
                    type: 'string',
                    description:
                        'Name of the job you created your baseline with.',
                    required: true,
                },
                {
                    name: 'metrics',
                    type: 'string[]',
                    description:
                        'Name of metrics you want to assert agains the baseline.',
                    required: false,
                },
            ],
            returns: {
                type: 'object',
                name: 'hasRegression',
                description:
                    'An object containing the result as well as metrics about the result.',
            },
        },
    },
    '/session/:sessionId/sauce/ondemand/performance/scroll': {
        POST: {
            command: 'jankinessCheck',
            description:
                'Perform a scroll test that evaluates the jankiness of the application.',
            ref: 'https://docs.saucelabs.com/performance/motion/#implementing-the-jankiness-custom-command',
            examples: [
                [
                    '// test performance for a page',
                    "browser.url('https://webdriver.io')",
                    'browser.jankinessCheck()',
                ],
            ],
            parameters: [],
            returns: {
                type: 'object',
                name: 'testResults',
                description:
                    'An object containing the score as well as metrics around how smooth the UX of the page was during the test.',
            },
        },
    },
    '/session/:sessionId/sauce/ondemand/mock': {
        POST: {
            command: 'mockRequest',
            description: 'Mocks a network resource.',
            ref: 'https://docs.saucelabs.com/',
            parameters: [
                {
                    name: 'url',
                    type: 'string',
                    description: 'URL glob to match url to mock.',
                    required: true,
                },
                {
                    name: 'filterOptions',
                    description:
                        'Additional filter options for url to mock (e.g. headers, method).',
                    type: 'object',
                    required: false,
                },
            ],
            returns: {
                type: 'object',
                name: 'mockId',
                description: 'An object containing the id of a mock resource.',
            },
        },
    },
    '/session/:sessionId/sauce/ondemand/mock/:mockId': {
        GET: {
            command: 'getMockCalls',
            description:
                'Receive request information about requests that match the mocked resource.',
            ref: 'https://docs.saucelabs.com/',
            variables: [
                {
                    name: 'mockId',
                    description: 'the id of a mock',
                },
            ],
            parameters: [],
            returns: {
                type: 'object',
                name: 'requests',
                description: 'A list of request information.',
            },
        },
        DELETE: {
            command: 'clearMockCalls',
            description: 'Clear list of mock calls.',
            ref: 'https://docs.saucelabs.com/',
            variables: [
                {
                    name: 'mockId',
                    description: 'the id of a mock',
                },
            ],
            parameters: [
                {
                    type: 'boolean',
                    name: 'restore',
                    description:
                        'Set to true if mock should be restored as well.',
                    required: false,
                },
            ],
        },
        POST: {
            command: 'respondMock',
            description: 'Respond if mock matches a specific resource.',
            ref: 'https://docs.saucelabs.com/',
            variables: [
                {
                    name: 'mockId',
                    description: 'the id of a mock',
                },
            ],
            parameters: [
                {
                    type: 'object',
                    name: 'payload',
                    description: 'Information on mock response.',
                },
            ],
        },
    },
}
