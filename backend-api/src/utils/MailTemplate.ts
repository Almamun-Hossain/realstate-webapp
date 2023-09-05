import handlebars from "handlebars";

export function renderResetPasswordTemplate(name: string, resetPasswordUrl: string) {
  const template = handlebars.compile(`
    <html>
      <head>
        <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-1BmE4kWBq78iYhFldvKuhfTAU6auU8tT94WrHftjDbrCEXSU1oBoqyl2QvZ6jIW3" crossorigin="anonymous">
      </head>
      <body>
        <div class="container">
          <h1>Reset Password</h1>
          <p>Hi {{name}},</p>
          <p>You requested to reset your password. To do this, please click on the following link:</p>
          <a href="{{reset_password_url}}" class="btn btn-primary">Reset Password</a>
          <p>This link will expire in 24 hours.</p>
          <p>If you did not request to reset your password, please ignore this email.</p>
        </div>
      </body>
    </html>
  `);

  return template({
    name: name,
    reset_password_url: resetPasswordUrl
  });
}
