const LoginPage = () => (
  <>
    <div>Successfully signed up</div>
    <form action="/api/v1/auth" method="post">
      <label for="username">Username or Email</label>
      <input type="text" name="username" id="username" required style={{ color: 'black' }} />
      <label for="password">Password</label>
      <input type="password" name="password" id="password" required style={{ color: 'black' }} />
      <button type="submit">Login</button>
    </form>
  </>
);
export default LoginPage;
