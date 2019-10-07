import { Request, Response } from 'express';
import { get, controller, use, post } from './decorators';
import { bodyValidator } from './decorators/bodyValidator';

// interface RequestWithBody extends Request {
//   body: { [key: string]: string | undefined };
// }

@controller('/auth')
class LoginController {
  @get('/login')
  getLogin(req: Request, res: Response): void {
    res.send(`
      <form action="" method="post">
        <div>
          <label for="">Email</label>
          <input type="email" name="email">
        </div>
        <div>
          <label for="">Password</label>
          <input type="password" name="password">
        </div>
        <button type="submit">Submit</button>
      </form>
    `);
  }

  @post('/login')
  @bodyValidator('email', 'password')
  postLogin(req: Request, res: Response): void {
    const { email, password } = req.body;

    if (email && password && email === 'hi@hi.com' && password === 'password') {
      req.session = { loggedIn: true };

      res.redirect('/');
    } else {
      res.send('Invalid email or password');
    }
  }

  @get('/logout')
  getLogout(req: Request, res: Response): void {
    req.session = undefined;
    res.redirect('/');
  }
}
