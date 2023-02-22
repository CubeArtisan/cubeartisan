import { LoginForm, LoginFormTitle } from '@cubeartisan/cubeartisan/layouts/auth/AuthForm/LoginForm';
import * as styles from '@cubeartisan/cubeartisan/routes/(auth)/authPages.css';

const LoginPage = () => (
  <div class={styles.formContainer}>
    <LoginFormTitle />
    <LoginForm />
  </div>
);
export default LoginPage;
