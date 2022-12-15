const RegisterPage = () => (
  <form action="api/v1/user" method="post">
    <label for="username">Username</label>
    <input type="text" name="username" id="username" required style={{ color: 'black' }} />
    <label for="username">Email</label>
    <input type="email" name="email" id="emair" required style={{ color: 'black' }} />
    <label for="password">Password</label>
    <input type="password" name="password" id="password" required style={{ color: 'black' }} />
    <button type="submit">Sign Up</button>
  </form>
);
export default RegisterPage;
