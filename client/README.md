<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://ai.google.dev/static/site-assets/images/share-ais-513315318.png" />
</div>

# Run and deploy RentTrust

This contains everything you need to run your app locally.

View your app in AI Studio: https://ai.studio/apps/a3a66fe3-0506-4aad-bfba-6150c8141baf

## Run Locally

**Prerequisites:**  Node.js


1. Install dependencies:
   `npm install`
2. Copy `.env.example` to `.env.local` and set the chat service URLs for your environment.
3. Run the app:
   `npm run dev`

For a physical Android or iOS device, `VITE_CHAT_API_BASE_URL` and
`VITE_CHAT_WS_BASE_URL` must use the computer's LAN IP, and the chat backend
must be reachable from that device. Android emulators can use `10.0.2.2`;
iOS simulators can use `127.0.0.1`.

Chat attachments open the native system file picker on Android and iOS, with
the browser file picker retained for web builds.
