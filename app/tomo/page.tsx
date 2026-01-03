export default function TomoPage() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-white p-4">
      <div className="text-center space-y-8">
        {/* Title */}


        {/* Discord Invite */}
        <div className="space-y-4">
          <p className="text-lg text-gray-700">Join our guild Discord server:</p>
          <a
            href="https://discord.gg/mBRgJBKmfw"
            className="inline-block text-xl text-blue-600 underline hover:text-blue-800 visited:text-purple-600"
            target="_blank"
            rel="noopener noreferrer"
          >
            Tomodachi Zuko [TOMO]
          </a>
        </div>

        {/* Back link */}
        <div className="pt-8">
          <a href="/" className="text-sm text-blue-600 underline hover:text-blue-800 visited:text-purple-600">
            ← Home
          </a>
        </div>
      </div>
    </main>
  )
}
