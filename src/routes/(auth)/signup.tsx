import { SignupForm, SignupFormTitle } from '@cubeartisan/cubeartisan/components/templates/AuthForm/SignupForm';
import * as styles from '@cubeartisan/cubeartisan/routes/(auth)/authPages.css';

const RegisterPage = () => (
  <div class={styles.formContainer}>
    <SignupFormTitle />
    <SignupForm />
  </div>
);
export default RegisterPage;
