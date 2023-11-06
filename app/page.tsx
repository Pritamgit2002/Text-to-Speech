import { BsGithub } from "react-icons/bs";
import GenerateSoundView from "@/components/Generate/GenerateSoundView";

/**
 * The main entry point component for the application.
 * It renders the GenerateSoundView component.
 */
export default function Home() {
  return (
    <main className="flex min-h-screen flex-col justify-center relative ">
      <div className="">
        <GenerateSoundView />
      </div>
      <div className="absolute inset-x-0 bottom-0 flex items-center justify-center text-lg">
        <span>Developed by&nbsp;</span>
        <div>
          <BsGithub />
        </div>
        <span className="underline font-semibold">Pritam</span>
      </div>
    </main>
  );
}
