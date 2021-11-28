import Document, {
  Html,
  Head,
  Main,
  NextScript,
  DocumentContext,
} from 'next/document';

class MyDocument extends Document {
  static async getInitialProps(ctx: DocumentContext) {
    const initialProps = await Document.getInitialProps(ctx);
    return { ...initialProps };
  }

  render() {
    return (
      <Html>
        <Head>
          <title>Small guide</title>
          <meta
            name="description"
            content="Small guide is the app you need for your trip to be successful"
          />
          <meta name="application-name" content="Small guide" />
          <meta name="apple-mobile-web-app-capable" content="yes" />
          <meta
            name="apple-mobile-web-app-status-bar-style"
            content="default"
          />
          <meta name="apple-mobile-web-app-title" content="Small guide" />
          <meta
            name="description"
            content="Small guide is the app you need for your trip to be successful"
          />
          <meta name="format-detection" content="telephone=no" />
          <meta name="mobile-web-app-capable" content="yes" />
          <link rel="icon" href="/images/favicon.ico" />
          <link rel="manifest" href="/manifest.json" />
          <link rel="shortcut icon" href="/images/favicon.ico" />
          <meta name="theme-color" content="#1A4150" />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
