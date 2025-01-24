# Kit Editor Plugin Demo

This directory serves as an example of how you can structure your application to respond to Kit's editor plugin framework. It contains a _search_ endpoint, which can respond to requests from the Kit sidebar, and an _HTML_ endpoint, which can generate an element for the editor based on the user's selected settings. You can view the comments in `index.js` to learn more about the implementation.

If you want to run this app locally, you can do so by running:

```
npm install
npm run start
```

These endpoints assume that your plugin would be structured as follows on your [plugin dashboard](https://app.kit.com/account_settings/developer_settings)  ([requires developer access](https://kit.typeform.com/to/nsTUorqw)).

- **Plugin name:**

  Post

- **Description:**

  A demo plugin

- **HTML URL:**

  https://YOUR_URL/posts/html

  > Replace `YOUR_URL` with your server's URL.

- **Settings JSON:**

  ```json
  [
    {
      "name": "postId",
      "type": "search",
      "label": "Post",
      "placeholder": "Search for a post...",
      "request_url": "https://YOUR_URL/posts/search",
      "required": true
    },
    {
      "name": "favoriteColor",
      "type": "color",
      "label": "Favorite color",
      "required": true
    }
  ]
  ```

  > Replace `YOUR_URL` with your server's URL.

- **Icon:**

  ![The example icon from this directory](./example-icon.png)

- **Test mode:**

  Enabled
