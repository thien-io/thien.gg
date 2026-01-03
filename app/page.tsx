export default function HomePage() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-white p-4">
      <div className="text-center space-y-8">
        {/* Logo/Title */}
        <h1 className="text-5xl md:text-6xl font-bold text-black tracking-tight">thien</h1>

        {/* Links */}
        <nav className="flex flex-col items-center gap-3 text-lg">
          <a href="/tomo" className="text-blue-600 underline hover:text-blue-800 visited:text-purple-600">
            tomo
          </a>
          <a
            href="https://discord.gg/users/thien.gg"
            className="text-blue-600 underline hover:text-blue-800 visited:text-purple-600"
            target="_blank"
            rel="noopener noreferrer"
          >
            discord
          </a>
        </nav>
      </div>
    </main>
  )
}
