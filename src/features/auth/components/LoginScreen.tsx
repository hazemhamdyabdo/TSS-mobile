import AuthHeroBackground from './AuthHeroBackground';
import AuthSheet from './AuthSheet';
import LoginContent from './LoginContent';

export default function LoginScreen() {
  return (
    <AuthHeroBackground>
      <AuthSheet>
        <LoginContent />
      </AuthSheet>
    </AuthHeroBackground>
  );
}
