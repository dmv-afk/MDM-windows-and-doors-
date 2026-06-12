import Button from "@/components/ui/Button";

export default function NotFound() {
  return (
    <section className="flex min-h-svh items-center justify-center px-5">
      <div className="text-center">
        <p className="eyebrow">404</p>
        <h1 className="display mt-4 text-4xl md:text-6xl">This page isn&apos;t here.</h1>
        <p className="mt-5 text-white/60">The view you&apos;re looking for has moved or never existed.</p>
        <div className="mt-9 flex justify-center gap-4">
          <Button href="/">Back to home</Button>
          <Button href="/quote" variant="ghost">Request Free Quote</Button>
        </div>
      </div>
    </section>
  );
}
