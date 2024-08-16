import { Outlet } from "react-router-dom"

export default function Auth() {
  return (
    <main className="h-screen bg-neutral-100 flex flex-col items-center justify-center p-4">
      <Outlet />

      <footer className="text-sm mt-12 flex items-center gap-2">
        <img
          src="https://gambolthemes.net/html-items/cursus-new-demo/images/sign_logo.png"
          alt=""
        />
        © 2024 <strong>Cursus</strong>. All Rights Reserved.
      </footer>
    </main>
  )
}
