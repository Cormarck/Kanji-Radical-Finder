import React from "react";

// ErrorBoundary ist eine React Component
// muss class Component sein, da "static" Methode in class Component eingebaut ist
class ErrorBoundary extends React.Component {
    state = {hasError: false}

    static getDerivedStateFromError(error) {
        return {hasError: true}
    }

    componentDidCatch(error, info) {
        console.log(error, info)
    }

    render() {
        if (this.state.hasError) {
            return this.props.fallback // fallback wird gerendert, wenn ein fehler auftritt
        }
        return this.props.children
    }
}

export default ErrorBoundary