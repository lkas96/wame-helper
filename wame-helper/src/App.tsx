import NavBar from './NavBar.tsx'
import Body from './Body.tsx'

function App() {
  return (
    // Wrap everything in the flex container
    <div className="d-flex flex-column min-vh-100">
      <NavBar />

      <main className="flex-grow-1">
        <Body />
      </main>

      <footer className="py-4 bg-dark text-white-50 mt-5">
        <div className="container text-center">
          <small>
            Copyright &copy; {new Date().getFullYear()} | Built by Lawson Kwek
          </small>
          <div className="mt-2">
            <a
              href="https://github.com/lkas96/wame-helper"
              target="_blank" 
              rel="noreferrer"
              className="btn btn-outline-light btn-sm me-2"
            >
              <i className="bi bi-github me-1"></i> GitHub
            </a>
            <a
              href="https://www.linkedin.com/in/lawson-kwek-7ab874165/"
              target="_blank"
              rel="noreferrer"
              className="btn btn-outline-light btn-sm"
            >
              <i className="bi bi-linkedin me-1"></i> LinkedIn
            </a>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default App