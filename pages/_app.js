import "../styles/globals.css";
import Head from "next/head";
import Link from "next/link";

function MyApp({ Component, pageProps }) {
  return (
    <div>
      <Head>
        <link rel="stylesheet" href="https://unpkg.com/chota" />
      </Head>
      <div>
        <nav className="nav">
          <div className="nav-left">
            <a className="brand" href="#">
              <strong>Do Awesome</strong>
            </a>
          </div>
          <div className="nav-right">
            <Link href="/">Home</Link>
            <Link href="/todos">Todos</Link>
          </div>
        </nav>
        <div className="row">
          <div className="col-1"></div>
          <div className="col-10">
            <Component {...pageProps} />
          </div>
          <div className="col-1"></div>
        </div>
      </div>
    </div>
  );
}

export default MyApp;
