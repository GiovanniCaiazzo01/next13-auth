import Left from "./Left";
import Right from "./Right";
type AuthProps = {
  // onSubmit = (data: FormData) => Promise<boolean>
  leftLabel: string;
  rightTopHeading: string;
  rightTopParagraph: string;
  rightBottomLabelLeft: string;
  rightBottomLabelRight: string;
  buttonLabel: string;
};
const AuthLayout = ({
  leftLabel,
  rightTopHeading,
  rightTopParagraph,
  rightBottomLabelLeft,
  rightBottomLabelRight,
  buttonLabel,
}: AuthProps) => {
  return (
    <div className="flex justify-start w-full h-screen">
      <Left label={leftLabel} />
      <Right
        heading={rightTopHeading}
        paragraph={rightTopParagraph}
        buttonLabel={buttonLabel}
        rightBottomLabelLeft={rightBottomLabelLeft}
        rightBottomLabelRight={rightBottomLabelRight}
      />
    </div>
  );
};

export default AuthLayout;
