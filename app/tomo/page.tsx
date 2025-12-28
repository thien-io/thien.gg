export default function TomoPage() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-white p-4">
      <div className="text-center space-y-8">
        {/* Title */}
        <h1 className="text-4xl md:text-5xl font-bold text-black">Tomodachi Zuko [TOMO]</h1>

        {/* Discord Invite */}
        <div className="space-y-4">
          <p className="text-lg text-gray-700">Join our guild Discord server:</p>
          <a
            href="https://discord.gg/mBRgJBKmfw"
            className="inline-block text-xl text-blue-600 underline hover:text-blue-800 visited:text-purple-600"
            target="_blank"
            rel="noopener noreferrer"
          >
            Click here to join
          </a>
        </div>

        {/* Back link */}
        <div className="pt-8">
          <a href="/" className="text-sm text-blue-600 underline hover:text-blue-800 visited:text-purple-600">
            ← Back to home
          </a>
        </div>
      </div>
    </main>
  )
}
