import PostCreate from '../components/post/PostCreate';
import SignInChecker from '../components/admin/SignInChecker';
import { useApp } from '../lib/appState';

export default function PostCreatePage() {
  const { setTitle } = useApp();
  setTitle("Post");
  return (
    <div>
      <SignInChecker>
        <PostCreate />
      </SignInChecker>
    </div>
  );
}
