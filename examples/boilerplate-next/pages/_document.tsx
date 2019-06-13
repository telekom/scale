import Document, { Html, Head, Main, NextScript } from 'next/document';

class MyDocument extends Document {
	static async getInitialProps(ctx: any) {
		const initialProps = await Document.getInitialProps(ctx);
		return { ...initialProps };
	}

	render() {
		return (
			<Html>
				<Head>
					<style>{`
						html {
							margin: 0;
							padding: 0;
							font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell, Open Sans, Helvetica Neue, sans-serif;
						}

						body {
							margin: 0;
							padding: 4rem;
						}

						hr {
							margin: 3rem 0;
						}
					`}</style>
				</Head>
				<body className="custom_class">
					<Main />
					<NextScript />
				</body>
			</Html>
		);
	}
}

export default MyDocument;
