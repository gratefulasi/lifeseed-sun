import PresentCreate from '../components/present/PresentCreate';
import SignInChecker from '../components/admin/SignInChecker';
import { useApp } from '../lib/appState';

export default function PresentCreatePage() {
  const { setTitle } = useApp();
  setTitle("Present");
  return (
    <div>
      <SignInChecker>
        <PresentCreate />
      </SignInChecker>
    </div>
  );
}
