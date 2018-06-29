# Basic logging

## `log(message: string, logFn = console.log)`

Logs the message with the given log function (default is `console.log`).

Example:
```typescript
const AppModule: Module = {
  controllers: [
    route('/', () => {})
      .withPreHook(log('Hello world'))
  ]
}
```

## `afterThatLog(message: string, logFn = console.log)`

Logs the message with the given log function (default is console.log).

Example:
```typescript
const AppModule: Module = {
  controllers: [
    route('/', () => {})
      .withPostHook(afterThatLog('Hello world'))
  ]
}
```