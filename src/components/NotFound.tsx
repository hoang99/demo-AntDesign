import * as React from 'react';

export interface IAppProps {
}

export default class App extends React.Component<IAppProps> {
    public render() {
        return (
            <div>
                <h1>404</h1>
                <h1>Page not found</h1>
            </div>
        );
    }
}
