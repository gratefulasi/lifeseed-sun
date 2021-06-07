import Vault from '../components/vault/Vault';
import SignInChecker from '../components/admin/SignInChecker';

export default function PostCreatePage() {
  return (
    <div>
      <SignInChecker>
        <Vault />
      </SignInChecker>
    </div>
  );
}
