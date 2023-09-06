import Vault from '../components/vault/Vault';
import SignInChecker from '../components/admin/SignInChecker';
import { useApp } from '../lib/appState';

export default function PostCreatePage() {
  const { setTitle } = useApp();
  setTitle("the vault");
  return (
    <div>
      <SignInChecker>
        <Vault />
      </SignInChecker>
    </div>
  );
}
