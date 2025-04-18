WebDriver
=========

> A lightweight, non-opinionated implementation of the [WebDriver](https://w3c.github.io/webdriver/webdriver-spec.html) and [WebDriver BiDi](https://w3c.github.io/webdriver-bidi/) specification including mobile commands supported by [Appium](http://appium.io/)

There are [tons](https://github.com/christian-bromann/awesome-selenium#javascript) of Selenium and WebDriver binding implementations in the Node.js world. Every one of them has an opinionated API and recommended way to use it. This binding is the most non-opinionated you will find as it just represents the [WebDriver specification](https://w3c.github.io/webdriver/webdriver-spec.html) and doesn't come with any extra or higher-level abstraction. It is lightweight and comes with support for the [WebDriver specification](https://w3c.github.io/webdriver/webdriver-spec.html) and Appium's [Mobile JSONWire Protocol](https://github.com/appium/appium-base-driver/blob/master/docs/mjsonwp/protocol-methods.md).

The package supports the following protocols:

- [WebDriver](https://w3c.github.io/webdriver/)
- [WebDriver Bidi](https://w3c.github.io/webdriver-bidi/)
- [Appium](http://appium.io/)
- [Chromium](http://chromedriver.chromium.org/) (additional Chromedriver specific commands)
- [Selenium](https://www.selenium.dev/) (additional Selenium WebDriver specific commands)
- [Sauce Labs](https://saucelabs.com/) (Sauce Labs specific WebDriver extensions)
- [JSONWireProtocol](https://github.com/SeleniumHQ/selenium/wiki/JsonWireProtocol) (deprecated)
- [Mobile JSONWireProtocol](https://github.com/SeleniumHQ/mobile-spec/blob/master/spec-draft.md) (deprecated)

Commands are added to the client's protocol based on assumptions of provided capabilities. You can find more details about the commands by checking out the [`@wdio/protocols`](https://www.npmjs.com/package/@wdio/protocols) package. All commands come with TypeScript support.

## Install

To install this package from NPM run:

```sh
npm i webdriver
```

## WebDriver Example

The following example demonstrates a simple Google Search scenario:

```js
import WebDriver from 'webdriver';

const client = await WebDriver.newSession({
    path: '/',
    capabilities: { browserName: 'firefox' }
})

await client.navigateTo('https://www.google.com/ncr')

const searchInput = await client.findElement('css selector', '#lst-ib')
await client.elementSendKeys(searchInput['element-6066-11e4-a52e-4f735466cecf'], 'WebDriver')

const searchBtn = await client.findElement('css selector', 'input[value="Google Search"]')
await client.elementClick(searchBtn['element-6066-11e4-a52e-4f735466cecf'])

console.log(await client.getTitle()) // outputs "WebDriver - Google Search"

await client.deleteSession()
```

## WebDriver Bidi Example

To connect to the WebDriver Bidi protocol you have to send along a `webSocketUrl` flag to tell the browser driver to opt-in to the protocol:

```js
import WebDriver from 'webdriver'

const browser = await WebDriver.newSession({
    capabilities: {
        webSocketUrl: true,
        browserName: 'firefox'
    }
})

await browser.sessionSubscribe({ events: ['log.entryAdded'] })

/**
 * returns: {"type":"console","method":"log","realm":null,"args":[{"type":"string","value":"Hello Bidi"}],"level":"info","text":"Hello Bidi","timestamp":1657282076037}
 */
browser.on('log.entryAdded', (entryAdded) => console.log('received %s', entryAdded))

await browser.executeScript('console.log("Hello Bidi")', [])
await browser.deleteSession()
```

# Configuration

To create a WebDriver session call the `newSession` method on the `WebDriver` class and pass in your configurations:

```js
import WebDriver from 'webdriver'
const client = await WebDriver.newSession(options)
```

The following options are available:

### capabilities
Defines the [capabilities](https://w3c.github.io/webdriver/webdriver-spec.html#capabilities) you want to run in your WebDriver session. Note: by default, it will automatically set the `webSocketUrl` to establish a [WebDriver Bidi](https://w3c.github.io/webdriver-bidi/) session, if you don't want this, make sure to set `'wdio:enforceWebDriverClassic': true` in your capabilities.

Type: `Object`<br />
Required: `true`

### logLevel
Level of logging verbosity.

Type: `String`<br />
Default: *info*<br />
Options: *trace* | *debug* | *info* | *warn* | *error* | *silent*

### protocol
Protocol to use when communicating with the Selenium standalone server (or driver).

Type: `String`<br />
Default: *http*
Options: *http* | *https*

### hostname
Host of your WebDriver server.

Type: `String`<br />
Default: *localhost*

### port
Port your WebDriver server is on.

Type: `Number`<br />
Default: `undefined`

### path
Path to WebDriver endpoint or grid server.

Type: `String`<br />
Default: */*

### queryParams
Query parameters that are propagated to the driver server.

Type: `Object`
Default: `undefined`

### connectionRetryTimeout
Timeout for any WebDriver request to a driver or grid.

Type: `Number`<br />
Default: *120000*

### connectionRetryCount
Count of request retries to the Selenium server.

Type: `Number`<br />
Default: *3*

### agent

Allows you to use a custom` http`/`https`/`http2` [agent](https://www.npmjs.com/package/got#agent) to make requests.

Type: `Object`<br />
Default:

```js
{
    http: new http.Agent({ keepAlive: true }),
    https: new https.Agent({ keepAlive: true })
}
```

### transformRequest
Function intercepting [HTTP request options](https://github.com/sindresorhus/got#options) before a WebDriver request is made to a driver.

Type: `(RequestOptions) => RequestOptions`<br />
Default: *none*

### transformResponse
Function intercepting HTTP response objects after a WebDriver response has arrived.

Type: `(Response, RequestOptions) => Response`<br />
Default: *none*
