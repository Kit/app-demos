# Kit Media Gallery Plugin Demo

This directory serves as an example of how you can structure your application to respond
to Kit's media gallery plugin framework.

It contains a *list media* endpoint, which returns a list of paginated media items to
display in the gallery. You can view the comments in `index.js` to learn more about the
implementation.

If you want to run this app locally, you can do so by running:

```
cp .env.example .env
npm install
npm run start
```

This endpoint assume that your plugin would be structured as follows on your [plugin
settings](https://app.kit.com/account_settings/developer_settings).

- **Plugin name:**
  My Media

- **Description:**
  A media gallery plugin demo.

- **HTML URL:**
  https://YOUR_URL/media

  > Replace `YOUR_URL` with your server's URL.

- **Settings JSON:**

  ```json
  [
    {
      "type": "text",
      "name": "query",
      "help": "Search your media",
      "required": false
    }
  ]
  ```
