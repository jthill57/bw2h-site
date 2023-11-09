import Header from '@/components/Header';
import { getLanguages } from '@/lib/helpers';


export default async function Videos() {
  const languages = await getLanguages(process.env.I18NEXUS_API_KEY);

  return (
    <h1>Test</h1>
  );
}
