# Go Vanity

A Cloudflare Worker for handling Go vanity URLs.

## Usage

```bash
npm install
npm run dev
```

## Deploy

```bash
npm run deploy
```

## Configuration

Set the `DOMAIN` environment variable in your Cloudflare Workers settings.

## Development

For generating/synchronizing types based on your Worker configuration:

```bash
npm run cf-typegen
```

Pass the `CloudflareBindings` as generics when instantiating `Hono`:

```ts
const app = new Hono<{ Bindings: CloudflareBindings }>()
```
