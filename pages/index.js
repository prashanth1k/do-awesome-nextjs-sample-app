import Head from "next/head";
import Link from "next/link";
import styles from "../styles/Home.module.css";

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Do Awesome</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h3 className={styles.description}>
          Awesome App to Record Todos &amp; Stuff
        </h3>
        <h3 className={styles.title}>
          <Link href="/todos">View Todos</Link>
        </h3>
      </main>

      <footer className={styles.footer}>Booya!</footer>
    </div>
  );
}
