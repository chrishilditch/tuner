import { H1 } from "../../designSystem/headers";
import { P } from "../../designSystem/p";

const HowToUse = () => {
  return (
    <div className="flex flex-col items-center justify-center p-6">
      <H1>How to Use</H1>
      <P>
        To use Tuner, simply select the instrument you want to tune and then
        select the tuning you want to use.
      </P>
      <P>
        Then play the string indicated on the button. The tuner will listen for
        the pitch and indicate whether you are in tune. Once the note is in
        tune, then the tuner will automatically advance to the next note.
      </P>
      <P>
        You can use the buttons to manually select a note to tune if you want to
        change the string you are working on.
      </P>
    </div>
  );
};

export default HowToUse;
