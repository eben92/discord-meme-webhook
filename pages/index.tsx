import Head from 'next/head';
import styles from '../styles/Home.module.css';
import { webhooks } from '../services';

export default function Home() {
  const handleAddWebHook = async (hook: { url: string; name: string }) => {
    try {
      await webhooks.add(hook);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <meta name='description' content='hello world' />
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <main className='bg-red-600'>hello world</main>
      <footer className={styles.footer}>
        <a
          href='https://instagram.com/1rutmann'
          target='_blank'
          rel='noopener noreferrer'
        >
          Powered by <span className={styles.logo}>1rutmann</span>
        </a>
      </footer>
    </div>
  );
}
