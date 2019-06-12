import { Button, Alert, Card } from '@telements/components-react'
import Head from 'next/head'

export default (_: any) => (
    <div>
        <Head>
            <title>Boilerplate - Next</title>
        </Head>
        <div>
            <h1>Next.js App (Server side render)</h1>
            <h3>Alert</h3>
            <Alert context="success">Success</Alert>
            <h3>Button</h3>
            <Button>Click!</Button>
            <h3>Card</h3>
            <Card>A tile</Card>
        </div>
    </div>
)
