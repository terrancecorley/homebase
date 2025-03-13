import { Input } from '@/components/ui/input';

export default function Home() {
    return (
        <div>
            <header>
                <span>sun logo</span>
                <span>88 degrees</span>
                <p>
                    {new Date(Date.now()).toLocaleDateString('en-US', {
                        month: '2-digit',
                        day: '2-digit',
                        year: 'numeric',
                    })}
                </p>
            </header>
            <main>
                <h1>Welcome home. :)</h1>
                <Input type='search' placeholder="Hey, what's up?" />
            </main>
            <footer>footer here</footer>
        </div>
    );
}
