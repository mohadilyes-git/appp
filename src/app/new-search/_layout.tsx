import { Stack } from 'expo-router';

// the draft itself lives at the app root, because home fills it in before
// opening this stack when you edit a saved search
export default function NewSearchLayout() {
  return <Stack screenOptions={{ headerShown: false }} />;
}
