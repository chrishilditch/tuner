import { H1 } from "../../designSystem/headers";
import { P } from "../../designSystem/p";

const About = () => {
  return (
    <div className="flex flex-col items-center justify-center  p-6">
      <H1>About This Project</H1>
      <P>
        This project is designed to help musicians tune their guitars quickly
        and accurately using their browser's microphone. Whether you're a
        beginner or a professional guitarist, this tool is perfect for ensuring
        your instrument sounds its best.
      </P>
      <P>
        It leverages modern web technologies like <strong>React</strong> and{" "}
        <strong>Tailwind CSS</strong> to provide a seamless and responsive user
        experience. The pitch detection is powered by the{" "}
        <strong>pitchy</strong> library, which analyzes audio input to determine
        the frequency and pitch of the sound.
      </P>
    </div>
  );
};

export default About;
