import Header from '@/components/Header'

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center">
      <Header />
      <div className="w-full max-w-screen-xl p-12">
        <div className="flex flex-col bg-gray-200 border border-gray-300 rounded-2xl p-12 lg:flex-row gap-12 lg:gap-24 items-center lg:justify-center">
          <button type="button" class="text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-lg w-full lg:w-1/4 py-5 text-center">
            I got saved today
          </button>
          <button type="button" class="text-white bg-gradient-to-br from-pink-500 to-orange-400 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-pink-200 dark:focus:ring-pink-800 font-medium rounded-lg text-lg w-full lg:w-1/4 py-5 text-center">
            I still have questions
          </button>
        </div>
      </div>
    </main>
  )
}
