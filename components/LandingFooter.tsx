"use client";

export default function LandingFooter({ className }: { className?: string }) {
  return (
    <footer className="container px-4 py-12 mx-auto space-y-8 overflow-hidden sm:px-6 lg:px-8">
      <nav className="flex flex-wrap justify-center -mx-5 -my-2">
        {/* <div className="px-5 py-2">
          <Link href="#">Terms and Conditions</Link>
        </div>
        <div className="px-5 py-2">
          <Link href="#">Privacy Policy</Link>
        </div> */}
      </nav>

      <div className="flex justify-center mt-8 space-x-6">
        <a
          href="https://www.dextools.io/app/en/ether/pair-explorer/0x478e064f26833cac4f217ea044b5b170f56b2663?t=1716927654340"
          target="_blank"
          className="text-white "
        >
          <span className="sr-only">DexTools</span>
          <img className="w-6 h-6" src="/dextools.png" />
        </a>
        <a href="" target="_blank" className="text-white ">
          <span className="sr-only">Telegram</span>
          <svg
            className="w-6 h-6"
            aria-hidden="true"
            fill="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="m12 24c6.629 0 12-5.371 12-12s-5.371-12-12-12-12 5.371-12 12 5.371 12 12 12zm-6.509-12.26 11.57-4.461c.537-.194 1.006.131.832.943l.001-.001-1.97 9.281c-.146.658-.537.818-1.084.508l-3-2.211-1.447 1.394c-.16.16-.295.295-.605.295l.213-3.053 5.56-5.023c.242-.213-.054-.333-.373-.121l-6.871 4.326-2.962-.924c-.643-.204-.657-.643.136-.953z" />
          </svg>
        </a>
        <a
          href="https://twitter.com/LongDragonLD"
          target="_blank"
          className="text-white "
        >
          <span className="sr-only">Twitter</span>
          <svg
            className="w-6 h-6"
            aria-hidden="true"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84"></path>
          </svg>
        </a>
        <a
          href="https://github.com/LongDragonLD"
          target="_blank"
          className="text-white "
        >
          <span className="sr-only">GitHub</span>
          <svg
            className="w-6 h-6"
            aria-hidden="true"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              fillRule="evenodd"
              d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
              clipRule="evenodd"
            ></path>
          </svg>
        </a>
      </div>
      <p className="mt-8 text-base leading-6 text-center">
        © 2024 Long Dragon, Inc. All rights reserved.
      </p>
    </footer>
  );
}
