export function Footer() {

    const date = new Date();
    const year = date.getFullYear();

    return (
        <footer>
            <p>&copy; {year} naira earning app.</p>
        </footer>
    )
}