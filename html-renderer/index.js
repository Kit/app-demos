const express = require('express')
const app = express()
const port = 3001

app.use(express.json())

/*
  POST /posts/search

  Example request:

  { search: 'Default to generosity' }
*/
app.post('/posts/search', (request, response) => {
  // Access the user's search query with:
  console.log(request.body.search)

  // Return your search results in the following shape. We'll send the `value`
  // the user selects (along with any other settings) to your HTML endpoint.
  response.json({
    code: 200,
    data: [
      {
        label: 'Create every day',
        value: 'create-every-day-id-123',
      },
      {
        label: 'Default to generosity',
        value: 'default-to-generosity-id-123',
      },
      {
        label: 'Teach everything you know',
        value: 'teach-everything-you-know-id-123',
      },
    ],
  })
})

/*

POST /posts/html

Example request:

{
  settings: {
    postId: 'default-to-generosity-id-123',
    favoriteColor: '#ff0000'
  },
  styles: {
    p: {
      color: 'rgb(45, 45, 47)',
      'font-family': 'Charter, Georgia, Times, "Times New Roman", serif',
      'font-size': '18px',
      'font-weight': '400',
      'letter-spacing': 'normal',
      'line-height': '27px',
      'text-align': 'start',
      'text-transform': 'none',
      'margin-top': '18px',
      'margin-right': '0px',
      'margin-bottom': '18px',
      'margin-left': '0px',
      'padding-top': '0px',
      'padding-right': '0px',
      'padding-bottom': '0px',
      'padding-left': '0px'
    },
    h1: {
      color: 'rgb(0, 0, 0)',
      'font-family': '-apple-system, "system-ui", "Segoe UI", Roboto, Oxygen-Sans, Ubuntu, Cantarell, "Helvetica Neue", sans-serif',
      'font-size': '28px',
      'font-weight': '700',
      'letter-spacing': 'normal',
      'line-height': '42px',
      'text-align': 'start',
      'text-transform': 'none',
      'margin-top': '0px',
      'margin-right': '0px',
      'margin-bottom': '0px',
      'margin-left': '0px',
      'padding-top': '0px',
      'padding-right': '0px',
      'padding-bottom': '0px',
      'padding-left': '0px'
    },
    h2: {
      color: 'rgb(0, 0, 0)',
      'font-family': '-apple-system, "system-ui", "Segoe UI", Roboto, Oxygen-Sans, Ubuntu, Cantarell, "Helvetica Neue", sans-serif',
      'font-size': '21px',
      'font-weight': '700',
      'letter-spacing': 'normal',
      'line-height': '31.5px',
      'text-align': 'start',
      'text-transform': 'none',
      'margin-top': '21px',
      'margin-right': '0px',
      'margin-bottom': '21px',
      'margin-left': '0px',
      'padding-top': '0px',
      'padding-right': '0px',
      'padding-bottom': '0px',
      'padding-left': '0px'
    },
    h3: {
      color: 'rgb(0, 0, 0)',
      'font-family': '-apple-system, "system-ui", "Segoe UI", Roboto, Oxygen-Sans, Ubuntu, Cantarell, "Helvetica Neue", sans-serif',
      'font-size': '16.38px',
      'font-weight': '700',
      'letter-spacing': 'normal',
      'line-height': '24.57px',
      'text-align': 'start',
      'text-transform': 'none',
      'margin-top': '16.38px',
      'margin-right': '0px',
      'margin-bottom': '16.38px',
      'margin-left': '0px',
      'padding-top': '0px',
      'padding-right': '0px',
      'padding-bottom': '0px',
      'padding-left': '0px'
    },
    h4: {
      color: 'rgb(0, 0, 0)',
      'font-family': '-apple-system, "system-ui", "Segoe UI", Roboto, Oxygen-Sans, Ubuntu, Cantarell, "Helvetica Neue", sans-serif',
      'font-size': '14px',
      'font-weight': '700',
      'letter-spacing': 'normal',
      'line-height': '21px',
      'text-align': 'start',
      'text-transform': 'none',
      'margin-top': '0px',
      'margin-right': '0px',
      'margin-bottom': '0px',
      'margin-left': '0px',
      'padding-top': '0px',
      'padding-right': '0px',
      'padding-bottom': '0px',
      'padding-left': '0px'
    },
    h5: {
      color: 'rgb(0, 0, 0)',
      'font-family': '-apple-system, "system-ui", "Segoe UI", Roboto, Oxygen-Sans, Ubuntu, Cantarell, "Helvetica Neue", sans-serif',
      'font-size': '14px',
      'font-weight': '700',
      'letter-spacing': 'normal',
      'line-height': '15.4px',
      'text-align': 'start',
      'text-transform': 'none',
      'margin-top': '0px',
      'margin-right': '0px',
      'margin-bottom': '0px',
      'margin-left': '0px',
      'padding-top': '0px',
      'padding-right': '0px',
      'padding-bottom': '0px',
      'padding-left': '0px'
    },
    h6: {
      color: 'rgb(0, 0, 0)',
      'font-family': '-apple-system, "system-ui", "Segoe UI", Roboto, Oxygen-Sans, Ubuntu, Cantarell, "Helvetica Neue", sans-serif',
      'font-size': '14px',
      'font-weight': '400',
      'letter-spacing': 'normal',
      'line-height': '21px',
      'text-align': 'start',
      'text-transform': 'none',
      'margin-top': '0px',
      'margin-right': '0px',
      'margin-bottom': '0px',
      'margin-left': '0px',
      'padding-top': '0px',
      'padding-right': '0px',
      'padding-bottom': '0px',
      'padding-left': '0px'
    },
    ol: {
      color: 'rgb(45, 45, 47)',
      'font-family': 'Charter, Georgia, Times, "Times New Roman", serif',
      'font-size': '18px',
      'font-weight': '400',
      'letter-spacing': 'normal',
      'line-height': '27px',
      'text-align': 'start',
      'text-transform': 'none',
      'margin-top': '18px',
      'margin-right': '0px',
      'margin-bottom': '18px',
      'margin-left': '18px',
      'padding-top': '0px',
      'padding-right': '0px',
      'padding-bottom': '0px',
      'padding-left': '0px'
    },
    ul: {
      color: 'rgb(45, 45, 47)',
      'font-family': 'Charter, Georgia, Times, "Times New Roman", serif',
      'font-size': '18px',
      'font-weight': '400',
      'letter-spacing': 'normal',
      'line-height': '27px',
      'text-align': 'start',
      'text-transform': 'none',
      'margin-top': '18px',
      'margin-right': '0px',
      'margin-bottom': '18px',
      'margin-left': '18px',
      'padding-top': '0px',
      'padding-right': '0px',
      'padding-bottom': '0px',
      'padding-left': '0px'
    },
    blockquote: {
      color: 'rgb(55, 63, 69)',
      'font-family': '"open sans", "helvetica neue", Helvetica, Arial, sans-serif',
      'font-size': '17.5px',
      'font-weight': '400',
      'letter-spacing': 'normal',
      'line-height': '25px',
      'text-align': 'start',
      'text-transform': 'none',
      'margin-top': '17.5px',
      'margin-right': '0px',
      'margin-bottom': '17.5px',
      'margin-left': '0px',
      'padding-top': '10px',
      'padding-right': '20px',
      'padding-bottom': '10px',
      'padding-left': '20px'
    },
    a: {
      color: 'rgb(32, 177, 150)',
      'font-family': '"open sans", "helvetica neue", Helvetica, Arial, sans-serif',
      'font-size': '14px',
      'font-weight': '400',
      'letter-spacing': 'normal',
      'line-height': '20px',
      'text-align': 'start',
      'text-transform': 'none',
      'margin-top': '0px',
      'margin-right': '0px',
      'margin-bottom': '0px',
      'margin-left': '0px',
      'padding-top': '0px',
      'padding-right': '0px',
      'padding-bottom': '0px',
      'padding-left': '0px'
    }
  }
}
*/
app.post('/posts/html', (request, response) => {
  // Access the settings the user selected in Kit's sidebar with:
  const settings = request.body.settings

  // If needed, you can access the surrounding styles with:
  const styles = request.body.styles

  // Return HTML for your element in the following shape:
  response.json({
    code: 200,
    html: `
      <div style="
        padding: 1rem;
        border-radius: 0.5rem;
        border: 1px solid ${settings.favoriteColor};
        color: ${settings.favoriteColor};
        font-size: ${styles.p['font-size']};
      ">
        The user selected the post with ID "${settings.postId}"!
      </div>
    `,
  })
})

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`)
})
