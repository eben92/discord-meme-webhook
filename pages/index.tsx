import Head from 'next/head';
import styles from '../styles/Home.module.css';
import { webhooks } from '../services';
import { useState } from 'react';
import { toast, ToastContainer, cssTransition } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'animate.css/animate.min.css';

export default function Home() {
  const [serverName, setServerName] = useState('');
  const [webhookURL, setWebhookURL] = useState('');

  const handleAddWebHook = async (
    event: any,
    hook: { url: string; name: string }
  ) => {
    event.preventDefault();

    try {
      await webhooks.add(hook);

      setServerName('');
      setWebhookURL('');
      return 'Successful';
    } catch (err: any) {
      const {
        response: {
          data: { error }
        }
      } = err;
      console.log(err);
      throw new Error(error);
    }
  };
  const handleTestWebHook = async (event: any, hook: { url: string }) => {
    event.preventDefault();

    try {
      await webhooks.test(hook);

      return 'Sent';
    } catch (err: any) {
      const {
        response: {
          data: { error }
        }
      } = err;
      console.log(err);
      throw new Error(error);
    }
  };

  const bounce = cssTransition({
    enter: 'animate__animated animate__bounceIn',
    exit: 'animate__animated animate__bounceOut'
  });

  return (
    <div>
      <Head>
        <title>Daily DISCORD MEME Bot</title>
        <meta name='description' content='hello world' />
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <ToastContainer position='top-right' transition={bounce} />
      <main className='bg-gray-200 bg-discord px-6 py-4 h-screen flex flex-col items-center justify-center w-full bg-gradient-to-b from-gray-500 filter-brightness(0.9) shadow-xl'>
        <form
          onSubmit={(e) =>
            toast.promise(
              handleAddWebHook(e, {
                name: serverName,
                url: webhookURL
              }),
              {
                pending: {
                  render() {
                    return 'Setting up your bot...';
                  }
                },
                success: {
                  render({ data }) {
                    return `${data}`;
                  }
                  // other options
                },
                error: {
                  render({ data }) {
                    // When the promise reject, data will contains the error
                    return `LMAO ${data}`;
                  }
                }
              }
            )
          }
          className='md:w-[30%] w-full bg-white shadow-2xl rounded-lg px-6 py-4 flex flex-col gap-4 '
        >
          <div className={styles.footer}>
            <a
              href='https://instagram.com/1rutmann'
              target='_blank'
              rel='noopener noreferrer'
              style={{
                fontSize: '28px!important'
              }}
            >
              <span
                className={styles.logo}
                style={{
                  fontSize: '28px!important'
                }}
              >
                1rutmann
              </span>
            </a>
          </div>

          <div>
            <label
              htmlFor='server-name'
              className='block text-sm font-bold mb-2 text-gray-600'
            >
              Server Name(optional)
            </label>
            <input
              id='server-name'
              type='text'
              value={serverName}
              onChange={(event) => setServerName(event.target.value)}
              className='block w-full p-2 rounded-lg shadow-lg border-2 border-indigo-600 focus:outline-none focus:shadow-outline'
            />
          </div>

          <div>
            <label
              htmlFor='webhook-url'
              className='block text-sm font-bold mb-2 text-gray-600'
            >
              Discord Webhook URL:
            </label>
            <input
              id='webhook-url'
              type='text'
              value={webhookURL}
              required
              placeholder='eg. https://discord.com/api/webhooks/...'
              onChange={(event) => setWebhookURL(event.target.value)}
              className='block w-full  p-2 rounded-lg border-2 border-indigo-600 shadow-lg focus:outline-none focus:shadow-outline'
            />
          </div>

          <button
            type='submit'
            className='block w-full p-2 mt-4 bg-indigo-500 hover:bg-indigo-600 rounded-lg shadow-lg text-white font-bold uppercase'
          >
            Submit
          </button>

          <footer className={styles.footer}>
            <a
              href='https://instagram.com/1rutmann'
              target='_blank'
              rel='noopener noreferrer'
            >
              Powered by <span className={styles.logo}>1rutmann</span>
            </a>
          </footer>

          <div className='flex items-end justify-end '>
            <p
              onClick={(e) =>
                toast.promise(
                  handleTestWebHook(e, {
                    url: webhookURL
                  }),
                  {
                    pending: {
                      render() {
                        return 'Finding you the best meme...';
                      }
                    },
                    success: {
                      render({ data }) {
                        return `${data}`;
                      }
                      // other options
                    },
                    error: {
                      render({ data }) {
                        // When the promise reject, data will contains the error
                        return `LMAO ${data}`;
                      }
                    }
                  }
                )
              }
              className='rounded bg-black text-white px-4 cursor-pointer py-1 text-sm font-[500] hover:bg-gray-900 transition-all'
            >
              Test
            </p>
          </div>
        </form>
      </main>
      {/* <footer className={styles.footer}>
        <a
          href='https://instagram.com/1rutmann'
          target='_blank'
          rel='noopener noreferrer'
        >
          Powered by <span className={styles.logo}>1rutmann</span>
        </a>
      </footer> */}
    </div>
  );
}
